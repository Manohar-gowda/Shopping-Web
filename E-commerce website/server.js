const express = require('express');
const path = require('path');
const session = require('express-session');
const mysql = require('mysql');
const app = express();
const bcrypt = require("bcryptjs");
const { body } = require('express-validator');


 const con = mysql.createConnection({
   host:'localhost',
   user:'root',
   password:'M1nohar@321',
   database:'shopweb'
 });
 con.connect(function(error){
    if(!!error){
      console.log(error);
    }else{
      console.log('Connected TO Manohars Data-Base!:)');
    }
  }); 

// declare static path
    let staticPath = (path.join(__dirname, "public"));
   
    app.use(session({
        secret: '123456cat',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 6000} 
    }))

//middlewares
app.use(express.static(staticPath));
app.use(express.json());

//routes

app.get("/", (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
})

app.get('/signup', (req, res) => {
    res.sendFile(path.join(staticPath, "signup.html"));
})


app.post('/signup', (req, res) => {
     const {name, email, number, tac, notification } = req.body;
     let password = req.body.password.toString();
    inputData ={
        
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        number: req.body.number,
        tac: req.body.tac,
        notification: req.body.notification
}
 // form validations
 if(name.length < 3){
    return res.json({'alert': 'name must be 3 letters long'});
} else if(!email.length){
    return res.json({'alert': 'enter your email'});
} else if(password.length < 8){
    return res.json({'alert': 'password should be 8 letters long'});
} else if(!number.length){
    return res.json({'alert': 'enter your phone number'});
} else if(!Number(number) || number.length < 10){
    return res.json({'alert': 'invalid number, please enter valid one'});
} else if(!tac){
    return res.json({'alert': 'you must agree to our terms and conditions'});
};
   //store user in database
    // checking user already registered or no
    let sql = 'SELECT * FROM user WHERE email =?';
    con.query(sql,[inputData.email],async function (err, data, fields){
        if(err) throw err
       else if(data.length > 0){
        return res.json({'alert' : 'Email already exists'});
        }else{

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    req.body.password = hash;
        
            // inserting new user data
            var sql = `INSERT INTO user  (name,email,password,number) 
            VALUES ('${name}', '${email}', '${hash}', '${number}')`;
            con.query(sql, function (err, result) {
                if (err) throw err;
            else{
              return  res.json({
                    name: req.body.name,
                    email: req.body.email,
                    seller: req.body.seller
                })
            }
                })
            })
            
            })
        }
        
    
            });
        })
        
 
//login route
app.get('/login', (req, res) => {
    res.sendFile(path.join(staticPath, "login.html"));
})

app.post('/login', (req, res) => {
var email = req.body.email;
var password = req.body.password;
var name = req.body.name;
inputData ={
    email: req.body.email,
    password: req.body.password,
}
con.query('SELECT * FROM user WHERE email = ? AND password = ? ', [email, password],async function(err, rows, fields) {
if(err) throw err
// if user not found
if (rows.length <= 0) {
return res.json({'alert': 'Wrong password'});
}
else { 
    con.query(`SELECT * FROM user WHERE name = '${name}' AND email = '${req.body.email}'`, function (err, data) {
        if(err) throw err;
    return res.json({
         name: data.name,
         email: data.email,
         seller: data.seller
    })
})
}
})
})      

// seller route
app.get('/seller', (req, res) => {
    res.sendFile(path.join(staticPath, "seller.html"));
})

app.post('/seller', (req, res) => {
    let {name, about, address, number, tac, legit, email} = req.body;
    if(!name.length || !about.length || !address.length || !number.length ){
        return res.json({'alert': 'some information(s) is/are invalid'});
    }else if(!tac || !legit){
        return res.json({'alert': 'you must agree to our tems and conditions'});
    }else{
        //updating to database
        var sql = `INSERT INTO seller(name,about,address,number)
         VALUES ('${name}', '${about}', '${address}', '${number}')`;
        con.query(sql, function (err, result) {
            if (err) throw err;
         var sql = 'UPDATE user SET seller = true ';
         con.query(sql, function(err, result){
            if (err) throw err; 
         })
         return res.json(true);
    })
}
})



// add product
app.get('/add-product', (req, res) => {
    res.sendFile(path.join(staticPath, "addProduct.html"));
})

app.get('/cart', (req,res) => {
    res.sendFile(path.join(staticPath,"product.html"));
})
 
//404 route
app.get('/404', (req, res) => {
    res.sendFile(path.join(staticPath, "404.html"));
})

app.use((req, res) => {
    res.redirect('/404');
})

app.listen(3000, () => {
    console.log('listening on port 3000.......');
})
