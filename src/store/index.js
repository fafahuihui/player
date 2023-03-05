import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state  =  {

	userimg: '../assets/img/个人_fill.png',
	username: '暂未登录',

	newsongsheetid: '',//当前歌单id
	newsonglist: [],//当前歌单列表
	newsonglistlength: '',//当前歌单列表长度,
	newsongindex: '',//当前播放歌曲的索引
	newsongurl: '',//当前播放歌曲的url
	newsingid: '',//当前播放歌曲的id
	newsongname: '暂无歌曲播放',//当前播放歌曲名字
	newsingername: '',//当前播放歌手名字
	newsonglyrics: '',//当前播放歌曲的歌词
	newsongimg: '',//当前播放歌曲的封面
	newsongtime: 100,//当前歌曲时间
	newsongplaytime: 0,//当前歌曲播放进度
	playsign: false,//是否播放， false：未播放  true：播放
	switch: false,//是否可以切换歌曲， false：不行  true：可以



	pathmsg: '',//路由参数
}

const actions = {
	
	getusername(context, value) {
		context.commit('GETUSERNAME', value)
	},
	getuserimg(context, value) {
		context.commit('GETUSERIMG', value)
	},
	getnewsingid(context, value) {
		context.commit('GETNEWSINGID', value)
	},
	getnewsongsheetid(context, value) {
		context.commit('GETNEWSONGSHEETID', value)
	},
	getnewsonglist(context, value) {
		context.commit('GETNEWSONGLIST', value)
	},
	getnewsonglistlength(context, value) {
		context.commit('GETNEWSONGLISTLENGTH', value)
	},
	getnewsongname(context, value) {
		context.commit('GETNEWSONGNAME', value)
	},
	getnewsingername(context, value) {
		context.commit('GETNEWSINGERNAME', value)
	},
	getnewsongtime(context, value) {
		context.commit('GETNEWSONGTIME', value)
	},
	getnewsongplaytime(context, value) {
		context.commit('GETNEWSONGPLAYTIME', value)
	},
	getplaysign(context, value) {
		context.commit('GETPLAYSIGN', value)
	},
	getnewsonglyrics(context, value) {
		context.commit('GETNEWSONGLYRICS', value)
	},
	getnewsongimg(context, value) {
		context.commit('GETNEWSONGIMG', value)
	},
	getnewsongindex(context, value) {
		context.commit('GETNEWSONGINDEX', value)
	},
	getnewsongurl(context, value) {
		context.commit('GETNEWSONGURL', value)
	},
	getswitch(context, value) {
		context.commit('GETSWITCH', value)
	},
	getpathmsg(context, value) {
		context.commit('GETPATHMSG', value)
	},
}

const mutations =  {
	GETUSERIMG(state, value) {
		state.userimg = value
	},
	GETUSERNAME(state, value) {
		state.username = value
	},
	GETNEWSINGID(state, value) {
		state.newsingid = value
	},
	GETNEWSONGSHEETID(state, value) {
		state.newsongsheetid = value
	},
	GETNEWSONGLIST(state, value) {
		state.newsonglist = value
	},
	GETNEWSONGLISTLENGTH(state, value) {
		state.newsonglistlength = value
	},
	GETNEWSONGNAME(state, value) {
		state.newsongname = value
	},
	GETNEWSINGERNAME(state, value) {
		state.newsingername = value
	},
	GETNEWSONGTIME(state, value) {
		state.newsongtime = value
	},
	GETNEWSONGPLAYTIME(state, value) {
		state.newsongplaytime = value
	},
	GETPLAYSIGN(state, value) {
		// console.log('----')
		// console.log(value)
		state.playsign = value
	},
	GETNEWSONGLYRICS(state, value) {
		state.newsonglyrics = value
	},
	GETNEWSONGIMG(state, value) {
		state.newsongimg = value
	},
	GETNEWSONGINDEX(state, value) {
		state.newsongindex = value
	},
	GETNEWSONGURL(state, value) {
		state.newsongurl = value
	},
	GETSWITCH(state, value) {
		state.switch = value
	},

	GETPATHMSG(state, value) {
		state.pathmsg = value
	},
}

const getters = {

}

export default new Vuex.Store({
	actions,
	mutations,
	state,
	getters
}) 
