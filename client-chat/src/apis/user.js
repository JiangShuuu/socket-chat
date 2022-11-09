import axios from "axios";
const host = 'http://localhost:8000'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  createUser(Id) {
    return axios.post(`${host}/api/user`, { userId: Id })
  },
  deleteUser(Id) {
    return axios.delete(`${host}/api/user`, Id)
  }
}