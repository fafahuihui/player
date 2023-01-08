<template>
  <div id="songsheetRow" @click="songsheetJump(id)">
    <img :src=img alt="" class="songsheetRow-img">
    <div class="songsheetRow-name">{{name}}</div>
    <div class="songsheetRow-num">{{num}}首</div>
    <div class="songsheetRow-creator">{{creator}}</div>
    <div class="songsheetRow-playNum">{{playNum}}次</div>
  </div>
</template>

<script>
export default {
  name: 'SongsheetRow',
  data() {
    return {

    }
  },
  props: {
    img: {
      type: String,
      default: () => ''
    },
    name: {
      type: String,
      default: () => ''
    },
    creator: {
      type: String,
      default: () => ''
    },
    num: {
      type: Number,
      default: () => 1,
    },
    playNum: {
      type: Number,
      default: () => 0,
    },
    id: {
      type: Number,
      default: () => -1,
    },
    
  },
  methods: {
    songsheetJump(id) {
      console.log('歌单被点击')
      this.$router.push({
          name: 'songSheet',
          params: {
              id: id
          }
      })
    }
  }
}
</script>

<style lang="scss">
#songsheetRow:hover{
  background-color: #EDEDED;
}
#songsheetRow {
  display: flex;
  height: 80px;
  line-height: 80px;
}
.songsheetRow-img {
  height: 60px;
  width: 60px;
  border-radius: 8px;
  margin-top: 10px;
}
.songsheetRow-name {
  width: 46%;
  padding-left: 10px;
  overflow: hidden;
}
.songsheetRow-num {
  width: 10%;
  font-size: 12px;
  color: #9F9F9F;
}
.songsheetRow-creator { 
  width: 20%;
  font-size: 12px;
  color: #9F9F9F;
}
.songsheetRow-playNum { 
  font-size: 12px;
  color: #9F9F9F;
}
</style>