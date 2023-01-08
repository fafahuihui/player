<template>
  <div id="singerinfoRow" @click="singerinfoJump(id)">
    <img class="singerinfoRow-img" :src=img alt="">
    <div class="singerinfoRow-songName">{{singerName}}</div>
    <div class="singerinfoRow-singerName">专辑：{{albumNum}}</div>
  </div>
</template>

<script>
export default {
  name: 'SingerinfoRow',
  data() {
    return {

    }
  },
  props: {
    img: {
      type: String,
      default: () => ''
    },
    singerName: {
      type: String,
      default: () => ''
    },
    albumNum: {
      type: Number,
      default: () => 1,
    },
    id: {
      type: Number,
      default: () => -1,
    },
  },
  methods: {
    singerinfoJump(id) {
      // console.log('专辑被点击')
      this.$router.push({
          name: 'singerInfo',
          params: {
              id: id
          }
      })
    }
  }
}
</script>

<style lang="scss">
#singerinfoRow:hover{
  background-color: #EDEDED;
}
#singerinfoRow {
  display: flex;
  height: 80px;
  line-height: 80px;
}
.singerinfoRow-img {
  margin-top: 10px;
  height: 60px;
  width: 60px;
  border-radius: 8px;
}
.singerinfoRow-songName {
  width: 34%;
  padding-left: 20px;
}
.singerinfoRow-singerName {
  width: 24%;
  color: #ACACAC;
}
</style>