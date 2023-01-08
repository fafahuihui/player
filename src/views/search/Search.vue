<template>
  <div id="search">
    <div class="search-search"  :class="{searchSearchActive: statefocus==true}">
        <div class="search-search-column"
            :class="{searchSearchColumnActive: statefocus==true}">
            <input type="text" class="search-search-column-input" :placeholder=inputContent
                v-model="inputContent"
                :class="{searchSearchInputActive: statefocus==true}"

                ref="ipt" v-focus="statefocus" @blur="inputLeave" @click="inputInto">
            <img src="../../assets/img/search/搜索.png" alt=""
                class="search-search-column-img"
                :class="{searchSearchColumnImgActive: statefocus==true}">
            <img src="../../assets/img/search/叉-圈.png" alt=""
					class="search-search-column-imgTwo"
					@mousedown="imgTwoClick"
					v-show="statefocus==true&inputContent != ''">
        </div>
        <div class="search-search-searchButtom" v-show="statefocus==true"
            @mousedown="searchJump">
            搜索
        </div>
    </div>

    <div class="search-hotSearchList">
        <div class="search-hotSearchList-title">热搜榜</div>
        <div class="search-hotSearchList-content">
            <div class="search-hotSearchList-content-eval"
                v-for="(item,index) in showHotSearchData" :key="index">
                <div class="search-hotSearchList-content-eval-num">
                    {{index+1}}
                </div>
                <div class="search-hotSearchList-content-eval-name">
                    {{item.searchWord}}
                </div>
            </div>
        </div>
    </div>

    <div class="search-showAdd" @click="showClick(0)" v-show="showSign == false">
        查看更多<i class="el-icon-arrow-down"></i>
    </div>
    <div class="search-showAdd" @click="showClick(1)" v-show="showSign == true">
        收起<i class="el-icon-arrow-up"></i>
    </div>
  </div>
</template>

<script>
import { hotSearchInfo } from '@/api/search.js'

export default {
    name: 'Search',
    data() {
        return {
            statefocus: false,
            hotSearchData: [],
			showHotSearchData: [],
            inputContent: '请输入搜索内容',
            showSign: false,
        }
    },
    methods: {
        showClick(num) {
            if(num == 0){
                this.showHotSearchData = this.hotSearchData
                this.showSign = true
            }else if(num == 1) {
                this.showHotSearchData = this.hotSearchData.slice(0,8)
                this.showSign = false
            }
        },
        inputInto() {
            this.statefocus = true
			this.inputContent = ""
            console.log('触发清空事件')
        },
        inputLeave(e) { 
            console.log('e:',e)
            this.statefocus = false
            if(this.inputContent != ""){ 
                this.temp = this.inputContent
            }
            this.inputContent = '请输入搜索内容'
        },
        imgTwoClick() {
            this.inputContent = ''
            this.statefocus = true
        },
        searchJump() {
            this.$router.push({
                name: 'searchResult',
                params: {
                    txt: this.inputContent
                }
            })
        }
    },
    created() {
        hotSearchInfo().then((res)=>{
            console.log('res:',res.data)
            this.hotSearchData = res.data
            this.showHotSearchData = res.data.slice(0,8)
        })
    },
    directives:{
    Focus:{
      update:function(el,{value}){
          if(value){ // if(true)就聚焦
            el.focus();
          } 
      }
    }
  }
}
</script>

<style lang="scss">
.searchSearchActive {
    display: flex;
    justify-content: space-between;
}
.searchSearchColumnActive {
    width: 80% !important;
}
.searchSearchInputActive {
    text-align: left !important;
    padding-left: 10% !important;
    width: 90% !important;
}
.searchSearchColumnImgActive {
    left: 4% !important;
}
.search-search {
    width: 60%;
    margin-left: 20%;
    &-column {
        position: relative;
        &-input {
            outline:none;
            height: 30px;
            width: 100%;
            border: 1px solid #1FD0A4;
            border-radius: 8rem;
            background-color: #F0F0F0;
            text-align: center;
        }
        &-img {
            position: absolute;
            top: 20%;
            left: 30%;
            width: 20px;
            height: 20px;
            display: inline-block;
        }
        &-imgTwo {
            display: inline-block;
            position: absolute;
            top: 20%;
            right: 4%;
            width: 20px;
            height: 20px;
        }
    }
    &-searchButtom {
        line-height: 35px;
        font-weight: bolder;
        margin-right: 5%;
    }
}

.search-hotSearchList {
    &-title {
        font-size: 20px;
        font-weight: bolder;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    &-content {
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;
        &-eval {
            // border: 1px solid blue;
            width: 45%;
            margin-right: 5%;
            display: flex;
            height: 30px;
            line-height: 30px;
            &-num {
                margin-left: 10px;
                margin-right: 10px;
            }
            &-name {
                font-weight: bolder;
            }
        }
    }
}

.search-showAdd {
    text-align: center;
    font-weight: bolder;
    margin-top: 10px;
}
</style>