<template>
    <div id="singerInfo">
        <div class="singerInfo-topBox">
            <img :src=singerImg alt="" class="singerInfo-topBox-img">
            <div class="singerInfo-topBox-rightBox">
                <div class="singerInfo-topBox-rightBox-name">{{singerName}}</div>
                <div class="singerInfo-topBox-rightBox-describe">{{singerMs}}</div>
                <div class="singerInfo-topBox-rightBox-fansNum">{{Math.floor(fansNum.fansCnt/10000)}}万粉丝</div>
            </div>
        </div>
        <div class="singerInfo-column">
          <div v-for="(item, index) in column" :key="index"
            class="singerInfo-column-eval"
            @click="columnIndex = index"
            :class="{columnevalActivce: columnIndex == index}">
            {{item}}
          </div>
        </div>

        <div class="singerInfo-experience" v-show="columnIndex==0">
          <div class="singerInfo-experience-title">歌手简介</div>
          <div class="singerInfo-experience-txt">{{singerExperienceData.briefDesc}}</div>
        </div>

        <div v-for="(item,index) in singerExperienceData.introduction" :key="index"
          class="singerInfo-experience"  v-show="columnIndex==0">
          <div class="singerInfo-experience-title">{{item.ti}}</div>
          <div class="singerInfo-experience-txt">{{item.txt}}</div>
        </div>

        <div class="singerInfo-hotSong"  v-show="columnIndex==1">
          <div class="singerInfo-hotSong-buttonRow">
            <img src="../../assets/img/common/右三角.png"  class="singerInfo-hotSong-buttonRow-san" alt="">
            <div class="singerInfo-hotSong-buttonRow-play" @click="playAllSong">播放全部</div>
          </div>
          <div class="singerInfo-hotSong-songInfoRow">
            <div class="singerInfo-hotSong-songInfoRow-name">
              歌曲
            </div>
            <div class="singerInfo-hotSong-songInfoRow-album">
              专辑
            </div>
            <div class="singerInfo-hotSong-songInfoRow-time">
              时间
            </div>
          </div>
          <div class="singerInfo-hotSong-songInfo" 
              v-for="(item,index) in singerHotSongData"
              :key="index"
              @click="playOne(item.id,item.name,item.ar[0].name,item.al.picUrl)">
            <div class="singerInfo-hotSong-songInfo-name">
              {{item.name}}
            </div>
            <div class="singerInfo-hotSong-songInfo-album">
              {{item.al['name']}}
            </div>
            <div class="singerInfo-hotSong-songInfo-time">
              时间
            </div>
          </div>
        </div>

        <div class="singerInfo-albumList"  v-show="columnIndex==2">
          <div class="singerInfo-albumList-eval"
                v-for="(item, index) in singerAlbumData" :key="index"
                @click="albumJump(item.id)">
            <div class="singerInfo-albumList-eval-img">
              <img :src=item.picUrl alt="" class="singerInfo-albumList-eval-img-img">
              <div class="singerInfo-albumList-eval-img-play">
                <img src="../../assets/home/播放.png" alt="" class="singerInfo-albumList-eval-img-play-img">
              </div>
            </div>
            <div class="singerInfo-albumList-eval-name">
              {{item.name}}
            </div>
            <div class="singerInfo-albumList-eval-row">
              <div class="singerInfo-albumList-eval-row-time">
                {{timestampToTime(item.publishTime)}}
              </div>
              <div class="singerInfo-albumList-eval-row-num">
                {{item.size}}首
              </div>
            </div>
          </div>

        </div>
    </div>
</template>

