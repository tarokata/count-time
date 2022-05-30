const sql = require('mssql');
require('dotenv').config();

const config = {
  server: process.env.MSSQL_SERVER,
  port: parseInt(process.env.MSSQL_PORT),
  user: process.env.MSSQL_DB_USER,
  password: process.env.MSSQL_DB_PASSWORD,
  database: process.env.MSSQL_DB_NAME,
  // connectionTimeout: 150000,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false,
    enableArithAbort: true,
    trustServerCertificate: true
  }
};

sql.on('error', error => {
  console.log(error.message);
});

async function InsertQuery(numberOfRecords) {
  let insertOperationTime = null;
  try {
    const pool = await sql.connect(config);
    const respones = await pool
        .request()
        .input('NumberOfRows', sql.Int, numberOfRecords)
        .output('TimeExecution', sql.Int)
        .execute('AddCustomers')

    insertOperationTime = respones.output.TimeExecution;
    sql.close();
  } catch(error) {
    console.error('ERROR ', error);
    sql.close();
  }
  return insertOperationTime;
};

async function SelectQuery(numberOfRecords) {
  let selectOperationTime = null;
  try {
    const pool = await sql.connect(config);
    const respones = await pool
        .request()
        .output('TimeExecution', sql.Int)
        .execute('ShowCustomers')

    selectOperationTime = respones.output.TimeExecution;
    sql.close();
  } catch(error) {
    console.error('ERROR ', error);
    sql.close();
  }
  return selectOperationTime;
};

async function UpdateQuery(numberOfRecords) {
  let updateOperationTime = null;
  try {
    const pool = await sql.connect(config);
    const respones = await pool
        .request()
        .output('TimeExecution', sql.Int)
        .execute('UpdateCustomers')

    updateOperationTime = respones.output.TimeExecution;
    sql.close();
  } catch(error) {
    console.error('ERROR ', error);
    sql.close();
  }
  return updateOperationTime;
}

async function DeleteQuery(numberOfRecords) {
  let deleteOperationTime = null;
  try {
    const pool = await sql.connect(config);
    const respones = await pool
        .request()
        .output('TimeExecution', sql.Int)
        .execute('DeleteCustomers')

    deleteOperationTime = respones.output.TimeExecution;
    sql.close();
  } catch(error) {
    console.error('ERROR ', error);
    sql.close();
  }
  return deleteOperationTime;
}

module.exports = {
  InsertQuery,
  SelectQuery,
  UpdateQuery,
  DeleteQuery
};