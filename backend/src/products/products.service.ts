import { Injectable } from '@nestjs/common';
import { productRecords, userRecords } from 'src/data';

@Injectable()
export class ProductsService {
  CODE_SUCCESS = 0;
  CODE_ERROR_EXP = 1;
  CODE_ERROR_POINT_NOT_ENOUGHT = 2;
  CODE_ERROR_REDEEMED = 3;

  private products = [];

  constructor() {
    this.products = [...productRecords];
  }

  findAll() {
    return this.products;
  }

  // ฟังก์ชันสำหรับการแลกสินค้า
  redeemProduct(userId: number, productId: number, userPoints: number) {
    const product = this.products.find((product) => product.id === productId);

    if (!product) {
      return { message: 'Product not found' };
    }

    // ตรวจสอบวันหมดอายุของสินค้า
    const currentDate = new Date();
    const expirationDate = new Date(product.expirationDate);

    if (currentDate > expirationDate) {
      return { code: this.CODE_ERROR_EXP, message: 'สินค้าหมดเขตแล้ว' };
    }

    // ตรวจสอบแต้มของผู้ใช้และสถานะการแลกสินค้า
    if (userPoints < product.pointsRequired) {
      return {
        code: this.CODE_ERROR_POINT_NOT_ENOUGHT,
        message: 'พอยต์ไม่เพียงพอ',
      };
    }

    // ตรวจสอบว่าผู้ใช้นี้ได้แลกสินค้าไปแล้วหรือไม่
    if (product.redeemedBy.includes(userId)) {
      return {
        code: this.CODE_ERROR_REDEEMED,
        message: 'คุณกดรับสินค้านี้ไปแล้ว',
      };
    }

    // อัปเดตสถานะการแลกสินค้า
    product.redeemedBy.push(userId);

    return {
      code: this.CODE_SUCCESS,
      message: 'รับสิทธิ์สำเร็จ',
      pointUsed: product.pointsRequired,
      remainingPoints: userPoints - product.pointsRequired,
    };
  }

  getRedeemedProducts(userId: number) {
    return this.products.filter((product) =>
      product.redeemedBy.includes(userId),
    );
  }
}
