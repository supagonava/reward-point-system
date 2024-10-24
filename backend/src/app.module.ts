import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { JwtStrategy } from './auth/jwt.strategy';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    PassportModule,
    AuthModule,
    ProductsModule,
    JwtModule.register({
      secret: process.env?.SECRET_KEY ?? '12345678',
      signOptions: { expiresIn: '8h' }, // กำหนดเวลาหมดอายุของ token
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService], // Export AuthService ให้ใช้งานได้ในโมดูลอื่น
})
export class AppModule {}
