const express= require('express')
const app =express()
const authRoutes=require('./routes/auth')
const userRoutes=require('./routes/user')
const categoryRoutes=require('./routes/category')
const productRoutes=require('./routes/product')
const orderRoutes=require('./routes/order')

const braintreeRoutes=require('./routes/braintree')

const expressValidator=require('express-validator')
const dotenv=require('dotenv')// to use the env file port
dotenv.config()
const mongoose = require('mongoose');
const cors=require('cors')
const morgan=require('morgan')
const bodyparser=require('body-parser')
const cookieparser=require('cookie-parser')
// db connection
mongoose.connect(
    process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useCreateIndex:true,
        useUnifiedTopology: true, 
        useFindAndModify: false
    }

  )
  .then(() => console.log('database connected'))
   
  mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
  });
  //middlewares
  app.use(morgan('dev'))
  app.use(bodyparser.json())
  app.use(cookieparser())
  app.use(expressValidator())
  app.use(cors())

  // route middlware
  app.use("/api",authRoutes)
  app.use("/api",userRoutes)
  app.use("/api",categoryRoutes)
  app.use("/api",productRoutes)
  app.use("/api",braintreeRoutes)
  app.use('/api',orderRoutes)




app.get('/',(req,res)=>{
    res.send('hello from server')
})
const port=process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`server run on port ${port}`)
})