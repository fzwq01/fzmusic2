<template>
  <div class="PlayMusic" v-if="playList">
      <player v-show="isPlayerShow" ref="player" :music="playList[currentIndex]" :lyric="lyric"></player>
      <!--播放样式 -->
      <div class="top">
          <div 
                class="music_top_icon"
                v-if="playList[currentIndex] != null"
                @mouseenter="isShade = true"
                @mouseleave="isShade = false"
                @click="PlayerRouter()"
            >
              <img :src="playList[currentIndex].pic" alt="">
              <div class="music_max" v-show="isShade">
                  <img src="~assets/img/playmusic/max.svg" alt />
              </div>
          </div>
          <div class="music_top_center" v-if="playList[currentIndex] != null">
              <div class="music_title">{{playList[currentIndex].title}}</div>
              <div class="music_artist">{{playList[currentIndex].artist}}</div>
          </div>
      </div>

      <!-- 隐藏的播放列表 -->
      <play-music-list :music-list='musicList'  class="play-music-list" v-show="isMusicList"></play-music-list>
      <!-- 下部隐藏的歌词 -->
      <lyric ref="lyric"  class="play-music-lyric" :lyric="lyric" v-show="isLyric"></lyric>

      <!-- 底部横条 -->
      <div class="player_music_left">
          <div class="pre" @click="preMusic()">
              <img  src="~assets/img/playmusic/pre.png" alt />
          </div>
          <div class="play" @click="toggle()">
                <img src="~assets/img/playmusic/play.png" alt v-show="!isPlay" />
                <img src="~assets/img/playmusic/play2.png" alt v-show="isPlay" />
          </div>
          <div class="next" @click="nextMusic()">
              <img src="~assets/img/playmusic/next.png" alt />
          </div>
      </div>
      <!-- 右边 -->
      <div class="play_music_right" >
          <audio
            autoplay
            :src="playList[currentIndex].src"
            ref="audio"
            @playing="musicPlaying()"
            @pause='musicPause()'
            @play="playLoad()"
            @timeupdate="audioTimeUpdate()"
            @ended="musicEnded()"
            @error="musicErr()"
          ></audio>
          <div class="music_pro">
              <div class="currentTime">{{currentTime}}</div>
              <!-- 音乐进度条 -->
              <music-progress class="music_pro_progress" ref="music_pro" @childclick="setMusicCurrent" />
              <div class="totalTime">{{duration}}</div>
          </div>
          <!-- 声音条 -->
          <div class="volumn">
              <div class="volumn_icon" @click="toggleVolume()">
                   <img src="~assets/img/playmusic/volumn.svg" alt class="vol_img" v-if="isVolume">
                   <img src="~assets/img/playmusic/novolumn.svg" alt class="vol_img" v-else />
              </div>
              <volumn-progress ref="volume_pro" @childclick="setVolume" />
          </div>
          <div class="icon">
              <div class="schema" @click="toggleSchema()">
                  <a href="#" title="顺序播放" v-show="schemaIndex==0">
                       <img src="~assets/img/playmusic/sunxubofang.svg" />
                  </a>
                  <a href="#"  title='随机播放' v-show="schemaIndex==1">
                      <img src="~assets/img/playmusic/suijibofang.svg" />
                  </a>
                  <a href="#" title="单曲播放" v-show="schemaIndex==2">
                      <img src="~assets/img/playmusic/danquxunhuan.svg" />
                  </a>
              </div>
              <div class="music_lyric" @click="toggleLyric()">
                    <a href="#" title="歌词" v-if="isLyric">
                        <img src="~assets/img/playmusic/lyric.svg"  />
                    </a>
                    <a href="#" title="歌词" v-else >
                        <img src="~assets/img/playmusic/lyric-click.svg" />
                    </a>
              </div>
              <div class="music_list">
                  <a href="#" title="歌单" @click="toggleMusicList()">
                    <img src="~assets/img/playmusic/list.svg" alt />
                  </a>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { formatDate } from "assets/common/tool";
import PlayMusicList from './PlayMusicList'// 音乐列表
import MusicProgress from '../../common/progress/MusicProgress' //播放进度条
import VolumnProgress from "components/common/progress/MusicProgress";
import player from './player'
import lyric from './lyric'

