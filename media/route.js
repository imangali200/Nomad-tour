const express = require('express')
const fs = require('fs')
const cors = require('cors')
const path = require('path')


const app = express()
const port =1000

app.use(cors())
app.use(express.json())

const schedulesJson = path.join(__dirname,'schedle.json')
const routeJson = path.join(__dirname,'route.json')
app.get("/get-data",(req,res)=>{
    const {fromPlace,toPlace,time} = req.query
    fs.readFile(schedulesJson,'utf-8',(err,data)=>{
        const routeData = JSON.parse(data)
        const Currenttime = time || new Date().toISOString().slice(11,16)
        const filtered = routeData.filter(route=>{
            const fPlace = Number(fromPlace) === route.from_place_id;
            const tPlace = Number(toPlace) === route.to_place_id;
            const timeWith = route.departure_time.slice(0,2)+':'+route.departure_time.slice(2,4)
            return fPlace && tPlace && timeWith > Currenttime
        })
        .sort((a,b)=>{
            a.arrival_time.localeCompare(b.arrival_time)
        }).slice(0,5)
        res.status(200).json({filtered})
    })
});

app.post("/post-his",(req,res)=>{
    const {fromPlace, toPlace,allId} = req.body
    fs.readFile(routeJson,'utf-8',(err,data)=>{
        let hisrory = []
        if(!err && data){
            hisrory = JSON.parse(data)
        }
        hisrory.push({
          fromPlace,
          toPlace,
          allId,
        });
        fs.writeFile(routeJson,JSON.stringify(hisrory,null,2),(err)=>{
            
        })
    })
});

app.listen(port, () => {
  console.log(`this server work in ${port}`);
});