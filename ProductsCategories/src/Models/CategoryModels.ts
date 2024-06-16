import { Request } from 'express';

export interface Category {
    id: number;
    name: string;
}

export interface CategoryBody {
    name: string;
}

export interface CategoryRequest extends Request {
    body: CategoryBody;
}
