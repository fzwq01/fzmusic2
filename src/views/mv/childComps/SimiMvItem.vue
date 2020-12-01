<template>
  <div class="SimiMvItem">
      <div class="simi_item" v-for="(item,index) in mvList" :key="index" @click="playMV(item.id)">
          <div class="left">
              <img :src="item.cover" alt="">
              <div class="count">
                  <img src="~assets/img/leftmenu/shiping.svg" alt="">
                  <div class="paly_count">{{item.count}}</div>
              </div>
          </div>
          <div class="right">
              <div class="name">
                  <span>MV</span>
                  {{item.name}}
                  <div class="artist">{{item.artistName}}</div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name:'SimiMvItem',
    data(){
        return{

        }
    },
    props:{
        mvList:Array,
        default(){
            return []
        }
    },
    methods:{
        playMV(id){
             this.$router.push('/playmv/'+ id);
        }
    }
}
</script>

<style lang="scss" scoped>
    .SimiMvItem{
        width: 100%;
        .simi_item{
            width: 100%;
            margin-top:10px;
            display: flex;
            .left{
                width: 150px;
                position: relative;
                img{
                    width: 100%;
                }
                .count{
                    position: absolute;
                    top:0;
                    right: 0;
                    display: flex;
                    align-items: center;
                    height: 20px;
                    padding:3px 5px;
                    background:rgba(0, 0, 0, .25);
                    img{
                        height: 100%;
                    }
                }
            }
            .right{
                flex: 1;
                padding-left: 10px;
                span{
                    padding:1px;
                    color:red;
                    font-size: 13px;
                    border: 1px solid red;
                }
                .artist{
                    font-size: 13px;
                    margin-top:10px;
                    color: var(--color-text-an);
                }
            }
        }
    }
</style>