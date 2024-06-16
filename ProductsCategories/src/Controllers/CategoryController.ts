import { Request, Response, RequestHandler } from 'express';
import { sqlConfig } from '../Config';
import { Category, CategoryRequest } from '../Models/CategoryModels';
import mssql from 'mssql';

export const addCategory = async (req: CategoryRequest, res: Response) => {
    try {
        const { name } = req.body;

        const pool = await mssql.connect(sqlConfig);
        await pool.request()
            .input("name", name)
            .execute('addCategory');

        res.status(201).json({ message: "Category Created" });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getCategories: RequestHandler = async (req, res) => {
    try {
        const pool = await mssql.connect(sqlConfig);
        const categories = (await pool.request().execute('getCategories')).recordset as Category[];
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getCategory = async (req: Request<{ id: number }>, res: Response) => {
    try {
        const pool = await mssql.connect(sqlConfig);
        const category = (await pool.request()
            .input("id", req.params.id)
            .execute('getCategory')).recordset[0] as Category;

        if (category && category.id) {
            return res.status(200).json(category);
        }

        return res.status(404).json({ message: "Category Not Found" });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const updateCategory = async (req: Request<{ id: number }>, res: Response) => {
    try {
        const pool = await mssql.connect(sqlConfig);
        const category = (await pool.request()
            .input("id", req.params.id)
            .execute('getCategory')).recordset[0] as Category;

        if (category && category.id) {
            const { name } = req.body;
            await pool.request()
                .input('id', req.params.id)
                .input('name', name)
                .execute('updateCategory');
            return res.status(200).json({ message: "Category Updated" });
        }

        return res.status(404).json({ message: "Category Not Found" });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteCategory = async (req: Request<{ id: number }>, res: Response) => {
    try {
        const pool = await mssql.connect(sqlConfig);
        const category = (await pool.request()
            .input("id", req.params.id)
            .execute('getCategory')).recordset[0] as Category;

        if (category && category.id) {
            await pool.request()
                .input('id', req.params.id)
                .execute('deleteCategory');
            return res.status(200).json({ message: "Category Deleted" });
        }

        return res.status(404).json({ message: "Category Not Found" });
    } catch (error) {
        res.status(500).json(error);
    }
};
