const express = require('express')

const newRouter = express.Router()

newRouter.get('/new/new', (req, res) => {
    res.render('animals/index', {titletag: "yo", isadmin: false})
})


module.exports = newRouter