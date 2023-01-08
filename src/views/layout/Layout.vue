<template>
  <div id="layout">
    <navbar :navbar=navbar></navbar>
    <div class="layout-right"
    :style="{width: (windowWidth-170)+'px'}">
        <div id="topbar">
            <div class="topbar-left">
                <div class="topbar-left-backOff" @click="backOffClick"></div>
                <div class="topbar-left-forward" @click="forwardClick"></div>

                <div class="topbar-left-box">
                    <img src="../../assets/img/layout/搜索 (2).png" alt=""
                        class="topbar-left-box-img">
                    <input type="text" placeholder="搜索音乐"  class="topbar-left-box-input">
                </div>
            </div>

            <div class="topbar-right">
                <div class="topbar-userInfo">
                    <img :src=userimg alt="" class="topbar-userInfo-img" @click="userInfoShow=!userInfoShow">
                    <div class="topbar-userInfo-name">{{username}}</div>
                    <div class="topbar-userInfo-pupopBox" v-show="userInfoShow">
                        <div class="topbar-userInfo-pupopBox-eval"
                            @click="loginClick">进行登录</div>
                        <div class="topbar-userInfo-pupopBox-eval">退出登录</div>
                    </div>
                </div>
                <!-- <div class="topbar-time">{{dateFormat(date)}}</div> -->
            </div>
            
        </div>
        <router-view class="layout-right-content"
            :style="{height: (windowHeight-140)+'px'}">
        </router-view>
        <div class="layout-musicRow">
            <el-slider v-model="playSongNewTime" :max="playSongTime"
                @change='change($event)'></el-slider>
            <div class="layout-musicRow-info">
                <div class="layout-musicRow-info-left">
                    <div class="layout-musicRow-info-left-imgBox"
                        @click="playSongDrawer = !playSongDrawer">
                        <img src="../../assets/home/音乐 (2).png" alt=""
                             class="layout-musicRow-info-left-imgBox-singImg"
                            v-show="newsongimg == ''">
                        <img :src=newsongimg alt=""
                             class="layout-musicRow-info-left-imgBox-singImg"
                             v-show="newsongimg != ''">
                        <img src="../../assets/img/layout/icon_向上_2.png" alt=""
                            class="layout-musicRow-info-left-imgBox-showImg">
                        <div class="layout-musicRow-info-left-imgBox-txt">
                            展开歌曲详情页
                        </div>
                    </div>
                    <div class="layout-musicRow-info-left-box">
                        <div class="layout-musicRow-info-left-box-singName">{{newsongname}}</div>
                        <div class="layout-musicRow-info-left-box-singerName">{{newsingername}}</div>
                        <div style="font-size: 11px">{{conversionTime(newsongplaytime)}} / {{conversionTime(newsongtime)}}</div>
                    </div>
                </div>

                <div class="layout-musicRow-info-middle">
                    <div class="layout-musicRow-info-middle-playMode">
                        <img src="../../assets/img/layout/顺序播放.png" alt=""
                            class="layout-musicRow-info-middle-playMode"
                            @click="playModeSwitchSign = !playModeSwitchSign"
                            v-show="switchSign == 'order'">
                        <img src="../../assets/img/layout/单曲循环_32.png" alt=""
                            class="layout-musicRow-info-middle-playMode"
                            @click="playModeSwitchSign = !playModeSwitchSign"
                            v-show="switchSign == 'repeat'">
                        <img src="../../assets/img/layout/随机播放.png" alt=""
                            class="layout-musicRow-info-middle-playMode"
                            @click="playModeSwitchSign = !playModeSwitchSign"
                            v-show="switchSign == 'random'">
                        <div class="layout-musicRow-info-middle-playMode-modeList"
                            v-show="playModeSwitchSign">
                            <div  class="layout-musicRow-info-middle-playMode-modeList-evalBox">
                                <div class="layout-musicRow-info-middle-playMode-modeList-eval"
                                    @click="playModeSwitchClick('random')">
                                    <img src="../../assets/img/layout/随机播放.png" alt=""
                                        class="layout-musicRow-info-middle-playMode-modeList-eval-img">
                                    <div class="layout-musicRow-info-middle-playMode-modeList-eval-txt">
                                        随机播放
                                    </div>
                                </div>
                                <div class="layout-musicRow-info-middle-playMode-modeList-eval"
                                    @click="playModeSwitchClick('repeat')">
                                    <img src="../../assets/img/layout/单曲循环_32.png" alt=""
                                        class="layout-musicRow-info-middle-playMode-modeList-eval-img">
                                    <div class="layout-musicRow-info-middle-playMode-modeList-eval-txt">
                                        单曲循环
                                    </div>
                                </div>
                                <div class="layout-musicRow-info-middle-playMode-modeList-eval"
                                    @click="playModeSwitchClick('order')">
                                    <img src="../../assets/img/layout/顺序播放.png" alt=""
                                        class="layout-musicRow-info-middle-playMode-modeList-eval-img">
                                    <div class="layout-musicRow-info-middle-playMode-modeList-eval-txt">
                                        顺序播放
                                    </div>
                                </div>
                            </div>
                            <div class="layout-musicRow-info-middle-playMode-modeList-triangle"></div>
                        </div>
                    </div>
                    <img src="../../assets/img/layout/上一首.png" alt=""
                        class="layout-musicRow-info-middle-previousSong"
                        @click="switchSong('previous')">
                    <img src="../../assets/img/layout/播放.png" alt=""
                        class="layout-musicRow-info-middle-play"
                        @click="playClick"
                        v-show="playsign == false">
                    <img src="../../assets/img/layout/暂停.png" alt=""
                        class="layout-musicRow-info-middle-play"
                        @click="playClick"
                        v-show="playsign == true">
                    <img src="../../assets/img/layout/后一首.png" alt=""
                        class="layout-musicRow-info-middle-next"
                        @click="switchSong('next')">
                    <div class="layout-musicRow-info-middle-volume" @click="valueShow = !valueShow">
                        <img src="../../assets/img/layout/音量.png" alt=""
                        class="layout-musicRow-info-middle-volume-img">
                        <div class="layout-musicRow-info-middle-volume-sliderBox"
                            v-show="valueShow">
                            <div class="layout-musicRow-info-middle-volume-sliderBox-slider">
                                <el-slider
                                    v-model="value"
                                    vertical
                                    :max = "volumevalue"
                                    height="140px"
                                    @change='volumevaluechange($event)'
                                    :step='volumestep'>
                                </el-slider>
                                <div class="layout-musicRow-info-middle-volume-sliderBox-slider-txt">
                                    {{value*100}}%
                                </div>
                            </div>
                            <div class="layout-musicRow-info-middle-volume-sliderBox-triangle">

                            </div>
                        </div>
                    </div>
                    
                </div>

                <div class="layout-musicRow-info-right">
                    <img src="../../assets/img/layout/列表.png" alt=""
                        class="layout-musicRow-info-right-list"
                        @click="songListDrawer = true">
                </div>
            </div>
        </div>
    </div>




    <el-drawer
        :visible.sync="songListDrawer"
        :with-header="false"
        :size='songListDrawerSize'>
        <div class="songList-title">
            播放队列({{newsonglistlength}})
        </div>
        <div class="songList-content">
            <div class="songList-content-row"
                v-for="(item, index) in newsonglist"
                :key="index"
                :class="{songSheetsongListrow1Active:newsongindex == index}"
                @click="playSong(item.id, item.name, item.ar[0]['name'], item.al.picUrl, index)">
                <div class="songList-content-row-songName">{{item.name}}/</div>
                <div class="songList-content-row-singerName">
                    {{item.ar[0]['name']}}</div>
            </div>
        </div>
    </el-drawer>


    <el-drawer
        :visible.sync="playSongDrawer"
        :direction="direction"
        :size='playSongDrawerSize'
        :withHeader="false">
        <div class="drawer-content" :style="{height: (windowHeight-85)+'px'}">
            <div class="drawer-content-info" 
                :style="{'margin-left' : (windowWidth-800)/2+'px','padding-top': (windowHeight-400)/2+'px'}">
                <div class="drawer-content-info-songimgBox">
                    <img :src="newsongimg" alt=""
                    class="drawer-content-info-songimg" :class="{igmActive:playsign == true}">
                    <img src="../../assets/img/layout/needle-ab.png" alt=""
                    class="drawer-content-info-cdimg" :class="{cdActive:playsign == true}">
                </div>
                <div class="drawer-content-info-lyrics" id="lyricsBox">
                    <div class="drawer-content-info-lyrics-row"
                        v-for="(item, index) in newsonglyrics" :key="index"
                        :id="item.time < newsongplaytime && newsongplaytime <= newsonglyrics[index+1].time?'current':'nocurrent'"
                        :class="{lyricsRowActive: item.time < newsongplaytime && newsongplaytime <= newsonglyrics[index+1].time}">
                        {{item.lrc}}
                    </div> 
                </div>
            </div>
        </div>


        <div class="layout-musicRow">
            <el-slider v-model="playSongNewTime" :max="playSongTime"
                    @change='change($event)'></el-slider>
            <div class="layout-musicRow-info">
                <div class="layout-musicRow-info-left">
                    <div class="layout-musicRow-info-left-imgBox"
                        @click="playSongDrawer = !playSongDrawer">
                        <img src="../../assets/home/音乐 (2).png" alt=""
                             class="layout-musicRow-info-left-imgBox-singImg"
                            v-show="newsongimg == ''">
                        <img :src=newsongimg alt=""
                             class="layout-musicRow-info-left-imgBox-singImg"
                             v-show="newsongimg != ''">
                        <img src="../../assets/img/layout/下拉.png" alt=""
                            class="layout-musicRow-info-left-imgBox-showImg">
                        <div class="layout-musicRow-info-left-imgBox-txt">
                            收起歌曲详情页
                        </div>
                    </div>
                    <div class="layout-musicRow-info-left-box">
                        <div class="layout-musicRow-info-left-box-singName">{{newsongname}}</div>
                        <div class="layout-musicRow-info-left-box-singerName">{{newsingername}}</div>
                        <div style="font-size: 11px">{{conversionTime(newsongplaytime)}} / {{conversionTime(newsongtime)}}</div>
                    </div>
                </div>

                <div class="layout-musicRow-info-middle">
                    <div class="layout-musicRow-info-middle-playMode">
                        <img src="../../assets/img/layout/顺序播放.png" alt=""
                            class="layout-musicRow-info-middle-playMode"
                            @click="playModeSwitchSign = !playModeSwitchSign"
                            v-show="switchSign == 'order'">
                        <img src="../../assets/img/layout/单曲循环_32.png" alt=""
                            class="layout-musicRow-info-middle-playMode"
                            @click="playModeSwitchSign = !playModeSwitchSign"
                            v-show="switchSign == 'repeat'">
                        <img src="../../assets/img/layout/随机播放.png" alt=""
                            class="layout-musicRow-info-middle-playMode"
                            @click="playModeSwitchSign = !playModeSwitchSign"
                            v-show="switchSign == 'random'">
                        <div class="layout-musicRow-info-middle-playMode-modeList"
                            v-show="playModeSwitchSign">
                            <div  class="layout-musicRow-info-middle-playMode-modeList-evalBox">
                                <div class="layout-musicRow-info-middle-playMode-modeList-eval"
                                    @click="playModeSwitchClick('random')">
                                    <img src="../../assets/img/layout/随机播放.png" alt=""
                                        class="layout-musicRow-info-middle-playMode-modeList-eval-img">
                                    <div class="layout-musicRow-info-middle-playMode-modeList-eval-txt">
                                        随机播放
                                    </div>
                                </div>
                                <div class="layout-musicRow-info-middle-playMode-modeList-eval"
                                    @click="playModeSwitchClick('repeat')">
                                    <img src="../../assets/img/layout/单曲循环_32.png" alt=""
                                        class="layout-musicRow-info-middle-playMode-modeList-eval-img">
                                    <div class="layout-musicRow-info-middle-playMode-modeList-eval-txt">
                                        单曲循环
                                    </div>
                                </div>
                                <div class="layout-musicRow-info-middle-playMode-modeList-eval"
                                    @click="playModeSwitchClick('order')">
                                    <img src="../../assets/img/layout/顺序播放.png" alt=""
                                        class="layout-musicRow-info-middle-playMode-modeList-eval-img">
                                    <div class="layout-musicRow-info-middle-playMode-modeList-eval-txt">
                                        顺序播放
                                    </div>
                                </div>
                            </div>
                            <div class="layout-musicRow-info-middle-playMode-modeList-triangle"></div>
                        </div>
                    </div>
                    <img src="../../assets/img/layout/上一首.png" alt=""
                        class="layout-musicRow-info-middle-previousSong"
                        @click="switchSong('previous')">
                    <img src="../../assets/img/layout/播放.png" alt=""
                        class="layout-musicRow-info-middle-play"
                        @click="playClick"
                        v-show="playsign == false">
                    <img src="../../assets/img/layout/暂停.png" alt=""
                        class="layout-musicRow-info-middle-play"
                        @click="playClick"
                        v-show="playsign == true">
                    <img src="../../assets/img/layout/后一首.png" alt=""
                        class="layout-musicRow-info-middle-next"
                        @click="switchSong('next')">
                    <div class="layout-musicRow-info-middle-volume" @click="valueShow = !valueShow">
                        <img src="../../assets/img/layout/音量.png" alt=""
                        class="layout-musicRow-info-middle-volume-img">
                        <div class="layout-musicRow-info-middle-volume-sliderBox"
                            v-show="valueShow">
                            <div class="layout-musicRow-info-middle-volume-sliderBox-slider">
                                <el-slider
                                    v-model="value"
                                    vertical
                                    :max = "volumevalue"
                                    height="140px"
                                    @change='volumevaluechange($event)'
                                    :step='volumestep'>
                                </el-slider>
                                <div class="layout-musicRow-info-middle-volume-sliderBox-slider-txt">
                                    {{value*100}}%
                                </div>
                            </div>
                            <div class="layout-musicRow-info-middle-volume-sliderBox-triangle">

                            </div>
                        </div>
                    </div>
                </div>

                <div class="layout-musicRow-info-right">
                    <img src="../../assets/img/layout/列表.png" alt=""
                        class="layout-musicRow-info-right-list"
                        @click="songListDrawer = true">
                </div>
            </div>
        </div>
    </el-drawer>

    
  </div>
