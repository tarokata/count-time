const Redis = require('ioredis');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const config = {
  host: process.env.REDIS_SERVER,
  port: process.env.REDIS_PORT
};

const redis = new Redis(config);

const IDString = 'ID:';

const calculateTimeExecution = (responses) => {
  const start = (parseInt(responses[0][1][0]) * 1000) + (parseInt(responses[0][1][1]) / 1000);
  const end   = (parseInt(responses[2][1][0]) * 1000) + (parseInt(responses[2][1][1]) / 1000);
  return end - start;
}

const redisServerErrorHandler = (error, responses) => {
  if(error) {
    console.error('ERROR: ', error);
  } 
  return responses;
}

async function InsertQuery(numberOfRecords, KEYS) {
  let executionTime = 0;

  let count = 0;
  while(count < numberOfRecords) {
    const currentKey = IDString.concat(count);
    KEYS.push(currentKey);

    const responses = await redis
    .multi()
    .time()
    // .hset(currentKey, 'FirstName', 'Jame', 'LastName', 'Bone', 'Gender', 'Male', 'City', 'Chicago', 'BillingAddress', '57 Beekman Road', 'State', 'CA', 'ZipCode', '11444-444', 'PhoneNumber', '(617) 223-1919', 'Email', 'email.work@gmail.com')
    .set(currentKey, 'JameBond')
    .time()
    .exec(redisServerErrorHandler);

    executionTime += calculateTimeExecution(responses);
    count++;
  }
  return executionTime;
}

async function SelectQuery(numberOfRecords, KEYS) {
  let executionTime = 0;

  let count = 0;
  while(count < numberOfRecords) {
    const currentKey = KEYS[count];

    const responses = await redis
    .multi()
    .time()
    // .hgetall(currentKey)
    .get(currentKey)
    .time()
    .exec(redisServerErrorHandler);

    executionTime += calculateTimeExecution(responses);
    count++;
  }
  return executionTime;
}

async function UpdateQuery(numberOfRecords, KEYS) {
  let executionTime = 0;

  let count = 0;
  while(count < numberOfRecords) {
    const currentKey = KEYS[count];

    const responses = await redis
    .multi()
    .time()
    // .hmset(currentKey, 'FirstName', 'John', 'LastName', 'Wick', 'Gender', 'Male', 'City', 'New York', 'BillingAddress', '60 Berlingham Road', 'State', 'NY', 'ZipCode', '55143-9989', 'PhoneNumber', '(784) 223-2020', 'Email', 'demoemail@gmail.com')
    .set(currentKey, 'JohnWick')
    .time()
    .exec(redisServerErrorHandler);

    executionTime += calculateTimeExecution(responses);
    count++;
  }
  return executionTime;
}

async function DeleteQuery(numberOfRecords, KEYS) {
  let executionTime = 0;

  let count = 0;
  /*
  while(count < numberOfRecords) {
    const currentKey = KEYS[0];
    KEYS.shift();

    const responses = await redis
    .multi()
    .time()
    .hdel(currentKey, 'FirstName', 'LastName', 'Gender', 'City', 'BillingAddress', 'State', 'ZipCode', 'PhoneNumber', 'Email')
    .flushall()
    .time()
    .exec(redisServerErrorHandler);

    executionTime += calculateTimeExecution(responses);
    count++;
  }
  */
  const responses = await redis
    .multi()
    .time()
    .flushall()
    .time()
    .exec(redisServerErrorHandler);
  
  executionTime = calculateTimeExecution(responses);
  return executionTime;
}

module.exports = {
  InsertQuery,
  SelectQuery,
  UpdateQuery,
  DeleteQuery
};

