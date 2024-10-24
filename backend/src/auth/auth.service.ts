import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private users = [
    {
      id: 1,
      username: 'user1',
      password: 'password1',
      points: 1000,
    },
    {
      id: 2,
      username: 'user2',
      password: 'password2',
      points: 1000,
    },
    {
      id: 3,
      username: 'user3',
      password: 'password3',
      points: 1000,
    },
  ];

  constructor(private readonly jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = this.users.find((user) => user.username === username);

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

  // ดึงแต้มของผู้ใช้
  getUserPoints(userId: number): number {
    const user = this.users.find((user) => user.id === userId);
    return user ? user.points : 0;
  }

  // อัปเดตแต้มของผู้ใช้หลังจากการแลกสินค้า
  updateUserPoints(userId: number, pointsUsed: number): void {
    const user = this.users.find((user) => user.id === userId);
    if (user) {
      user.points -= pointsUsed;
    }
  }
}
