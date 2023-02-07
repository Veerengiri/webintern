const express = require('express');
const malik = require('../model/malik');
const item = require('../model/item');
const nas = require('../model/nas');
const custome= require('../model/custome');
const user = require('../model/user');
const router = express.Router();
require('dotenv').config();
const bycrpt = require("bcryptjs");
const aws = require('aws-sdk');
const jwt = require('jsonwebtoken');


const region = process.env.REGION;
const secretkey = process.env.SECRET_ACCESS_KEY;
const accesskey = process.env.ACCESS_KEY;
const bucketName = process.env.BUCKET; 
const s3 = new aws.S3({
    region,
    accessKeyId:accesskey,
    secretAccessKey:secretkey,
    signatureVersion:'v4',
});
async function generateUploadUrl(filetype){
    const imageName =((Date.now().toString())+'.'+filetype).toString();
    const params = ({
        Bucket: bucketName,
        Key: imageName,
        Expires: 60
    })
    const uploadURL = await s3.getSignedUrlPromise('putObject',params);
    
    return uploadURL;
}
router.get('/api/geturl/:filetype',async (req,res)=>{
    try {
        const {filetype}=req.params;
        const url =await generateUploadUrl(filetype);
        res.json({status:'ok',url});
    } catch (error) {
        res.json({error});
    }
})
router.post('/api/additems',async (req,res)=>{
    try {
        const {name,price,desc,itemImage}=req.body;
        const ite = await item.create({
            name,
            price,
            desc,
            itemImage,
        })
        if(ite){
            res.json({status:"ok"})
        }else{
            res.json({status:"item not added.."})
        }
    } catch (error) {
        res.json({status:"error"});
    }
})


router.get('/api/updateitemprice/:itemid/:price',async (req,res)=>{
    try {
        const {itemid,price}=req.params;
        const data =await item.findByIdAndUpdate(itemid,{price: price});
        if(data){
            res.status(200).json({status:"change price successfully"});
        }else{
            res.status(200).json({status:"not found error"});
        }
    } catch (error) {
        res.status(500).json({status:"server error"});
    }
});
router.get('/api/showitems',async (req,res)=>{
    try {
        const data = await item.find();
        res.json({item:data});
    } catch (error) {
        res.json("error");
    }
})
router.get('/api/searchitems/:keyword',async (req,res)=>{
    try {
        const {keyword}=req.params;
        const data = await item.find({"name": new RegExp(keyword)});
        res.json({item:data});
    } catch (error) {
        res.json("error");
    }
})
router.get('/api/deleteitem/:itemid',async (req,res)=>{
    const {itemid}=req.params;
    try {
        const data =await item.findByIdAndDelete(itemid);
        if(data){
            // let paths = `./itemImages/${data.itemImage}`
            // fs.unlinkSync(paths);
            const url = data.itemImage;
            const urlsplit= url.split('/');
            const filename = urlsplit[urlsplit.length-1];
            let resdata = true;
        // const filename = "javaproject.text";
            const params= ({
                Bucket: bucketName,
                Key: filename
            })
            const delet = await s3.deleteObject(params, (err, data) => {
                if (err) {
                    resdata = false;
                }
            })
            res.status(200).json({status:"ok"})
        }
    } catch (error) {
        res.send({status:"error"})
    }
})
router.post('/api/addnas',async (req,res)=>{
    const {headline,desc}=req.body;
    const dt = new Date();
    const date = dt.getDate()+"/"+(dt.getMonth()+1)+"/"+dt.getFullYear();
    try {
        const nass = await nas.create({
            headline,
            desc,
            date,
        })
        res.json({status:"ok"})
    } catch (error) {
        res.json({status:"error"})
    }
})
router.get('/api/shownas',async (req,res)=>{
    try {
        const news =await nas.find();
        res.json({status:"ok",news});
    } catch (error) {
        res.json({status:"ok"});
    }
})
router.get('/api/deletnas/:nasid',async (req,res)=>{
    try {
        const {nasid}=req.params;
        const news =await nas.findByIdAndDelete(nasid);
        
        if(news){
            res.json({status:"delet news successfully"})
        }
    } catch (error) {
        res.json({status:"error"})
    }
})
router.post('/api/addmalik',async (req,res)=>{
    try {
        const {name,email,mobileNo,password}=req.body;
        const salt = await bycrpt.genSalt(10);
        const sespass = await bycrpt.hash(password, salt);

        const admin = await malik.create({
            name:name,
            email:email,
            mobileNo: mobileNo,
            password:sespass,
        })
        if(admin){
            res.json({status:"ok"});
        }
        
    } catch (error) {
        res.json({status:"admin already exists"});
    }
})
router.get('/api/removemalik/:id',async (req,res)=>{
    
    try {
        const {id}=req.params;
        
        const admin = await malik.findByIdAndDelete(id);
        if(admin){
            res.json({status:"admin remove sucessfully"});
        }
        else{
            res.json({status:"admin not removed"});
        }
    } catch (error) {
        res.json({status:"server error"});
    }
})
router.get('/api/getmalik/:adminid', async (req,res)=>{
    try {
        const {adminid}=req.params;
        const admin = await malik.findById(adminid);
        if(admin){
            res.json({status:"ok",admin});
        }
    } catch (error) {
        res.json({status:"not found"});
    }
})
router.get('/api/getallmalik',async (req,res)=>{
    try {
        const {adminid}=req.params;
        const admin = await malik.find();
        if(admin){
            res.json({status:"ok",admin});
        }
    } catch (error) {
        res.json({status:"not found"});
    }
})
router.post('/api/loginmalik',async (req,res)=>{
    try {
        const {email,password}=req.body;
        const admin  = await malik.findOne({email: email});
        const compare = await bycrpt.compare(password, admin.password);

        if(compare){
            var token = jwt.sign({email:email,id:admin._id,isadmin:true}, 'theInfinity'); 
            res.json({status:'ok',admin,token});
        }else{
            res.json({status:"not found"})
        }
    } catch (error) {
        res.json({status:"admin not found"})
    }

})
router.get('/api/addmincp/:email/:password',async (req,res)=>{
    try {
        const {email,password}=req.params;
        const salt = await bycrpt.genSalt(10);
        const sespass = await bycrpt.hash(password, salt);
        const users = await malik.findOne({email:email});
        const data = await malik.findByIdAndUpdate(users._id,{password:sespass});
        res.json({status:"admin change password succesfully"});
    } catch (error) {
        res.json({status:"password not changed"})
    }
})
router.post('/api/updateadmin',async (req,res)=>{
    try {
        const {adminid,name,mobileNo}=req.body;
        const admin =await malik.findByIdAndUpdate(adminid,{name:name,mobileNo:mobileNo});
        if(admin){
            res.json({status:"update admin successfully"});
        }
    } catch (error) {
        res.json({status:"admin not updated"});
    }
})

