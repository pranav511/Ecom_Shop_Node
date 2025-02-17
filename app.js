const express = require("express");
const userRoutes = require("./Router/user");
const categoryRoutes = require("./Router/category");
const productRoutes = require("./Router/product");
const customerRoutes = require("./Router/customer");
const brandRoutes = require("./Router/brand");
const authRoutes = require("./Router/auth");
const connectMongoDB = require("./connect");
const mongoose=require('mongoose');
const app = express();
const dotenv=require('dotenv');
dotenv.config({path:'./.env'});
const PORT = process.env.PORT | 8000;
const mongodbLocalUrl ='mongodb://localhost:27017/ECOM-SHOP';
const bodyParser = require('body-parser');
const cors=require('cors');
const {verifyToken} = require('./middleware/authmiddleware');
const {isAdmin} = require('./middleware/adminMiddleware');

async function connctDB(){
  await mongoose.connect('mongodb://localhost:27017',
  {
    dbName:'ECOM-SHOP',
  });
  console.log('Connected');
}

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
connctDB().catch((err)=>{
  console.log(err);
})

var corsOptions = {
  origin: "http://localhost:4200",
  methods: ['GET', 'POST', 'PATCH', 'DELETE','PUT'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Server runnning");
});

app.use("/api", userRoutes);
app.use("/auth", authRoutes);
app.use("/", verifyToken,categoryRoutes);//verifyToken,isAdmin,
app.use("/brand",verifyToken, brandRoutes);//verifyToken,isAdmin,
app.use("/product",verifyToken,productRoutes);//verifyToken,isAdmin,
app.use("/admin/customer",verifyToken,customerRoutes);//verifyToken,


app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
