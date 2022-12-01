import axios from "axios";
const host = process.env.REACT_APP_APIURL

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  createUser(Id) {
    return axios.post(`${host}/api/user`, { userId: Id })
  },
  deleteUser(Id) {
    return axios.delete(`${host}/api/user/${Id}`)
  }
}