router.get('/api/getco',async (req,res)=>{
    try {
        const orders = await custome.find().sort({sorttime:-1}).select("_id qtn totalprice date time isDeliverd cancel");
        res.json({status:"ok",orders})
    } catch (error) {
        res.json({status:"error"});
    }
})
router.get('/api/getpco/:oid',async (req,res)=>{
    try{
        const {oid}=req.params;
        const order = await custome.findById(oid);
        const ud = await user.findById(order.userId).select("-cart -password");
        let obj = {
            name: ud.name,
            type: order.type,
            sauce: order.sauce,
            cheese: order.cheese,
            veg: order.veg,
            qtn: order.qtn,
            price: order.price,
            totalprice: order.totalprice,
            date: order.date,
            time: order.time,
            status: (order.cancel ? "Canceled": (order.isDeliverd ? "Deliverd" : "Undeliverd") ),
            email :ud.email,
            mobile: ud.mobileNo,
            address: ud.address,
        }
        res.json({status:'ok',data:obj});
    }catch(error){
        res.json({status:'error'});
    }
})
router.get('/api/codt/:oid',async (req,res)=>{
    try{
        const dt = await custome.findByIdAndUpdate(req.params.oid,{isDeliverd:true});
        if(dt){
            res.json({status:"ok"});
        }else{
            res.json({status:'server error'});
        }
    }catch(error){
        res.json({status:"error"});
    }
})
router.get('/api/getcou/:uid',async (req,res)=>{
    try{
        const orders= await custome.find({userId:req.params.uid}).sort({sorttime:-1}).select("_id qtn totalprice date time isDeliverd cancel");
        res.json({status:"ok",orders})
    }catch(err){
        res.json({status:"error"})
    }
})
router.get('/api/codc/:oid',async (req,res)=>{
    try{
        const dt = await custome.findByIdAndUpdate(req.params.oid,{cancel:true});
        if(dt){
            res.json({status:"ok"});
        }else{
            res.json({status:'server error'});
        }
    }catch(err){
        res.json({status:'error'})
    }
})




module.exports=router