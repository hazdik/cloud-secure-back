import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, InviteDto, RefreshDto } from './dto';
import { RbacGuard } from './rbac.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto): Promise<{ message: string }> {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto): Promise<{ access_token: string }> {
    return this.authService.login(dto);
  }

  @Post('invite')
  @UseGuards(RbacGuard)
  async invite(@Body() dto: InviteDto): Promise<{ message: string }> {
    return this.authService.invite(dto);
  }

  @Post('refresh')
  async refresh(@Body() dto: RefreshDto): Promise<{ access_token: string }> {
    return this.authService.refresh(dto);
  }
}
