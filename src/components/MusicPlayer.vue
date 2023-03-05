<template>
  <div id="musicPlayer">
    <div class="layout-musicRow">
            <el-slider v-model="playSongNewTime" :max="playSongTime"
                @change='change($event)'></el-slider>
            <div class="layout-musicRow-info">
                <div class="layout-musicRow-info-left">
                    <div class="layout-musicRow-info-left-imgBox"
                        @click="songDrawerStatus">
                        <img src="../assets/home/音乐 (2).png" alt=""
                             class="layout-musicRow-info-left-imgBox-singImg"
                            v-show="newsongimg == ''">
                        <img :src=newsongimg alt=""
                             class="layout-musicRow-info-left-imgBox-singImg"
                             v-show="newsongimg != ''">
                        
                        <!-- <img :src="!playSongDrawer?'../assets/img/layout/下拉.png':'../assets/img/layout/icon_向上_2.png'" 
                            alt="" v-show="!playSongDrawer"
                            class="layout-musicRow-info-left-imgBox-showImg"> -->
                        <img src="../assets/img/layout/icon_向上_2.png" alt="" v-show="!playSongDrawer"
                            class="layout-musicRow-info-left-imgBox-showImg">
                        <img src="../assets/img/layout/下拉.png" alt="" v-show="playSongDrawer==true"
                            class="layout-musicRow-info-left-imgBox-showImg">
                        <div class="layout-musicRow-info-left-imgBox-txt" v-show="!playSongDrawer">
                            <span>{{ !playSongDrawer?'展开':'收起' }}</span>歌曲详情页
                        </div>
                    </div>
                    <div class="layout-musicRow-info-left-box">
                        <div class="layout-musicRow-info-left-box-singName">{{newsongname}}</div>
                        <div class="layout-musicRow-info-left-box-singerName">{{newsingername}}</div>
                        <div style="font-size: 11px">{{conversionTime(newsongplaytime)}} / {{conversionTime(newsongtime)}}</div>
                    </div>
                </div>

                <div class="layout-musicRow-info-middle">
                    <!-- <div class="layout-musicRow-info-middle-playMode">
                        <img src="../assets/img/layout/顺序播放.png" alt=""
                            class="layout-musicRow-info-middle-playMode"
                            @click="playModeSwitchSign = !playModeSwitchSign"
                            v-show="switchSign == 'order'">
                        <img src="../assets/img/layout/单曲循环_32.png" alt=""
                            class="layout-musicRow-info-middle-playMode"
                            @click="playModeSwitchSign = !playModeSwitchSign"
                            v-show="switchSign == 'repeat'">
                        <img src="../assets/img/layout/随机播放.png" alt=""
                            class="layout-musicRow-info-middle-playMode"
                            @click="playModeSwitchSign = !playModeSwitchSign"
                            v-show="switchSign == 'random'">
                        <div class="layout-musicRow-info-middle-playMode-modeList"
                            v-show="playModeSwitchSign">
                            <div  class="layout-musicRow-info-middle-playMode-modeList-evalBox">
                                <div class="layout-musicRow-info-middle-playMode-modeList-eval"
                                    @click="playModeSwitchClick('random')">
                                    <img src="../assets/img/layout/随机播放.png" alt=""
                                        class="layout-musicRow-info-middle-playMode-modeList-eval-img">
                                    <div class="layout-musicRow-info-middle-playMode-modeList-eval-txt">
                                        随机播放
                                    </div>
                                </div>
                                <div class="layout-musicRow-info-middle-playMode-modeList-eval"
                                    @click="playModeSwitchClick('repeat')">
                                    <img src="../assets/img/layout/单曲循环_32.png" alt=""
                                        class="layout-musicRow-info-middle-playMode-modeList-eval-img">
                                    <div class="layout-musicRow-info-middle-playMode-modeList-eval-txt">
                                        单曲循环
                                    </div>
                                </div>
                                <div class="layout-musicRow-info-middle-playMode-modeList-eval"
                                    @click="playModeSwitchClick('order')">
                                    <img src="../assets/img/layout/顺序播放.png" alt=""
                                        class="layout-musicRow-info-middle-playMode-modeList-eval-img">
                                    <div class="layout-musicRow-info-middle-playMode-modeList-eval-txt">
                                        顺序播放
                                    </div>
                                </div>
                            </div>
                            <div class="layout-musicRow-info-middle-playMode-modeList-triangle"></div>
                        </div>
                    </div> -->


                    <el-dropdown placement="top">
                        <img src="../assets/img/layout/顺序播放.png" alt=""
                            class="layout-musicRow-info-middle-playMode"
                            @click="playModeSwitchSign = !playModeSwitchSign"
                            v-show="switchSign == 'order'">
                        <img src="../assets/img/layout/单曲循环_32.png" alt=""
                            class="layout-musicRow-info-middle-playMode"
                            @click="playModeSwitchSign = !playModeSwitchSign"
                            v-show="switchSign == 'repeat'">
                        <img src="../assets/img/layout/随机播放.png" alt=""
                            class="layout-musicRow-info-middle-playMode"
                            @click="playModeSwitchSign = !playModeSwitchSign"
                            v-show="switchSign == 'random'">
                        <el-dropdown-menu>
                            <el-dropdown-item>
                                <div class="layout-musicRow-info-middle-playMode-modeList-eval"
                                    @click="playModeSwitchClick('random')">
                                    <img src="../assets/img/layout/随机播放.png" alt=""
                                        class="layout-musicRow-info-middle-playMode-modeList-eval-img">
                                    <div class="layout-musicRow-info-middle-playMode-modeList-eval-txt">
                                        随机播放
                                    </div>
                                </div>
                            </el-dropdown-item>

                            <el-dropdown-item>
                                <div class="layout-musicRow-info-middle-playMode-modeList-eval"
                                    @click="playModeSwitchClick('repeat')">
                                    <img src="../assets/img/layout/单曲循环_32.png" alt=""
                                        class="layout-musicRow-info-middle-playMode-modeList-eval-img">
                                    <div class="layout-musicRow-info-middle-playMode-modeList-eval-txt">
                                        单曲循环
                                    </div>
                                </div>
                            </el-dropdown-item>

                            <el-dropdown-item>
                                <div class="layout-musicRow-info-middle-playMode-modeList-eval"
                                    @click="playModeSwitchClick('order')">
                                    <img src="../assets/img/layout/顺序播放.png" alt=""
                                        class="layout-musicRow-info-middle-playMode-modeList-eval-img">
                                    <div class="layout-musicRow-info-middle-playMode-modeList-eval-txt">
                                        顺序播放
                                    </div>
                                </div>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>




                    <img src="../assets/img/layout/上一首.png" alt=""
                        class="layout-musicRow-info-middle-previousSong"
                        @click="switchSong('previous')">
                    <img src="../assets/img/layout/播放.png" alt=""
                        class="layout-musicRow-info-middle-play"
                        @click="playClick"
                        v-show="playsign == false">
                    <img src="../assets/img/layout/暂停.png" alt=""
                        class="layout-musicRow-info-middle-play"
                        @click="playClick"
                        v-show="playsign == true">
                    <img src="../assets/img/layout/后一首.png" alt=""
                        class="layout-musicRow-info-middle-next"
                        @click="switchSong('next')">
                    
                    <el-dropdown placement="top">
                        <img src="../assets/img/layout/音量.png" alt=""
                            style="width: 20px;height: 20px;display: block;">
                        <el-dropdown-menu>
                            <el-dropdown-item>
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
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>

                </div>

                <div class="layout-musicRow-info-right">
                    <img src="../assets/img/layout/列表.png" alt=""
                        class="layout-musicRow-info-right-list"
                        @click="updatePopup">
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import store from "@/store/index.js";
import { mapState } from 'vuex'
import audio from "@/utils/playSong.js"
import { musicUrl,songLyrics } from '@/api/songSheet.js'

