import  {request} from '../utils/request'

//调用此接口,获取轮播图信息
export function getBanner() {
	return request({
		url: '/banner',
		params:{
			type: 1,
		}
	})
}

//调用此接口,进行游客登录，获取cookie
export function temporaryLogin() {
	return request({
		url: '/register/anonimous'
	})
}


//调用此接口,进行登录
//post请求
export function login(phone, password) {
	return request({
		url: '/login/cellphone',
		// method: 'post',
		// headers: {"Content-Type": "application/x-www-form-urlencoded"},
		params:{
			phone: phone,
			password: password,
		}
	})
}


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

//调用此接口,可获取推荐歌单内容
export function recommendedSongList(limit) {
	return request({  
		url: '/personalized',
		params:{
		  limit: limit,
		}
	})
}

//调用此接口,可获取每日推荐歌单内容
export function dayRecommendedSongList() {
	return request({  
		url: '/recommend/resource',
	})
}

//调用此接口,可获取网友精选碟歌单
export function topPlaylist(limit){
	return request({  
		url: '/top/playlist',
		params:{
		  limit: limit
		}
	})
}

//调用此接口,可获取歌单详情
export function songSheet(id) {
	return request({  
		url: '/playlist/detail',
		params:{
		  id: id
		}
	})
}

//调用此接口,可获取歌单里的所有歌曲
export function songList(id) {
	return request({  
		url: '/playlist/track/all',
		params:{
		  id: id,
  		//   limit: limit,
		  // offset: offset
		}
	})
}

//调用此接口,可获取歌单的评论
export function songSheetComment(id, offset) {
	return request({  
		url: '/comment/playlist',
		params:{
		  id: id,
		  offset: offset
		}
	})
}