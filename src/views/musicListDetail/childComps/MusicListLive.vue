<template>
  <div class="live" v-if="subs">
      <div class="content">
          <div class="item" v-for="(item,index) in subs" :key="index">
              <img :src="item.avatarUrl" alt="">
              <div>{{item.nickname}}</div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name:'MusicListLive',
    props:{
        subs:{
            type:Array,
            default(){
                return []
            }
        }
    },
    updated(){
        
    }
}
</script>

<style lang="scss" scoped>
.live{
    width: 100%;
    .content{
        display: flex;
        flex-wrap: wrap;
        .item{
            padding:30px;
            text-align: center;
            font-size: 12px;
            img{
                width: 60px;
                height: 60px;
                border-radius:50%;
            }
        }
    }

}
</style>