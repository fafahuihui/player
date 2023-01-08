import  {request} from '../utils/request.js'

//调用此接口,获取歌手信息（背景图片、歌手图片、歌手标签）
export function singerDetailInfo(id) {
	return request({
		url: '/artist/detail',
		params:{
			id: id,
		}
	})
}


//调用此接口,获取歌手经历
export function singerExperience(id) {
	return request({
		url: '/artist/desc',
		params:{
			id: id,
		}
	})
}

//调用此接口,获取歌手粉丝数量
export function singerFansNum(id) {
	return request({
		url: '/artist/follow/count',
		params:{
			id: id,
		}
	})
}

//调用此接口,获取歌手热门歌曲
export function singerHotSong(id) {
	return request({
		url: '/artists',
		params:{
			id: id,
		}
	})
}

//调用此接口,获取歌手专辑
export function singerAlbum(id) {
	return request({
		url: '/artist/album',
		params:{
			id: id,
		}
	})
}

//调用此接口,获取专辑内容
export function albumContent(id) {
	return request({
		url: '/album',
		params:{
			id: id,
		}
	})
}

//调用此接口,获取专辑动态信息,如是否收藏,收藏数,评论数,分享数
export function albumData(id) {
	return request({
		url: '/album/detail/dynamic',
		params:{
			id: id,
		}
	})
}