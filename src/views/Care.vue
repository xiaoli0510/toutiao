<template>
 <div id="care">
     <header-bar>
         <div class="care-header-bar" slot="care">
             <span>我关注的</span>
             <Icon type="person-add" size="28" class="fr addFriends" color="#fff"></Icon>
         </div>
     </header-bar>
     <div class="no">
         <div class="cont">
             因数据限制，暂未开发，后续可能更换此频道内容
         </div>
     </div>
     <bottomNav></bottomNav>
 </div>

</template>
<script>
import headerBar from '../components/Header-bar.vue'
import bottomNav from '../components/Bottom-nav.vue'
export default{
    components:{
        headerBar,
        bottomNav
    }
}

</script>
<style lang="less">
#care{
  .care-header-bar {
    font-size: 16px;
    text-align: center;
    color: #fff;
    span{
      margin-right: -1rem;
    }
    .addFriends {
        line-height: 1.2rem;
        margin-right: 0.3rem;
    }
  }
  .no{
    position: relative;
    top: 2rem;
    font-size: 30px;
    .cont{
      width: 94%;
      margin: 0 auto;
    }
  }
}


</style>