import {_getLyric} from '../../../network/detail' //获取歌词

export default {
    name:'PlayMusic',
    components:{
        PlayMusicList,
        MusicProgress,
        player,
        lyric
    },
    data(){
        return{
            isPlay: false, //true正在播放
            isLyric:false,//歌词显示
            currentIndex:0,//当前播放
            isShade:false,//hover显示打开播放页面
            musicList:[],//音乐列表
            isMusicList:false,//音乐列表隐藏
            currentTime:"00:00",
            duration:"00:00",
            isPlayerShow:false,//显示播放页面
            lyric:"",//存歌词
            schemaIndex: 0,//播放方式
            isVolume:false,//音量
            playList:[
                {
                    title: "爱存在（抖音版）（翻自 魏奇奇）",
                    artist: "如懿",
                    index: "0",
                    lrc: "",
                    src:
                        "http://m8.music.126.net/20200708181541/dc873a2b4b00f9a2713fced8afe9cd72/ymusic/obj/w5zDlMODwrDDiGjCn8Ky/2839783247/945a/f45b/fa89/87264bf976128116dd2394e5f97c807a.mp3",
                    pic:
                        "https://p1.music.126.net/Y3MgpdL1iMno2g0yDnfMXQ==/109951165054657451.jpg"
                }
            ],//列表
        }
    },
    mounted(){
         /**list是音乐列表，index是要播放的音乐在列表中的位置，path是当前播放音乐的路由路径,musicList是歌单信息*/
         this.$bus.$on('playMusic',(list, index, path, musicList) => {
             this.playList = [];
             this.path = path;
             this.playList = list;
             this.musicList = musicList;
             /**对数组进行排序 */
             this.playList = this.playList.sort((a, b) => {
                return a.index - b.index;
            });
             /**在请求歌曲的时候可能有的歌曲不可用，或丢失。导致在播放器中的歌曲列表和页面展示存在差异，可能会出现指定的播放歌曲不服
             * 用一次查找解决问题
             */
             this.setCurrentIndex(index);
         })

          // 点击播放播放列表
             this.$bus.$on('PlayMusicListItem',index => {
                 this.setCurrentIndex(index);
             })
    },
    methods:{
        // 设置要播放的音乐
        setCurrentIndex(index){
            for(let i in this.playList){
                if(this.playList[i].index == index){
                    this.currentIndex = i;
                    break;
                }
            }
        },
        // 正在播放
        musicPlaying(){
            this.isPlay = true;
            /**currentIndex并不等于歌单里音乐，music数组里每个属性index才对应歌单里的顺序 */
            this.$bus.$emit('Playing',this.playList[this.currentIndex].index,this.path)

            // if (this.$refs.player != null) this.$refs.player.isPlay = true;
        },
        // 监听音乐加载
        playLoad(){
            // 获取当前播放的歌曲歌词
            _getLyric(this.playList[this.currentIndex].id).then(res => {
               this.lyric = res.data.lrc.lyric;
            })
        },
        // 播放或暂停音乐
        toggle(){
            this.isPlay = !this.isPlay;
            if(this.isPlay){
                this.$refs.audio.play();
            }
            else{
                this.$refs.audio.pause();
            }
        },
        // 暂停
        musicPause(){
            this.isPlay = false;
            // if (this.$refs.player != null) this.$refs.player.isPlay = false;
        },
       
        // 进度条
        setMusicCurrent(scale){
            this.$refs.audio.currentTime = scale * this.$refs.audio.duration;
        },
        // 返回当前的播放时间
        audioTimeUpdate(){
            if(this.$refs.audio != null){
                 /**new Date()传入的是毫秒，而$refs.audio.currentTime返回的是秒*/
                this.currentTime = formatDate(
                    new Date(this.$refs.audio.currentTime * 1000),
                    "mm:ss"
                )
                this.duration = formatDate(
                    new Date(this.$refs.audio.duration * 1000),
                    "mm:ss"
                )
                // 进度条比例
                let scale = this.$refs.audio.currentTime / this.$refs.audio.duration;
                this.$refs.music_pro.setProgress(scale);
            }
        },
        // 播放方式
        toggleSchema(){
            if(this.schemaIndex >= 2)this.schemaIndex = 0;
            else this.schemaIndex++;
        },
        // 播放错误
        musicErr(){

        },
        // 监听音乐播放完成
        musicEnded(){
            switch(this.schemaIndex){
                case 0:
                    this.currentIndex >= this.playList.length - 1 ? 0 : this.currentIndex;//顺序播放
                case 1:
                    this.currentIndex  = Math.floor(Math.random() * this.playList.length);//随机播放
                case 2://单曲循环
                    break; 
                    
            }
        },
        // 下一首
        nextMusic(){
            if(this.currentIndex >= this.playList.length -1) this.currentIndex = 0;
            else this.currentIndex++;
            this.$refs.audio.src = this.playList[this.currentIndex].src;
        },
        // 上一首
        preMusic(){
            if(this.currentIndex <= 0)this.currentIndex = this.playList.length - 1;
            return this.currentIndex --;
            this.$refs.audio.src = this.playList[this.currentIndex].src;
        },
        // 设置音量
        toggleVolume(){
            this.isVolume = !this.isVolume;
            if(this.isVolume){
                this.$refs.audio.volumn = 0.0
            }else{
                this.$refs.audio.volumn = 0.8;
                this.$refs.volume_pro && this.$refs.volume_pro.setProgress(0.8)
            }
        },
        setVolume(scale){
            this.$refs.audio.volumn = scale;
        }, 
        //显示歌单
        toggleLyric(){
            this.isLyric = !this.isLyric;
        },
         // 显示歌单
        toggleMusicList(){
            this.isMusicList = !this.isMusicList;
        },
        // 切换播放页面
        PlayerRouter(){
            this.isPlayerShow = !this.isPlayerShow;
        }   
    }
}
</script>

