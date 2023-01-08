<template>
  <div id="albumSongs">
    <div class="albumSongs-topbar">
        <img :src=albumContentData.album.picUrl alt="" class="albumSongs-topbar-img">
        <div class="albumSongs-topbar-info">
            <div class="albumSongs-topbar-info-albumName">
                <span>{{albumContentData.album.name}}</span>
                <span v-if="albumContentData.album.alias.length!=0">({{albumContentData.album.alias}})</span>
            </div>
            <div class="albumSongs-topbar-info-singerName">
                歌手：{{albumContentData.album.artist.name}}
            </div>
            <div class="albumSongs-topbar-info-time">
                发行时间：{{timestampToTime(albumContentData.album.publishTime)}}
            </div>
            <div class="albumSongs-topbar-info-buttonRow">
                <div class="albumSongs-topbar-info-buttonRow-play" @click="playAllSong">
                    <img src="../../assets/img/common/右三角 (1).png" alt=""  class="albumSongs-topbar-info-buttonRow-play-img">
                    <div class="albumSongs-topbar-info-buttonRow-play-txt">播放全部</div>
                </div>
                <div class="albumSongs-topbar-info-buttonRow-Collection">
                    <div class="albumSongs-topbar-info-buttonRow-Collection-txt">收藏</div>
                </div>
            </div>
        </div>
    </div> 

    <div class="albumSongs-column">
        <div v-for="(item, index) in albumSongsColumn" :key="index"
            class="albumSongs-column-eval"
            @click="albumSongsColumnIndex = index"
            :class="{albumSongsColumnevalActivce: albumSongsColumnIndex == index}">
            {{item}}
        </div>
    </div>

    <div class="albumSongs-song"  v-show="albumSongsColumnIndex==0">
        <div class="albumSongs-song-songInfoRow">
            <div class="albumSongs-song-songInfoRow-name">
              歌曲
            </div>
            <div class="albumSongs-song-songInfoRow-album">
              歌手
            </div>
            <div class="albumSongs-song-songInfoRow-time">
              时间
            </div>
        </div>
        <div class="albumSongs-song-songInfo"
            v-for="(item,index) in albumContentData.songs" :key="index"
            @click="playOne(item.id,item.name,item.ar[0].name,item.al.picUrl)">
            <div class="albumSongs-song-songInfo-name">
              {{item.name}}
            </div>
            <div class="albumSongs-song-songInfo-album">
              <span v-for="(it,itindex) in item.ar" :key="itindex">
                {{it.name}}
              </span>
            </div>
            <div class="albumSongs-song-songInfo-time">
              时间
            </div>
        </div>
    </div>


    <div class="albumSongs-info"  v-show="albumSongsColumnIndex==1">
        <div class="albumSongs-info-row">
            <div class="albumSongs-info-row-title">
                专辑：
            </div>
            <div class="albumSongs-info-row-txt">
                {{albumContentData.album.name}}
            </div>
        </div>
        <div class="albumSongs-info-row">
            <div class="albumSongs-info-row-title">
                歌手：
            </div>
            <div class="albumSongs-info-row-txt">
                {{albumContentData.album.artist.name}}
            </div>
        </div>
        <div class="albumSongs-info-row">
            <div class="albumSongs-info-row-title">
                唱片公司：
            </div>
            <div class="albumSongs-info-row-txt">
                {{albumContentData.album.company}}
            </div>
        </div>
        <div class="albumSongs-info-row">
            <div class="albumSongs-info-row-title">
                唱片类型：
            </div>
            <div class="albumSongs-info-row-txt">
                {{albumContentData.album.subType}}
            </div>
        </div>
        <div class="albumSongs-info-rowTwo">
            <div class="albumSongs-info-rowTwo-title">
                专辑简介：
            </div>
            <div class="albumSongs-info-rowTwo-txtBox">
                <div class="albumSongs-info-rowTwo-txtBox-txt"
                    v-for="(item,index) in description" :key="index">
                    {{item}}
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
import { albumContent, albumData } from '@/api/singerInfo.js'
export default {
    name: 'AlbumSongs',
    data() {
        return {
            albumSongsColumn: ['歌曲', '专辑信息', '评论'],
            albumSongsColumnIndex: 0,
            albumContentData: [],
            albumData: [],
            description: [],
            songLyrics: [],
            songUrl: "",
        }
    },
    methods:  {
        timestampToTime(timestamp) {
            var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = date.getDate() + ' ';
            return Y+M+D;
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
            songLyrics(this.albumContentData.songs[0].id).then((res) => {
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
				store.commit('GETNEWSONGLYRICS',this.albumContentData.songs)
			})
            musicUrl(this.albumContentData.songs[0].id).then((res)=>{
                this.songUrl = res.data[0].url      
                store.commit('GETNEWSONGURL', this.songUrl)
            })
            setTimeout(()=> {
                audio.src = this.songUrl
            },500)
            store.commit('GETNEWSONGNAME', this.albumContentData.songs[0].name)
            store.commit('GETNEWSINGERNAME', this.albumContentData.album.artist.name)
            store.commit('GETNEWSONGINDEX', 0)
            store.commit('GETNEWSONGIMG', this.albumContentData.songs[0].al.picUrl)
            store.commit('GETNEWSONGLISTLENGTH',this.albumContentData.songs.length)
            store.commit('GETNEWSONGLIST',this.albumContentData.songs)
            setTimeout(()=> {
                store.commit('GETPLAYSIGN', false)
            },500)
            setTimeout(()=> {
                store.commit('GETPLAYSIGN', true)
            },500)
            audio.play()
        },
    },
    created() {
        albumContent(this.$route.params.id).then((res)=>{
            console.log('albumContentData:', res)
            this.albumContentData = res
            // console.log('res.album.description:',res.album.description)
            this.description = res.album.description.split("\n")
        })
        albumData(this.$route.params.id).then((res) => {
            // console.log('albumData:',res)
            this.albumData = res
        })
    },
    computed: {
        ...mapState(['plagsign','newsongindex'])
    },
}
</script>

