<template>
    <div id="topbar">
            <div class="topbar-left">
                <div class="topbar-left-backOff" @click="backOffClick"></div>
                <div class="topbar-left-forward" @click="forwardClick"></div>

                <div class="topbar-left-box">
                    <img src="../assets/img/layout/搜索 (2).png" alt=""
                        class="topbar-left-box-img">
                    <input type="text" placeholder="搜索音乐"  class="topbar-left-box-input">
                </div>
            </div>

            <div class="topbar-right">
                <div class="topbar-userInfo">
                    <img :src=userimg alt="" class="topbar-userInfo-img" @click="userInfoShow=!userInfoShow">
                    <div class="topbar-userInfo-name">{{username}}</div>
                    <div class="topbar-userInfo-pupopBox" v-show="userInfoShow">
                        <div class="topbar-userInfo-pupopBox-eval"
                            @click="loginClick">进行登录</div>
                        <div class="topbar-userInfo-pupopBox-eval">退出登录</div>
                    </div>
                </div>
                <!-- <div class="topbar-time">{{dateFormat(date)}}</div> -->
            </div>
            
        </div>
  </template>
  
<script>
import store from "@/store/index.js";
import { mapState } from 'vuex'
import { login } from '@/api/home.js'
export default {
    name: 'Topbar', 
    data() {
        return {
            userInfoShow: false,
            user: '',
            pwd: '',
        }
    },
    methods: {
        backOffClick() {
            this.$router.back()
        },
        forwardClick() {
            this.$router.forward()
        },
        loginClick() {
            login(this.user, this.pwd).then((res) => {
                console.log('res:',res)
                console.log(res['cookie'])
                store.commit('GETUSERIMG', res['profile']['avatarUrl'])
                store.commit('GETUSERNAME', res['profile']['nickname'])
                
                console.log('登录成功')
            })
            this.userInfoShow=! this.userInfoShow
        },
        // dateFormat(time) {
        //     var date=new Date(time);
        //     var year=date.getFullYear();
        //     /* 在日期格式中，月份是从0开始的，因此要加0
        //     * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
        //     * */
        //     var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
        //     var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
        //     var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
        //     var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
        //     var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
        //     // 拼接
        //     return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
        // },
    },
    computed: {
        ...mapState(['userimg','username'])
    },
}
</script>
  
<style lang="scss" scoped>
#topbar {
    display: flex;
    justify-content: space-between;
    height: 60px;
}
.topbar-left {
    display: flex;
    padding-left: 30px;
    &-backOff {
        width: 12px;
        height: 12px;
        border-right: 2px solid #E0E0E0;
        border-top: 2px solid #E0E0E0;
        transform: rotate(-135deg);
        margin-top: 24px;
        margin-right: 20px;
        position: relative;
    }
    &-backOff:hover {
        border-right: 2px solid #1ECE9C;
        border-top: 2px solid #1ECE9C;
    }
    &-forward {
        width: 12px;
        height: 12px;
        border-right: 2px solid #E0E0E0;
        border-top: 2px solid #E0E0E0;
        transform: rotate(45deg);
        margin-top: 24px;
    }
    &-forward:hover {
        border-right: 2px solid #1ECE9C;
        border-top: 2px solid #1ECE9C;
    }
    &-box {
        position: relative;
        margin-left: 30px;
        &-img {
            position: absolute;
            left: 15px;
            top: 20px;
            width: 20px;
            height: 20px;
        }
        &-input {
            outline:none;
            border: none;
            background-color: #E3E3E3;
            width: 15vw;
            height: 30px;
            margin-top: 15px;
            padding-left: 40px;
            border-radius: 30px;
        }
    }
}
.topbar-right {
    display: flex;
}
.topbar-userInfo {
    position: relative;
    display: flex;
    padding-right: 20px;
    &-img {
        border-radius: 50%;
        width: 40px;
        height: 40px;
        margin-top: 10px;
        margin-right: 10px;
    }
    &-name {
        line-height: 60px;
        font-weight: bold;
        font-family: 黑体;
        margin-right: 10px;
    }
    &-pupopBox {
        z-index: 11;
        position: absolute;
        top: 60px;
        left: 0px;
        background-color: #fff;
        &-eval {
            width: 100px;
            height: 40px;
            font-size: 13px;
            text-align: center;
            line-height: 40px;
        }
        &-eval:hover {
            background-color: #F0F0F0;
        }
    }
}
.topbar-time {
    font-size: 14px;
    // font-weight: bolder;
    line-height: 60px;
    margin-right: 50px;
}
</style>