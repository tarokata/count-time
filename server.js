const { rmSync } = require('fs');
const http = require('http');
const { getAverageInsertTimes, getAverageSelectTimes, getAverageUpdateTimes, getAverageDeleteTimes } = require('./Records/Record');

const host = 'localhost';
const port = 8000;

function handleCorsIssue(origin) {
  const allowedOrigins = ['http://127.0.0.1:5500'];
  return allowedOrigins.includes(origin);
}

async function requestListener(req, res) {
  const origin = req.headers.origin;
  if(handleCorsIssue(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  // handle incoming requests here.
  if (req.url === '/insert-query') {
    const averageTimesREDIS = await getAverageInsertTimes('REDIS');
    const averageTimesMSSQL = await getAverageInsertTimes('MSSQL');
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ 'ExecutionTimes': [averageTimesREDIS, averageTimesMSSQL] }));
  } else if(req.url === '/select-query') {
    const averageTimesREDIS = await getAverageSelectTimes('REDIS');
    const averageTimesMSSQL = await getAverageSelectTimes('MSSQL');
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ 'ExecutionTimes': [averageTimesREDIS, averageTimesMSSQL] }));
  } else if(req.url === '/update-query') {
    const averageTimesREDIS = await getAverageUpdateTimes('REDIS');
    const averageTimesMSSQL = await getAverageUpdateTimes('MSSQL');
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ 'ExecutionTimes': [averageTimesREDIS, averageTimesMSSQL] }));
  } else if(req.url === '/delete-query') {
    const averageTimesREDIS = await getAverageDeleteTimes('REDIS');
    const averageTimesMSSQL = await getAverageDeleteTimes('MSSQL');
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ 'ExecutionTimes': [averageTimesREDIS, averageTimesMSSQL] }));
  }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on https://${host}:${port}`);
});













