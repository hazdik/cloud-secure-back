
import { Controller, Post, Body } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { createObjectCsvWriter } from 'csv-writer';
import PDFDocument from 'pdfkit';
import * as fs from 'fs';
import * as path from 'path';


export class ReportExportRequest {
  type!: 'csv' | 'pdf';
  data!: any[];
  email!: string;
}

export class ReportExportResponse {
  url!: string;
  status!: 'success' | 'error';
  message!: string;
}

@Controller('reports')
export class ReportController {
  @Post('export')
  async exportReport(@Body() req: ReportExportRequest): Promise<ReportExportResponse> {
    try {
      const fileName = `report_${Date.now()}.${req.type}`;
      const filePath = path.join(__dirname, fileName);
      let uploadPath = filePath;

      if (req.type === 'csv') {
        const csvWriter = createObjectCsvWriter({
          path: filePath,
          header: Object.keys(req.data[0] || {}).map(key => ({ id: key, title: key }))
        });
        await csvWriter.writeRecords(req.data);
      } else if (req.type === 'pdf') {
        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(filePath));
        doc.text(JSON.stringify(req.data, null, 2));
        doc.end();
      } else {
        return {
          url: '',
          status: 'error',
          message: 'Invalid report type.'
        };
      }

      // Upload to S3
      const s3 = new S3({
        region: process.env.AWS_REGION || 'us-east-1',
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      });
      const fileContent = fs.readFileSync(filePath);
      const s3Params = {
        Bucket: process.env.AWS_S3_BUCKET || 'your-bucket',
        Key: `reports/${fileName}`,
        Body: fileContent,
        ContentType: req.type === 'csv' ? 'text/csv' : 'application/pdf'
      };
      await s3.upload(s3Params).promise();
      const url = `https://${s3Params.Bucket}.s3.amazonaws.com/${s3Params.Key}`;

      // Optionally: send email with link (not implemented here)

      // Clean up local file
      fs.unlinkSync(filePath);

      return {
        url,
        status: 'success',
        message: 'Report generated and uploaded.'
      };
    } catch (err: any) {
      return {
        url: '',
        status: 'error',
        message: err.message || 'Failed to generate report.'
      };
    }
  }
}
