const sql = require('mssql');
const table = new sql.Table('client') // or temporary table, e.g. #temptable
table.create = true
table.columns.add('country', sql.VarChar(100), {nullable: true})
table.columns.add('gender', sql.VarChar(100), {nullable: false})
table.columns.add('phone', sql.VarChar(100), {nullable: false})
table.columns.add('name', sql.VarChar(100), {nullable: false})


// const table = new sql.Table('country') // or temporary table, e.g. #temptable
// table.create = true
// table.columns.add('id', sql.VarChar(100), {nullable: true})
// table.columns.add('name', sql.VarChar(100), {nullable: false})
// table.columns.add('nameAR', sql.VarChar(100), {nullable: false})
// table.columns.add('flag', sql.VarChar(100), {nullable: false})
// table.columns.add('code', sql.VarChar(100), {nullable: false})
// table.columns.add('shortCode', sql.VarChar(100), {nullable: false})
// table.columns.add('restActive', sql.VarChar(100), {nullable: false})



const request = new sql.Request()
request.bulk(table, (err, result) => {
    // ... error checks
})



