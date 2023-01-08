<template>
  <div id="songlistInfo" @click="jumpClick(songListData.id)">
    <div class="songlistInfo-imgBox">
      <img :src=songListData.picUrl alt="" class="songlistInfo-imgBox-img" v-if="sign=='recommed'">
      <img :src=songListData.coverImgUrl alt="" class="songlistInfo-imgBox-img" v-if="sign=='selected'">
      <div class="songlistInfo-imgBox-img2Box">
        <img src="../assets/home/播放.png" alt="" class="songlistInfo-imgBox-img2Box-img2">
      </div>
    </div>
    <div class="songlistInfo-name">{{songListData.name}}</div>
    <div class="songlistInfo-playCount">
      {{transformation(songListData.playCount)}}
    </div>
  </div>
</template>

<script>
import {tenThousand} from '@/utils/dataConversion'
import store from "@/store/index.js";
export default {
  name: 'SonglistInfo',
  data() {
    return {
      transformation: tenThousand,
    }
  },
  // computed: {
  //   ...mapState(['pathmsg'])
  // },
  props: {
    songListData: {
        type: Object,
        default: () => {}
    },
    sign: {
      type: String,
      default: () => ''
    }
  },
  methods: {
    jumpClick(id) {
      console.log('歌单:',id)
      store.commit('GETPATHMSG',id)
      console.log(this.$store.state.pathmsg)
      this.$router.push({
        name: 'songSheet',
        params: {
          id:this.$store.state.pathmsg 
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#songlistInfo {
  width: 140px;
  // margin-left: 40px;
  margin-right: 40px;
  margin-bottom: 15px;
  position: relative;
}

.songlistInfo-imgBox {
  display: inline-block;
  width: 140px;
  height: 140px;
  border-radius: 6px;
  position: relative;
  &-img {
    display: inline-block;
    width: 140px;
    height: 140px;
    border-radius: 6px;
  }
  &-img2Box {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0%;
    left: 0%;
    // border: 1px solid red;
    &-img2 {
      margin: 40px;
      width: 60px;
      height: 60px;   
      display: none;  
      // border: 1px solid red;
    }
  }
}
.songlistInfo-name {
  font-size: 14px;
  font-weight: 400;
}
.songlistInfo-playCount {
  position: absolute;
  top: 0%;
  right: 0%;
}
.songlistInfo-playCount {
  // border: 1px solid red;
  font-size: 12px;
  padding: 1px 6px 1px 6px;
  border-radius: 6px;
  color: #fff;
  background-color: #2D2C2D;
}

.songlistInfo-imgBox:hover{
  display: inline-block;
  background-color: #7F7B78;
  opacity: 0.5;
  
}
</style>