<script>
import store from "@/store/index.js";
import audio from "@/utils/playSong.js"
import { mapState } from 'vuex'
import { musicUrl,songLyrics } from '@/api/songSheet.js'
import { singerDetailInfo, singerFansNum,singerExperience,singerHotSong,singerAlbum } from '@/api/singerInfo.js'
export default {
  name: 'SingerInfo',
  data() {
    return {
      singerImg: '',
      singerName: '',
      singerMs: '',
      // singerDetailData: [],
      fansNum:"",
      singerExperienceData: [],
      column: ['简介', '热门歌曲', '专辑'],
      columnIndex: 0,
      singerHotSongData: [],
      singerAlbumData: [],
      songLyrics: [],
      songUrl: "",
    }
  },
  methods: {
    timestampToTime(timestamp) {
      var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      var D = date.getDate() + ' ';
      return Y+M+D;
    }, 
    playAllSong() {
      // console.log('playAll')
      songLyrics(this.singerHotSongData[0].id).then((res) => {
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
      console.log('this.songLyrics:',this.songLyrics)
      musicUrl(this.singerHotSongData[0].id).then((res)=>{
        this.songUrl = res.data[0].url      
        store.commit('GETNEWSONGURL', this.songUrl)
      })
      setTimeout(()=> {
        audio.src = this.songUrl
      },500)

      store.commit('GETNEWSONGNAME', this.singerHotSongData[0].name)
      store.commit('GETNEWSINGERNAME', this.singerHotSongData[0].ar[0].name)
      store.commit('GETNEWSONGINDEX', 0)
      store.commit('GETNEWSONGIMG', this.singerHotSongData[0].al.picUrl)
      store.commit('GETNEWSONGLISTLENGTH',this.singerHotSongData.length)
      store.commit('GETNEWSONGLIST',this.singerHotSongData)
      setTimeout(()=> {
        store.commit('GETPLAYSIGN', false)
      },500)
      setTimeout(()=> {
        store.commit('GETPLAYSIGN', true)
      },500)
      audio.play()
    },
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
    albumJump(id) {
      // console.log('专辑被点击')
      this.$router.push({
          name: 'albumSongs',
          params: {
              id: id
          }
      })
    }
  },
  computed: {
    ...mapState(['plagsign','newsongindex'])
  },
  created() {
    singerDetailInfo(this.$route.params.id).then((res)=>{
      this.singerImg = res.data.artist.cover
      this.singerName = res.data.artist.name
      this.singerMs = res.data.identify.imageDesc
    })
    singerFansNum(this.$route.params.id).then((res)=>{
      this.fansNum = res.data
    })
    singerExperience(this.$route.params.id).then((res)=>{
      this.singerExperienceData = res
    })
    singerHotSong(this.$route.params.id).then((res)=>{
      this.singerHotSongData = res.hotSongs
      console.log('this.singerHotSongData:',this.singerHotSongData)
    })
    singerAlbum(this.$route.params.id).then((res)=> {
      console.log('专辑:',res.hotAlbums)
      this.singerAlbumData = res.hotAlbums
    })
  },
}
</script>

<style lang="scss">
.singerInfo-topBox {
  height: 160px;
  display: flex;
  &-img {
    height: 160px;
    width: 160px;
    display: inline-block;
    border-radius: 16px;
    margin-right: 30px;
  }
  &-rightBox {
    &-name {
      margin-top: 15px;
      font-size: 20px;
      font-weight: bolder;
    }
    &-describe {
      margin-top: 30px;
    }
    &-fansNum {
      margin-top: 30px;
    }
  }
}
.singerInfo-column{ 
  display: flex;
  height: 50px;
  &-eval {
    line-height: 50px;
    margin-right: 50px;
  }
}
.columnevalActivce {
  color: #1FD0A4;
  border-bottom: 4px solid #1FD0A4;
}
.singerInfo-experience{ 
  margin-top: 30px;
  &-title {
    font-weight: bolder;
    margin-bottom: 15px;
  }
  &-txt {
    font-size: 14px;
  }
}


.singerInfo-hotSong {
  &-buttonRow {
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
    height: 30px;
    width: 100px;
    padding-left: 15px;
    background-color: #E1E1E1;
    border-radius: 20px;
    &-san {
      margin-top: 5px;
      width: 20px;
      height: 20px;
    }
    &-play {
      // padding: 5px 20px 5px 20px;
      
      line-height: 30px;
      font-size: 14px;
    }
  }
  &-songInfoRow {
    display: flex;
    height: 30px;
    font-size: 14px;
    color: gray;
    line-height: 30px;
    &-name {
      width: 56%;
    }
    &-album {
      width: 29%;
    }
  }
  &-songInfo {
    display: flex;
    height: 40px;
    font-size: 14px;
    line-height: 40px;
    &-name {
      width: 56%;
    }
    &-album {
      width: 29%;
    }
  }
  &-songInfo:hover {
    background-color: #EFEFEF;
  }
}

.singerInfo-albumList {
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  &-eval {
    width: 160px;
    margin-right: 20px;
    margin-bottom: 30px;
    &-img {
      width: 160px;
      height: 160px;
      border-radius: 8px;
      overflow: hidden;
      position: relative;
      &-img {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
      &-play {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 160px;
        height: 160px;
        display: none;
        &-img {
          width: 60px;
          height: 60px;
          margin-top: 50px;
          margin-left: 50px;
        }
      }
    }
    &-img:hover{
      margin-top: -15px;
    }
    &-img:hover .singerInfo-albumList-eval-img-play {
      display: block;
    }
    &-name {
      font-size: 14px;
      margin-top: 10px;
      margin-bottom: 5px;
    }
    &-row {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #8B8B8B;
      &-time{ 

      }
    }
  }
}
</style>