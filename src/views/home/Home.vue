<template>
  <div id="home">
    <el-carousel :interval="3000" type="card" height='15vw'>
      <el-carousel-item v-for="item in bannerList" :key="item">
        <img :src=item alt="" class="home-banner">
      </el-carousel-item>
    </el-carousel>
    <div class="home-singList"> 
        <title-block :titleBlock="recommendTitleBlock"></title-block>
        <div id="singListBox">
          <songlist-info v-for="(item, index) in recommedSongList"
            :key="index" :songListData=item :sign=recommed>
          </songlist-info>
        </div>
    </div>

    <div class="home-singList"> 
        <title-block :titleBlock="selectedTitleBlock"></title-block>
        <div id="singListBox">
          <songlist-info v-for="(item, index) in selectedSongList"
            :key="index" :songListData=item :sign=selected>
          </songlist-info>
        </div>
    </div>

  </div>
</template>

<script>
import {getBanner,recommendedSongList,topPlaylist} from '@/api/home'
import TitleBlock from '@/components/TitleBlock.vue'
import SonglistInfo from '@/components/SonglistInfo.vue'
export default {
    name: 'Home', 
    data() {
        return {
          carouselheight : '7.5rem',
          bannerList: [],
          recommendTitleBlock: ['推荐歌单','tuijian'],
          recommedSongList: [],
          recommed: 'recommed',
          selectedTitleBlock: ['精选歌单','jingxuan'],
          selectedSongList: [],
          selected: 'selected',
        }
    },
    components: {
      TitleBlock,
      SonglistInfo
    },
    created() {
      getBanner().then((res)=>{
				var a = []
				res.banners.filter(function (s) {
					a.push(s.pic)
				    return s.pic // 注意：IE9以下的版本没有trim()方法
				});
				// console.log('a:',a)
        this.bannerList = a
			}),
      recommendedSongList(14).then((res)=>{
		  	this.recommedSongList = res.result
        // console.log(this.recommedSongList)
		  }),
      topPlaylist(14).then((res)=>{
				this.selectedSongList = res.playlists
        // console.log(this.selectedSongList)
			})
    }
    
}
</script>

<style lang="scss" scoped>
// #home {
//     // border: 1px solid blue;
//     // padding-bottom: 10px;
// }
.home-banner {
  width: 100%;
  height: 100%;
  border-radius: 6px;
}
.home-singList {
  margin-top: 20px;
}


#singListBox {
  display: flex;
  flex-wrap: wrap;
}
.songlistInfo-img {
  display: inline-block;
  width: 140px;
  height: 140px;
  border-radius: 6px;
  // border: 1px solid red;
}
.songlistInfo-name {
  font-size: 14px;
  font-weight: 400;
}
</style>