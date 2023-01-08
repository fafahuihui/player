import  {request} from '../utils/request'

//调用此接口,获取音乐url
export function musicUrl(id) {
	return request({
		url: '/song/url',
		params:{
			id: id,
		}
	})
}

//调用此接口,获取歌词
export function songLyrics(id) {
	return request({
		url: '/lyric',
		params:{
			id: id,
		}
	})
}



