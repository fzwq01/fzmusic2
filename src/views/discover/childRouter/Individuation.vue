<template>
  <div class="individuation">
        <scroll  ref="scroll"  class="indici-scroll">
            <!-- 轮播 -->
            <swipers :banner="banner"></swipers>
            <p>推荐歌单</p>
            <music-list :personList="personalized" @imgLoad='imgLoad'></music-list>
            <!-- 独家放送 or other -->
            <private-content :pri="privateContent" @priImgLoad="priImgLoad" ></private-content>
            <!-- 最新音乐 -->
            <new-songs :songList="songList" @newSongImgLoad='newSongImgLoad' @playMusic="playMusic"></new-songs>
        </scroll>
  </div>
</template>

<script>
import Scroll from "../../../components/common/scroll/Scroll";
import Swipers from "../../../components/common/swiper/Swiper";
import MusicList from "components/content/musiclist/MusicList";
import PrivateContent from '../../../views/discover/childComps/PrivateContent';
import newSongs from '../../../views/discover/childComps/newSongs'

import {
  _getBanner,
  _getPersonalized,
  _getPrivateContent,
  _getNewSong
  } from '../../../network/discover'
import {_getSongsDetail,songDetail} from '../../../network/detail'
// 混入
import {imgLoad} from './indexMixin'
// 播放音乐混入
import {indexMixin} from '../../../views/musicListDetail/indexMinxin'

export default {
    name:'Individuation',
    components:{
        Scroll,
        Swipers,
        MusicList,
        PrivateContent,
        newSongs
    },
    mixins:[imgLoad,indexMixin],
    data(){
        return{
            limit: 16,  //获取歌单数
            banner:null,//轮播数据
            personalized:null,//保存获取的推荐歌单
            privateContent:null,//独家放送
            songList:null,//最新音乐
            musiclist:[],//播放音乐
        }
    },
    created(){
      // 显示推荐歌单
      _getPersonalized(this.limit).then(res => {
        this.personalized = res.data.result;
      })
      // 独家放送
      _getPrivateContent().then(res => {
        // console.log(res);
        this.privateContent = res.data;
      })
      // 最新音乐
      _getNewSong().then(res => {
        // console.log(res)
        this.songList = res.data.result;
      })
    },
    mounted(){
        // 轮播
        let that = this;
        _getBanner().then(function(res){
           that.banner = res.data.banners.slice(0, 6);
        })
    },
    methods:{
      priImgLoad(){
        this.$refs.scroll.refresh();
      },
      newSongImgLoad(){
         this.$refs.scroll.refresh();
      },
      // 播放音乐
      playMusic(index){
        this.musiclist = [];
        for(let i in this.songList){
          _getSongsDetail(this.songList[i].id).then(res => {
            let song = new songDetail(res.data.songs);
            this.musiclist.push(song);
            // 防止重复
            if(i == this.songList.length - 1){
              this.PlayMusic(index);
            }
          })
        }
      }
    }
}
</script>

<style scoped>
.individuation {
  width: 100%;
  height: 100%;
}
.indici-scroll {
  width: 100%;
  height: 100%;
}
</style>