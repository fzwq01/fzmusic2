// 封装播放曲目
export class playList{
    constructor(index,song,url='',id){
        this.index = index;
        this.title = song.name;
        this.artist=song.song;
        this.src=url;
        this.pic=song.pic;
        this.id=id;
    }
}
// 封装歌词
export class lyricItem{
    constructor(time,lyric){
        this.time = time;
        this.lyric = lyric;
    }
}


