<template>
  <div id="sidePopupBar">
    <el-drawer
        :visible.sync="songListDrawer"
        :with-header="false"
        :size='songListDrawerSize'
        :before-close="closePopup">
        <div class="songList-title">
            播放队列({{newsonglistlength}})
        </div>
        <div class="songList-content">
            <div class="songList-content-row"
                v-for="(item, index) in newsonglist"
                :key="index"
                :class="{songSheetsongListrow1Active:newsongindex == index}"
                @click="playSongClick(item.id, item.name, item.ar[0]['name'], item.al.picUrl, index)">
                <div class="songList-content-row-songName">{{item.name}}/</div>
                <div class="songList-content-row-singerName">
                    {{item.ar[0]['name']}}</div>
            </div>
        </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { playSong } from '@/utils/play.js'
export default {
  name: 'SidePopupBar',
  data() {
    return {
      songListDrawerSize: '300px',
    }
  },
  computed: {
    ...mapState(['newsonglist', 'newsonglistlength', 'newsongindex']),
  },
  methods: {
    playSongClick(id, songName, singerName, songImg, index) {
      playSong(id, songName, singerName, songImg, index)
    },
    closePopup() {
      this.$emit('close-drawer-status')
    }
  },
  props: {
    songListDrawer: {
      type: Boolean,
      require: true
    }
  }
}
</script>

<style lang="scss">
.songList {
    &-title {
        font-size: 22px;
        font-weight: bolder;
        margin-top: 30px;
        margin-left: 30px;
    }
    &-content {
        margin: 30px 30px 0px 30px;
        &-row {
            margin-bottom: 0px;
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
.songSheetsongListrow1Active {
  color: #1FD0A4;
  background-color: #EEEEEE;
}
</style>