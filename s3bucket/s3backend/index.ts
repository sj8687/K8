import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import express from "express"
import dotenv from "dotenv";
import {v4 as uuidv4} from "uuid"
import { ProductModel } from "./product-modal";
import { connectToDB } from "./db";
import cors from "cors"

dotenv.config();

const app = express();
const port = 3200;
app.use(cors())
app.use(express.json());


connectToDB().then(() => {
  console.log("✅ DB connected");


const client = new S3Client({
  region:'ap-south-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
});



const createPresignedUrlWithClient = ({ bucket, key }: any) => {
  const command = new PutObjectCommand({ Bucket: bucket, Key: key });  
  return getSignedUrl(client, command, { expiresIn: 3600 });
};


app.post("/get-presigned-url",async (req,res) => {
    const {mime} = req.body;

    const filename = uuidv4()
    const finalname = `${filename}.${mime}`   //this will be like cygvrvruicb.png

   const url =  await createPresignedUrlWithClient({
    bucket: process.env.S3_BUCKET_NAME,
    key: finalname
   })
   
    res.json({
        url:url,
        finalname
    })
});



app.post("/api/products",async (req,res) => {
    const {name,description,price,filename} = req.body;

    if(!name || !description || !price || !filename) {
        res.json({
            message:"all field req.."
        })
    }

    const products = await ProductModel.create({
        name,
        description,
        price,
        filename
    })

    console.log(products);
    
    res.json({message:"hello mmmmMF"})
})



app.get("/api/products",async (req,res)=>{
  const products = await ProductModel.find();
  res.json(products)
})




 app.listen(port,() => {
    console.log(`fuck u bitch ${port}`);
    
   })

});