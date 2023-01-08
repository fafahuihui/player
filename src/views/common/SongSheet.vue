<template>
  <div id="songSheet">
    <div class="songSheet-info">
      <img :src=songSheetData.coverImgUrl alt=""
        class="songSheet-info-songSheetImg">
      <div class="songSheet-info-explain"
          :style="{width: (windowwidth-480)+'px'}">
          <div class="songSheet-info-explain-title">{{songSheetData.name}}</div>
          <div class="songSheet-info-explain-creatorInfo">
            <img :src=creatorHeadImg alt=""
              class="songSheet-info-explain-creatorInfo-img">
            <div class="songSheet-info-explain-creatorInfo-name">
              {{creatorName}}
            </div>
            <div class="songSheet-info-explain-creatorInfo-time">
              {{dateTime(songSheetData.createTime)}}
            </div>
          </div>
          <div class="songSheet-info-explain-operationRow"> 
            <div class="songSheet-info-explain-operationRow-play">
              <img src="../../assets/img/common/右三角白.png" alt=""
                  class="songSheet-info-explain-operationRow-play-img">
              <div>播放全部</div>
            </div>
            <div class="songSheet-info-explain-operationRow-collection">收藏({{transformation(songSheetData.subscribedCount)}})</div>
            <div class="songSheet-info-explain-operationRow-share">分享({{transformation(songSheetData.commentCount)}})</div>
          </div>
          <div class="songSheet-info-explain-labelRow">
            标签：<span v-for="(item, index) in songSheetData.tags" :key="index">
              {{item}}
            </span>
          </div>
          <div class="songSheet-info-explain-dataRow">
            <div>歌曲：{{transformation(songSheetData.trackCount)}}</div>
            <div>播放：{{transformation(songSheetData.playCount)}}</div>
          </div>
          <div class="songSheet-info-explain-briefIntroductionRow">
            <div class="songSheet-info-explain-briefIntroductionRow-txt"
              :class="{txtShowActive: showSign}">
              {{songSheetData.description}}
            </div>
            <img src="../../assets/img/layout/选择器展开.png" alt=""
              class="songSheet-info-explain-briefIntroductionRow-img"
              @click="showClick"
              v-show="showSign == true">
            <img src="../../assets/img/layout/选择器收起.png" alt=""
              class="songSheet-info-explain-briefIntroductionRow-img"
              @click="showClick"
              v-show="showSign == false">
          </div>
      </div>
    </div>

    <div class="songSheet-column">
      <div class="songSheet-column-eval" 
        @click="columnIndex = 0"
        :class="{columnEvalACtive :columnIndex==0}">
        歌曲列表
      </div>
      <div class="songSheet-column-eval" 
        @click="columnIndex = 1"
        :class="{columnEvalACtive :columnIndex==1}">
        评论({{transformation(songSheetCommentTotal)}})
      </div>
    </div>

    <div class="songSheet-songList" v-show="columnIndex==0">
      <div class="songSheet-songList-row">
        <div class="songSheet-songList-row-song">
          歌曲
        </div>
        <div class="songSheet-songList-row-singer">
          歌手
        </div>
        <div class="songSheet-songList-row-album">
          专辑
        </div>
        <div class="songSheet-songList-row-time">
          时间
        </div>
      </div>
      <div class="songSheet-songList-row1"
          v-for="(item, index) in songListData"
          :key="index"
          @click="playSong(item.id, item.name, item.ar[0]['name'], item.al.picUrl, index)"
          :class="{songSheetsongListrow1Active:newsongindex == index}">
        <div class="songSheet-songList-row1-song">
          {{item.name}}
        </div>
        <div class="songSheet-songList-row1-singer">
          {{item.ar[0]['name']}}
        </div>
        <div class="songSheet-songList-row1-album">
          {{item.al.name}}
        </div>
        <div class="songSheet-songList-row1-time">
          {{dateTime(item.publishTime)}}
        </div>
      </div>
    </div>


    <div class="songSheet-comment" v-show="columnIndex==1">
      <div class="songSheet-comment-row"
          v-for="(item, index) in songSheetCommentData" :key="index">
        <div class="songSheet-comment-row-info">
          <!-- <div class="songSheet-comment-row-info-img"></div> -->
          <img :src=item.user.avatarUrl alt=""
              class="songSheet-comment-row-info-img">
          <div class="songSheet-comment-row-info-data">
            <div>{{item.user.nickname}}</div>
            <div>{{dateTime(item.time)}}</div>
          </div>
        </div>
        <div class="songSheet-comment-row-content">
          {{item.content}} 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { songSheet, songList, songSheetComment } from '@/api/home.js'
