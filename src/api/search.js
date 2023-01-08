import  {request} from '../utils/request.js'


//调用此接口,获取热搜详细信息
export function hotSearchInfo() {
	return request({
		url: '/search/hot/detail'
	})
}


//调用此接口,传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户
// type: 搜索类型；默认为 1 即单曲 , 
// 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单,
 // 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音
export function searchResultInfo(keywords,type,offset) {
	return request({
		url: '/search',
		params:{
			keywords: keywords,
			type: type,
			offset : offset 
		}
	})
}