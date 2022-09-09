const router=require('express').Router();
const { sql,poolPromise } = require('../../database');

router.post('/add/country',async (req,res)=>{
    // console.log("result")
    try {
        // console.log("resulttt")
        if(req.body.name!= null && req.body.id!= null && req.body.flag != null  && req.body.code != null && req.body.shortCode != null && req.body.restActive != null) {
          const pool = await poolPromise
          const result = await pool.request()
        //   console.log(result)
          .input('name',sql.VarChar , req.body.name)
          .input('id',sql.VarChar , req.body.id)
          .input('flag',sql.VarChar,req.body.flag)
          .input('code',sql.VarChar,req.body.code)
          .input('shortCode',sql.VarChar,req.body.shortCode)
          .input('restActive',sql.VarChar,req.body.restActive)
          .query("INSERT INTO [dbo].[client] (name,phone,country,gender) VALUES (@name,@code,@id,@flag,@shortCode,@restActive)")
          res.json(result);
         console.log(result)
        } else {
          res.send("Please fill all the details!")
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
    }
})
