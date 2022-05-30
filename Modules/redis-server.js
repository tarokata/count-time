const { InsertQuery, SelectQuery, UpdateQuery, DeleteQuery } = require('../Query/RedisQuery');
const { saveNewExecutionTimeRecord } = require('../Records/Record');
const { showTimes } = require('../Utilities/utilities');

const { BIG_RECORDS, SMALL_RECORDS } = require('../Utilities/global');

const EXECUTION_TIME_TEMPLATE = {};

let KEYS = [];

const runRedisQuery = async(NUMBER_OF_RECORDS) => {
  let newExecutionTimeRecord = JSON.parse(JSON.stringify(EXECUTION_TIME_TEMPLATE));

  for(const numberOfRecords of NUMBER_OF_RECORDS) {
    const keyForNewRecord = `RECORDS:${numberOfRecords}`;
    const newRecord = {};

    try {
      const insertOperationTime = await InsertQuery(numberOfRecords, KEYS);
      newRecord.insert = insertOperationTime;
    } catch(error) {
      console.error('ERROR: ', error);
    }

    try {
      const selectOperationTime = await SelectQuery(numberOfRecords, KEYS);
      newRecord.select = selectOperationTime;
    } catch(error) {
      console.error('ERROR: ', error);
    }

    try {
      const updateOperationTime = await UpdateQuery(numberOfRecords, KEYS);
      newRecord.update = updateOperationTime;
    } catch(error) {
      console.error('ERROR: ', error);
    }

    try {
      const deleteOperationTime = await DeleteQuery(numberOfRecords, KEYS);
      newRecord.delete = deleteOperationTime;
    } catch(error) {
      console.error('ERROR: ', error);
    }

    showTimes(numberOfRecords, newRecord);
    newExecutionTimeRecord[keyForNewRecord] = newRecord;
  }
  
  console.log(newExecutionTimeRecord);
  await saveNewExecutionTimeRecord(newExecutionTimeRecord, 'REDIS');
};

// runQuery(SMALL_RECORDS);
runRedisQuery(BIG_RECORDS);

module.exports = {
  runRedisQuery
};


