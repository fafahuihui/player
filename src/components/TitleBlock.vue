<template>
  <div id="titleBlock">
    <div class="titleBlock-title">{{titleBlock[0]}}</div>
    <div class="titleBlock-add" @click="pathJump(titleBlock[1])">
      更多
      <i class="el-icon-arrow-right"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TitleBlock', 
  data() {
      return {

      }
  },
  props: {
    titleBlock: {
        type: Array,
        default: () => []
    },
    // addJump: {
    //     type: Array,
    //     default: () => []
    // },
  },
  methods: {
    pathJump(type) {
      this.$router.push({
        name: 'addSongSheet',
        params: {
          type: type 
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#titleBlock {
  display: flex;
  justify-content: space-between;
  // border: 1px solid red;
  height: 30px;
  margin-bottom: 10px;
}
.titleBlock-title {
  font-size: 22px;
  line-height: 30px;
  font-weight: bolder;
}
.titleBlock-add {
  font-size: 14px;
  line-height: 30px;
  font-weight: 300;
}
.titleBlock-add:hover {
  color: #1FD0A4;
}
</style>