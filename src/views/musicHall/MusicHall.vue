<template>
    <div id="musicHall">
        <div class="musicHall-topBar">
            <div v-for="(item, index) in topBar" :key="index"
                class="musicHall-topBar-eval"
                :class="{topBarEvalActive: topBarIndex == index}"
                @click="topBarIndex = index">
                {{item}}
            </div>    
        </div>

        <div class="musicHall-content">
            <div v-show="topBarIndex == 0">
                <div class="musicHall-content-rank">
                <div class="musicHall-content-rank-eval"
                    v-for="(item, index) in rankingListTypeDataOne" :key="index"
                    @click="rankEvalClick(item.id)">
                    <img :src=item.coverImgUrl alt="" class="musicHall-content-rank-eval-img">
                    <div class="musicHall-content-rank-eval-info">
                        <div class="musicHall-content-rank-eval-info-title">{{item.name}}</div>
                        <div class="musicHall-content-rank-eval-info-song"
                             v-for="(it,itindex) in item.tracks" :key="itindex">
                            {{itindex+1}}-{{it.first}}-{{it.second}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="musicHall-content-title">
                全球榜
            </div>
            <div class="musicHall-content-ListContent">
                <div class="musicHall-content-ListContent-eval"
                    v-for="(item,index) in rankingListTypeDataTwo" :key="index"
                    @click="rankEvalClick(item.id)">
                    <div class="musicHall-content-ListContent-eval-imgBox">
                         <img :src=item.coverImgUrl alt="" class="musicHall-content-ListContent-eval-imgBox-img">
                         <img src="../../assets/home/播放.png" alt="" class="musicHall-content-ListContent-eval-imgBox-img2">
                        <div class="musicHall-content-ListContent-eval-imgBox-txt">{{transformation(item.playCount)}}</div>
                    </div>
                    
                    <div class="musicHall-content-ListContent-eval-txt">{{item.name}}</div>
                </div>
            </div>
            </div>


            <div v-show="topBarIndex == 1">
                <div class="musicHall-content-area">
                    <div class="musicHall-content-area-txt">语种:</div>
                    <div v-for="(item, index) in areaData" :key="index"
                        class="musicHall-content-area-eval"
                        :class="{areaevalActive: areaClassIndex == index}"
                        @click="singerScrollClick(item.index, 'area', index)">
                        {{item.name}}
                    </div>
                </div>
                <div class="musicHall-content-type">
                    <div class="musicHall-content-type-txt">分类:</div>
                    <div v-for="(item, index) in typeData" :key="index"
                     class="musicHall-content-type-eval"
                     :class="{typeevalActive: typeClassIndex == index}"
                     @click="singerScrollClick(item.index, 'type', index)">
                        {{item.name}}
                    </div>
                </div>
                <div class="musicHall-content-singerInfoBox" v-infinite-scroll="load">
                    <div class="musicHall-content-singerInfoBox-eval"
                        v-for="(item,index) in singerData" :key="index"
                        @click="singerInfoClick(item.id)">
                        <!-- <img :src=item.img1v1Url alt="" class="musicHall-content-singerInfoBox-eval-img"
                            v-show="index < 10"> -->
                        
                        <el-image :src=item.img1v1Url></el-image>

                        <div class="musicHall-content-singerInfoBox-eval-name">
                            {{item.name}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {rankingListInfo, singerClassification} from '@/api/musicHall'
import {tenThousand} from '@/utils/dataConversion'
export default {
    name: 'MusicHall',
    data() {
        return {
            transformation: tenThousand,
            topBar: ['排行','歌手','分类歌单'],
            topBarIndex: 0,
            rankingListTypeDataOne: [],
            rankingListTypeDataTwo: [],
            areaData: [
					{
						'name': '全部',
						'index': '-1'
					},
					{
						'name': '华语',
						'index': '7'
					},
					{
						'name': '欧美',
						'index': '96'
					},
					{
						'name': '日本',
						'index': '8'
					},
					{
						'name': '韩国',
						'index': '16'
					},
					{
						'name': '其他',
						'index': '0'
					},
            ],
            areaSign: -1,
            typeData: [
                {
                    'name': '全部',
                    'index': '-1'
                },
                {
                    'name': '男歌手',
                    'index': '1'
                },
                {
                    'name': '女歌手',
                    'index': '2'
                },
                {
                    'name': '乐队',
                    'index': '3'
                },
            ],
            typeSign: -1,
            singerData: [],
            areaIndex: 0,
            areaClassIndex: 0,
            typeIndex: 0,
            typeClassIndex: 0,
            offset: 0
        }
    },
    methods: {
        load() {
            if(this.topBarIndex == 1) {
                // console.log('加载中')
                this.offset += 30
                singerClassification(this.typeIndex, this.areaIndex, this.offset).then((res)=>{
                    // console.log('111')
                    // console.log(res.artists)
                    this.singerData = this.singerData.concat(res.artists);
                })
            }
            
        },
        rankEvalClick(id) {
            this.$router.push({
                name: 'songSheet',
                params: {
                id: id
                }
            })
        },
        singerScrollClick(index, msg, signindex) {
            if(msg == 'area') {
                this.areaClassIndex = signindex
                this.areaIndex = index
            }else if(msg == 'type'){
                this.typeClassIndex = signindex
                this.typeIndex = index
            }
            this.offset = 0
            singerClassification(this.typeIndex, this.areaIndex, this.offset).then((res)=>{
                // console.log('111')
                console.log(res.artists)
                this.singerData = res.artists
            })
        },
        singerInfoClick(id) {
            console.log('id:',id)
            this.$router.push({
                name: 'singerInfo',
                params: {
                    id: id
                }
            })
        }
    },
    created() {
        rankingListInfo().then((res)=>{
            // console.log('res:',res)
            this.rankingListTypeDataOne = res.list.slice(0,4)
            this.rankingListTypeDataTwo = res.list.slice(4,-1)
            // console.log('rankingListTypeDataOne:',this.rankingListTypeDataOne)
            // console.log('rankingListTypeDataOne:',this.rankingListTypeDataTwo)
        })
        singerClassification(this.typeSign, this.areaSign, this.offset).then((res)=>{
            // console.log('onLoad')
            // console.log(res.artists)
            // console.log(this)
            this.singerData = res.artists
        })
    }
}
</script>

<style lang="scss">
.musicHall-topBar {
    display: flex;
    height: 40px;
    // border: 1px solid pink;
    &-eval {
        font-weight: 400;
        margin-right: 40px;
        line-height: 40px;
    }
}
.topBarEvalActive {
    color: #1ECE9A;
    border-bottom: 2px solid #1ECE9A;
}
.musicHall-content{ 
    margin-top: 30px;
    // border: 1px solid pink;
    &-rank {
        display: flex;
        flex-wrap: wrap;
        &-eval {
            // border: 1px solid pink;
            width: 360px;
            height: 150px;
            border-radius: 8px;
            background-color: #EFEFEF;
            display: flex;
            margin-right: 10px;
            margin-bottom: 20px;
            &-img {
                display: inline-block;
                width: 150px;
                height: 150px;
                // background-color: pink;
                border-radius: 8px;
                margin-right: 15px;
            }
            &-info {
                width: 180px;
                // border: 1px solid pink; 
                &-title {
                    font-size: 20px;
                    font-weight: bolder;
                    margin-top: 20px;
                    margin-bottom: 10px;
                    width: 180px;
                    overflow: hidden;
                }
                &-song {
                    width: 180px;
                    overflow: hidden;  
                    font-size: 14px;
                    color: #9C9C9C;
                    // border: 1px solid pink; 
                    height: 20px;
                    line-height: 20px;
                    margin-bottom: 10px;
                    width: 180px;
                    overflow: hidden;
                }
            }
        }
        &-eval:hover {
            // box-shadow: 2px 2px 2px rgb(131, 129, 129);
            margin-top: -10px;
        }
    }
    &-title {
        font-size: 20px;
        font-weight: bolder;
        margin-bottom: 20px;
    }
    &-ListContent {
        display: flex;
        flex-wrap: wrap;
        &-eval {
            height: 160px;
            width: 130px;
            // border: 1px solid pink;
            margin-bottom: 20px;
            margin-right: 19px;
            border-radius: 8px;
            &-imgBox {
                height: 130px;
                width: 130px;
                position: relative;
                &-img {
                    width: 100%;
                    height: 100%;
                    border-radius: 8px;
                    display: inline-block;
                }
                &-img2 {
                    position: absolute;
                    height: 50px;
                    width: 50px;
                    top: 30%;
                    left: 30%;
                    z-index: 11;
                    display: none;
                }
                &-txt {
                    position: absolute;
                    top: 0%;
                    right: 0%;
                    color: #fff;
                    background-color: #050D14;
                    padding: 5px 10px 5px 10px;
                    padding-left: 10px;
                    padding-right: 10px;
                    border-radius: 16px;
                    font-size: 12px;
                }
            }
            &-txt {
                font-size: 13px;
                color: #817c7c;
            }
            &-imgBox:hover .musicHall-content-ListContent-eval-imgBox-img2{
                display: inline-block;
            }
        }
    }
    &-area {
        display: flex;
        height: 20px;
        font-size: 14px;
        line-height: 20px;
        margin-bottom: 10px;
        // border: 1px solid pink;
        &-txt {
            margin-right: 30px;
        }
        &-eval {
            margin-right: 30px;
            // border: 1px solid pink;
            padding-left: 10px;
            padding-right: 10px;
            border-radius: 16px;
        }
    }
    &-type {
        display: flex;
        font-size: 14px;
        line-height: 20px;
        // border: 1px solid pink;
        &-txt {
            margin-right: 30px;
        }
        &-eval {
            margin-right: 30px;
            // border: 1px solid pink;
            padding-left: 10px;
            padding-right: 10px;
            border-radius: 16px;
        }
    }
    &-singerInfoBox {
        margin-top: 50px;
        // height: 50px;
        display: flex;
        flex-wrap: wrap;
        // border: 1px solid pink;
        &-eval {
            width: 170px;
            // height: 50px;
            margin-right: 17px;
            // border: 1px solid pink;
            margin-bottom: 30px;
            &-img {
                display: inline-block;
                width: 170px;
                height: 170px;
                border-radius: 50%;
                margin-bottom: 10px;
                // border: 1px solid pink;
            }
            &-name {
                text-align: center;
                width: 170px;
                overflow: hidden;
            }
            &-name:hover {
                color: #1ECD99;
            }
        }
    }
}
.areaevalActive, .typeevalActive {
    background-color: #1FD0A4;
    color: #fff;
}
</style>