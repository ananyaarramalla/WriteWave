const exp=require('express')
const userApp=exp.Router();
const commonApp=require('./common-api');
const bcryptjs=require('bcryptjs')
const expressAsyncHandler=require('express-async-handler')
const jwt=require('jsonwebtoken')
const verifyToken=require('../middlewares/verifyToken')

require('dotenv').config()

let userCollection;
let articlesCollection;

userApp.use((req,res,next)=>{
    userCollection=req.app.get('userscollection')
    articlesCollection=req.app.get('articlescollection')
    next()
})

userApp.post('/user',expressAsyncHandler(async(req,res)=>{
    const newUser=req.body;
    const dbuser=await userCollection.findOne({username:newUser.username})
    if(dbuser!==null){
        res.send({message:"Username already exists!"})
    }else{
        const hashedPassword=await bcryptjs.hash(newUser.password,6)
        newUser.password=hashedPassword;
        await userCollection.insertOne(newUser)
        res.status(201).json({ message: "User registration success" });

    }
}))

userApp.post('/login',expressAsyncHandler(async(req,res)=>{
    const userCred=req.body;
    const dbuser=await userCollection.findOne({username:userCred.username})
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

userApp.get(
    "/articles",verifyToken,
    expressAsyncHandler(async (req, res) => {
      const articlesCollection = req.app.get("articlescollection");
      let articlesList = await articlesCollection
        .find({ status: true })
        .toArray();
      res.send({ message: "articles", payload: articlesList });
    })
  );

module.exports=userApp;



userApp.post("/comment/:articleId", verifyToken, expressAsyncHandler(async (req, res) => {
    const userComment = req.body;
    const articleIdFromUrl = req.params.articleId;
  
    console.log("Received articleId:", articleIdFromUrl);
  
    // Convert articleIdFromUrl to a number
    const articleIdAsNumber = Number(articleIdFromUrl);
  
    let result;
    try {
      result = await articlesCollection.updateOne(
        { articleId: articleIdAsNumber },
        { $addToSet: { comments: userComment } }
      );
    } catch (error) {
      console.error("Error updating article:", error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  
    console.log("Update result:", result);
  
    if (result.matchedCount === 0) {
      console.log(`No article found with articleId: ${articleIdAsNumber}`);
      res.status(404).send({ message: "Article not found" });
    } else if (result.modifiedCount === 0) {
      console.log(`Failed to update article with articleId: ${articleIdAsNumber}`);
      res.status(500).send({ message: "Failed to post comment" });
    } else {
      res.send({ message: "Comment posted" });
    }
  }));
  
  

  