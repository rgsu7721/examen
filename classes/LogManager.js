const axios = require('axios')
const {axiosConfig} = require('../config/axiosConfig')
const instanse = axios.create(axiosConfig)
const sortFunc = require('../utils/sort.js')
const date = new Date()
const moment = require('moment')
const defaultDate = {
  year: date.getFullYear(),
  month: date.getMonth(),
  day: date.getDay(),
}

class LogManager {
  year;
  month;
  day;
  #logs = [];
  constructor(config = defaultDate) {
    this.year = config.year || defaultDate.year
    this.month = config.month || defaultDate.month
    this.day = config.day || defaultDate.day
  }

  async fetchLogs() {
    const {data} = await instanse.get('/logs/' + this.assemblyDate())
    this.logs = data.logs
  }

  get logs() {
    return this.#logs
  }
  set logs(v) {
    this.#logs = v
  }
  assemblyDate(split = '') {
    return `${this.year}${split}${this.month}${split}${this.day}`
  }
  sort(type = 'asc') {
    let func = null
    if (type.toLowerCase() === "asc") {
      func = (a, b) => moment(b.created_at).unix() - moment(a.created_at).unix()
    }
    if (type.toLowerCase() === 'desc') {
      func = (a, b) => moment(a.created_at).unix() - moment(b.created_at).unix()
    }
    if (!func) {
      throw new Error('Type can only be ASC or DESC')
    }
    this.#logs = sortFunc(this.logs, func)
    return this.#logs
  }
}


module.exports = { LogManager }
