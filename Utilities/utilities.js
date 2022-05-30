require('dotenv').config();
/*
MSSQL_SERVER="localhost"
MSSQL_PORT="1433"

MSSQL_DB_USER="HUNGTHINH"
MSSQL_DB_PASSWORD="12345"
MSSQL_DB_NAME="Sample"
*/

const showTimes = (numberOfRecords, executionTime) => {
  console.log(`Number of Records: ${numberOfRecords}\n`);

  console.log(`INSERT-TIME: ${executionTime.insert}ms`);
  console.log(`SELECT-TIME: ${executionTime.select}ms`);
  console.log(`UPDATE-TIME: ${executionTime.update}ms`);
  console.log(`DELETE-TIME: ${executionTime.delete}ms`);

  console.log('\n');
};

function showEnvironmentVariables() {
  console.log(process.env.MSSQL_SERVER);
  console.log(process.env.MSSQL_PORT);
  console.log(process.env.MSSQL_DB_USER);
  console.log(process.env.MSSQL_DB_PASSWORD);
  console.log(process.env.MSSQL_DB_NAME);

  console.log('\n');

  console.log(process.env.REDIS_SERVER);
  console.log(process.env.REDIS_PORT);
}

module.exports = {
  showTimes,
  showEnvironmentVariables
};

/*

const path = require('path');
const fs = require('fs');

const filePath = path.resolve(__dirname, 'Records', 'redis-records.json');

// console.log(filePath);

const json_spot_parser = function(path) {
  const fileStream = fs.createReadStream(path);
  const jsonStream = JSONStream.parse('*');

  jsonStream.on('data', (item) => {

  });

  jsonStream.on('end', () => {
    
  });

  return fileStream.pipe(jsonStream);
};

const result = json_spot_parser(filePath);

console.log(result);
*/