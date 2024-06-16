import { Router } from 'express';
import { addCategory, deleteCategory, getCategory, getCategories, updateCategory } from '../Controllers/CategoryController';

const categoryRouter = Router();

categoryRouter.post('', addCategory);
categoryRouter.get('', getCategories);
categoryRouter.get('', getCategory);
categoryRouter.patch('/:id', updateCategory);
categoryRouter.delete('/:id', deleteCategory);

export default categoryRouter;
