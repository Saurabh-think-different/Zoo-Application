const express = require('express')
const mysql = require('mysql')

//const con = require('../connection')

const conn = mysql.createConnection({
    host     : "localhost",
    user     : "root",
    password : "Sausam123",
    database : "emp",
    multipleStatements : true,
    insecureAuth : true
})


const index = express.Router()

//Home Route
index.get('/', (req, res) =>{
    res.render("home", { titletag : "Home", isadmin: false})
})

//Tickets Routes
index.get('/tickets', (req, res) =>{
    res.render("tickets/index", { titletag : "Tickets", isadmin: false})
})

index.get('/tickets_bookTicket', (req, res) =>{
    res.render("tickets/bookTicket", { titletag : "Book Ticket", isadmin: false})
})

index.post('/tickets_bookTicket', (req, res) =>{
    const data = req.body
    const sql = `INSERT INTO booking_tickets (fname, lname, gender, email, phone, normal, supreme, datefrom, dateto) VALUES ("${data.fname}", "${data.lname}", "${data.gender}", "${data.email}", "${data.phone}", ${data.normal}, ${data.supreme}, "${data.datefrom}", "${data.dateto}")`
    
    conn.query(sql,  (err, result)=> {
        if (err) throw err;

        //res.redirect(`/tickets_viewTicket/${ticketCount}`)
        
        //res.render("done", {titletag : "Tickets", isadmin: false,ticket: result.ticketID})
        res.send("done!")
        console.log("Number of records inserted: " + result.affectedRows);
      });
})

index.get('/tickets_viewTicket', (req, res) =>{
    res.render('tickets/viewTicket', { titletag : "View Ticket", isadmin: false})
})

index.post('/tickets_viewTicket/', (req, res) =>{
    
    const id = req.body.ticketID
    const sql = `SELECT * FROM booking_tickets WHERE ticketID = "${id}";`
    const rest =  conn.query(sql, (err, result) =>{
        if(err) throw err
        res.send(result[0])
        //res.render('tickets/viewTicket/', {data: result})
    })
})

index.get('/tickets_search', (req, res) => {
    res.render('tickets/searchTicket', {titletag: "Ticket Search", isadmin: false})
})


//SignIn Routes

index.get('/signin', (req, res) => {
    res.render('signin/index', {titletag: 'Sign In', isadmin: false})
})

index.post('/signin', (req, res) => {
    console.log(req.body)
})

index.get('/admin', (req, res) => {
    res.render('admin/signin', {titletag: "Admin Signin", isadmin: false})
    
})

index.post('/admin', (req, res) => {
    const adminEmail = req.body.admin_email
    const adminPass = req.body.admin_pass

    if(adminEmail === "admin@email.com" && adminPass === "12345"){
        res.redirect('/admin_dashboard')
    }else{
        res.send("Login Failed")
    }
})

index.get('/admin_dashboard', (req, res) => {

    // const sql = `SELECT COUNT(ticketID) AS cnt FROM booking_tickets`
    // conn.query(sql, (err, result) => {
    //     if(err) throw err
        //result ==== [ RowDataPacket { 'cnt': 15 } ]
        res.render('admin/index', {titletag: "Admin Dashboard", isadmin: true, tickets: 15 })
    // })
})


//Employee App
index.get('/employee', (req, res) => {
    res.render('employee/index', {titletag: "Employee", isadmin: true})
})

index.get('/emp_add', (req, res) => {
    res.render('employee/add', {titletag: "Emp Add", isadmin: true})
   // res.render('employee/addedemp', {titletag: "Emp Add", isadmin: true, data: {fname: "sau", lname: "bha"}, empID: 13})
})

index.post('/emp_add', (req, res) => {

    const data = req.body
    let empID = 0
    // data.empID = "emp" + empID
    const sql = `INSERT INTO employee (fName, lName, gender, HNo, stName, area, city, zip, phone, dob, dept, salary ) VALUES ("${data.fname}", "${data.lname}", "${data.gender}", ${data.house}, "${data.st_name}", "${data.area}", "${data.city}", ${data.zip}, ${data.phone}, "${data.dob}", "${data.deptID}", ${data.salary} )`
    const sql2 = `select (empID) as empID from employee order by empID desc limit 1;` //Last emp inserted
    conn.query(sql2, (err, res) => {
        if(err) throw err;
        empID = Number(res[0].empID) + 1
        console.log("res empid", empID)
    })
    conn.query(sql,  (err, result)=> {
        if (err) throw err;
        res.render('employee/addedemp', {titletag: "Emp Add", isadmin: true, data: data, empID: empID})
        // empID += 1
        //console.log("Number of employee records inserted: " + result.affectedRows);
      });
})

