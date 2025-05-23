const express = require('express')
const fs = require('fs')
const cors = require('cors')
const path = require('path')
const crypto = require('crypto')

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

const logJson = path.join(__dirname,'log.json')

app.post("/post-log", (req, res) => {
  const { name, password } = req.body;
  const role = name.includes('admin') ? 'admin' : 'user'
  const token = crypto.createHash('sha1').update(password + new Date()).digest('hex')
  const Bearer = `Bearer ${token}`
  fs.readFile(logJson,"utf-8",(err,data)=>{
    let postLog = []
    if(!err && data){
        postLog = JSON.parse(data)
    }
    postLog.push({Bearer,role})
    fs.writeFile(logJson,JSON.stringify(postLog,null,2),(err)=>{
        if(err){
            res.status(401).json({ message: "invalid login" });
        }
        res.status(200).json({ Bearer,role });
    })
  })
});
app.get("/get-token/:token",(req,res)=>{
    const {token} = req.params
    fs.readFile(logJson,'utf-8',(err,data)=>{
        const TokenData = JSON.parse(data)
        const removeData = TokenData.filter(tokens=>tokens.Bearer !== token)
        fs.writeFile(logJson,JSON.stringify(removeData,null,2),(err)=>{
            if(err){
                res.status(401).json({ message: "Unauthorized user" });
            }
            res.status(200).json({ message: "logout success" });
        })
    })
});

app.listen(port,()=>{
    console.log(`this server work in ${port}`)
})