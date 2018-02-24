<template>
<div id="home" class="clearfix">
    <headerBar>
        <div slot="home" class="home-header-bar">
            <Icon type="ios-email" size="30" color="#fff" class="fl homeEmail"></Icon>
            <span class="logo">
                今日头条
                <Icon type="ios-refresh-empty" size="30"></Icon>
            </span>
            <router-link to="/search" class="search fr">
                <Icon type="ios-search" size="30" color="#fff" class="homeSearch"></Icon>
            </router-link>
            
        </div>
    </headerBar>
    <Icon type="ios-refresh-empty" size="30" color="#d43d3d" class="pulldownbtn"></Icon>
    <ul class="homeNav">
        <li v-for="(item,index) in navbar" :key="index" class="navBarLi">
            <router-link :to="{path:item.url,query:{type:item.type}}">{{item.text}}</router-link>
        </li>
    </ul>
    <div v-show="loading" v-loading="loading" element-loading-text="拼命加载中" style="width: 100%" class="loading"></div>
    <el-alert v-show="!ifReturnMsg" class="newsLoadError" title="暂无更新..." type="error" description="此频道暂无更新，请先休息一下！" show-icon></el-alert>
    <transition enter-active-class="bounceInLeft" leave-active-class="bounceOutRight">
        <ul class="newsContent animated" v-show="!loading&&ifReturnMsg">
            123
            <router-link
                v-for="(val,index) in listCon"
                :to="{
                    name:'newsdetail',
                    params:
                        {   id:val.tag_id,
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
                class="newsDetaile"
                :key="index"
            >
                <p class="title">{{val.title}}</p>
                <div>
                    <img alt="加载出错" v-for="(img,index) in val.image_list" :key="index" v-lazy="img.url">
                    <div class="bottomInfo clearfix">
                        <Icon type="fireball" size="10" color="#d43d3d" v-show="val.hot===1"></Icon>
                        <span class="avIcon" v-show="val.label==='广告'">广告</span>
                        <span class="writer">{{val.media_name}}</span> &nbsp;&nbsp;
                        <span class="comment_count">评论&nbsp;{{val.comment_count}}</span>
                        <span class="datetime">{{val.datetime|date}}</span>
                    </div>
                </div>
            </router-link>
        </ul>
    </transition>
    <div class="pulldownload" v-show="downLoadMore" @click="pulldownloadmore({kind:first || $router.query.type,flag:downLoadMore})">
        点击加载更多
    </div>
    <transition name="bounce" enter-active-class="zoomInLeft" leave-active-class="zoomOutRight">
        <div v-show="top" class="animated bounce">
            <div class="top">
                <Icon type="android-arrow-up"></Icon>
            </div>
        </div>
    </transition>
    <bottom-nav></bottom-nav>
</div>
</template>

<script>
import moment from 'moment'
import headerBar from '../components/Header-bar.vue'
import bottomNav from '../components/Bottom-nav.vue'
import toTop from '../components/To-top.vue'
import * as type from '../store/mutation-types.js'
import {
    mapActions,
    mapState,
    mapGetters
} from 'vuex'
import axios from 'axios'
export default {
    components: {
        headerBar,
        bottomNav,
        toTop
    },
    computed: {
        ...mapGetters([
            'newsList',
            'loading',
            'list',
            'ifReturnMsg',
            'oneDetail',
            'routerChange',
            'downLoadMore'
        ]),
        listCon: function() {
            if (this.$route.query.type) {
                console.log(this.list[this.$route.query.type]);
                return this.list[this.$route.query.type];
            } else {
                console.log(this.list[this.first]);
                return this.list[this.first]
            }
        },
    },
    beforeRouteUpdate (to, from, next){
        this.$store.commit(type.PULLDOWNBTN, false);
        next();
    },
    methods: {
        ...mapActions([
            'getNews',
            'pulldownloadmore'
        ]),
        handleScroll() {
            this.top = window.document.body.scrollTop > 400;
        },
    },
    mounted() {
        this.getNews({
            kind: this.first,
            flag: this.routerChange
        });
        this.loading = true;
        const _this = this;
        window.addEventListener('scroll', this.handleScroll);
    },
    watch: {
        '$route': function() {
            this.getNews({
                kind: this.$route.query.type,
                flag: this.routerChange
            });
            if (this.routerChange) {
                this.$store.commit(type.CHANGE_LOADING_STATE, true)
            } else {
                this.$store.commit(type.CHANGE_LOADING_STATE, false)
            }
            this.first = window.location.search.substring(6);
            this.$store.commit(type.ROUTERCHANGE, true);
            // this.$store.commit(type.PULLDOWNBTN, false);
        },
    },
    filters: {
        date: function(input) {
            if (!input) {
                return ''
            }
            var time = moment(input).startOf('minute').fromNow();
            // var reg = /(([1-9][0-9]{0,1})\s)minutes ago/.exec(time);
            return time;
        }
    },
    data() {
        return {
            navbar: [{
                    text: '推荐',
                    url: '/home/all',
                    type: '__all__'
                },
                {
                    text: '热点',
                    url: '/home/hot',
                    type: 'news_hot'
                },
                {
                    text: '社会',
                    url: '/home/society',
                    type: 'news_society'
                },
                {
                    text: '娱乐',
                    url: '/home/entertainment',
                    type: 'news_entertainment'
                },
                {
                    text: '科技',
                    url: '/home/tech',
                    type: 'news_tech'
                },
                {
                    text: '汽车',
                    url: '/home/car',
                    type: 'news_car'
                },
                {
                    text: '体育',
                    url: '/home/sports',
                    type: 'news_sports'
                },
                {
                    text: '财经',
                    url: '/home/finance',
                    type: 'news_finance'
                },
                {
                    text: '军事',
                    url: '/home/military',
                    type: 'news_military'
                },
                {
                    text: '国际',
                    url: '/home/world',
                    type: 'news_world'
                },
                {
                    text: '时尚',
                    url: '/home/fashion',
                    type: 'news_fashion'
                },
            ],
            top: false,
            first: window.location.search.substring(6),
        }
    },
}
</script>

<style lang="less" scoped rel="styleheet/less">@import "../assets/css/transtion.less";
@import '../assets/css/border.less';
.home-header-bar {
    & > i {
        margin-top: 0.2rem;
    }
    .logo {
        color: #fff;
        font-size: 18px;
        vertical-align: middle;
        i {
            vertical-align: middle;
        }
    }
    .homeEmail {
        margin-left: 0.22rem;
    }
    .search{
        display: inline-block;
       .homeSearch {
            margin-right: 0.22rem;
            margin-top: 0.2rem;
        } 
    }
    
}
.homeNav {
    width: 100%;
    overflow: hidden;
    overflow-x: auto;
    text-align: center;
    position: fixed;
    left: 0;
    font-size: 0;
    top: 1.2rem;
    background: #f4f5f6;
    font-family: '微软雅黑';
    white-space: nowrap;
    z-index: 999;
    .navBarLi {
        display: inline-block;
        height: 1rem;
        line-height: 1rem;
        width: 1.4rem;
        font-size: 16px;
        a {
            color: #000;
        }
        .router-link-active {
            color: #d43d3d;
            font-size: 17px;
            font-weight: bold;
        }
    }
}
::-webkit-scrollbar {
    display: none;
}
.newsContent {
    margin-top: 2.3rem;
    width: 100%;
    .newsDetaile {
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
.loading {
    margin-top: 3.4rem;
}
.newsLoadError {
    margin: 2.3rem auto;
    font-size: 25px;
    width: 90%;
}
.pulldownload {
    margin-bottom: 1.3rem;
    width: 100%;
    height: 1.5rem;
    line-height: 1.5rem;
    color: #000;
    font-size: 18px;
    text-align: center;
}
.top {
    position: absolute;
    bottom: 2rem;
    right: 0.15rem;
    background: #d43d3d;
    color: #fff;
    text-align: center;
    border-radius: 50%;
}
.pulldownbtn {
    position: absolute;
    margin: 0 auto;
    left: 50%;
    top: 0.5rem;
    z-index: 1000000;
}
</style>
