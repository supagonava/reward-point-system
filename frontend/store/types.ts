export interface Product {
    id: number;
    name: string;
    description: string;
    pointsRequired: number;
    isRedeemed: boolean;
    expirationDate: string; // วันที่หมดอายุ
    redeemedBy: number[]; // รายการ user ID ที่แลกไปแล้ว
    image: string;
}

export interface User {
    id: number;
    username: string;
    points: number;
}