index.get('/emp_view', (req, res) => {
    const sql = `SELECT * FROM employee;`
    const rest =  conn.query(sql, (err, result) =>{
        if(err) throw err;
        res.send(JSON.stringify(result))
    })
})


index.get('/emp_view/:id', (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM employee WHERE empID = ${id};`
    const rest =  conn.query(sql, (err, result) =>{
        if(err) throw err
        res.send(result[0])
        //res.render('tickets/viewTicket/', {data: result})
    })
})

index.get('/emp_modify', (req, res) => {
    res.render('employee/modify', {titletag: "Emp Modify", isadmin: true})
})

index.post('/emp_modify', (req, res) => {
    
})

index.get('/emp_search', (req, res) => {
    res.render('employee/search', {titletag: "Emp Search", isadmin: true})
})




//ANIMALS
index.get('/animals', (req, res) => {
    res.render('animals/index', {titletag: "Admin Dashboard", isadmin: true})
})

index.get('/animals_add', (req, res) => {
    res.render('animals/animalAdd', {titletag: "Add Animals", isadmin: true})
})

index.post('/animals_add', (req, res) => {
    
    const data = req.body
    data.aniID = "ani" + data.empID + aniID
    
    const sql = `INSERT INTO animal (name, bio_name, gender, height, weight, feed_id, dob, category, cage_id, animal_id) VALUES ("${data.name}", "${data.bioname}", "${data.gender}", ${data.height}, ${data.weight}, "${data.type}", "${data.dob}", "${data.category}", "${data.cageno}", "${data.aniID}" )`
    
    conn.query(sql,  (err, result)=> {
        if (err) throw err;
        res.send("done!")
        aniID += 1
        console.log("Number of animal records inserted: " + result.affectedRows);
      });
})

index.get('/animals_add/:id', (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM animal WHERE animal_id = "${id}"`

    conn.query(sql, (err, result)=>{
        if(err) throw err
        
        res.render('animals/aniAddMod', {titletag: "Modify Details", isadmin: true,id: id, name: result[0].name, bioname: result[0].bio_name, height: result[0].height, weight: result[0].weight, type: result[0].feed_id, dob: result[0].dob, cageno: result[0].cage_id, empID: result[0].empID})

    })

    
})

index.post('animals_add/:id', (req, res) => {
    const values = req.body;
    const id = req.params.id
    const sql = `UPDATE animal SET  WHERE animal_id = ${id} `

})

index.get('/animals_view', (req, res) => {
    const sql = `SELECT * FROM animal;`
    const rest =  conn.query(sql, (err, result) =>{
        if(err) throw err
        res.send(result)
        //res.render('tickets/viewTicket/', {data: result})
    })
})

index.get('/animals_view/:id', (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM animal WHERE animal_id = "${id}";`
    conn.query(sql, (err, result) =>{
        if(err) throw err
        res.send(result)
        //res.render('tickets/viewTicket/', {data: result})
    })
    
})

index.get('/animals_modify', (req, res) => {
    res.render('animals/animalMod', {titletag: "Animals Modify", isadmin: true})
})

index.post('/animals_modify', (req, res) => {
    const aniID = req.body.animalID
    res.redirect(`/animals_add/${aniID}`)
})

index.get('/animals_search', (req, res) => {
    res.render('animals/animalSearch', {titletag: "Animals Search", isadmin: true})
})

index.post('/animals_search', (req, res) => {
    const aniID = req.body.animalID
    res.redirect(`/animals_view/${aniID}`)
})





index.get('/report', (req, res) => {
    res.render('report', {titletag: "Report", isadmin: true})
})

index.post('/report', (req, res) => {
    const datefrom = req.body.datefrom
    const dateto = req.body.dateto
    console.log(req.body)
    const sql = `SELECT * FROM booking_tickets WHERE Dateto BETWEEN "${datefrom}T00:00:00.000Z" AND "${dateto}T00:00:00.000Z";`
    conn.query(sql, (err, result)=>{
        if(err) throw err
        res.send(result)
    })
})


index.get('/search', (req, res) => {
    res.render('search',{titletag: "Search", isadmin: true} )
   
})

index.post('/search', (req, res) => {
    const id = req.body.ticketID
    const sql = `SELECT * FROM booking_tickets WHERE ticketID = "${id}";`
    const rest =  conn.query(sql, (err, result) =>{
    if(err) throw err
    res.send(result[0])
    //res.render('tickets/viewTicket/', {data: result})
})
})


index.get('/admin_feedback', (req, res) => {
    res.render('admin/index', {titletag: "Admin Dashboard", isadmin: true})
})

module.exports = index