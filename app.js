const express = require('express')
const app = express()
const nameWeb = "WEB1DDUCK"

app.use(express.json())
app.set('view engine' , 'ejs')
app.set('views' , 'page')
app.use(express.static('assets'))

app.get('/' , (req , res)=>{
    res.render('index' , {name:nameWeb})
})

app.post('/changePage' , (req , res)=>{
    if(req.body['password'] == '123456') res.render(req.body['page'])
    else res.send('')
})

app.get('/pageTwo' , (req , res)=>{
    res.render('pageTwo')
})
app.listen(1303)