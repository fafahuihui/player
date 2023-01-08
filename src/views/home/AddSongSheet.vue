<template>
    <div id="addSongSheet">
        <songlist-info v-for="(item, index) in recommedSongListData"
            :key="index" :songListData=item :sign=recommed
            v-show="recommedSongListData.length != 0">
        </songlist-info>

        <songlist-info v-for="(item, index) in selectedSongListData"
            :key="index" :songListData=item :sign=selected
            v-show="selectedSongListData.length != 0">
        </songlist-info>
    </div>
</template>

<script>
import { recommendedSongList, topPlaylist } from '@/api/home.js'
import SonglistInfo from '@/components/SonglistInfo.vue'
export default {
    name: 'AddSongSheet',
    data() {
        return {
            recommedSongListData: [],
            selectedSongListData: [],
            recommed: 'recommed',
            selected: 'selected',
        }
    },
    components: {
      SonglistInfo
    },
    created() {
        // console.log('this.$route.params.type:',this.$route.params.type)
        if(this.$route.params.type == 'tuijian') {
            recommendedSongList(100).then((res)=>{
                this.recommedSongListData = res.result
            })
        }else if(this.$route.params.type == 'jingxuan') {
            topPlaylist(100).then((res)=>{
                this.selectedSongListData = res.playlists
            })
        }
        
    },
}
</script>

<style lang="scss">
#addSongSheet {
    display: flex;
    flex-wrap: wrap;
}
</style>