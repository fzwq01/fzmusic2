<template>
  <div class="discover">
      <!-- 首页导航 -->
      <nav-bar :list='list' ref="nav"></nav-bar>
      <!-- 内容 -->
      <div class="content">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
      </div>
  </div>
</template>

<script>
import NavBar from './childComps/NavBar';//首页导航
export default {
    name:'DiscoverMusic',
    data(){
        return{
          list:[
            {link:'/discover/individ',name:'个性推荐'},
            {link:'',name:'歌单'},
            {link:'',name:'排行榜'},
            {link:'',name:'歌手'},
            {link:'',name:'最新音乐'},
            {link:'',name:'MV'},
          ]
        }
    },
    components:{
      NavBar
    }
}
</script>

<style scoped>
.discover {
  width: 100%;
  height: 100%;
}
.swi {
  width: 100%;
  margin-top: 5px;
}
.content {
  width: 100%;
  height: calc(100% - 49px);
  margin-top: 10px;
  padding: 10px 155px;
  overflow: hidden;
}
.content p {
  font-size: 20px;
}
</style>