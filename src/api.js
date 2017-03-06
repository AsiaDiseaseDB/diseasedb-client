import axios from 'axios'

export default {
  login: function(name, password) {
    let url = '/loginReq'
  },
  query: function(id, condition) {
    let url = '/query'
  },
  queryNext: function(type, id) {
    let url = '/querynext'
  },
  add: function(type, data) {
    let url = '/add'
  },
  edit: function(type, id, data) {
    let url = '/delete'
  }
}
