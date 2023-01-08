<template>
  <div id="searchResult">
    <div class="searchResult-column">
        <div class="searchResult-column-eval"
            v-for="(item,index) in searchResultColumn" :key="index"
            :class="{searchResultColumnActive :searchResultColumnIndex==index}"
            @click="searchResultColumnIndex = index">
            {{item}}
        </div>
    </div>


    <div class="searchResult-songBox" v-show="searchResultColumnIndex==0">
        <div class="searchResult-songBox-buttonRow">
            <img src="../../assets/img/common/右三角.png"  class="searchResult-songBox-buttonRow-san" alt="">
            <div class="searchResult-songBox-buttonRow-play" 
              @click="playAllSong">播放全部</div>
        </div>
        <div class="searchResult-songBox-songInfoRow">
          <div class="searchResult-songBox-songInfoRow-name">
            歌曲
          </div>
          <div class="searchResult-songBox-songInfoRow-album">
            专辑
          </div>
          <div class="searchResult-songBox-songInfoRow-singerName">
            歌手
          </div>
        </div>
        <songinfo-row v-for="(item, index) in songData" :key="index" :id="item.id" :img="item.album['artist']['img1v1Url']"
          :index="index" :one="item.name" :two="item.album['name']" :three="item.artists[0]['name']">

        </songinfo-row>
    </div>
    



    <div class="searchResult-albumBox" v-show="searchResultColumnIndex==1">
      <albuminfo-row v-for="(item, index) in albumData" :key="index" :id="item.id"
        :img="item.picUrl"
        :songName="item.name" 
        :singerName="item.artist['name']" 
        :time="item.publishTime"
        :num="item.size">
      </albuminfo-row>
    </div>


    <div class="searchResult-singerBox" v-show="searchResultColumnIndex==2">
      <singerinfo-row
        v-for="(item, index) in singerData" :key="index" :img="item.picUrl"
        :id="item.id" :singerName="item.name" :albumNum="item.albumSize">
      </singerinfo-row>
    </div>
    
    <div class="searchResult-songSheetBox" v-show="searchResultColumnIndex==3">
      <songsheet-row
        v-for="(item, index) in songSheetData" :key="index" :img="item.coverImgUrl"
        :id="item.id" :name="item.name" :creator="item.creator.nickname"
        :num="item.trackCount" :playNum="item.playCount">
      </songsheet-row>
    </div>

    <div class="searchResult-lyricsBox" v-show="searchResultColumnIndex==4">
      <div class="searchResult-lyricsBox-eval"
        v-for="(item,index) in lyricData" :key="index">
        <div class="searchResult-lyricsBox-eval-content">
          <div class="searchResult-lyricsBox-eval-content-name">
            <div class="searchResult-lyricsBox-eval-content-name-one">
              <div class="searchResult-lyricsBox-eval-content-name-one">{{item.name}}</div>
              <img src="../../assets/img/search/24gl-play.png" alt="" class="searchResult-lyricsBox-eval-content-name-one-right"
                @click="playOne(item.id, item.name, item.artists[0].name, item.album.artist.img1v1Url)">
            </div>
            <div class="searchResult-lyricsBox-eval-content-name-two">
              {{item.artists[0].name}}
            </div>
            <div class="searchResult-lyricsBox-eval-content-name-three">
              {{item.album.name}}
            </div>
            <div class="searchResult-lyricsBox-eval-content-name-operation"
              @click="lyricClick(lyricTemp[index].showSign, index)" v-show="lyricTemp[index].showSign == false">
              展开歌词
            </div>
            <div class="searchResult-lyricsBox-eval-content-name-operation"
              @click="lyricClick(lyricTemp[index].showSign, index)" v-show="lyricTemp[index].showSign == true">
              收起歌词
            </div>
          </div>
          <div v-for="(it,itindex) in lyricTemp[index].lyrics" :key="itindex"
            class="searchResult-lyricsBox-eval-content-lyrics">
            {{it}}
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
import SonginfoRow from '@/components/SonginfoRow.vue'
import AlbuminfoRow from '@/components/AlbuminfoRow.vue'
import SingerinfoRow from '@/components/SingerinfoRow.vue'
import {searchResultInfo} from '@/api/search.js'
import SongsheetRow from "@/components/SongsheetRow.vue";
export default {
    name: 'SearchResult',
    data() {
        return {
            searchResultColumn: ['歌曲','专辑','歌手','歌单','歌词'],
            searchResultColumnIndex: 0,
            songData: [],
            albumData: [],
            singerData: [],
            songSheetData: [],
            lyricData: [],
            lyricArray: [],
				    lyricTemp: [],
            songLyrics: [],
            songUrl: "",
        }
    },
    methods: {
      lyricClick(sign, lyficIndex) {
				// console.log('点击')
				// console.log('lyficIndex: ',lyficIndex)
				
				if(sign == true) {
					this.lyricTemp[lyficIndex].lyrics = this.lyricArray[lyficIndex].lyrics.slice(0,3)
					this.lyricTemp[lyficIndex].showSign = false
				}else{
					this.lyricTemp[lyficIndex].lyrics = this.lyricArray[lyficIndex].lyrics
					this.lyricTemp[lyficIndex].showSign = true
				}
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
      playAllSong() {
        // console.log('playAll')
        // console.log(this.songData.length)
        // console.log(this.songData)
        // console.log('this.songData[0].name:',this.songData[0])
        // console.log(this.songData[0].artists[0]['name'])
        // console.log(this.songData[0].album['artist']['img1v1Url'])
        
        // console.log('this.songData[0].id:',this.songData[0].id)
        songLyrics(this.songData[0].id).then((res) => {
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
        musicUrl(this.songData[0].id).then((res)=>{
          this.songUrl = res.data[0].url      
          store.commit('GETNEWSONGURL', this.songUrl)
        })
        setTimeout(()=> {
          audio.src = this.songUrl
        },500)
        store.commit('GETNEWSONGLISTLENGTH',this.songData.length)
        store.commit('GETNEWSONGLIST',this.songData)
        store.commit('GETNEWSONGNAME', this.songData[0].name)
        store.commit('GETNEWSINGERNAME', this.songData[0].artists[0]['name'])
        store.commit('GETNEWSONGINDEX', 0)
        store.commit('GETNEWSONGIMG', this.songData[0].album['artist']['img1v1Url'])
       
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
    created() {
        searchResultInfo(this.$route.params.txt, 1, this.songOffset).then((res)=>{
				// console.log('搜索到的歌曲信息:',res.result.songs)
          this.songData = res.result.songs
        })
        searchResultInfo(this.$route.params.txt, 10, this.albumOffset).then((res)=>{
          // console.log('搜索到的专辑信息:',res.result.albums)
          this.albumData = res.result.albums
        })
        searchResultInfo(this.$route.params.txt, 100, this.singerOffset).then((res)=>{
          // console.log('搜索到的歌手信息:',res.result.artists)
          this.singerData = res.result.artists
        })
        searchResultInfo(this.$route.params.txt, 1000, this.songSheetOffset).then((res)=>{
          // console.log('搜索到的歌单信息:',res.result.playlists)
          this.songSheetData = res.result.playlists
        })
        searchResultInfo(this.$route.params.txt, 1006, this.lyricOffset).then((res)=>{
          // console.log('搜索到的歌词信息:',res.result.songs)
          this.lyricData = res.result.songs
          
          this.lyricData.map((x) => {
            return x.lyrics.txt = x.lyrics.txt.split("\n")
          })
          // console.log('搜索歌词信息:',this.lyricData)
          this.lyricData.map((x) => {
            // x.showSign = false
            this.lyricArray.push(Object.assign({}, {lyrics: x.lyrics.txt, showSign: false}))
          })
          console.log('this.lyricArray：',this.lyricArray)
          this.lyricTemp = this.lyricArray.map((x) => {
            // x.showSign = x.showSign
            const tempObj = {lyrics: x.lyrics.slice(0,3), showSign: x.showSign}
            // x.lyrics = x.lyrics.slice(0,3)
            return tempObj
          })
          // console.log('this.lyricArray：',this.lyricTemp)
        })
    },
    components: {
    SonginfoRow,
    AlbuminfoRow,
    SingerinfoRow,
    SongsheetRow
},
}
</script>

<style lang="scss">
.searchResult-column {
    height: 40px;
    display: flex;
    &-eval {
        line-height: 40px;
        margin-left: 15px;
        margin-right: 15px;
    }
}
.searchResultColumnActive {
    color: #1ECC94;
    border-bottom: 4px solid #1ECC94;
}
.searchResult-songBox {
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
}
.searchResult-albumBox, .searchResult-singerBox, .searchResult-songSheetBox, .searchResult-lyricsBox {
  margin-top: 30px;
}
.searchResult-lyricsBox-eval {
  display: flex;
  width: 98%;
  margin-bottom: 20px;
  &-content {
    width: 100%;
    &-name {
      margin-bottom: 10px;
      display: flex;
      width: 100%;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      &-one {
        width: 45%;
        // border: 1px solid red;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        &-right {
          margin-right: 10px;
          width: 20px;
          height: 20px;
          margin-top: 5px;
          display: none;
        }
      }
      &-two {
        width: 15%;
        // border: 1px solid red;
        overflow: hidden;
      }
      &-three {
        width: 30%;
        // border: 1px solid red;
        overflow: hidden;
      }
      &-operation:hover{ 
        
        color: #1ECC94;
      }
    }
    &-lyrics {
      width: 45%;
      overflow: hidden;
      font-size: 14px;
      color: gray;
      margin-bottom: 5px;
    }
  }
}
.searchResult-lyricsBox-eval:hover {
  background-color: #EFEFEF;
}
.searchResult-lyricsBox-eval:hover  .searchResult-lyricsBox-eval-content-name-one-right {
  display: inline-block;
}
</style>>