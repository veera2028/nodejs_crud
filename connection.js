var mysql= require('mysql');
var con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'college'
})
/*con.connect((err)=>{
    if(err){
        console.log("Connection not proper");
    }else{
        console.log("connected");
    }
});*/

module.exports= con;