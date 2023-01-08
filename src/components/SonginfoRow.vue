<template>
  <div id="songinfoRow" :index="index"
  @click="playOne(id,one,three,img)">
    <div class="songinfoRow-one">
      {{one}}
    </div>
    <div class="songinfoRow-two">
      {{two}}
    </div>
    <div class="songinfoRow-three">
      {{three}}
    </div>
  </div>
</template>

<script>
import store from "@/store/index.js";
import audio from "@/utils/playSong.js"
import { mapState } from 'vuex'
import { musicUrl,songLyrics } from '@/api/songSheet.js'
export default {
  name: 'SonginfoRow',
  data() {
    return {
      songLyrics: [],
      songUrl: "",
    }
  },
  props: {
    one: {
      type: String,
      default: () => ''
    },
    two: {
      type: String,
      default: () => ''
    },
    three: {
      type: String,
      default: () => ''
    },
    index: {
      type: Number,
      default: () => -1,
    },
    id: {
      type: Number,
      default: () => -1,
    },
    img: {
      type: String,
      default: () => '',
    }
  },
  methods: {
    playOne(id,songName,singerName,picUrl) {
      // console.log(id)
      // console.log(songName)
      // console.log(singerName)
      // console.log(picUrl)
      songLyrics(id).then((res) => {
				this.songLyrics = res.lrc.lyric.split("\n").map((item)=> {
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
				store.commit('GETNEWSONGLYRICS',this.songLyrics)
			})
      musicUrl(id).then((res)=>{
        this.songUrl = res.data[0].url      
        store.commit('GETNEWSONGURL', this.songUrl)
      })
      setTimeout(()=> {
        audio.src = this.songUrl
      },500)
      store.commit('GETNEWSONGNAME', songName)
      store.commit('GETNEWSINGERNAME', singerName)
      store.commit('GETNEWSONGIMG', picUrl)
      setTimeout(()=> {
        store.commit('GETPLAYSIGN', false)
      },500)
      setTimeout(()=> {
        store.commit('GETPLAYSIGN', true)
      },500)
      audio.play()
    },
    
  },
  computed: {
      ...mapState(['plagsign','newsongindex'])
    },
}
</script>

<style lang="scss">
#songinfoRow {
  display: flex;
  height: 40px;
  font-size: 14px;
  line-height: 40px;
}
.songinfoRow-one {
  width: 56%;
}
.songinfoRow-two {
  width: 29%;
}
#songinfoRow:hover {
  background-color: #EFEFEF;
}
</style>