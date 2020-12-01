export const tableMixin = {
    methods:{
        setSerial(index){
            if((index + 1) <= 9) return '0'+(index + 1)
            else return (index + 1)
        },
        setBackColor(index){
            if(index%2!=0){
                return true;
            }
            return false;
        },
        // 点击听歌列表的歌曲  将
        musicItemClick(index){
            // console.log(this.$parent.$parent.$el); //则拿到父级的父级的PlayMusicList.vue的最外层
            // console.log(this.$parent.$parent.$el.className);
            // console.log(this.$parent.$parent.$el.className.indexOf('PlayMusicList'))
            if(this.$parent.$parent.$el.className.indexOf('play-music-list')!=-1){
                this.$bus.$emit('PlayMusicListItem',index)
            }
            this.$emit('musicItemClick',index);
        }
    }
}