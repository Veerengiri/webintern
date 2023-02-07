const express = require('express');
const user = require('../model/user');
const item = require('../model/item');
const order = require('../model/order');
const custome = require('../model/custome');
const router = express.Router();
   


router.post('/api/corder',async (req,res)=>{
    try {
        const { userId,type,sauce,cheese,veg,date,time,price,qtn }=req.body;
        const dt = await custome.create({
            userId,
            type,
            sauce,
            cheese,
            veg,
            date,
            time,
            qtn,
            price,
            totalprice: price*qtn,
            isDeliverd: false,
            sorttime: Date.now().toString(),
            cancel: false
        })
        if(dt){
            res.json({status:"ok"});
        }else{
            res.json({status:'server error'});
        }
    } catch (error) {
        res.json({status:"error"});
    }
})
router.post('/api/getorder',async (req,res)=>{
    const {userId,itemId,qtn}=req.body;
    const isDeliverd = false;
    const dt = new Date();
    const date = dt.getDate()+"/"+(dt.getMonth()+1)+"/"+dt.getFullYear();
    const time = dt.getHours()+":"+dt.getMinutes();
    const sorttime= Date.now();
    try {
        const prices= await item.findById(itemId);
        const price = prices.price;
        const totalprice=qtn*price;
        const itemname = prices.name;
        const orders = await order.create({
            userId,
            itemId,
            date,
            time,
            itemname,
            price,
            qtn,
            totalprice,
            isDeliverd,
            sorttime,
        });
        if(orders){
            res.json({status:"Order placed successfully"});
        }
    } catch (error) {
        res.json({status:"error"});
    }
})
router.get('/api/showalloreders',async (req,res)=>{
    try {
        const orders =await order.find().sort({sorttime:-1});
        let showorders=[];
        for(let i =0;i<orders.length;i++){
            let users =await user.findById(orders[i].userId);
            let name=users.name;
            let mobileNo = users.mobileNo;
            let address= users.address;
            let add = {
                id:orders[i]._id,
                itemName:orders[i].itemname,
                qtn:orders[i].qtn,
                price: orders[i].price,
                totalprice: orders[i].totalprice,
                time: orders[i].time,
                date: orders[i].date,
                customerName: name,
                mobileNo: mobileNo,
                address: address,
                deliverd: orders[i].isDeliverd,
                sorttime: orders[i].sorttime,
            }
            showorders.push(add);
        }
        res.json({status:"ok",showorders})
    } catch (error) {
        res.json({status:"error"});
    }
})
router.get('/api/searchorders/:keyword',async (req,res)=>{
    try {
        const {keyword}=req.params
        const orders =await order.find({"itemname": new RegExp(keyword)});
        let showorders=[];
        for(let i =0;i<orders.length;i++){
            let users =await user.findById(orders[i].userId);
            let name=users.name;
            let mobileNo = users.mobileNo;
            let address= users.address;
            let add = {
                id:orders[i]._id,
                itemName:orders[i].itemname,
                qtn:orders[i].qtn,
                price: orders[i].price,
                totalprice: orders[i].totalprice,
                time: orders[i].time,
                date: orders[i].date,
                customerName: name,
                mobileNo: mobileNo,
                address: address,
                deliverd: orders[i].isDeliverd
            }
            showorders.push(add);
        }
        res.json({status:"ok",showorders})
    } catch (error) {
        res.json({status:"error"});
    }
})
router.get('/api/orderundeliverd',async (req,res)=>{
    try {
        const orders =await order.find({isDeliverd:"false"});
        let showorders=[];
        for(let i =0;i<orders.length;i++){
            let users =await user.findById(orders[i].userId);
            let name=users.name;
            let mobileNo = users.mobileNo;
            let address= users.address;
            let add = {
                id:orders[i]._id,
                itemName:orders[i].itemname,
                qtn:orders[i].qtn,
                price: orders[i].price,
                totalprice: orders[i].totalprice,
                time: orders[i].time,
                date: orders[i].date,
                customerName: name,
                mobileNo: mobileNo,
                address: address,
                deliverd: orders[i].isDeliverd
            }
            showorders.push(add);
        }
        res.json({status:"ok",showorders})
    } catch (error) {
        res.json({status:"error"});
    }
})
router.get('/api/orderdeliverd',async (req,res)=>{
    try {
        const orders =await order.find({isDeliverd:"true"});
        let showorders=[];
        for(let i =0;i<orders.length;i++){
            let users =await user.findById(orders[i].userId);
            let name=users.name;
            let mobileNo = users.mobileNo;
            let address= users.address;
            let add = {
                id:orders[i]._id,
                itemName:orders[i].itemname,
                qtn:orders[i].qtn,
                price: orders[i].price,
                totalprice: orders[i].totalprice,
                time: orders[i].time,
                date: orders[i].date,
                customerName: name,
                mobileNo: mobileNo,
                address: address,
                deliverd: orders[i].isDeliverd
            }
            showorders.push(add);
        }
        res.json({status:"ok",showorders})
    } catch (error) {
        res.json({status:"error"});
    }
})
router.get('/api/showorders/:userId',async (req,res)=>{
    try {
        const {userId}=req.params;
       
        const orders =await order.find({userId:userId}).sort({sorttime:-1});
        let showorders=[];
        for(let i =0;i<orders.length;i++){
            
            
            let add = {
                id:orders[i]._id,
                itemName:orders[i].itemname,
                qtn:orders[i].qtn,
                price: orders[i].price,
                totalprice: orders[i].totalprice,
                time: orders[i].time,
                date: orders[i].date,
                deliverd: orders[i].isDeliverd?"Deliverd":"unDeliverd",
                cancel: orders[i].cancel
            }
            showorders.push(add);
        }
        res.json({status:"ok",showorders})
    } catch (error) {
        res.json({status:"error"});
    }
})
router.get('/api/deleteorder/:orderid',async(req,res)=>{
    try {
        await order.findByIdAndUpdate(req.params['orderid'],{cancel:true})
        res.json({status:"order delete successfully"})
    } catch (error) {
        res.json({status:"error"})
    }
})
router.get('/api/deliverdtrue/:orderid',async(req,res)=>{
    const {orderid}=req.params;
    try {
        const dt = await order.findById(orderid);
        if(dt.isDeliverd){
            await order.findByIdAndUpdate(orderid,{isDeliverd:false});
        }else{
            await order.findByIdAndUpdate(orderid,{isDeliverd:true});
        }
        res.json({status:"ok"});
    } catch (error) {
        res.json({status:"error"});
    }
})


module.exports=router