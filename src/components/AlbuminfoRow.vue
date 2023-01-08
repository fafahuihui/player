<template>
  <div id="albuminfoRow" @click="albumJump(id)">
      <img :src=img alt="" class="albuminfoRow-img">
      <div class="albuminfoRow-songName">{{songName}}</div>
      <div class="albuminfoRow-singerName">{{singerName}}</div>
      <div class="albuminfoRow-time">{{timestampToTime(time)}}</div>
      <div class="albuminfoRow-num">{{num}}首</div>

  </div>
</template>

<script>
export default {
  name: 'AlbuminfoRow',
  data() {
    return {

    }
  },
  props: {
    img: {
      type: String,
      default: () => ''
    },
    songName: {
      type: String,
      default: () => ''
    },
    singerName: {
      type: String,
      default: () => ''
    },
    time: {
      type: Number,
      default: () => 1,
    },
    id: {
      type: Number,
      default: () => -1,
    },
    num: {
      type: Number,
      default: () => 0,
    }
  },
  methods: {
    timestampToTime(timestamp) {
      var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      var D = date.getDate() + ' ';
      return Y+M+D;
    },
    albumJump(id) {
      // console.log('专辑被点击')
      this.$router.push({
          name: 'albumSongs',
          params: {
              id: id
          }
      })
    }
  }
}
</script>

<style lang="scss">
#albuminfoRow:hover {
  background-color: #EDEDED;
}
#albuminfoRow {
  display: flex;
  height: 80px;
  line-height: 80px;
}
.albuminfoRow-img {
  margin-top: 10px;
  height: 60px;
  width: 60px;
  border-radius: 8px;
}
.albuminfoRow-songName {
  width: 34%;
  padding-left: 20px;
}
.albuminfoRow-singerName {
  width: 24%;
  color: #ACACAC;
}
.albuminfoRow-time {
  width: 24%;
  color: #ACACAC;
  font-size: 14px;
}
.albuminfoRow-num {
  color: #ACACAC;
  font-size: 14px;
}
</style>