<style lang="scss">
.albumSongs-topbar {
    display: flex;
    &-img {
        width: 160px;
        height: 160px;
        display: inline-block;
        border-radius: 8px;
        margin-right: 30px;;
    }
    &-info {
        &-albumName {
            font-size: 30px;
            font-weight: bolder;
        }
        &-singerName {
            margin-top: 15px;
            font-size: 12px;
        }
        &-time {
            margin-top: 15px;
            font-size: 12px;
        }
        &-buttonRow {
            display: flex;
            margin-top: 25px;
            &-play {
                display: flex;
                background-color: #1ECD99;
                height: 30px;
                padding-left: 10px;
                padding-right: 15px;
                border-radius: 20px;
                &-img {
                    width: 23px;
                    height: 23px;
                    display: inline-block;
                    margin-top: 4px;
                }
                &-txt {
                    color: #fff;
                    font-size: 14px;
                    line-height: 30px;
                }
            }
            &-Collection {
                margin-left: 10px;
                display: flex;
                background-color: #E3E3E3;
                height: 30px;
                padding-left: 10px;
                padding-right: 15px;
                border-radius: 20px;
                &-txt {
                    font-size: 14px;
                    line-height: 30px;
                }
            }
        }
    }   
}
.albumSongs-column{ 
  display: flex;
  margin-top: 30px;
  height: 50px;
  &-eval {
    line-height: 50px;
    margin-right: 50px;
  }
}
.albumSongsColumnevalActivce {
    color: #1FD0A4;
    border-bottom: 4px solid #1FD0A4;
}

.albumSongs-song {
    margin-top: 30px;
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

.albumSongs-info {
    margin-top: 30px;
    &-row {
        display: flex;
        height: 30px;
        font-size: 14px;
        line-height: 30px;
        &-title {
            width: 80px;
            margin-right: 20px;
        }
        &-txt {
            color: #868686;
        }
    }
    &-rowTwo {
        display: flex;
        font-size: 14px;
        &-title {
            width: 80px;
            margin-right: 20px;
        }
        &-txtBox {
            color: #868686;
            width: 640px;
            &-txt {
                height: auto;
                line-height: 30px;
                word-wrap: break-word;
            }
        }
    }
}
</style>