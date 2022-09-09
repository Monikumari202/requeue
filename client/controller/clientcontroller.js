const router=require('express').Router();
const { sql,poolPromise } = require('../../database');

router.post('/add',async (req,res)=>{
    // console.log("result")
    try {
        // console.log("resulttt")
        if(req.body.name!= null && req.body.phone!= null && req.body.gender != null  && req.body.country != null) {
          const pool = await poolPromise
          const result = await pool.request()
        //   console.log(result)
          .input('name',sql.VarChar , req.body.name)
          .input('country',sql.VarChar , req.body.country)
          .input('gender',sql.VarChar,req.body.gender)
          .input('phone',sql.VarChar,req.body.phone)
        //   .query("INSERT INTO [dbo].[client] (name,phone,country,gender) VALUES (@name,@country,@phone,@gender)")
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

// get client by id
router.get('/getbyid',async (req,res)=>{
    try {
        const pool = await poolPromise
          const result = await pool.request()
          sql.query`select * from mytable where id = ${value}`
          res.json(result.recordset)
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
})

// get by country and mobilen no.

router.get('/getbyid',async (req,res)=>{
    try {
        const pool = await poolPromise
          const result = await pool.request()
          sql.query`select * from mytable where country = ${value}`
          sql.query`select * from mytable where mobile = ${value}`
          res.json(result.recordset)
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
})




router.get('/getclient',async (req,res)=>{
    try {
        const pool = await poolPromise
          const result = await pool.request()
          .query("SELECT TOP(2) * FROM [dbo].[client]")
          res.json(result.recordset)
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
})

module.exports = router
