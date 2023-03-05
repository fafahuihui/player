<template>
    <div id="lyric">
        <div class="drawer-content">
            <img :src="newsongimg" class="drawer-content-bgimg">
            <div class="drawer-content-info">
                <div class="drawer-content-info-songimgBox">
                    <img :src="newsongimg" alt=""
                    class="drawer-content-info-songimg" :class="{igmActive:playsign == true}">
                    <img src="../../../assets/img/layout/needle-ab.png" alt=""
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
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Lyric',
    data() {
        return {
            direction: 'btt',
            playSongDrawerSize: '100%',
        }
    },
    props: {
        playSongDrawer: {
            type: Boolean,
            require: true
        }
    },       
    computed: {
        ...mapState(['newsonglyrics','newsongplaytime','newsongimg', 'playsign'])
    },
    watch: {
        newsongplaytime: function(newData) {
            // console.log('监听位置')
            this.playSongNewTime = newData
            // console.log('this.playSongDrawer:',this.playSongDrawer)
            // console.log('this.props.playSongDrawer:',this.props.playSongDrawer)
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
                    // console.log(playDiv - lyricsBox)
                    if (playDiv - lyricsBox > 120) {
                        var num = playDiv - lyricsBox - 120
                        document.querySelector('#lyricsBox').scrollTop += num
                        // console.log('上移')
                    }else if(playDiv - lyricsBox < 120) {
                        num = playDiv - lyricsBox - 120
                        document.querySelector('#lyricsBox').scrollTop -= 300
                        // console.log('上移')
                    }
                    
                }catch {
                    // console.log('没有找到该元素')
                }
            }
        },
    }
}
</script>

<style lang="scss">
#lyric{
    height: calc(100vh - 80px);
}
.drawer-content {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    &-bgimg {
        position: absolute;
        height: 100%;
        width: 100%;
        filter: blur(10px) opacity(80%) !important;
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
    }
    &-info {
        display: flex;
        justify-content: space-between;
        width: 800px;
        height: 300px;
        &-cdimg {
            position: absolute;
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
            z-index: 11;
            overflow: auto;
            &-row {
                height: 40px;
                font-size: 20px;
                line-height: 40px;
                text-align: center;
                color: rgb(135, 135, 135);

                // background:#7e7e7e -webkit-linear-gradient(left, #1DCC94, #1DCC94) no-repeat 0 0;
                // -webkit-text-fill-color:transparent;
                // -webkit-background-clip:text;
                // background-size:0 100%;
                // animation: scan 5s linear;
                // animation-name: scan;
                // animation-timing-function: linear;
                // animation-play-state: paused;
            }
        }
        &-lyrics::-webkit-scrollbar {
            width: 4px;
            height: 10px;
        }
        &-lyrics::-webkit-scrollbar-thumb {
            background: #1DCC94;
        }
    }
}
@keyframes scan {
    0% {
        background-size:0 100%;
    }
    100% {
        background-size:100% 100%;
    }

}

// #lyricsBox {
//     border: 1px solid pink;
// }
.lyricsRowActive {
    font-weight: bolder;
    font-size: 24px;
    background-size:100% 100%;
    color: #1DCC94;
}
.drawer-content-info-songimgBox {
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
</style>