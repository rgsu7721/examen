const path = require('path')
require('dotenv')
  .config({path: path.join(__dirname, '.env')});
const DataBaseManager = require('nedb-promises')
const {LogManager} = require('./classes/LogManager')


const logManager = new LogManager({year: '2021', month: '01', day: '23'})
logManager.fetchLogs()
  .then(async () => {
    const db = DataBaseManager
      .create(`database/logs-${logManager.assemblyDate('_')}.db`)
    for (const log of logManager.sort()) {
      await db.insert(log)
    }


  })


// console.log(moment('2021-01-23T09:40:37').unix())
