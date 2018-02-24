<template>
 <div id="my">
     <div class="my-header" v-if="logined">
         <router-link>
           <img src="../assets/imgs/head.jpg" alt="" class="my-head-portrait fl">
           <span class="my-name fl">{{userName}}</span>
           <Icon type="ios-arrow-right" size="26" color="#fff" class="fr toMyself"></Icon>
         </router-link>
         <ul class="info-bar clearfix">
             <router-link to="/selfpage" class="info-bar-item">
               <p>1</p>动态
             </router-link>
               <router-link to="/care" class="info-bar-item">
               <p>{{vitality.follow}}</p>关注
             </router-link>
               <router-link to="/care" class="info-bar-item">
               <p>{{vitality.fans}}</p>粉丝
             </router-link>
               <router-link to="/care" class="info-bar-item">
               <p>{{vitality.visitor}}</p>7天访量
             </router-link>
         </ul>
     </div>

     <div v-else class="loginBox">
         <h2 class="loginTitl">登录你的头条，精彩永不丢失</h2>
         <Input class="admin loginInfo" placeholder="账号" v-model="admin"></Input>
         <Input class="password loginInfo" placeholder="密码" type="text" v-model="password"></Input>
         <br>
         <Button @click="login"  @keyup.enter="login" type="ghost" shape="circle" class="submit">进入头条</button>
     </div>
     <ul class="midBar">
         <li is="router-link" class="fl collect isLi" to="/collect/my">
              <Icon type="cube" size="24" color="#f69e32"></Icon>
              <br>
              收藏
         </li>
           <li is="router-link" class="fl history isLi" to="/collect/readhistory">
              <Icon type="ios-timer-outline" size="24" color="#658cf52"></Icon>
              <br>
              历史
         </li>
     </ul>
     <div class="tipItems">
         信息通知
     </div>
     <router-link to="/setup" class="tipItems">
         系统设置
          <Icon type="ios-arrow-right" size="26" color="#ccc" class="fr toSetup"></Icon>
     </router-link>
     <a class="tipItems" href="https://github.com/hcy1996/vue-toutiao" target="_blank">
        Github项目地址
        <Icon type="ios-arrow-right" size="26" color="#ccc" class="fr toSetup"></Icon>
     </a>
     <bottomNav></bottomNav>
 </div>
</template>
<script>
import * as type from "../store/mutation-types.js"
import {
    mapGetters,
    mapActions
} from 'vuex'
import bottomNav from '../components/Bottom-nav.vue'
export default{
    components:{
        bottomNav
    },
    computed:{
        ...mapGetters([
            'userName',
            'vitality',
            'logined'
        ])
    },
    methods:{
        ...mapActions([
            'setUserInfo',
        ]),
       login(){
           if(this.admin=='admin'&&this.password=='admin'){
                this.setUserInfo(this.admin);
                this.$store.commit(type.LOGOFF,true);
                this.admin='';
                this.password='';
           }else if(this.admin==''){
                this.open('1');
           }else if(this.password==''){
                this.open('2');
           }else {
              this.open('3')
           }
       },
       open(nodesc){
            if(nodesc==='1'){
               this.$Notice.open({
                   title:'账号不能为空',
                   duration:2
               })
            }else if(nodesc==='2'){
                this.$Notice.open({
                    title:"密码不能为空",
                    duration:2
                })
            }else {
                this.$Notice.open({
                    title:'账号或密码错误',
                    duration:2
                })
            }
       }
    },
    data(){
        return {
            admin:'',
            password:''
        }
    }
}
</script>
<style lang="less">@import '../assets/css/border.less';
.my-header {
    height: 5.5rem;
    width: 100%;
    background: rgba(51,51,51,1);
    .my-info {
        height: 4rem;
        display: block;
        .my-head-portrait {
            height: 1.6rem;
            width: 1.6rem;
            border-radius: 50%;
            margin-top: 1.2rem;
            margin-left: 1rem;
        }
        .my-name {
            font-size: 18px;
            font-weight: bold;
            color: #ffd;
            margin-top: 1.6rem;
            margin-left: 0.7rem;
        }
        .toMyself {
            margin-top: 1.6rem;
            margin-right: 0.5rem;
        }
    }
    .info-bar {
        height: 1.5rem;
        .info-bar-item {
            float: left;
            width: 25%;
            height: 1.2rem;
            box-sizing: border-box;
            border-left: 1px solid #666;
            text-align: center;
            font-size: 13px;
            color: #777;
            &:first-child {
                border: 0;
            }
            p {
                font-size: 16px;
                color: #ffd;
            }
        }
    }
}
.loginBox {
    height: 5.5rem;
    width: 100%;
    background: #d43d3d;
    text-align: center;
    color: #fff;
    .loginTitl {
        font-size: 20px;
        color: #fff;
        padding-top: 0.7rem;
        margin-bottom: 0.4rem;
    }
    .loginInfo {
        width: 70%;
        font-size: 18px;
        height: 1.2rem;
    }
    .submit {
        color: #fff;
        width: 70%;
    }
}
.midBar {
    height: 1.6rem;
    position: relative;
    .borderBottom(1px,#ccc);
    .isLi {
        width: 50%;
        text-align: center;
        margin-top: 0.2rem;
        box-sizing: border-box;
        font-size: 13px;
        color: #000;
    }
    .collect {
        position: relative;
        display: block;
        &::after {
            content: "";
            box-sizing: border-box;
            position: absolute;
            height: 100%;
            right: 0;
            top: 0;
            border-right: 1px solid #bbb;
            @media screen and (-webkit-min-device-pixel-ratio: 3) {
                transform: scaleY(0.33333);
            }
            @media screen and (-webkit-min-device-pixel-ratio: 2) {
                transform: scaleY(0.5);
            }
        }
    }
}
.tipItems {
    display: block;
    height: 1.1rem;
    width: 100%;
    margin-top: 0.3rem;
    color: #000;
    font-size: 16px;
    line-height: 1.1rem;
    font-weight: bold;
    position: relative;
    padding-left: 0.3rem;
    .verticalBorder(1px,#ccc);
    .toSetup{
        margin-right: .3rem;
        margin-top: .2rem;
    }
}
</style>




