const express = require('express')
const app = express()
const index = require('./index')
app.use(express.json())

app.post('/events', (req,res)=>{
  const token = req.body.token
  index.listEvents(token).then(
    result => {
      res.json(result)
    }
  ).catch( error => {
    console.log(error)
    console.log('lol')
  })
})

app.post('/create',(req,res)=>{
  const token = JSON.parse(req.body.token)
  const params = req.body
  // console.log('token',token)
  index.createEvent(params,token).then(
    result => {
      res.json(result)
    }
  ).catch( error => {
    console.log(error)
  })
})

app.get('/url',(req,res)=>{
  res.status(200).send(index.getAccessUrl())
})

app.get('/auth',async (req,res)=>{
  console.log(req.query.code);
  const token = await index.getAccessToken(req.query.code)
  res.status(200).json(token)
})

app.get('/create',(req,res)=>{
  res.sendFile('create.html', {root: __dirname })
})

app.post('/createEvent',(req,res)=>{
  console.log(req.body)
  res.status(200).json(req.body)
})

var port = 3000
app.listen(port, () => {
    console.log(`Server live at port: ${port}`)
})
