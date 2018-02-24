<template>
  <div id="collect">
      <!-- headerBar -->
    <headerBar class="collect-header">
        <div slot="collect">
            <Icon type="ios-arrow-back" size="28" color="#000" class="fl back" @click.native="$router.go(-1)"></Icon>
            <router-link to="/collect/my">收藏</router-link>
            <router-link to="/collect/readhistory">阅读</router-link>
            <router-link to="/collect/sendhistory">推送</router-link>
        </div>
    </headerBar>
    <!-- content -->
    <div class="collect_content">
        <div class="con">
            <router-link v-for="(item,index) in myCollect" v-bind:key="index" class="collect_items clearfix" v-bind:to="{
                name:'newsdetail',
                params:{
                    id:item.tag_id,
                    title:item.title,
                    media_info:item.media_info,
                    media_name:item.media_name,
                    datetime:item.datetime,
                    abstract:item.abstract,
                    image_list:item.image_list,
                    repin_count:item.repin_count,
                    comment_count:item.comment_count,
                    keywords:item.keywords,
                    collected:item.collected,
                }
            }">
            <div v-if="!item.image_list">1</div>
            <img v-bind:src="imgs.url" alt="" v-for="(imgs,index) in item.image_list" 
            v-bind:key="index" v-show="index===1" class="fr" v-else>
            <h2 class="collect_title">{{item.title}}</h2>
            <div class="name_comment">
                <span class="collect_name">{{item.media_name}}</span>
                <span class="collect_comment">{{item.comment_count}}&nbsp;评论</span>
            </div>
            </router-link>
        </div>
    </div>
    <bottomNav></bottomNav>
  </div>
</template>
<script>
import axios from 'axios'
import headerBar from "../components/Header-bar"
import bottomNav from "../components/Bottom-nav.vue"

export default {
  components:{
      headerBar,
      bottomNav
  },
  data(){
      return {
          myCollect:[]
      }
  },
  methods:{
      getMY(){
          axios.get('/static/my.json').then(res=>{
              const Data = res.data;
              this.myCollect=Data.data;
              console.log(this.myCollect)
          }).catch(err=>{

          })
      }
  },
  created(){
      this.getMY();
  }
}
</script>
<style lang="less">@import '../assets/css/border.less';
#collect {
    .collect-header {
        background: #fff;
        box-shadow: 0 1px #ccc;
        .back {
            line-height: 1.2rem;
            margin-left: 0.3rem;
        }
        a {
            font-size: 16px;
            font-weight: bold;
            display: inline-block;
            width: 1.8rem;
            margin-right: 0.3rem;
        }
        a.router-link-active {
            position: relative;
            &::after {
                content: "";
                box-sizing: border-box;
                width: 100%;
                position: absolute;
                left: 0;
                bottom: -1px;
                border-top: 4px solid #d43d3d;
                @media screen and (-webkit-min-device-pixel-ratio: 3) {
                    transform: scaleY(0.33333);
                }
                @media screen and (-webkit-min-device-pixel-ratio: 2) {
                    transform: scaleY(0.5);
                }
            }
        }
    }
    .collect_content {
        margin-top: 1.3rem;
        margin-bottom: 1.8rem;
        .con {
            width: 94%;
            margin: 0 auto;
            position: relative;
            .collect_items {
                display: block;
                border-bottom: 1px solid #d43d3d;
                padding: 0.3rem 0;
                .collect_title {
                    font-size: 14px;
                    font-weight: bold;
                    color: #000;
                    margin-right: 3.4rem;
                }
                img {
                    width: 3rem;
                }
                .name_comment {
                    margin-top: 0.6rem;
                    font-size: 12px;
                    color: #000;
                    .collect_name {
                        margin-right: 0.2rem;
                    }
                    .collect_comment {
                        }
                }
            }
        }
    }
}
</style>



