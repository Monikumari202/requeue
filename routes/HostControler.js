const router=require('express').Router();

const { sql,poolPromise } = require('../database');


router.get('/getAllHosts',async (req,res)=>{
    try {
        const pool = await poolPromise
          const result = await pool.request()
          .query("SELECT TOP(5) * FROM [dbo].[host]")
          res.json(result.recordset)
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
})

router.post('/addNewHost',async (req,res)=>{
    try {
        if(req.body.RestaurantID != null && req.body.Username != null && req.body.Password != null) {
          const pool = await poolPromise
          const result = await pool.request()
          .input('RestaurantID',sql.VarChar , req.body.RestaurantID)
          .input('Username',sql.VarChar , req.body.Username)
          .input('Password',sql.VarChar,req.body.Password)
          .query("INSERT INTO [dbo].[host] (RestaurantID,Username,Password) VALUES (@RestaurantID,@Username,@Password)")
          res.json(result);
          // console.log(result)
        } else {
          res.send("Please fill all the details!")
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
    }
})


router.put('/updateHost',async (req,res)=>{
    try {
        if(req.body.Password != null && req.body.Username != null) {
        const pool = await poolPromise
          const result = await pool.request()
          .input('newPassword',sql.VarChar , req.body.Password)
          .input('Username',sql.VarChar,req.body.Username)
          .query("UPDATE [dbo].[host] SET Password = @Password WHERE Username = @Username")
          res.json(result)
        } else {
          res.send('All fields are required!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
})

router.delete('/deleteHsot',async (req,res)=>{
    try {
        if(req.body.Username != null ) {
          const pool = await poolPromise
            const result = await pool.request()
            .input('Username',sql.VarChar,req.body.Username)
            .query("DELETE FROM [dbo].[host] WHERE Username = @Username")
            res.json(result)
          } else {
            res.send('Please fill all the details!')
          }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
})

module.exports = router;
