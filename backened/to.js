import express from 'express'                                    
import { MongoClient, ObjectId } from 'mongodb';
import path from 'path'
const app=express();
const publicpath = path.resolve('public')
app.use(express.static(publicpath))
app.set("view engine",'ejs')
app.set('views','views');
const dbName="Mern-Project";
const client = new MongoClient("mongodb://localhost:27017")
const connection = async()=>{
    const connect= await client.connect();
    return connect.db(dbName);}
app.use(express.urlencoded({extended:false})) 
app.get('/',async(req,resp)=>{// fetch data from here so you can see the task
    const db=await connection();
    const collection=db.collection("Todo");
    const result=await collection.find().toArray();
    console.log(result);
    resp.render("list",{result});
})
app.get('/add',(req,resp)=>{
    resp.render("add");
})
app.get('/update',(req,resp)=>{
    resp.render("update");
})
app.post('/update',(req,resp)=>{
    resp.redirect('/')
})
app.post('/add',async(req,resp)=>{
    const db=await connection();
    const collection = db.collection("Todo");
    const result=await collection.insertOne(req.body)
    if(result.acknowledged){
 resp.redirect('/')
    }
    else{
        resp.redirect('/add')
    }
   
})
app.get('/delete/:id',async(req,resp)=>{
    const db=await connection();
    const collection = db.collection("Todo");
    const result=await collection.deleteOne({_id:new ObjectId(req.params.id)})
    if(result.acknowledged){
 resp.redirect('/')
    }
    else{
        resp.send('Error')
    }
   
})
app.get('/update/:id',async(req,resp)=>{
    const db=await connection();
    const collection = db.collection("Todo");
    const result=await collection.findOne({_id:new ObjectId(req.params.id)})
    console.log(result);
    if(result){
        resp.render("update",{result});
    }
    else{
        resp.send("some Error")
    }
   
   
})
app.post('/update/:id',async(req,resp)=>{
    const db=await connection();
    const collection = db.collection("Todo");
    const filter={_id :new ObjectId(req.params.id)};
    const UpdateData={$set : {tittle:req.body.tittle,Description : req.body.Description}}
    const result=await collection.UpdateData(filter,UpdateData)
    console.log(result);
    if(result){
        resp.render('/');
    }
    else{
        resp.send("some Error")
    }
   
   
})
app.post("/multi-delete",async(req,resp)=>{
    const db=await connection();
    const collection = db.collection("Todo");
    console.log(req.body.SelectTask);
    let SelectTask=undefined
    if(Array.isArray(req.body.SelectTask)){
    const SelectTask=req.body.SelectTask.map((id)=> new ObjectId(id))
    }else{
        const SelectTask=[new ObjectId(req.body.SelectTask)]
    }
    console.log(SelectTask);
    
    const result=await collection.deleteMany({_id:{$in:SelectTask}})
  
    if(result){
        resp.render('/');
    }
    else{
        resp.send("some Error")
    }
   
   
})







app.listen(3200)