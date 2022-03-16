const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
mongoose.connect('mongodb+srv://thekrishnarajput:Krish%40143@worship-app.h6lsp.mongodb.net/WorshipApp')
const app = express()

const adminRoute = require('./routes/admin/adminRoute')
const categoryRoute = require('./routes/admin/categoryRoute')
const productRoute = require('./routes/admin/productRoute')
const packagesRoute = require('./routes/admin/packagesRoute')
const packageItemRoute = require('./routes/admin/packageItemRoute')
const allPriestRoute = require('./routes/admin/allPriestRoute')

const port = process.env.port || 3000

const priestRoute = require('./routes/priest/priestRoute')

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/admin', adminRoute)
app.use('/admin/category', categoryRoute)
app.use('/admin/product', productRoute)
app.use('/admin/packages', packagesRoute)
app.use('/admin/packageitem', packageItemRoute)
app.use('/priest', priestRoute)

app.listen(port, ()=> {
    console.log('listening on port '+port)
})