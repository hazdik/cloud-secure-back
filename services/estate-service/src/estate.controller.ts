import { Controller, Get } from '@nestjs/common';

export class EstateMapResponse {
  cloudProvider!: string;
  accounts!: Array<{
    accountId: string;
    regions: Array<{
      region: string;
      resources: Array<{ type: string; id: string; name: string }>;
    }>;
  }>;
}

@Controller('estate')
export class EstateController {
  @Get('map')
  async getEstateMap(): Promise<EstateMapResponse> {
    // Dummy data for cloud estate hierarchy
    return {
      cloudProvider: 'aws',
      accounts: [
        {
          accountId: '123456789012',
          regions: [
            {
              region: 'us-east-1',
              resources: [
                { type: 'EC2', id: 'i-abc123', name: 'web-server-1' },
                { type: 'S3', id: 'bucket-xyz', name: 'data-bucket' },
              ],
            },
          ],
        },
      ],
    };
  }
}
