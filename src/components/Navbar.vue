<template>
  <div id="navbar">
        <div class="navbar-title">
            <img src='../assets/home/枫叶.png' class="navbar-title-img" alt="">
            <div class="navbar-title-txt">
                随听
            </div>
        </div>
        <div class="navbar-menu">
            <div v-for="(item, index) in navbar" :key="index"
                 class="navbar-menu-primary"
                 @click="pathJump(index, item.path)"
                 :class="{primaryActive: navbarIndex == index}">
                 <img :src=item.imgUrl2 alt="" v-show="navbarIndex == index">
                 <img :src=item.imgUrl1 alt="" v-show="navbarIndex != index">
                 <div>{{item.primaryMenu}}</div>
            </div>
        </div>
    </div> 
</template>

<script>
export default {
    name: "Navbar",
    data() {
        return {
            navbarIndex: 0
        }
    },
    props: {
        navbar: {
            type: Array,
            default: () => []
        },
    },
    methods: {
        pathJump(index, path) {
            this.navbarIndex = index
            this.$router.push(path)
        }
    }
}
</script>

<style lang="scss" scoped>
#navbar {
    background-color: #f0f0f0;
    // height: 100vh;
    // min-height: 100vh;
    width: 170px;
    // min-width: 160px;
    // width: 10vw;
    // 
    padding: 32px 24px 0px 24px ;
}
.navbar-title {
    display: flex;
    flex-direction: column;
    // height: 32px;
    justify-content: center;
    text-align: center;
    // padding-left: 16px;
    align-items: center;
    // border: 1px solid pink;
    &-img {
        display: inline-block;
        width: 50px;
        height: 50px;
        // padding: 2px;
        border-radius: 50%;
        // text-align: center;
        margin-bottom: 15px;
        overflow: hidden;
        background-color: #c8dd4e;
    }
    &-txt {
        // margin-left: 10px;
        line-height: 32px;
        font-size: 20px;
        font-weight: 800;
    }
}
.primaryActive {
    background-color: #1FD0A4 !important;
    color: #fff;
}
.navbar-menu {
    margin-top: 50px;
    // border: 1px solid pink;
    &-primary {
        margin-top: 20px;
        // border: 1px solid green;
        font-size: 16px;
        display: flex;
        border-radius: 3px;
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
    }
    &-primary > img {
        display: inline-block;
        margin-top: 5px;
        margin-right: 10px;
        width: 20px;
        height: 20px;
    }
    &-primary:hover {
        background-color: #DEDEDE;
    }
}
</style>