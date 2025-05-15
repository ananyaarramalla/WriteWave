const exp=require('express')
const authorApp=exp.Router();
const commonApp=require('./common-api');
const bcryptjs=require('bcryptjs')
const expressAsyncHandler=require('express-async-handler')
const jwt=require('jsonwebtoken')
const verifyToken=require('../middlewares/verifyToken')


let authorscollection;
let articlescollection;

authorApp.use((req,res,next)=>{
    authorscollection=req.app.get('authorscollection')
    articlescollection=req.app.get('articlescollection')
    next()
})

authorApp.post('/author',expressAsyncHandler(async(req,res)=>{
    const newUser=req.body;
    const dbuser=await authorscollection.findOne({username:newUser.username})
    if(dbuser!==null){
        res.send({message:"Username already exists!"})
    }else{
        const hashedPassword=await bcryptjs.hash(newUser.password,6)
        newUser.password=hashedPassword;
        await authorscollection.insertOne(newUser)
        res.status(201).json({ message: "Author registration success" });

    }
}))

authorApp.post('/login',expressAsyncHandler(async(req,res)=>{
    const userCred=req.body;
    const dbuser=await authorscollection.findOne({username:userCred.username})
    if (dbuser===null){
        res.send({message:"Invalid Username, Please try again."})
    }else{
        const status=await bcryptjs.compare(userCred.password,dbuser.password)
        if(status===false){
            res.send({message:"Invalid Password, Please try again."})
        }else{
            const signedToken=jwt.sign({username:dbuser.username},process.env.SECRET_KEY,{expiresIn:'30m'});
            res.send({message:"login success",token:signedToken,user:dbuser})
        }
    }
}))


authorApp.post('/article',verifyToken,expressAsyncHandler(async(req,res)=>{
    const newArticle=req.body;
    await articlescollection.insertOne(newArticle)
    res.send({message:"New article created"})
}))


authorApp.put('/article',verifyToken,expressAsyncHandler(async(req,res)=>{
    const modifiedArticle=req.body;
    let result= await articlescollection.updateOne({articleId:modifiedArticle.articleId},{$set:{...modifiedArticle}})
    let latestArticle=await articlescollection.findOne({articleId:modifiedArticle.articleId})
    res.send({message:"Article modified",article:latestArticle})
}))



authorApp.put('/article/:articleId',verifyToken,expressAsyncHandler(async(req,res)=>{
    const artileIdFromUrl=(+req.params.articleId);
    const articleToDelete=req.body;
    if(articleToDelete.status===true){
        let modifiedArt= await articlescollection.findOneAndUpdate({articleId:artileIdFromUrl},{$set:{...articleToDelete,status:false}},{returnDocument:"after"})
        res.send({message:"Article deleted",payload:modifiedArt.status})
     }
    if(articleToDelete.status===false){
         let modifiedArt= await articlescollection.findOneAndUpdate({articleId:artileIdFromUrl},{$set:{...articleToDelete,status:true}},{returnDocument:"after"})
         res.send({message:"Article restored",payload:modifiedArt.status})
     }
}))



authorApp.get("/articles/:username",verifyToken,expressAsyncHandler(async (req, res) => {
        const authorName=req.params.username;
        const artclesList=await articlescollection.find({username:authorName}).toArray()
        res.send({message:"List of atricles",payload:artclesList})
    })
  );


module.exports=authorApp;