<template>
  <div id="comment">
    	<el-input class="editComment" placeholder="写评论..." icon="edit"></el-input>
    <Icon type="android-share" color="#d43d3d" size="30" class="commentInco fr" @click.native="showSharebox"></Icon>
    <Icon type="ios-cloud-outline" @click.native='t' v-show="!collected" size="30" class="commentInco fr"></Icon>
   <Icon type="ios-cloud" @click.native="t" v-show="collected" size="30" color="#d43d3d" class="commentInco fr"></Icon>
    <Icon type="ios-chatbubble-outline" size="30" class="commentInco fr showcomment" @click.native="tocomment"></Icon>
    <span class="commentNum" @click.native="tocomment">{{commentNum}}</span>
  </div>
</template>
<script>
import * as type from '../store/mutation-types.js'
export default {
  props:['comment'],
  data(){
     return {
        'commentNum':this.comment>0?this.comment:'0',
        'collected':this.$route.params.collected
     }
  },
  methods:{
    t(){
      this.collected=!this.collected;
    },
    showSharebox(){
       this.$store.commit(type.SHOWSHAREBOX,true)
    },
    tocomment(){
      if(this.logined){
          alert("暂无评论功能")
      }else{
          const _this=this;
          this.$confirm("登录后才能发表评论，是否前往登录？",'提示',{
             confirmButtonText:'确定',
             cancelButtonText:'取消',
             type:'warning'
          })
          .then(()=>{
            _this.$router.push({
              path:'/my'
            });
          })
          .catch(()=>{

          })
      }
    }
  }
}
</script>
<style lang="less">
#comment{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 1.3rem;
	z-index: 100;
	background: #fff;
    .editComment{
    	display: inline-block;
    	width: 54%;
    	margin-left: .2rem;
    	margin-top: .1rem;
    }
    .commentInco{
    	margin-top: .2rem;
    	margin-right: .55rem;
    }
    .showcomment{
    	position: relative;
    }
    .commentNum{
    	position: absolute;
    	padding: .05rem;
    	border-radius: 80%;
    	min-width: .55rem;
    	text-align: center;
    	line-height: .45rem;
    	background: #d43d3d;
    	right: 28%;
    	top: .06rem;
    	color: #fff;
    	font-size: 10px;
    }
}
.el-message-box {
  width:100%;
}
</style>
