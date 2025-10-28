export class RegisterDto {
  email!: string;
  password!: string;
  firstName?: string;
  lastName?: string;
}

export class LoginDto {
  email!: string;
  password!: string;
}

export class InviteDto {
  email!: string;
}

export class RefreshDto {
  refreshToken!: string;
}
