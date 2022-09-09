const express = require('express')
const app = express()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const router = require('../../../../../spotifyClone/server/Route/users');
const JWT_TOKEN_KEY="this is key"




//sign-up
// router.post('HostRegistration',async (req ,res)=>{
//     try{
//         if(){

//         }else{

//         }

//     }catch(error){
//      res.status(500).send(error.message)
//     }
// })


router.post('addNewHost',async (req,res)=>{
    try {
        if(req.body.RestaurantID != null && req.body.Username != null && req.body.Password != null) {
          const pool = await poolPromise
          const result = await pool.request()
          .input('RestaurantID',sql.VarChar , req.body.RestaurantID)
          .input('Username',sql.VarChar , req.body.Username)
          .input('Password',sql.VarChar,req.body.Password)
          .query("INSERT INTO [dbo].[host] (RestaurantID,Username,Password) VALUES (@RestaurantID,@Username,@Password)")
          res.json(result);
        } else {
          res.send('Please fill all the details!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
    }
})


const Signup= async (req, res) => {
    
    try {
         const {  userName,password,createdby} = req.body;

      if (!(userName && createdby && password)) {
        res.status(400).send("All input is required");
      }
  

      const oldUser = await User.findOne({userName }); 
  
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
  
      //Encrypt user password
      encryptedPassword = await bcrypt.hash(password, 10);
  
      // Create user in our database
      const user = await User.create({
        userName,createdby,
        time:Date.now(),
        password: encryptedPassword,
      });
  
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
  };


  //login

  const Login= async (req, res) => {

    
    try {
      const { userName, password } = req.body;
  
      if (!(userName && password)) {
        res.status(400).send("All input is required");
      }
    
      const user = await User.findOne({userName });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, userName },
          JWT_TOKEN_KEY,
          {
            expiresIn: "6d",
          }
        );
  
        // save user token
        user.token = token;
  
        // user
        res.status(200).json(user);
      }
      res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
    
  };

  module.exports={Signup,Login}