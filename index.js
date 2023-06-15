import express from "express"
import dot from "dotenv"
import "./DataConnect/Connect.js"
import userRouter from "./Route/routes.js"
import cors from "cors"


const app = express();
const dotenv = dot.config()



app.use(cors({
    origin: '*'
  }));
  
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use('/users',userRouter);

app.listen(process.env.PORT || 9000, () => {
    console.log(`app running on port ${process.env.PORT}`);
  });



