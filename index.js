
var con = require('./connection');
var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended:true }));

app.set('view engine','ejs');

app.get('/',function(req, res) {
    res.sendFile(__dirname+'/register.html');
    
})
app.post('/',function(req, res){
    //console.log(req.body);
    var name =req.body.name;
    var email = req.body.email;
    var mno = req.body.mno;

    con.connect(function(error){
        if(error) console.log(error);

        var sql = "INSERT INTO students(name, email, mno)VALUES(?,?,?)";
        con.query(sql,[name,email,mno],function(error, result){
            if(error) console.log(error);
            //res.send('Student register successfully '+result.insertId);
            res.redirect('/students');
            
        })
    })
})

app.get('/students',function(req, res){
    con.connect(function(error){
        if(error) console.log(error);

        var sql = "select * from students";

        con.query(sql,function(error, result){
            if(error) console.log(error);
            //console.log(result);
            res.render(__dirname+"/students",{students:result});
        })
    })
})
app.get('/delete-student',function(req, res){

    con.connect(function(error){
        if(error) console.log(error);

        var sql = "delete from students where id=?";

        var id = req.query.id;

        con.query(sql, [id],function(error, result){
            if(error) console.log(error);
            //console.log(result);
            res.redirect('/students');
        })
    })
    

});
app.get('/update-student',function(req, res){

    con.connect(function(error){
        if(error) console.log(error);

        var sql = "select * from students where id=?";

        var id = req.query.id;

        con.query(sql, [id],function(error, result){
            if(error) console.log(error);
            res.render(__dirname+"/update-student",{student:result});            
        })
    })
    

});
app.post('/update-student',function(req, res){

    var name = req.body.name;
    var email = req.body.email;
    var mno = req.body.mno; 
    var id = req.body.id
    con.connect(function(error){
        if(error) console.log(error);

        var sql = "UPDATE students set name=?, email=?, mno=? where id=?";

        con.query(sql, [name, email, mno, id],function(error, result){
            if(error) console.log(error);
            res.redirect('/students');
                       
        })
    })

});
app.listen(7000);