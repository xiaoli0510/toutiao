<template>
<div id="detail">
    <!-- headerBar -->
    <headerBar class="detail-header">
        <div slot="detail-header">
            头条详情
            <Icon type="ios-arrow-back" size="28" color="#000" class="fl back" @click.native="goBack"></Icon>
            <Icon type="share" size="28" color="#000" class="fr share" @click.native="showSharebox"></Icon>
        </div>
    </headerBar>
  <!-- container -->
  <div class="container">
      <h2 class="detail-title">{{$route.params.title}}</h2>
      <div class="media_name">
          <img src="../assets/imgs/head.jpg" alt="" height="360" width="360" class="avatar_url">
          <span class="name">{{media_name}}</span>
          <br>
          <span class="date">{{datetime}}</span>
      </div>
      <div class="contentNews">
          {{abstract}}
          <img v-for="(img,index) in image_list" v-bind:key="index" v-bind:src="img.url" alt="">
      </div>
      <div class="keywords">
          <span v-for="(item,index) in keywords.split(',')" v-bind:key="index">{{item}}</span>
      </div> 
      <hr>
      <div class="zan">
          <Button type="ghost" size="large" icon="thumbsup" shape="circle">{{repin_count}}</Button>
          <Button type="ghost" size="large" icon="trash-a" shape="circle">不喜欢</Button>
      </div> 
      <hr>
  </div>
  <comment :comment="comment_count"></comment>
  <shareBox :show="Sharebox"></shareBox>
</div>
  
</template>
<script>
import headerBar from '../components/Header-bar'
import shareBox from '../components/Share'
import comment from '../components/Comment'
import * as type from '../store/mutation-types.js'
import {
    mapActions,
    mapGetters
} from 'vuex'
export default {
  components:{
      headerBar,
      shareBox,
      comment
  },
  data(){
      return{
          title:this.$route.params.title
      }
  },
  methods:{

      showSharebox(){
        this.$store.commit(type.SHOWSHAREBOX,!this.Sharebox);
        console.log(this.media_info);
      },
      goBack(){
          this.$store.commit(type.ROUTERCHANGE,!this.routerChange)
          this.$router.go(-1);
      }
  },
  computed:{
      ...mapGetters([
        'oneDetail',
        'Sharebox',
        'routerChange'
      ]),
      media_name:function(){
          if(this.$route.params.media_name){
              return this.$route.params.media_name
          }else {
              return ''
          }
      },
      datetime:function(){
          if(this.$route.params.datetime){
             return this.$route.params.datetime
          }else{
             return ''
          }
      },
      abstract:function(){
          if(this.$route.params.abstract){
              return this.$route.params.abstract
          }else {
              return ''
          }
      },
      image_list:function(){
          if(this.$route.params.image_list){
             return this.$route.params.image_list
          }else{
             return ''
          }
      },
      keywords:function(){
          if(this.$route.params.keywords){
              console.log(this.$route.params.keywords);
             return this.$route.params.keywords
          }else{
             return ''
          }
      },
      repin_count:function(){
          if(this.$route.params.repin_count){
             return this.$route.params.repin_count
          }else{
             return ''
          }
      },
      comment_count:function(){
          if(this.$route.params.comment_count){
             return this.$route.params.comment_count
          }else {
             return ''
          }
      }
  },
  watch:{
      '$route':function(){
          this.$store.commit(type.SHOWSHAREBOX,false)
      }
  }
}
</script>
<style lang="less">@import '../assets/css/border.less';
#detail {
    hr{
        height: 1px;
        background: #ccc;
    }
    .detail-header {
        background: #fff;
        font-size: 18px;
        font-weight: bold;
        color: #000;
        &::after {
            content: "";
            box-sizing: border-box;
            width: 100%;
            position: absolute;
            left: 0;
            bottom: 0;
            border-top: 1px solid #ccc;
            @media screen and (-webkit-min-device-pixel-ratio: 3) {
                transform: scaleY(0.33333);
            }
            @media screen and (-webkit-min-device-pixel-ratio: 2) {
                transform: scaleY(0.5);
            }
        }
        .back {
            line-height: 1.2rem;
            margin-left: 0.3rem;
        }
        .share {
            line-height: 1.2rem;
            margin-right: 0.3rem;
        }
    }
    .container {
        margin: 1.6rem auto 1.5rem;
        width: 94%;
        .detail-title {
            color: #000;
            font-size: 20px;
        }
        .media_name {
            position: relative;
            margin-top: 0.5rem;
            .avatar_url {
                height: 1.1rem;
                width: 1.1rem;
                border-radius: 50%;
            }
            .name {
                position: absolute;
                font-size: 14px;
                font-weight: bold;
                left: 1.3rem;
                top: 0.1rem;
            }
            .date {
                position: absolute;
                left: 1.3rem;
                top: 0.6rem;
            }
        }
        .contentNews {
            margin-top: 0.5rem;
            font-size: 16px;
            color: #000;
            text-indent: 0.7rem;
            line-height: .8rem;
            img {
                text-align: center;
                display: block;
                width: 70%;
                margin: 0.2rem auto;
            }
        }
        .keywords {
            margin-top: 0.5rem;
            line-height: 0.8rem;
            span {
                margin-bottom: 0.3rem;
                text-align: center;
                margin-right: 0.3rem;
                display: inline-block;
                border: 1px solid #ccc;
                padding: 0 0.2rem;
                border-radius: 0.4rem;
            }
        }
        .zan{
            text-align: center;
            margin-top: .5rem;
            margin-bottom: .5rem;
            botton{
                padding-right: 1rem;
                color: #000;
            }
        }
    }
}
</style>



