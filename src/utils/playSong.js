import store from "../store";

var audio = new Audio();
audio.volume = 0.5
audio.oncanplay = function(){
  console.log('duration:',audio.duration)
	store.commit('GETNEWSONGTIME', audio.duration)
}

audio.ontimeupdate  = function(){
	// console.log('e:',e )
	// console.log('当前音频的播放位置:',audio.currentTime )
	store.commit('GETNEWSONGPLAYTIME', audio.currentTime)
}

audio.onended= function(){
	store.commit('GETPLAYSIGN', false)
	store.commit('GETSWITCH', true)
	console.log('播放结束')
}



export default audio