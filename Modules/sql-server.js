const { InsertQuery, UpdateQuery, SelectQuery, DeleteQuery } = require('../Query/MSSQLQuery');
const { saveNewExecutionTimeRecord } = require('../Records/Record');
const { showTimes } = require('../Utilities/utilities');

const { BIG_RECORDS, SMALL_RECORDS } = require('../Utilities/global');

const EXECUTION_TIME_TEMPLATE = {};

async function runMSSQLQuery(NUMBER_OF_RECORDS) {
  const newExecutionTimeRecord = JSON.parse(JSON.stringify(EXECUTION_TIME_TEMPLATE));

  for(const numberOfRecords of NUMBER_OF_RECORDS) {
    const keyForNewRecord = `RECORDS:${numberOfRecords}`;
    const newRecord = {};

    try {
      const insertOperationTime = await InsertQuery(numberOfRecords);
      newRecord.insert = insertOperationTime;
    } catch(error) {
      console.error('ERROR: ', error);
    }

    try {
      const selectOperationTime = await SelectQuery(numberOfRecords);
      newRecord.select = selectOperationTime;
    } catch(error) {
      console.error('ERROR: ', error);
    }

    try {
      const updateOperationTime = await UpdateQuery(numberOfRecords);
      newRecord.update = updateOperationTime;
    } catch(error) {
      console.error('ERROR: ', error);
    }

    try {
      const deleteOperationTime = await DeleteQuery(numberOfRecords);
      newRecord.delete = deleteOperationTime;
    } catch(error) {
      console.error('ERROR: ', error);
    }

    showTimes(numberOfRecords, newRecord);
    newExecutionTimeRecord[keyForNewRecord] = newRecord;
  }

  console.log(newExecutionTimeRecord);
  await saveNewExecutionTimeRecord(newExecutionTimeRecord, 'MSSQL');
}

runMSSQLQuery(BIG_RECORDS);

module.exports = {
  runMSSQLQuery
};

