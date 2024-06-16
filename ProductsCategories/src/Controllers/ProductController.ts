import { Request, Response, RequestHandler } from 'express';
import { sqlConfig } from '../Config';
import { Product, ProductRequest } from '../Models/ProductModels';
import mssql from 'mssql';

export const addProduct = async (req: ProductRequest, res: Response) => {
    try {
        const { name, price, categoryId } = req.body;

        const pool = await mssql.connect(sqlConfig);
        await pool.request()
            .input("name", name)
            .input("price", price)
            .input("categoryId", categoryId)
            .execute('addProduct');

        res.status(201).json({ message: "Product Created" });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getProducts: RequestHandler = async (req, res) => {
    try {
        const pool = await mssql.connect(sqlConfig);
        const products = (await pool.request().execute('getProducts')).recordset as Product[];
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getProduct = async (req: Request<{ id: number }>, res: Response) => {
    try {
        const pool = await mssql.connect(sqlConfig);
        const product = (await pool.request()
            .input("id", req.params.id)
            .execute('getProduct')).recordset[0] as Product;

        if (product && product.id) {
            return res.status(200).json(product);
        }

        return res.status(404).json({ message: "Product Not Found" });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const updateProduct = async (req: Request<{ id: number }>, res: Response) => {
    try {
        const pool = await mssql.connect(sqlConfig);
        const product = (await pool.request()
            .input("id", req.params.id)
            .execute('getProduct')).recordset[0] as Product;

        if (product && product.id) {
            const { name, price, categoryId } = req.body;
            await pool.request()
                .input('id', req.params.id)
                .input('name', name)
                .input('price', price)
                .input('categoryId', categoryId)
                .execute('updateProduct');
            return res.status(200).json({ message: "Product Updated" });
        }

        return res.status(404).json({ message: "Product Not Found" });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteProduct = async (req: Request<{ id: number }>, res: Response) => {
    try {
        const pool = await mssql.connect(sqlConfig);
        const product = (await pool.request()
            .input("id", req.params.id)
            .execute('getProduct')).recordset[0] as Product;

        if (product && product.id) {
            await pool.request()
                .input('id', req.params.id)
                .execute('deleteProduct');
            return res.status(200).json({ message: "Product Deleted" });
        }

        return res.status(404).json({ message: "Product Not Found" });
    } catch (error) {
        res.status(500).json(error);
    }
};
