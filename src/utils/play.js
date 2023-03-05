import store from "../store";
import { musicUrl,songLyrics } from '@/api/songSheet.js'
import audio from "@/utils/playSong.js"
/**
 * 播放歌曲
 * @param {*} id 歌曲id
 * @param {*} songName  歌曲名字
 * @param {*} singerName  歌手名字
 * @param {*} songImg 歌曲图片
 * @param {*} index  歌曲在歌单中的索引
 */
export function playSong(id, songName, singerName, songImg, index){
  let songLyricsArray = []
  let songUrl = ''
  songLyrics(id).then((res) => {
      songLyricsArray = res.lrc.lyric.split("\n").map((item)=> {
          let temp = item.split(']')
          let min = String(temp[0]).slice(1,3)
          let sec = String(temp[0]).slice(4,6)
          let time = parseInt(min)*60 + parseInt(sec)
          let lrc = String(temp[1]).slice(0,item.length)
          if(lrc != "") {
              return {time, lrc}
          }else{
              return " "
          }
      })
      store.commit('GETNEWSONGLYRICS',songLyricsArray)
  })
  musicUrl(id).then((res)=>{
      songUrl = res.data[0].url      
      store.commit('GETNEWSONGURL', songUrl)
  })
  setTimeout(()=> {
      audio.src = songUrl
  },500)
  
  store.commit('GETNEWSONGNAME', songName)
  store.commit('GETNEWSINGERNAME', singerName)
  store.commit('GETNEWSONGINDEX', index)
  store.commit('GETNEWSONGIMG', songImg)
  
  setTimeout(()=> {
      store.commit('GETPLAYSIGN', false)
  },500)
  setTimeout(()=> {
      store.commit('GETPLAYSIGN', true)
  },500)

  audio.play()
}