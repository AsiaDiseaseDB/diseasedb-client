import axios from 'axios'

export default {
  getReportOptions () {
    return axios.post('/option/getReporter', {})
  },
  addReporter (newReporter) {
    return axios.post('/option/addReporter', {
      newReporter: newReporter
    })
  },
  deleteReporter (reporter) {
    return axios.post('/option/deleteReporter', {
      reporter: reporter
    })
  }
}
