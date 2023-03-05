<template>
    <div id="layout">
      <el-aside width="200px" v-show="navbarShowStatus">
          <navbar :navbar=navbar ></navbar>
      </el-aside>
      <el-container>
          <el-header>
              <topbar/>
          </el-header>
          <el-main  class="layout-right-content">
              <router-view/>
          </el-main>
          <el-footer height="110px">
              <music-player  :playSongDrawer="playSongDrawer"
                  @update-popup-status="updatePopupStatus"
                  @update-songdrawer-status="updateSongdrawerStatus"></music-player>
          </el-footer>
      </el-container>
      <side-popup-bar :songListDrawer = "songListDrawer"  
          @close-drawer-status="closeDrawer"></side-popup-bar>
      <el-drawer
          :visible.sync="playSongDrawer"
          :direction="direction"
          :withHeader="false">
          <lyric :playSongDrawer="playSongDrawer"/>
          <music-player :playSongDrawer="playSongDrawer"
              @update-popup-status="updatePopupStatus"
              @update-songdrawer-status="updateSongdrawerStatus"></music-player>
      </el-drawer>
    </div>
  </template>
  
  <script>
  
  import Navbar from '@/components/Navbar.vue'
  import Topbar from '@/components/Topbar.vue'
  import sidePopupBar from './sidePopupBar/SidePopupBar.vue'
  import MusicPlayer from '@/components/MusicPlayer.vue'
  import Lyric from './lyric/Lyric.vue'
  
  export default {
      name: 'Layout',
      data() {
          return {
              navbar: [
                  {
                      'primaryMenu': '歌曲',
                      'path': 'home',
                      'imgUrl1': require("../../assets/img/layout/歌单.png"),
                      'imgUrl2': require("../../assets/img/layout/歌单 (1).png"),
                  },
                  {
                      'primaryMenu': '音乐馆',
                      'path': 'musicHall',
                      'imgUrl1': require("../../assets/img/layout/音乐.png"),
                      'imgUrl2': require("../../assets/img/layout/音乐 (1).png"),
                  },
                  {
                      'primaryMenu': '搜索',
                      'path': 'search',
                      'imgUrl1': require("../../assets/img/layout/搜索 (2).png"),
                      'imgUrl2': require("../../assets/img/layout/搜索 (3).png"),
                  },
                  {
                      'primaryMenu': '我的',
                      'path': 'home',
                      'imgUrl1': require("../../assets/img/layout/我.png"),
                      'imgUrl2': require("../../assets/img/layout/我 (1).png"),
                  }
              ],
              navbarIndex: 0,
              navbarShowStatus: true,
              songListDrawer: false, //歌曲列表弹出层
              playSongDrawer: false,//歌曲展开详情弹出层
              direction: 'btt',
          }
      },
      components: {
          Navbar,
          Topbar,
          sidePopupBar,
          MusicPlayer,
          Lyric
      },
      methods:{
          closeDrawer() {
            console.log('111114');
              this.songListDrawer = false
          },
          updatePopupStatus() {
              this.songListDrawer = !this.songListDrawer
          },
          updateSongdrawerStatus() {
              this.playSongDrawer = !this.playSongDrawer
          },
      },
  }
  </script>
  
  <style lang="scss">
  #layout {
      display: flex;
  }
  .layout-right {
      &-content {
          margin: 0px 30px 0px 30px;
          overflow: auto;
          height: calc(100vh - 170px);
          &::-webkit-scrollbar {
              width: 0;
          }
      }
      
  }
  .el-drawer {
      height: 100vh !important;
  }
  
  </style>