</template>

<script>
import { login } from '@/api/home.js'
import Navbar from '@/components/Navbar.vue'
import store from "@/store/index.js";
import { mapState } from 'vuex'
import audio from "@/utils/playSong.js"
import { musicUrl,songLyrics } from '@/api/songSheet.js'
// import {conversionTime} from '@/utils/dataConversion.js'

export default {
    name: 'Layout',
    data() {
        return {
            navbar: [
                {
                    'primaryMenu': '歌曲',
                    'path': 'home',
                    'imgUrl1': require("../../assets/img/layout/歌单.png"),
                    'imgUrl2': require("../../assets/img/layout/歌单 (1).png"),
                },
                {
                    'primaryMenu': '音乐馆',
                    'path': 'musicHall',
                    'imgUrl1': require("../../assets/img/layout/音乐.png"),
                    'imgUrl2': require("../../assets/img/layout/音乐 (1).png"),
                },
                {
                    'primaryMenu': '搜索',
                    'path': 'search',
                    'imgUrl1': require("../../assets/img/layout/搜索 (2).png"),
                    'imgUrl2': require("../../assets/img/layout/搜索 (3).png"),
                },
                {
                    'primaryMenu': '我的',
                    'path': 'home',
                    'imgUrl1': require("../../assets/img/layout/我.png"),
                    'imgUrl2': require("../../assets/img/layout/我 (1).png"),
                }
            ],
            navbarIndex: 0,
            date: new Date(),
            windowWidth: document.documentElement.clientWidth, //获取屏幕宽度
            windowHeight: document.documentElement.clientHeight, //获取屏幕高度,

            playSongTime: 100, //歌曲时长
            playSongNewTime: 0,//当前歌曲播放进度

            songListDrawer: false, //歌曲列表弹出层
            songListDrawerSize: '300px',

            playSongDrawer: false,//歌曲展开详情弹出层
            direction: 'btt',
            playSongDrawerSize: '100%',

            playModeSwitchSign: false,
            switchSign: 'order',
            //previousSong：上一首歌
            //nextSong：下一首歌
            //listSwitch：列表切换
            //repeat ：重复
            //random: 随机
            //order：顺序
            modeSign: 0,
            // switch: false,
            // playsign: false, //是否在暂停状态
            tempnewsonglyrics: '',//临时存放歌曲,

            valueShow: false,//音量弹出层显示
            value: 0.5,//音量
            volumevalue: 1,//最大音量
            volumestep: 0.1,

            userInfoShow: false,
            user: '',
			pwd: '',
        }
    },
    components: {
        Navbar
    },
    methods:{
        backOffClick() {
            this.$router.back()
        },
        forwardClick() {
            this.$router.forward()
        },
        loginClick() {
            login(this.user, this.pwd).then((res) => {
                console.log('res:',res)
                console.log(res['cookie'])
                store.commit('GETUSERIMG', res['profile']['avatarUrl'])
                store.commit('GETUSERNAME', res['profile']['nickname'])
                // this.$store.commit('COOKIE', res['cookie'])
                
                console.log('登录成功')
            })
            this.userInfoShow=! this.userInfoShow
        },
        dateFormat(time) {
            var date=new Date(time);
            var year=date.getFullYear();
            /* 在日期格式中，月份是从0开始的，因此要加0
            * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
            * */
            var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
            var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
            var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
            var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
            var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
            // 拼接
            return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
        },
        conversionTime(num) {
            var minute = parseInt(num/60);
            var second = parseInt(num%60);
            // if(minute<10){
            //     minute = '0'+minute
            // }
            if(second<10){
                second = '0'+second
            }
            return minute + ':' + second;
        },
        playClick() {
            // console.log('点击')
            // console.log('playsign:',playsign)
            console.log('this.playsign:',this.playsign)
            this.playSign = !this.playSign
            if(this.playsign == false) {
                audio.play()
                console.log('111')
                store.commit('GETPLAYSIGN', !this.playsign)
            }else if(this.playsign == true) {
                audio.pause()
                console.log('222')
                store.commit('GETPLAYSIGN', !this.playsign)
            }
        },
        playSong(id, songName, singerName, songImg, index){
            songLyrics(id).then((res) => {
            console.log("res:",res)
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
        },
        change(time) {
            audio.currentTime = time
            store.commit('GETNEWSONGPLAYTIME', time)
        },
        volumevaluechange(volumevalue) {
            audio.volume = volumevalue
            // console.log('volumevalue:',volumevalue)
        },
        playModeSwitchClick(sign) {
            if(sign == 'repeat') {
                this.modeSign = 1
                this.switchSign = 'repeat'
            }else if(sign =='random') {
                this.modeSign = 2
                this.switchSign = 'random'
            }else if(sign == 'order') {
                this.modeSign = 0
                this.switchSign = 'order'
            }


            this.switchSign = sign
            this.playModeSwitchSign = false
            console.log(' this.switchSign:', this.switchSign)
        },
        switchSong(sign) {
				// console.log('左右按键被点击')
				// console.log('sign:',sign)
				if(sign == 'previous') {
					// console.log('上一首按键被点击')
					// console.log('switchSign:',this.switchSign)
					if(this.switchSign == 'order') {
						// console.log('当前是顺序播放，切换到上一首')
						if(this.newsongindex > 0) {
							this.switchSign = 'previousSong'
							// this.switch = true
							// this.playsign = false
                            store.commit('GETPLAYSIGN', false)
	                        store.commit('GETSWITCH', true)
							// console.log('不是第一首')
						}else{
                            alert('已经是第一首')
						}   
						
					}else {
                        store.commit('GETPLAYSIGN', false)
	                    store.commit('GETSWITCH', true)
						// this.switch = true
						// this.playsign = false
					}
					
				}else if(sign == 'next') {
					// console.log('下一首按键被点击')
					// console.log('switchSign:',this.switchSign)
					if(this.switchSign == 'order') {
						// console.log('当前是顺序播放，切换到下一首')
						
						if(this.newsongindex < this.newsonglistlength) {
							this.switchSign = 'nextSong'
							// this.switch = true
							// this.playsign = false
                            store.commit('GETPLAYSIGN', false)
	                        store.commit('GETSWITCH', true)
							// console.log('不是最后一首')
						}else{
                            alert('已经是最后一首')
						}
					}else {
						// this.switch = true
						// this.playsign = false
                        store.commit('GETPLAYSIGN', false)
	                    store.commit('GETSWITCH', true)
					}
					
					// this.listShowSign = false
				}
			},
    },
    computed: {
        ...mapState(['userimg','username','newsonglist', 'newsonglistlength', 'newsongname', 'newsingername', 'newsongtime', 'newsongplaytime', 'playsign','newsonglyrics','newsongimg', 'newsongindex','newsongurl','switch'])
    },
    watch: {
        windowWidth (val) {
            // console.log("实时屏幕宽度：",val);
            store.commit('GETWINDOWWIDTH', val)
        },
        // windowHeight (val) {
        //     let _this = this;
        //     console.log("实时屏幕高度：",val, that.windowHeight );
        // },
        newsongtime: function(newData) {
            this.playSongTime = newData
        },
        newsongplaytime: function(newData) {
            this.playSongNewTime = newData
            // var playDiv = document.getElementById('current').getBoundingClientRect().top;
            
            if(this.playSongDrawer) {
                try {
                    let lyricsBox = document.querySelector('#lyricsBox').offsetTop;
                    let playDiv = document.querySelector('#current').getBoundingClientRect().top;
                    // let lyricsBoxscrollTop = document.querySelector('#lyricsBox').scrollTop;
                    //歌词滚动条的位置
                    // console.log('lyricsBoxscrollTop:',lyricsBoxscrollTop)
                    // //距离浏览器顶部的位置
                    // console.log('lyricsBox:',lyricsBox)
                    // //距离外侧盒子顶部的位置
                    // console.log('playDiv:',playDiv)
                    console.log(playDiv - lyricsBox)
                    if (playDiv - lyricsBox > 120) {
                        var num = playDiv - lyricsBox - 120
                        document.querySelector('#lyricsBox').scrollTop += num
                        console.log('上移')
                    }else if(playDiv - lyricsBox < 120) {
                        num = playDiv - lyricsBox - 120
                        document.querySelector('#lyricsBox').scrollTop -= 300
                        console.log('上移')
                    }
                    
                }catch {
                    console.log('没有找到该元素')
                }
            }
        },
        playsign:function(newData, oldData){
            console.log('监听playSign的变化')
            console.log(oldData)
            console.log(newData)
            if(oldData == false && newData == true) {
                audio.play()
                console.log('自动播放')
            }
            if(oldData == true && newData == false && this.switch == true) {
                store.commit('GETPLAYSIGN', false)
	            store.commit('GETSWITCH', false)
                console.log('index1:',this.newsongindex)
                console.log('即将播放下一曲') 
                // console.log('switchSign:',this.switchSign)
                if(this.switchSign == 'previousSong') {
                    store.commit('GETNEWSONGINDEX', this.newsongindex-1)
                }else if(this.switchSign == 'nextSong' || this.switchSign == 'order') {
                    store.commit('GETNEWSONGINDEX', this.newsongindex+1)
                }else if(this.switchSign == 'repeat') {
                    store.commit('GETNEWSONGINDEX', this.newsongindex)
                }else if(this.switchSign == 'random') {
                    store.commit('GETNEWSONGINDEX', Math.round(Math.random()*this.newsonglistlength))
                    // console.log('随机播放')
                }
                if(this.modeSign == 0) {
                    this.switchSign = 'order'
                    console.log('正在切换歌曲，切换后将模式改为顺序播放')
                    // console.log('this.switchSign:',this.switchSign)
                }else if(this.modeSign == 1) {
                    this.switchSign = 'repeat'
                    console.log('正在切换歌曲，切换后将模式改为重复播放')
                }else if(this.modeSign == 2) {
                    this.switchSign = 'random'
                    console.log('正在切换歌曲，切换后将模式改为随机播放')
                }
                // console.log('this.switchSign:',this.switchSign)					
                // store.commit('GETNEWSINGID', this.newsonglist[this.newsongindex].id)
                store.commit('GETNEWSONGNAME',this.newsonglist[this.newsongindex].name)
                store.commit('GETNEWSINGERNAME',this.newsonglist[this.newsongindex].ar[0].name)
                store.commit('GETNEWSONGIMG',this.newsonglist[this.newsongindex].al.picUrl)
                musicUrl(this.newsonglist[this.newsongindex].id).then((res) => {
                    this.singUrl = res.data[0].url
                    audio.src = this.singUrl;
                    audio.play()
                    this.playSign = true
                    store.commit('GETPLAYSIGN',true)
                })
                songLyrics(this.newsonglist[this.newsongindex].id).then((res) => {
                    // console.log("res.lrc:", res.lrc.lyric)
                    this.tempnewsonglyrics = res.lrc.lyric.split("\n").map((item)=> {
                        
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
                    store.commit('GETNEWSONGLYRICS',this.tempnewsonglyrics)
                })
                
                
            }
            audio = null
        },
    },
    created() {
        store.commit('GETWINDOWWIDTH', this.windowWidth)
    },
    mounted() {
        //显示当前日期时间
        let _this = this// 声明一个变量指向Vue实例this，保证作用域一致
        this.timer = setInterval(() => {
            _this.date = new Date(); // 修改数据date
        }, 1000)

        window.onresize = () => {
            return (() => {
                window.fullHeight = document.documentElement.clientHeight;
                window.fullWidth = document.documentElement.clientWidth;
                _this.windowWidth = window.fullWidth; //获取屏幕宽度
                _this.windowHeight = window.fullHeight; //获取屏幕高度
            })()
        }
    },
    beforeDestroy() {
        if (this.timer) {
            clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
        }
    }
}
</script>

<style lang="scss">
#layout {
    display: flex;
}
#topbar {
    display: flex;
    justify-content: space-between;
    height: 60px;
}
.topbar-left {
    display: flex;
    padding-left: 30px;
    &-backOff {
        width: 12px;
        height: 12px;
        border-right: 2px solid #E0E0E0;
        border-top: 2px solid #E0E0E0;
        transform: rotate(-135deg);
        margin-top: 24px;
        margin-right: 20px;
        position: relative;
    }
    &-backOff:hover {
        border-right: 2px solid #1ECE9C;
        border-top: 2px solid #1ECE9C;
    }
    &-forward {
        width: 12px;
        height: 12px;
        border-right: 2px solid #E0E0E0;
        border-top: 2px solid #E0E0E0;
        transform: rotate(45deg);
        margin-top: 24px;
    }
    &-forward:hover {
        border-right: 2px solid #1ECE9C;
        border-top: 2px solid #1ECE9C;
    }
    &-box {
        position: relative;
        margin-left: 30px;
        &-img {
            position: absolute;
            left: 15px;
            top: 20px;
            width: 20px;
            height: 20px;
        }
        &-input {
            outline:none;
            border: none;
            background-color: #E3E3E3;
            width: 15vw;
            height: 30px;
            margin-top: 15px;
            padding-left: 40px;
            border-radius: 30px;
        }
    }
}
.topbar-right {
    display: flex;
}
.topbar-userInfo {
    position: relative;
    display: flex;
    padding-right: 20px;
    &-img {
        border-radius: 50%;
        width: 40px;
        height: 40px;
        margin-top: 10px;
        margin-right: 10px;
    }
    &-name {
        line-height: 60px;
        font-weight: bold;
        font-family: 黑体;
        margin-right: 10px;
    }
    &-pupopBox {
        z-index: 11;
        position: absolute;
        top: 60px;
        left: 0px;
        background-color: #fff;
        &-eval {
            width: 100px;
            height: 40px;
            font-size: 13px;
            text-align: center;
            line-height: 40px;
        }
        &-eval:hover {
            background-color: #F0F0F0;
        }
    }
}
.topbar-time {
    font-size: 14px;
    // font-weight: bolder;
    line-height: 60px;
    margin-right: 50px;
}
.layout-right {
    &-content {
        margin: 0px 30px 0px 30px;
        overflow: auto;
        &::-webkit-scrollbar {
            width: 0;
        }
    }
    
}
.layout-musicRow {
    // border: 1px solid pink;
    height: 80px;
    padding: 0px 30px 0px 30px;
    &-info {
        height: 60px;
        display: flex;
        justify-content: space-between;
        // border: 1px solid red;
        &-left {
            display: flex;
            // border: 1px solid red;
            width: 200px;
            &-imgBox {
                width: 50px;
                height: 50px;
                border-radius: 2px;
                position: relative;
                &-singImg {
                    width: 100%;
                    height: 100%;
                }
                &-showImg {
                    position: absolute;
                    top: 30%;
                    left: 35%;
                    width: 20px;
                    height: 20px;
                    display: none;
                }
                &-txt {
                    position: absolute;
                    top: 50%;
                    left: 70%;
                    width: 90px;
                    height: 20px;
                    font-size: 10px;
                    text-align: center;
                    line-height: 20px;
                    border: 1px solid gray;
                    background-color: #fff;
                    display: none;
                }
            }
            &-imgBox:hover .layout-musicRow-info-left-imgBox-showImg,&-imgBox:hover .layout-musicRow-info-left-imgBox-txt{
                display: inline-block;
            }
            &-box {
                // border: 1px solid pink;
                margin-left: 10px;
                max-width: 140px;
                height: 60px;
                overflow: hidden;
                &-singName {
                    font-size: 14px;
                    height: 18px;
                    overflow: hidden;
                    // line-height: 60px;
                }
                &-singerName {
                    font-size: 14px;
                    color: gray;
                    height: 18px;
                    overflow: hidden;
                    // line-height: 60px;
                }
            }
        }
        &-middle {
            display: flex;
            justify-content: space-between;
            // border: 1px solid red;
            align-items: center;
            width: 200px;
            &-playMode {
                height: 20px;
                width: 20px;
                display: inline-block;
                // border: 1px solid pink;
                position: relative;
                &-modeList {
                    position: absolute;
                    top: -150px;
                    left: -50px;
                    height: 160px;
                    width: 120px;

                    // border: 1px solid pink;
                    &-evalBox {
                        // border: 1px solid pink;
                        border-radius: 8px;
                        overflow: hidden;
                        box-shadow:2px 2px 10px #909090;
                    }
                    &-eval {
                        height: 40px; 
                        display: flex;
                        justify-content: space-between;
                        padding-left: 20px;
                        padding-right: 20px;
                        // border: 1px solid pink;
                        background-color: #ffffff;
                        border-top: 1px solid #F0F0F0;
                            border-bottom: 1px solid #F0F0F0;
                        &-img {
                            // border: 1px solid pink;
                            display: inline-block;
                            height: 20px;
                            width: 20px;
                            margin-top: 10px;
                        }
                        &-txt {
                            font-size: 14px;
                            line-height: 40px;
                            font-weight: 600;
                        }   
                    }
                    &-eval:hover {
                        background-color: #F3F3F2;
                    }
                    &-triangle {
                        border-style: solid;
                        border-width: 15px 15px 0px 15px;
                        border-color: #F0F0F0 transparent transparent  transparent;
                        width: 0px;
                        height: 0px;
                        margin-left: 37%;
                        // box-shadow:2px 2px 2px #909090;
                        // text-shadow: 2px 2px;
                    }
                }
            }
            &-previousSong {
                height: 30px;
                width: 30px;
                display: inline-block;
            }
            &-play {
                height: 40px;
                width: 40px;
                display: inline-block;
            }
            &-next {
                height: 30px;
                width: 30px;
                display: inline-block;
            }
            &-volume {
                height: 20px;
                width: 20px;
                display: inline-block;
                position: relative;
                &-img {
                    height: 100%;
                    width: 100%;
                }
                &-sliderBox {
                    position: absolute;
                    // height: 200px;
                    // width: 60px;
                    // border: 1px solid pink;
                    top: -220px;
                    left: -20px;
                    &-slider {
                        height: 185px;
                        width: 50px;
                        border-radius: 8px;
                        overflow: hidden;
                        background-color: #fff;
                        box-shadow:2px 2px 10px #909090; 
                        padding-top: 15px;
                        padding-left: 10px; 
                        &-txt {
                            margin-top: 10px;
                            margin-left: 5px;
                            font-weight: 700;
                        }
                    }
                    &-triangle {
                        border-style: solid;
                        border-width: 15px 15px 0px 15px;
                        border-color: #beb5b5 transparent transparent  transparent;
                        width: 0px;
                        height: 0px;
                        margin-left: 22%;
                        // box-shadow:2px 2px 2px #909090;
                        // text-shadow: 2px 2px;
                    }
                }
            }
        }
        &-right {
            display: flex;
            flex-direction: row-reverse; 
            justify-content: space-between;
            // border: 1px solid red;
            align-items: center;
            width: 200px;
            &-list {
                width: 20px;
                height: 20px;
            }
        }
    }
}


.el-slider__runway  {
    height: 2px;
    margin: 4px;
}
.el-slider__bar {
    height: 2px;
    background-color: #1DCC94;
}
.el-slider__button-wrapper {
    top: -16.5px;
}
.el-slider__button {
    width: 2px;
    height: 2px;
    background-color: #1DCC94;
    border: 2px solid #1DCC94;
}

.songList {
    &-title {
        font-size: 22px;
        font-weight: bolder;
        margin-top: 30px;
        margin-left: 30px;
    }
    &-content {
        // border: 1px solid pink;
        margin: 30px 30px 0px 30px;
        &-row {
            margin-bottom: 0px;
            // border: 1px solid pink;
            height: 40px;
            line-height: 40px;
            display: flex;
            &-songName {
                font-size: 14px;
            }
            &-singerName {
                font-size: 12px;
                color: gray;
            }
        }
        &-row:hover {
            background-color: #EEEEEE;
        }
    }
}
.drawer-content {
    // border: 1px solid pink;
    position: relative;
    &-bgimg {
        position: absolute;
        height: 100%;
        width: 100%;
        // display: inline-block;
        // border: 1px solid pink;
        // background-color: rgb(179, 9, 9);
        filter: blur(90rpx) opacity(60%) !important;
        -webkit-filter:blur(90rpx) opacity(60%) !important;
        &-img {
            width: 100%;
            height: 100%;
            filter: blur(90rpx) opacity(60%) !important;
            -webkit-filter:blur(90rpx) opacity(60%) !important;
        }
    }
    &-option {
        display: flex;
        flex-direction: row-reverse;
        // border: 1px solid pink;
    }
    &-info {
        display: flex;
        justify-content: space-between;
        width: 800px;
        height: 300px;
        // border: 1px solid pink;
        &-cdimg {
            position: absolute;
            // border: 1px solid pink;
            height: 150px;
            top: -40px;
            left: 140px;
            transform-origin: left top;
            transform: rotate(-45deg);
        }
        &-songimg {
            display: inline-block;
            width: 220px;
            height: 220px;
            border: 40px solid rgb(0, 0, 0);
            border-radius: 50%;
            filter: blur(90rpx) opacity(60%);
        }
        &-lyrics {
            width: 400px;
            height: 300px;
            // border: 1px solid pink;
            z-index: 11;
            overflow: auto;
            &-row {
                // height: 40px;
                font-size: 20px;
                line-height: 40px;
                text-align: center;
                color: rgb(135, 135, 135);
                // border: 1px solid pink;
            }
        }
        &-lyrics::-webkit-scrollbar {
            width: 4px;
            height: 10px;
        }
        &-lyrics::-webkit-scrollbar-thumb {
            // border-radius: 5px;
            background: #1DCC94;
        }
    }
}
.lyricsRowActive {
    color: #1DCC94;
    font-weight: bolder;
}
.drawer-content-info-songimgBox {
    // border: 1px solid pink;
    position: relative;
}
@keyframes rotate {
    0% {
        transform-origin: left top;
        transform: rotate(-45deg);
    }
    100% {
        transform-origin: left top;
        transform: rotate(-15deg);
    }
}
@keyframes singImgRotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
.igmActive {
    animation-name: singImgRotate;
    animation-duration: 60s;
    /* 动画速度曲线 */
    animation-timing-function: linear;
    /* 动画开始时间 */
    animation-itertion-count: infinite;
    -webkit-animation-iteration-count:infinite;
    animation-delay: 0s;
}
.cdActive {
    animation-name: rotate;
    animation-duration: 0.5s;
    /* 动画速度曲线 */
    animation-timing-function: linear;
    /* 动画开始时间 */
    animation-itertion-count: 1;
    -webkit-animation-iteration-count:1;
    animation-delay: 0s;
    animation-fill-mode: forwards;
}
.songSheetsongListrow1Active {
  color: #1FD0A4;
  background-color: #EEEEEE;
}
</style>