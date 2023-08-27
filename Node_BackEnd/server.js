const express = require("express");
const cors = require("cors");
const app = express();
const jwt = require('jsonwebtoken');
const  fs = require("fs");
app.use(cors());
app.use(express.json());

let jwtBearerToken;

const expressJwt = require('express-jwt');

const RSA_PUBLIC_KEY = fs.readFileSync('./privateKey.key');

// const checkIfAuthenticated = expressJwt.expressjwt({
//     secret: RSA_PUBLIC_KEY
// }); 

  function checkIfAuthenticated () {
    try{
const verified = jwt.verify(jwtBearerToken, RSA_PUBLIC_KEY);
console.log('user auth status is :: ',verified);
if(verified){
    //return res.send("Successfully Verified");
    console.log('user authenticated :: ');
}else{
    // Access Denied
   // return res.status(401).send(error);
   console.log('user not authenticated :: ');
}
 }
catch(error){
  console.log('error is ',error)
}
  }


app.route('/getStudentDetails')
    .get(checkIfAuthenticated, getAllUser);


     function getAllUser(){
      console.log('all user loaded');
    }

try {
  app.post("/validateUserDetails", (req, res) => {
    console.log("req payload is ::  ", req.body);
    controller.query(
      "SELECT * FROM userdetails where username = ? AND password = ?",
      [req.body.username, req.body.password],
      function(err, data, fields) {
        if (err) return err;
        res.status(200).json({
          status: "success",
          data: data
        });
      }
    );
  });
} catch (e) {
  console.log("error is : ", e);
}

try {
  app.post("/getUserToken", (req, res) => {
    console.log("*** req payload is ****::  ", req.body);
    const RSA_PRIVATE_KEY = fs.readFileSync('./privateKey.key');
    const userId = req.body.username;
     jwtBearerToken = jwt.sign({},RSA_PRIVATE_KEY, {
      algorithm: 'RS256',
      expiresIn:10,
      subject: userId
  });

  // return new user
  res.status(200).json({
     status:"success",
     token :jwtBearerToken
    });
  });
} catch (e) {
  console.log("error is : ", e);
}
 //app.use(express.static('angulardemoapp'))

app.get("/",(req,res)=>{
    res.send('</h2>node js is running<h2>');
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
