import {request} from './request'

// 获取mv数据
export function _getMvDetail(id){
    return request({
        url:'/mv/detail',
        params:{
            mvid:id
        }
    })
}
// 获取mv地址
export function _getMVUrl(id){
    return request({
        url:'/mv/url',
        params:{
            id:id
        }
    })
}
// 获取mv的评论
export function _getMVComment(id,limit){
    return request({
        url:'/comment/mv',
        params:{
            id:id,
            limit:limit
        }
    })
}

/**相似MV */
export function _getSimiMv(id){
    return request({
        url:'/simi/mv',
        params:{
            mvid:id
        }
    })
}

// 封装相似mv
export class MV{
    constructor(id,cover,name,artistName,playCount){
        this.id = id;
        this.cover = cover;
        this.name = name;
        this,artistName = artistName;
        this.playCount = playCount;
    }
}