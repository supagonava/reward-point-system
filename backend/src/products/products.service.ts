import { Injectable } from '@nestjs/common';

const PRODUCTS = [
  {
    id: 1,
    name: 'Facemask Mockup',
    description: 'Description 1',
    pointsRequired: 100,
    expirationDate: '2024-12-31T23:59:59Z',
    image:
      'https://blog-frontend.envato.com/cdn-cgi/image/width=1024,quality=75,format=auto/uploads/2021/05/Screen-Shot-2021-05-24-at-12.23.37-pm.png',
    redeemedBy: [],
  },
  {
    id: 2,
    name: 'Coffee Mug Mockup',
    description: 'Description 2',
    pointsRequired: 200,
    expirationDate: '2024-09-30T23:59:59Z',
    image:
      'https://blog-frontend.envato.com/cdn-cgi/image/width=1024,quality=75,format=auto/uploads/2021/05/Screen-Shot-2021-05-24-at-12.31.59-pm.png',
    redeemedBy: [],
  },
  {
    id: 3,
    name: 'Hoodie Mockup',
    description: 'Description 3',
    pointsRequired: 300,
    expirationDate: '2024-10-31T23:59:59Z',
    image:
      'https://blog-frontend.envato.com/cdn-cgi/image/width=1024,quality=75,format=auto/uploads/2021/05/Screen-Shot-2021-05-24-at-12.34.20-pm.png',
    redeemedBy: [],
  },
];

@Injectable()
export class ProductsService {
  CODE_ERROR_EXP = 1;
  CODE_ERROR_POINT_NOT_ENOUGHT = 2;
  CODE_ERROR_REDEEMED = 3;

  private products = [];

  constructor() {
    this.products = [...PRODUCTS];
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
      return { code: this.CODE_ERROR_EXP, message: 'Product has expired' };
    }

    // ตรวจสอบแต้มของผู้ใช้และสถานะการแลกสินค้า
    if (userPoints < product.pointsRequired) {
      return {
        code: this.CODE_ERROR_POINT_NOT_ENOUGHT,
        message: 'Cannot redeem product',
      };
    }

    // ตรวจสอบว่าผู้ใช้นี้ได้แลกสินค้าไปแล้วหรือไม่
    if (product.redeemedBy.includes(userId)) {
      return {
        code: this.CODE_ERROR_REDEEMED,
        message: 'You have already redeemed this product',
      };
    }

    // อัปเดตสถานะการแลกสินค้า
    product.redeemedBy.push(userId);

    return {
      message: 'Product redeemed successfully',
      remainingPoints: userPoints - product.pointsRequired,
    };
  }

  getRedeemedProducts(userId: number) {
    return this.products.filter((product) =>
      product.redeemedBy.includes(userId),
    );
  }
}
