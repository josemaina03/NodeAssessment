import { Request } from 'express';

export interface Product {
    id: number;
    name: string;
    price: number;
    categoryId: number;
}

export interface ProductBody {
    name: string;
    price: number;
    categoryId: number;
}

export interface ProductRequest extends Request {
    body: ProductBody;
}
