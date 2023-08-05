// import axios from 'axios';
import axios from './custome-axios';
//lay dữ liệu của AllUser
const fetAllUser = (page) => {
    return axios.get(`/api/users?page=${page}`)
    //https://reqres.in/api/users?page=2
}
const postCreateUser = (email,firstname,lastname ) => {
    return axios.post(`/api/users`, { firstname: firstname, email: email,lastname:lastname })
}
const putUpdateUser = (email,firstname,lastname )  => {
    return axios.put(`/api/users/1`, { firstname: firstname, email: email,lastname:lastname })
}
const deleteUser = (id) => {
    return axios.delete(`/api/users?${id}`)
}
const loginAPI=(email,password)=>{
    return axios.post('/api/login',{email,password})
}
export { fetAllUser, postCreateUser, putUpdateUser, deleteUser,loginAPI };