import { musicUrl,songLyrics } from '@/api/songSheet.js'
import store from "@/store/index.js";
import audio from "@/utils/playSong.js"
import {tenThousand, timestampToTime} from '@/utils/dataConversion'
export default {
  name: 'SongSheet',
  data() {
    return {
      transformation: tenThousand,
      dateTime: timestampToTime,

      creatorHeadImg: '',//歌单创建者头像
      creatorName: '',//歌单创建者名字

      showSign: true,
      columnIndex: 0,
      songSheetData: [],
      songListData: [],
      songUrl: '',
      audio: '',

      songLyrics: '',

      songSheetCommentData: [],
      songSheetCommentTotal: '',
    }
  },
  watch: {
        
  },
  methods: {
    showClick() {
      this.showSign = !this.showSign
    },
    playSong(id, songName, singerName, songImg, index){
      songLyrics(id).then((res) => {
      // console.log("res:",res)
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
      
      console.log('singerName:',singerName)
      console.log('songImg:',songImg)
      store.commit('GETNEWSONGNAME', songName)
      store.commit('GETNEWSINGERNAME', singerName)
      store.commit('GETNEWSONGINDEX', index)
      store.commit('GETNEWSONGIMG', songImg)
      // console.log('this.plagsign:',this.plagsign)
      // console.log('!this.plagsign:',!this.plagsign)
      // store.commit('GETPLAYSIGN', true)
      
      setTimeout(()=> {
        store.commit('GETPLAYSIGN', false)
      },500)
      setTimeout(()=> {
        store.commit('GETPLAYSIGN', true)
      },500)
      
      console.log('songsheet')
      audio.play()
    }
  },
  computed: {
    ...mapState(['windowwidth', 'plagsign','newsongindex', 'newsongsheetid'])
  },
  created() {
    store.commit('GETNEWSONGSHEETID',this.$route.params.id)
    songSheet(this.$route.params.id).then((res)=>{
			this.songSheetData = res.playlist
      this.creatorHeadImg = this.songSheetData.creator.avatarUrl
      this.creatorName = this.songSheetData.creator.nickname
		}),
    songList(this.$route.params.id).then((res) => {
      this.songListData = res.songs
      store.commit('GETNEWSONGLIST',this.songListData)
      store.commit('GETNEWSONGLISTLENGTH',this.songListData.length)
    })
    songSheetComment(this.$route.params.id, 20).then((res) => {
      this.songSheetCommentData = res.comments
      this.songSheetCommentTotal = res.total
      // console.log(this.songSheetCommentData)
    })
  },
  
  // beforeRouteEnter(to, from, next) {
  //   console.log('to:',to)
  //   console.log('from:',from)
  //   console.log('this.$router:',this.$router)
    // if(to.name == "songSheet") {
      // if(to.params == {}) {
      //   this.$router.push({
      //   name: 'songSheet',
      //   params: {
      //     id:this.$store.state.pathmsg 
      //   }
      // })
      
      // }
    // }
    // next();
  // },
}
</script>

<style lang="scss" scoped>
.songSheet-info {
  // border: 1px solid pink;
  display: flex;
  // justify-content: space-between;
  &-songSheetImg {
    // border: 1px solid pink;
    height: 180px;
    width: 180px;
    margin-right: 20px;
    display: inline-block;
    border-radius: 6px;
  }
  &-explain {
    // border: 1px solid red;
    // min-width: 560px;
    &-title {
      font-size: 20px;
      font-weight: bolder;
      margin-bottom: 10px;
    }
    &-creatorInfo {
      // border: 1px solid red;
      height: 32px;
      display: flex;
      margin-bottom: 10px;
      &-img {
        // border: 1px solid pink;
        height: 30px;
        width: 30px;
        display: inline-block;
        border-radius: 50%;
      }
      &-name {
        font-size: 13px;
        line-height: 32px;
        margin-left: 10px;
        color: #76C2EB;
      }
      &-time {
        font-size: 13px;
        line-height: 32px;
        margin-left: 10px;
        color: gray;
      }
    }
    &-operationRow {
      // border: 1px solid pink;
      display: flex;
      &-play {
        // border: 1px solid pink;
        height: 30px;
        padding-left: 20px;
        padding-right: 20px;
        text-align: center;
        line-height: 30px;
        margin-right: 10px;
        border-radius: 16px;
        color: #fff;
        background-color: #1FD0A4;
        display: flex;
        &-img {
          width: 23px;
          height: 23px;
          display: inline-block;
          margin-top: 4px;
        }
      }
      &-collection {
        border: 1px solid #1FD0A4;
        height: 30px;
        padding-left: 20px;
        padding-right: 20px;
        text-align: center;
        line-height: 30px;
        margin-right: 10px;
        border-radius: 16px;
      }
      &-share {
        border: 1px solid #1FD0A4;
        height: 30px;
        padding-left: 20px;
        padding-right: 20px;
        text-align: center;
        line-height: 30px;
        border-radius: 16px;
      }
    }
    &-labelRow {
      margin-top: 10px;
      font-size: 13px;
    }
    &-dataRow {
      font-size: 13px;
      display: flex;
    }
    &-dataRow>div {
      margin-right: 10px;
    }
    &-briefIntroductionRow {
      display: flex;
      justify-content: space-between;
      // border: 1px solid pink;
      &-img {
        width: 20px;
        height: 20px;
        display: inline-block;
        // border: 1px solid pink;
      }
      &-txt {
        // border: 1px solid blue;
      }
    }
  }
}
.txtShowActive {
  height: 20px;
  overflow: hidden;
}
.songSheet-column {
  // border: 1px solid pink;
  margin-top: 30px;
  display: flex;
  height: 30px;
  &-eval {
    font-size: 14px;
    line-height: 30px;
    margin-right: 30px;
  }
}
.columnEvalACtive {
  color: #1ECE99;
  border-bottom: 4px solid #1ECE99;
}

.songSheet-songList {
  // border: 1px solid pink;
  margin-top: 10px;
  &-row {
    // border: 1px solid red;
    height: 30px;
    display: flex;
    &-song {
      // border: 1px solid red;
      width: 32%;
      font-size: 14px;
      color: gray;
      line-height: 30px;
    }
    &-singer {
      // border: 1px solid red;
      width: 24%;
      font-size: 14px;
      color: gray;
      line-height: 30px;
    }
    &-album {
      // border: 1px solid red;
      width: 24%;
      font-size: 14px;
      color: gray;
      line-height: 30px;
    }
    &-time {
      // border: 1px solid red;
      width: 20%;
      font-size: 14px;
      color: gray;
      line-height: 30px;
    }
  }
  &-row1:hover {
    background-color: #EEEEEE;
  }
  &-row1 {
    // border: 1px solid red;
    height: 30px;
    display: flex;
    color: gray;
    &-song {
      // border: 1px solid red;
      width: 32%;
      font-size: 14px;
      // color: gray;
      line-height: 30px;
      overflow: hidden;
    }
    &-singer {
      // border: 1px solid red;
      width: 24%;
      font-size: 14px;
      // color: gray;
      line-height: 30px;
      overflow: hidden;
    }
    &-album {
      // border: 1px solid red;
      width: 24%;
      font-size: 14px;
      // color: gray;
      line-height: 30px;
      overflow: hidden;
    }
    &-time {
      // border: 1px solid red;
      width: 20%;
      font-size: 14px;
      // color: gray;
      line-height: 30px;
      overflow: hidden;
    }
  }
}
.songSheetsongListrow1Active {
  color: #1FD0A4;
  background-color: #EEEEEE;
}
.songSheet-comment {
  &-row {
    // border: 1px solid pink;
    margin-top: 15px;
    border-bottom: 1px solid #DEDEDE;
    &-info {
      display: flex;
      height: 40px;
      &-img {
        background-color: pink;
        border-radius: 50%;
        height: 40px;
        width: 40px;
        margin-right: 20px;
      }
      &-data {
        font-size: 14px;
      }
    }
    &-content {
      font-size: 14px;
      margin: 10px 0px 15px 60px;
    }
  }
  
}
</style>