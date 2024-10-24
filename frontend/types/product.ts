export interface Product {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    pointsRequired: number;
    isRedeemed: boolean;
}

export interface ProductListResponse {
    products: Product[];
}
