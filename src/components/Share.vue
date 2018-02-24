<template>
  <div id="share" v-show="show">
    <ul>
      <li class="shareItem"><a href="javascript:;"></a></li>
      <li class="shareItem"><a href="javascript:;"></a></li>
      <li class="shareItem"><a href="javascript:;"></a></li>
      <li class="shareItem"><a href="javascript:;"></a></li>
      <li class="shareItem"><a href="javascript:;"></a></li>
      <li class="shareItem"><a href="javascript:;"></a></li>
      <li class="shareItem"><a href="javascript:;"></a></li>
      <li class="shareItem"><a href="javascript:;"></a></li>
    </ul>
    <div class="quxiao" @click="hiddenShare">取消</div>
  </div>
</template>
<script>
import * as type from '../store/mutation-types.js'
import { 
  mapGetters
 } from "vuex"
export default {
  methods:{
    hiddenShare(){
      this.$store.commit(type.SHOWSHAREBOX,false)
    }

  },
  computed:{
      ...mapGetters([
        'Sharebox'
      ])
  },
  props:{
    'show':Boolean
  }
}
</script>
<style>
#share {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    font-size: 0;
    border-top: 1px solid #ccc;
    z-index: 1000;
    background: #fff;
}

.shareItem {
    display: inline-block;
    width: 25%;
    color: #fff;
    text-align: center;
}

.shareItem a {
    display: block;
    height: 1.2rem;
    line-height: 1.2rem;
    width: 1.2rem;
    border-radius: 50%;
    background: url(../assets/imgs/wechat.jpg);
    background-size: cover;
    margin: .5rem .66rem;
    text-align: center;
    font-size: 18px;
}

.quxiao {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 18px;
    border-top: 1px solid #ccc;
}
.slide-enter-active, .slide-leave-active{
    transition: all .6s ease;
}
.slide-enter, .slide-leave-active{
    transform: translateY(230px);
    opacity: 0;
}
</style>

