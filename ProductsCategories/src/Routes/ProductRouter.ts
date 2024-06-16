import { Router } from "express";
import { addProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../Controllers/ProductController";

const productRouter = Router();

productRouter.post("", addProduct);
productRouter.get("", getProducts);
productRouter.get("/:id", getProduct);
productRouter.patch("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;
//
