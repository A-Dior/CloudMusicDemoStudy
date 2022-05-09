const api = process.env.NODE_ENV === 'development' ? '/api' : ''

export const loginStatus = api + '/login/status'
export const loginByPhone = api + '/login/cellphone'
export const loginOut = api + '/logout'
export const checkIsReg = api + '/cellphone/existence/check'

export const recommendPlaylist = api + '/recommend/resource'   //获取每日推荐歌单，需登录
export const recommendSongs = api + '/recommend/songs'
export const personalized = api + '/personalized'    //获取推荐歌单，不需要登录
export const detailPlaylist = api + '/playlist/detail' //获取歌单信息

export const leaderBoards = api + '/toplist'
export const getDetailedAllSong = api + '/playlist/track/all'


export const userDetail = api + '/user/detail'