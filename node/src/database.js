const mysql = require('mysql2/promise.js')
const pool = mysql.createPool(
    {
        host : '127.0.0.1',
        user : 'root',
        password: 'root',
        database: 'EMPLOYEES_db',
        port: '3306',
        connectionLimit: '10',
    }
)

pool.query("SELECT database()").
then(([rows])=>{console.log("Successfully connected to MySQL");
    console.log(rows);
}).
catch(()=>{console.log("Connection failed to MySQL")});

async function queryExecution(query, values) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.execute(query, values);
      return [rows];
    } finally {
      connection.release(); 
    }
  }

  module.exports = {queryExecution}



