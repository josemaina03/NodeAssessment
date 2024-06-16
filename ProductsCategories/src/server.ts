import express,{json} from 'express'
import categoryRouter from './Routes/CategoryRouter';
import productRouter from './Routes/ProductRouter';
import authRoutes from './Routes/authRoutes';

const app = express()

app.use(json())

app.use("/Products", productRouter);
app.use("/Categories", categoryRouter);
app.use("/auth", authRoutes);

app.listen(3000, ()=> {console.log('server running...')})