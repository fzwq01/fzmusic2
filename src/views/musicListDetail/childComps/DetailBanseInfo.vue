<template>
  <div class="base" v-if="!baseInfo != null">
      <div class="title">
          <img :src="baseInfo.coverImgUrl" alt />
      </div>
      <div class="content">
          <div class="top">
                <span class="icon">歌单</span>‘
                <span>{{baseInfo.name}}</span>
                <div class="right">
                    <table>
                        <tr>
                            <td>
                                歌曲数
                                <br />
                                    {{baseInfo.trackCount}}
                                </td>
                                <td>
                                    播放量
                                    <br />
                                    {{baseInfo.playCount}}
                                </td>
                            </tr>
                    </table>
                </div>
          </div>
          <div class="center">
              <div class="bofang">
                  <img src="../../../assets/img/playmusic/bofang.svg" alt />
                  播放全部
              </div>
              <div class="sub">
                  <img src="../../../assets/img/detail/add.svg" alt />
                  收藏({{baseInfo.subscribedCount}})
              </div>
              <div class="share">
                  <img src="../../../assets/img/detail/share.svg" alt />
                  分享({{baseInfo.shareCount}})
              </div>
          </div>
          <div class="sesc">
              <div class="biaoqian">
                  标签:
                  <span v-for="(item,index) in baseInfo.tags" :key="index">{{item}}</span>
              </div>
              <div class="desc-item">{{baseInfo.description}}</div>
          </div>
    </div>
</div>
</template>

<script>
export default {
    name:'base',
    props:{
        baseInfo:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    data(){
        return{

        }
    },
    methods:{

    }
}
</script>

<style lang="scss" scoped>
.base{
    width: 100%;
    overflow: hidden;
    .title{
        width:200px;
        float: left;
        img{
            width: 100%;
        }
    }
    .content{
        overflow: hidden;
        padding:0 20px;
        position: relative;
        .top{
            span{font-size: 20px;}
            .icon{
               border:1px solid red;
               border-radius: 4px;
               color:red;
               padding:5px;
               font-size: 11px;
               margin-right:10px;
            }
            .right{
                float: right;
                td{
                    text-align: center;
                    font-size: 12px;
                    padding:5px;
                    color:#4e4e52;
                }
            }
        }
        .center{
            padding-top:40px;
           div{
               padding:5px 10px;
               background:#25272b;
               border-radius: 10px;
               margin-right: 10px;
               cursor: pointer;
               display: inline-block;
           }
           img{
               width:18px;
               height: 18px;
               vertical-align: -4px;
           }
           .bofang{
               background:#cd2929;
           }
        }
        .sesc{
            margin-top:30px;
            span{
                color: #2e6bb0;
                padding-right: 5px;
            }
            .desc-item{
                line-height: 30px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
                margin-top:20px;
            }
        }
    }
}
</style>