const exp=require('express')
const app=exp()
require('dotenv').config()
const mongoClient=require('mongodb').MongoClient;
const path=require('path')
var cors = require('cors')

app.use(exp.static(path.join(__dirname,'../client/blogapp/build')))
app.use(exp.json())
app.use(cors())

mongoClient.connect(process.env.DB_URL)
.then(client=>{
    const blogdb=client.db('blogdb')
    const usersCollection=blogdb.collection('userscollection')
    const articlesCollection=blogdb.collection('articlescollection')
    const authorscollection=blogdb.collection('authorscollection')
    app.set('userscollection',usersCollection)
    app.set('articlescollection',articlesCollection)
    app.set('authorscollection',authorscollection)
    console.log("DB connection success")
})
.catch(err=>console.log("Error in DB connection",err))

const userApp=require('./APIs/user-api')
const authorApp=require('./APIs/author-api')
const adminApp=require('./APIs/admin-api')

app.use('/user-api',userApp)
app.use('/author-api',authorApp)
app.use('/admin-api',adminApp)

app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'../client/blogapp/build/index.html'))
})

app.use((err,req,res,next)=>{
    res.send({message:"error",payload:err.message})
})

const port=process.env.PORT || 5000;
app.listen(port,()=>console.log(`Web server on port ${port}`))