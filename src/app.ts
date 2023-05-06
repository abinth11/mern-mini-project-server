import express from 'express'
import cors from 'cors'
const app = express();
import {connect} from '../src/config/mongoose.ts'
import morgan from 'morgan'
import dotenv from 'dotenv';
dotenv.config();
import userRouter from './routes/user.ts'
import adminRouter from './routes/admin.ts'
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use('/',userRouter)  
app.use('/admin',adminRouter)
app.use(morgan('dev'));

 connect()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err: Error) => {
    console.error(err);
  });


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
 