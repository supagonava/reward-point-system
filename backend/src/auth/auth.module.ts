import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthStateService } from './auth-state.service';
import { AuthController } from './auth.controller';
import { ProductsService } from 'src/products/products.service';
import { ProductsController } from 'src/products/products.controller';
import { JwtStrategy } from './jwt.strategy';

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: '12345678',
      signOptions: { expiresIn: '8h' },
    }),
  ],
  controllers: [AuthController, ProductsController],
  providers: [
    AuthService,
    AuthStateService, // เพิ่ม AuthStateService
    ProductsService,
    JwtStrategy,
  ],
  exports: [AuthService, ProductsService, AuthStateService], // ส่งออก AuthStateService
})
export class AuthModule {}
