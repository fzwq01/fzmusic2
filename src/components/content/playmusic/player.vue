<template>
    <transition name="slide">
        <div class="player">
            <scroll ref="scroll" class="player_scroll" :pull-up-load="true" @pullingUp="pullingUp()">
                <div class="play_content">
                    <div class="left">
                        <div class="play_bar_support">
                            <img src="../../../assets/img/playmusic/play-bar-support.png" alt />
                        </div>
                        <div class="play_bar">
                            <img src="../../../assets/img/playmusic/play-bar.png" class="play_bar" alt />
                        </div>
                        <div class="music_pic">
                            <div class="img_warp">
                                <img :src="music.pic" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="top">
                            <h2>
                                <span>{{music.title}}</span>
                            </h2>
                        </div>
                        <div class="lyric">
                            <lyric ref="lyric" :lyric='lyric'></lyric>
                        </div>
                    </div>
                </div>
                <!-- 评论 -->
                <div class="play_bottom">
                     <recommends :recommends="recommends"/>
                </div>
            </scroll>
        </div>
    </transition>
</template>

<script>
import Scroll from '../../../components/common/scroll/Scroll'
import Recommends from "views/musicListDetail/childComps/Recommends"
import lyric from "./lyric";
import {_getMusicComment} from '../../../network/detail'//获取音乐评论

export default {
    name:'',
    props:{
        music:{
           type:Object,
           default(){
               return {}
           } 
        },
        lyric:{
            type:String,
            default(){
                return ''
            }
        }
    },
    components:{
        Recommends,
        Scroll,
        lyric
    },
    watch:{
        music(){
            console.log(this.music);
            // 获取歌曲评论
            _getMusicComment(this.music.id,this.limit).then(res => {
                this.recommends = res.data.comments;
            })
        }
    },
    data(){
        return{
            limit:20,
            recommends:[],//评论
            page:1,
        }
    },
    methods:{
        pullingUp(){
            this.musicRecommend();
        },
        musicRecommend(){
            _getMusicComment(this.music.id,this.limit*this.page).then(res => {
                console.log(res);
                this.recommends = res.data.comments;
                this.page++;
                this.$refs.scroll.finishPullUp(); //调用上拉加载更多方法
                console.log('加载第'+ this.page + '次')
            })
        }
        
    }
}
</script>

<style lang="scss" scoped>
.player{
    width: 100%;
    height: calc(100vh - 59px - 54px);
    position: absolute;
    top: calc(59px + 54px - 100vh); 
    padding: 20px 15%;
    background: linear-gradient(-45deg, #333540, #070708, #333540);
    .player_scroll{
        width: 100%;
        height: 100%;
        overflow: hidden; 
        .play_content{
            width: 100%;
            height: 405px;
            position: relative;
            .left{
                width: 50%;
                height: 100%;
                float: left;
                position: relative;
                overflow: hidden; 
                .play_bar_support{
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    box-shadow: 0 0 3px #fff;
                    position: absolute;
                    z-index: 2;
                    left: 0px;
                    right: 0px;
                    top: -8px;
                    margin: auto;
                    img{
                        width: 100%;
                    }
                }
                .play_bar{
                    width: 80px;
                    height: 127px;
                    position: absolute;
                    left: calc(50% - 22px);
                    top: -5px;
                    z-index: 1;
                }
                .music_pic{
                    width: 270px;
                    height: 270px;
                    border: 40px solid #0e0e11;
                    border-radius: 50%;
                    box-shadow: 0 0 10px #fff;
                    position: absolute;
                    left: 0;
                    right: 0;
                    top: 70px;
                    margin: auto;
                    .img_warp{
                        // border: 5px solid #fff;
                        border-radius: 50%;
                        img{
                            width: 100%;
                            border-radius: 50%;
                        }
                    }
                }
            }
            .right{
                width: 50%;
                height: 100%;
                float: left;
                .top{
                    color: #d5d5d6;
                    font-weight: 300;
                    padding: 10px 0px;
                    span{
                        margin-left: -8px;
                    }
                }
                .lyric{
                    padding: 5px 0px;
                    height: calc(100% - 55px);
                    color: #5e6062;
                } 
            }
        }
        .play_bottom{
            width: 100%;
            height: 35%;
            margin-top:-10px;
            padding: 0px 5%;
        }
    }  
}
.rotate {
  animation: rotate 20s linear infinite;
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(1turn);
  }
}
</style>