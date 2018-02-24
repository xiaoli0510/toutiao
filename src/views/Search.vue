<template>
  <div id="search">
	  <headerBar>
		  <div slot="search" class="search_header">
			  	<Icon type="ios-arrow-back" size="28" color="#fff" class="fl back" @click.native="$router.go(-1)"></Icon>
			  搜索
		  </div>
	  </headerBar>
	  <div class="searchBar">
		  <el-input 
		  v-model="input" 
		  placeholder="请输入内容"
		  @keyup.native.enter="search(input)"
		  class="searchInput fl"
		  ></el-input>

		  <el-popover
		   ref="popover4"
		   placement="bottom"
		   trigger="click"
		   id="popover"
		  >
		    <ul class="searchList" v-show="test.length!=0">
				<li class="searchListItems" v-for="(item,index) in test" v-bind:key="index">
					<span @click="historySearch(item)">
						<Icon type="ios-search" size="18"></Icon>
						{{item}}

					</span>
					<i class="el-icon-delete fr" @click.prevent="clearThisHistory(index)"></i>
				</li>
				<div class="clearHistory" @click="clearHistory">清空历史记录</div>
			</ul>
		    <ul class="noHistory" v-show="test.length==0">暂无历史搜索记录</ul>

		  </el-popover>
		  <span class="toutiaoIcon" v-popover:popover4>历史记录</span>
	  </div>
	  <!-- 显示加载的图标 -->
	  <div v-show="loading" v-loading="loading" element-loading-text="拼命加载中" style="width:100%" class="loading"> </div>
      <!-- 显示搜索出来的内容 -->
	  <div class="searchNews">
		  <router-link v-for="(val,index) in con"
		   v-bind:key="index"
		   :to="{
			   name:'newsdetail',
			   params:{
				  id:val.tag_id,
                            title:val.title,
                            media_info:val.media_info,
                            media_name:val.media_name,
                            datetime:val.datetime,
                            abstract:val.abstract,
                            image_list:val.image_list,
                            repin_count:val.repin_count,
                            comment_count:val.comment_count,
                            keywords:val.keywords
			   }
			   }"
			   class="searchNewsItem"
			   v-show="val.media_creator_id&&val.title"
		  >
		  <p class="title" v-html="replace(val.title,input)"></p>
		  <div>
			  <img  alt="加载出错" v-for="(img,index) in val.image_list" v-bind:key="index" v-lazy="img.url">

		  </div>
		  
		  </router-link>
	  </div>
  </div>
</template>

<script>
 import axios from "axios"
 import jsonp from "jsonp"
 import headerBar from "../components/Header-bar"
export default {
  components:{
	  headerBar
  },
  data(){
	  return {
		  loading:false,
		  flag:true,
		  input:"",
		  con:[],
		  test:[],
		  searchCon:''
	  }
  },
  beforeRouteLeave(to,from,next){
	  if(to.name=="home"){
		this.con = [];
		this.input='';
		document.getElementsByClassName('el-propover')[0].style.display='none';
		next();
	  }
	  next();
  },
  methods:{
	//   显示搜索的文章的标题 并显示红色的搜索部分
	replace(title,inp){
	   const reg = new RegExp(''+inp+'','gim');
	   if(title){
          return title.replace(reg,'<font class="red">'+inp+'</font>')
	   }else {
		   return title;
	   }
	},
	// 删除本条历史记录
	clearThisHistory(index){
		this.$confirm('确认删除此条历史记录？','提示',{
			confirmButtonText:'确定',
			cancelButtonText:'取消',
			type:'warning'
		}).then(()=>{
			this.test.splice(index,1);
			this.$message({
				type:'success',
				message:'删除成功!'
			})
		}).catch(()=>{

		})
	},
	// 清空所有的历史记录
	clearHistory(){
		this.$confirm('确认清空历史记录？','提示',{
			confirmButtonText:'确定',
			cancelButtonText:'取消',
			type:'warning'
		}).then(()=>{
			this.test=[];
			this.$message({
				type:'success',
				message:'删除成功'
			})
		}).catch()
	},
	  //历史搜索
	  historySearch(item){
        this.input = item;
		this.flag=false;
		this.search(item);
		this.con = [];
		this.$nextTick(function(){
			document.getElementsByClassName('el-popover')[0].style.display='none';
		})
	  },
	  //回车搜索
	  search(input){
		  const _this=this;
		  input = input.trim();
		  if(input){
             if(this.searchCon==input){
                 if(this.flag){
                   return;
				 }
			 }
			 _this.loading=true;
			 jsonp('http://www.toutiao.com/search_content/?offset=0&format=json&keyword='+input+'&autoload=true&count=20&cur_tab=1',function(err,res){
				console.log(res.data);
				_this.con = res.data;
				 _this.loading=false;
			 })
			 this.test.unshift(input);
			 this.searchCon = input;
			 this.flag=true;
		  }else {
			  this.searchCon = '';
			  this.con= [];
		  }
	  }
  }


}
</script>


<style lang="less">
@import '../assets/css/border.less';
.red{
	color: red;
}
.searchNews {
    margin-top: 12px;
}
#search{
	.search_header{
		font-size: 20px;
		font-weight: bold;
		color: #fff;
		.back{
			line-height: 1.2rem;
	        margin-left: 0.3rem;
		}
	}
	.searchBar{
		margin-top: 1.3rem;
		width: 100%;
		.toutiaoIcon{
			display: inline-block;
			padding: 0 .05rem;
			font-size: 13px;
			text-align: center;
			width: 10%;
		}
		.searchInput{
			width: 90%;
		}
	}
	.loading{
		margin-top: 1rem;
	}
	.searchNews{
		.searchNewsItem {
	        width: 94%;
	        display: block;
	        position: relative;
	        margin: 0 auto;
	        padding-bottom: 0.15rem;
	        .borderBottom(1px,#ccc);
	        .title {
	            font-size: 16px;
	            font-weight: bold;
	            color: #000;
	            padding-top: 0.2rem;
	            padding-bottom: 0.15rem;
	        }
	        img {
	            width: 31.1%;
	            margin-right: 0.21rem;
	            height: 2.3rem;
	        }
	        .bottomInfo {
	            font-size: 10px;
	            margin-top: 0.15rem;
	            .writer {
	                color: #000;
	            }
	            .comment_count {
	                color: #000;
	            }
	            .datetime {
	                float: right;
	                color: #000;
	            }
	            .avIcon {
	                display: inline-block;
	                height: 0.4rem;
	                width: 0.9rem;
	                text-align: center;
	                line-height: 0.4rem;
	                border-radius: 4px;
	                border: 1px solid #39f;
	                font-size: 10px;
	                margin-right: 0.1rem;
	            }
	        }
	    }
	}
}
.el-popover{
	width: 97%;
	.searchListItems{
		display: block;
		position: relative;
		height: .9rem;
		line-height: .9rem;
		.borderBottom(1px,#ccc);
		font-size: 16px;
		i{
			padding: 0 .2rem;
			line-height: .9rem;
		}
	}
	.clearHistory{
		font-size: 14px;
		height: .7rem;
		line-height: 1rem;
		text-align: center;
	}
	.noHistory{
		font-size: 14px;
	}
}
</style>
