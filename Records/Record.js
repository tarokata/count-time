const path = require('path');
const fs = require('fs');
const fsPromises = require('fs/promises');

const pullCurrentRecords = async(TYPE) => {
  let filePath = null;

  if(TYPE === 'REDIS') {
    filePath = path.resolve(__dirname, './redis-records.json');
  } else {
    filePath = path.resolve(__dirname, './mssql-records.json');
  }

  try {
    const data = await fsPromises.readFile(filePath);
    const records = JSON.parse(data);
    return records;
  } catch(error) {
    console.error('ERROR: ', error);
  }
};

const saveNewExecutionTimeRecord = async(newExecutionTimeRecord, TYPE) => {
  let filePath = null;

  if(TYPE === 'REDIS') {
    filePath = path.resolve(__dirname, './redis-records.json');
  } else {
    filePath = path.resolve(__dirname, './mssql-records.json');
  }

  const currentRecords = await pullCurrentRecords(TYPE);

  currentRecords.push(newExecutionTimeRecord);

  fs.writeFile(filePath, JSON.stringify(currentRecords), (error) => {
    if(error) {
      console.error('ERROR: ', error);
      throw error;
    } 
    console.log('Done Writing!!!');
  });
};

async function calculateAverageTimes(TYPE) {
  // const KEYS_NUMBER_OF_RECORDS = ['RECORDS:10000', 'RECORDS:20000', 'RECORDS:50000', 'RECORDS:100000'];
  const KEYS_NUMBER_OF_RECORDS = ['RECORDS:10000', 'RECORDS:100000', 'RECORDS:200000', 'RECORDS:500000', 'RECORDS:1000000'];

  const averageTimeRecords = {
    'RECORDS:10000': {
      'insert': 0,
      'select': 0,
      'update': 0,
      'delete': 0
    },
    'RECORDS:100000': {
      'insert': 0,
      'select': 0,
      'update': 0,
      'delete': 0
    },
    'RECORDS:200000': {
      'insert': 0,
      'select': 0,
      'update': 0,
      'delete': 0
    },
    'RECORDS:500000': {
      'insert': 0,
      'select': 0,
      'update': 0,
      'delete': 0
    },
    'RECORDS:1000000': {
      'insert': 0,
      'select': 0,
      'update': 0,
      'delete': 0
    }
  };

  const redisRecords = await pullCurrentRecords(TYPE);
  const amountOfRecords = redisRecords.length;

  for(const keyNumberOfRecords of KEYS_NUMBER_OF_RECORDS) {
    let sumOfInsertTimes = 0;
    let sumOfSelectTimes = 0;
    let sumOfUpdateTimes = 0;
    let sumOfDeleteTimes = 0;

    for(const record of redisRecords) {
      sumOfInsertTimes += record[keyNumberOfRecords].insert;
      sumOfSelectTimes += record[keyNumberOfRecords].select;
      sumOfUpdateTimes += record[keyNumberOfRecords].update;
      sumOfDeleteTimes += record[keyNumberOfRecords].delete;
    }

    averageTimeRecords[keyNumberOfRecords]['insert'] = (sumOfInsertTimes/amountOfRecords).toFixed(3);
    averageTimeRecords[keyNumberOfRecords]['select'] = (sumOfSelectTimes/amountOfRecords).toFixed(3);
    averageTimeRecords[keyNumberOfRecords]['update'] = (sumOfUpdateTimes/amountOfRecords).toFixed(3);
    averageTimeRecords[keyNumberOfRecords]['delete'] = (sumOfDeleteTimes/amountOfRecords).toFixed(3);
  }

  return averageTimeRecords;
}

async function getAverageInsertTimes(TYPE) {
  const averageTimeRecords = await calculateAverageTimes(TYPE);
  const averageInsertTimes = Object.values(averageTimeRecords).map(item => item.insert);
  return averageInsertTimes;
}

async function getAverageSelectTimes(TYPE) {
  const averageTimeRecords = await calculateAverageTimes(TYPE);
  const averageSelectTimes = Object.values(averageTimeRecords).map(item => item.update);
  return averageSelectTimes;
}

async function getAverageUpdateTimes(TYPE) {
  const averageTimeRecords = await calculateAverageTimes(TYPE);
  const averageUpdateTimes = Object.values(averageTimeRecords).map(item => item.update);
  return averageUpdateTimes;
}

async function getAverageDeleteTimes(TYPE) {
  const averageTimeRecords = await calculateAverageTimes(TYPE);
  const averageDeleteTimes = Object.values(averageTimeRecords).map(item => item.delete);
  return averageDeleteTimes;
}

module.exports = {
  pullCurrentRecords,
  saveNewExecutionTimeRecord,
  calculateAverageTimes,
  getAverageInsertTimes,
  getAverageSelectTimes,
  getAverageUpdateTimes,
  getAverageDeleteTimes
};
