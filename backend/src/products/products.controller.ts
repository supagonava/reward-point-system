import {
  Controller,
  Get,
  ParseIntPipe,
  UseGuards,
  Post,
  Param,
  Req,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('redeemed')
  redeemedProducts(@Req() req) {
    const userId = req.user.id;
    return this.productsService.getRedeemedProducts(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('redeem/:id')
  redeemProduct(@Param('id', ParseIntPipe) id: number, @Req() req) {
    const userId = req.user.id;
    const userPoints = this.authService.getUserPoints(userId); // ดึงแต้มของผู้ใช้

    const result = this.productsService.redeemProduct(userId, id, userPoints);
    if (result.message === 'Product redeemed successfully') {
      this.authService.updateUserPoints(userId, result.remainingPoints); // อัปเดตแต้มผู้ใช้
    }

    return result;
  }
}
