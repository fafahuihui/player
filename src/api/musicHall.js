import  {request} from '../utils/request'


// 调用此接口,可获取歌手分类列表
export function singerClassification(type, area, offset) {
    return request({
        url: '/artist/list',
        params:{
          type: type,
          area: area,
          offset: offset
        }
      })
  }
  
  //调用此接口,可获取排行榜榜单内容
  export function rankingListInfo() {
      return request({
          url: '/toplist/detail'
      })
  }