<style lang="scss" scoped>
.PlayMusic{
    width:100%;
    height: 59px;
    background: #212124;
    position: relative;
    z-index: 3;
    bottom: 0;
    .top{
        width: 15%;
        height: 100%;
        position: absolute;
        left:0;
        bottom:59px;
        display: flex;
        background:#191b1f;
        .music_top_icon{
            height: 100%;
            img{
                height: 100%;
            }
            .music_max{
                position: relative;
                bottom:64px;
                z-index:4;
                width: 59px;
                height: 100%;
                background: rgba(0, 0, 0, 0.4);
                img{
                    opacity: 0.5;
                }
            }
        }
        .music_top_center{
            width: 100%;
            font-size: 13px;
            position: relative;
            left:5px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            .music_title{
                position: absolute;
                top:0;
            }
            .music_artist{
                position: absolute;
                bottom:0;
            }
        }
    }
    .play-music-list{
        position: absolute;
        right:0;
        bottom:59px;
    }
    .play-music-lyric {
        width: 460px;
        height: 30px;
        position: absolute;
        left: 0px;
        right: 0px;
        bottom: 59px;
        z-index: 999;
        margin: auto;
    }
    .player_music_left{
        display: flex;
        float: left;
        width: 15%;
        height: 100%;
        justify-content: space-around;
        align-items: center;
        div{cursor: pointer;}
        .play{
            img{
                width: 55px;
                height: 55px;
            }
        }
    }
    .play_music_right{
        width: 85%;
        height: 100%;
        float: right;
        .music_pro{
            width: 70%;
            height: 100%;
            float: left;
            display: flex;
            align-items: center;
            text-align: center;
            .currentTime,.totalTime{
                width:60px;
            }
            .music_pro_progress{
                flex:1;
            }
        }
        .volumn{
            width: 10%;
            height: 100%;
            float: left;
            display: flex;
            align-items: center;
            .volumn_icon{
                width: 15px;
                margin-right:10px;
                .vol_img{
                    width: 21px !important;
                }
            }
        }
        .icon{
            padding:0px 20px;
            width: 20%;
            height: 100%;
            margin-top: 3px;
            float: left;
            display: flex;
            justify-content: space-around;
            align-items: center;
            .schema{
                width: 30px;
                img{
                    width: 20px;
                    height: 20px;
                }
                img:nth-child(2){
                    width: 18px;
                    height: 18px;
                }
            }
            .music_lyric{
                width: 20px;
                img{
                    width: 100%;
                }
            }
            .music_list{
                width: 20px;
                img{
                    width: 100%;
                }
            }
        }
    }
}
</style>