import axios from 'axios'
import {
    loginStatus,
    loginByPhone,
    loginOut,
    checkIsReg,
    recommendPlaylist,
    personalized,
    leaderBoards,
    getDetailedAllSong,
    detailPlaylist,
    userDetail,
    search

} from './config'

axios.defaults.timeout = 30000
axios.default.withCredentials = true
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'



export default {
    loginStatus() {
        return axios.get(loginStatus)
    },
    loginByPhone(phone, password) {
        console.log("phone:" + phone, 'psw:' + password);
        return axios.get(loginByPhone, {
            params: {
                phone: phone || '',
                password: password || ''
            }
        })
    },
    checkIsReg(phone) {
        return axios.get(checkIsReg, {
            params: {
                phone: phone || ""
            }
        })
    },
    loginOut() {
        return axios.get(loginOut)
    },

    // 获取每日推荐歌单 登录状态
    recommendPlaylist() {
        return axios.get(recommendPlaylist)
    },

    personalized() {
        return axios.get(personalized)
    },

    leaderBoards() {
        return axios.get(leaderBoards)
    },

    getDetailedAllSong(listId,limit,offset){
        return axios.get(getDetailedAllSong,{
            params:{
                id:listId,
                limit:limit||10,
                offset:offset||0
            }
        })
    },
    detailPlaylist(id){
        return axios.get(detailPlaylist,{
            params:{id}
        })
    },
    userDetail(uid){
        return axios.get(userDetail,{
            params:{uid}
        })
    },
    search(value,type){
        return axios.get(search,{
            params:{
                keywords:value,
                type:type||1
            }
        })
    }
}