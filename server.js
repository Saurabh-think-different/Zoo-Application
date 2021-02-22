//jshint esversion:6

const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const app = express()

const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')



//const conn = require('./connection')
const dotenv = require('dotenv').config()
const indexRouter = require("./routes/index")
const newRouter = require(__dirname + '/routes/new')


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
//app.use(express.static('public'))
app.use('/public',express.static('public'));
app.use(expressLayouts)
app.use(cors())
app.use('/', indexRouter) 
app.use('/new', newRouter)




const conn = mysql.createConnection({
    host     : "localhost",
    user     : "root",
    password : "Sausam123",
    database : "zoo",
    multipleStatements : true,
    insecureAuth : true
})


conn.connect((err)=>{
    if(err) throw err

    console.log('Connected')
    
}) 

app.listen(process.env.PORT || 3000, () => console.log('Server is live'));


// zoo-dbms.heroku-app.com::5002


// change db credentials
// npm i
//npm run devStart
// localhost:3000