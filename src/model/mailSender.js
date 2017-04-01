import axios from 'axios'

export default {
  bugReport (description) {
    return axios.post('/report/bug', {
      description: description
    })
  }
}
