import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import Redis from 'ioredis';
// @ts-ignore
import nodemailer from 'nodemailer';
import { RegisterDto, LoginDto, InviteDto, RefreshDto } from './dto';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async register(dto: RegisterDto) {
    // TODO: Save user to DB (use Prisma)
    const hashed = await bcrypt.hash(dto.password, 10);
    // ...save user with hashed password
    return { message: 'User registered (stub)' };
  }

  async login(dto: LoginDto) {
    // TODO: Validate user, check password
    // ...fetch user from DB
    const valid = await bcrypt.compare(dto.password, 'hashed_password_from_db');
    if (!valid) throw new Error('Invalid credentials');
    const token = this.jwtService.sign({ sub: 'user_id', role: 'user' });
    await redis.set(`session:user_id`, token);
    return { access_token: token };
  }

  async invite(dto: InviteDto) {
    // TODO: Generate invite token, send email
    const inviteToken = this.jwtService.sign({ email: dto.email, type: 'invite' }, { expiresIn: '1h' });
    // Send email (stub)
    const transporter = nodemailer.createTransport({
      host: 'smtp.example.com',
      port: 587,
      auth: { user: 'user', pass: 'pass' },
    });
    await transporter.sendMail({
      from: 'noreply@example.com',
      to: dto.email,
      subject: 'Invite',
      text: `Activate: http://localhost:4001/auth/activate?token=${inviteToken}`,
    });
    return { message: 'Invite sent (stub)' };
  }

  async refresh(dto: RefreshDto) {
    // TODO: Validate refresh token, issue new access token
    return { access_token: 'new_token (stub)' };
  }
}
