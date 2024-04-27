require('dotenv').config()



//=> [{"file":"https://replicate.delivery/mgxm/eb97d0ed-1d6c-4...
const faceapp = require('faceapp')
const express=require('express')
const app= express()
const PORT=process.env.PORT || 5000
const cors=require('cors');
const router = require('./routers/route');
app.use(cors())
app.use(express.json())
app.use('/api',router)
app.listen(PORT,()=>console.log('listening on',PORT))