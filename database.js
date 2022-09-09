const sql = require('mssql');

const config = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    server: process.env.SQL_SERVER, 
    database: process.env.SQL_DATABASE ,
   
  options: {
    trustedConnection: true,
    trustServerCertificate:true
  }
} 
// console.log(config)

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL')
    return pool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err))
  async function connect (poolPromise) {
    const pool = await poolPromise
    // const result = await pool.request().query(` CREATE TABLE IF NOT EXISTS [dbo].[country] (name VARCHAR(100), code VARCHAR(100),shortcode VARCHAR(100),id VARCHAR(100),flag VARCHAR(100),restActive VARCHAR(100)) AS NODE;`)
    const result = await pool.request().query()
    
  
  }
  connect(poolPromise)

module.exports = {
  sql, poolPromise
}