export default {
  name: 'MusicPlayer',
  data() {
    return {

        playSongTime: 0, //歌曲时长
        playSongNewTime: 0,//当前歌曲播放进度

        playModeSwitchSign: false, //播放模式弹出框的显示标志
        valueShow: false,//音量弹出层显示
        value: 0.5,//音量
        volumevalue: 1,//最大音量
        volumestep: 0.1,

        switchSign: 'order',
            //previousSong：上一首歌
            //nextSong：下一首歌
            //listSwitch：列表切换
            //repeat ：重复
            //random: 随机
            //order：顺序
    }
  },
  props: {
    playSongDrawer: {
      type: Boolean,
      require: true
    }
  },
  computed: {
    ...mapState(['newsonglist', 'newsonglistlength', 'newsongname', 'newsingername', 'newsongtime', 'newsongplaytime', 'playsign','newsonglyrics','newsongimg', 'newsongindex','newsongurl','switch'])
  },
  methods: {
    updatePopup() {
        this.$emit('update-popup-status')
    },  
    songDrawerStatus() {
        this.$emit('update-songdrawer-status')
    },
    /**
     * 时间转换
     * @param {*} num 时间
     */
    conversionTime(num) {
        let minute = parseInt(num/60);
        let second = parseInt(num%60);
        // if(minute<10){
        //     minute = '0'+minute
        // }
        if(second<10){
            second = '0'+second
        }
        return minute + ':' + second;
    },
    /**
     * 改变歌曲进度条
     * @param {*} time 时间
     */
    change(time) {
        audio.currentTime = time
        store.commit('GETNEWSONGPLAYTIME', time)
    },
    /**
     * 切换播放模式
     * @param {*} sign 播放模式
     */
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
    /**
     * 切换上一首或者下一首
     * @param {*} sign 标志
     */
    switchSong(sign) {
        if(sign == 'previous') {
            // console.log('上一首按键被点击')
            if(this.switchSign == 'order') {
                // console.log('当前是顺序播放，切换到上一首')
                if(this.newsongindex > 0) {
                    this.switchSign = 'previousSong'
                    store.commit('GETPLAYSIGN', false)
                    store.commit('GETSWITCH', true)
                    // console.log('不是第一首')
                }else{
                    alert('已经是第一首')
                }   
            }else {
                store.commit('GETPLAYSIGN', false)
                store.commit('GETSWITCH', true)
            }
        }else if(sign == 'next') {
            // console.log('下一首按键被点击')
            if(this.switchSign == 'order') {
                // console.log('当前是顺序播放，切换到下一首')
                if(this.newsongindex < this.newsonglistlength) {
                    this.switchSign = 'nextSong'
                    store.commit('GETPLAYSIGN', false)
                    store.commit('GETSWITCH', true)
                }else{
                    alert('已经是最后一首')
                }
            }else {
                store.commit('GETPLAYSIGN', false)
                store.commit('GETSWITCH', true)
            }
        }
    },
    /**
     * 修改播放音量
     * @param {*} volumevalue 
     */
    volumevaluechange(volumevalue) {
        audio.volume = volumevalue
    },
    playClick() {
            this.playSign = !this.playSign
            if(this.playsign == false) {
                audio.play()
                store.commit('GETPLAYSIGN', !this.playsign)
            }else if(this.playsign == true) {
                audio.pause()
                store.commit('GETPLAYSIGN', !this.playsign)
            }
        },
  },
  watch: {
        newsongtime: function(newData) {
            this.playSongTime = newData
        },
        newsongplaytime: function(newData) {
            this.playSongNewTime = newData
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
                // console.log('index1:',this.newsongindex)
                // console.log('即将播放下一曲') 
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
                    // console.log('正在切换歌曲，切换后将模式改为顺序播放')
                    // console.log('this.switchSign:',this.switchSign)
                }else if(this.modeSign == 1) {
                    this.switchSign = 'repeat'
                    // console.log('正在切换歌曲，切换后将模式改为重复播放')
                }else if(this.modeSign == 2) {
                    this.switchSign = 'random'
                    // console.log('正在切换歌曲，切换后将模式改为随机播放')
                }
                // console.log('this.newsonglist[this.newsongindex].id:',this.newsonglist[this.newsongindex].id)					
                store.commit('GETNEWSINGID', this.newsonglist[this.newsongindex].id)
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
                            // console.log('----:',{time,lrc});
                            return {time, lrc}
                        }else{
                            return " "
                        }
                    })
                    store.commit('GETNEWSONGLYRICS',this.tempnewsonglyrics)
                    console.log("this.tempnewsonglyrics:", this.tempnewsonglyrics)
                })
                
                
            }
            // console.log('audio:',audio);
            // audio = null
        },
    },
    mounted(){
        this.playSongTime = store.state.newsongtime
    }
}
</script>

<style lang="scss">
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
.el-dropdown-menu__item {
    padding: 0 5px;
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
</style>