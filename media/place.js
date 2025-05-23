const express = require('express')
const fs = require('fs')
const cors = require('cors')
const path = require('path')


const app = express()
const port = 4000

app.use(cors())
app.use(express.json())

const placeJson = path.join(__dirname,'places.json')

app.get('/place-get',(req,res)=>{
    fs.readFile(placeJson,'utf-8',(err,data)=>{
        if(err){
            res.status(401).json({ message: "Unauthorized user" });
        }
        const placeData = JSON.parse(data)
        res.status(200).json({placeData})
    })
})

app.post('/post-place',(req,res)=>{
    const {id,name,latitude,longitude,x,y,type,open_time,close_time,description} = req.body
    fs.readFile(placeJson,'utf-8',(err,data)=>{
        if(err){
            res.status(401).json({ message: "Unauthorized user" });
        }
        const postData = JSON.parse(data)
        postData.push({
          id: Number(id),
          name,
          latitude: Number(latitude),
          longitude: Number(longitude),
          x:Number(x),
          y:Number(y),
          type,
          open_time,
          close_time,
          description,
        });
        fs.writeFile(placeJson,JSON.stringify(postData,null,2),(err)=>{
            if (err) {
              res.status(422).json({ message: "Data cannot be processed" });
            }
            res.status(200).json({ message: "create success" });
        })
    })
})

app.put('/put-place',(req,res)=>{
    const {
      id,
      name,
      latitude,
      longitude,
      x,
      y,
      type,
      open_time,
      close_time,
      description
    } = req.body;
    fs.readFile(placeJson,'utf-8',(err,data)=>{
        if(err){
            res.status(401).json({ message: "Unauthorized user" });
        }
        const putData = JSON.parse(data)
        const index = putData.findIndex(put=>put.id === Number(id))
        putData[index] = {
          id: Number(id),
          name,
          latitude: Number(latitude),
          longitude: Number(longitude),
          x: Number(x),
          y: Number(y),
          type,
          open_time,
          close_time,
          description,
        };
        fs.writeFile(placeJson,JSON.stringify(putData,null,2),(err)=>{
            if (err) {
              res.status(400).json({ message: "Data cannot be updated" });
            }
            res.status(200).json({ message: "update success" });
        })
    })
})

app.delete("/delete-place/:removeId",(req,res)=>{
    const {removeId} = req.params
    fs.readFile(placeJson,'utf-8',(err,data)=>{
        if (err) {
          res.status(401).json({ message: "Unauthorized user" });
        }
        const removeData = JSON.parse(data)
        const filtered = removeData.filter(remove=>remove.id !== Number(removeId))
        fs.writeFile(placeJson,JSON.stringify(filtered,null,2),(err)=>{
            if (err) {
              res.status(400).json({ message: " Data cannot be deleted" });
            }
            res.status(200).json({ message: "delete success" });
        })
    })
});

app.listen(port, () => {
  console.log(`this server work in ${port}`);
});