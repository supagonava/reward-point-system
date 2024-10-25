import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthStateService } from './auth-state.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authStateService: AuthStateService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = this.authStateService.getUserByUsername(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  getUserPoints(userId: number): number {
    const user = this.authStateService.getUserById(userId);
    return user ? user.points : 0;
  }

  updateUserPoints(userId: number, pointsUsed: number): void {
    this.authStateService.updateUserPoints(userId, pointsUsed);
  }
}
