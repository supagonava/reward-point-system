import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt'; // นำเข้า JwtModule
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ProductsService } from 'src/products/products.service';
import { ProductsController } from 'src/products/products.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: '12345678', // ควรเก็บค่า secret ใน environment variable
      signOptions: { expiresIn: '8h' }, // กำหนดอายุของ token
    }),
  ],
  controllers: [AuthController, ProductsController],
  providers: [AuthService, ProductsService, JwtStrategy],
  exports: [AuthService, ProductsService],
})
export class AuthModule {}
