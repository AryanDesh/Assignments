import express from 'express';
import { UserMiddleware } from './middleware/User';
import { AdminMiddleware } from './middleware/Admin';
import { UserRouter } from './routes/User';
import { AdminRouter } from './routes/Admin';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/admin', AdminRouter);
app.use('/user', UserRouter)

app.listen(PORT ,() => {
    console.log(`Server Running on Port ${PORT}`);
})