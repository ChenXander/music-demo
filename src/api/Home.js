// 文件名尽量和模块页面文件同名，方便查找
import request from '@/utils/request'

// 首页推荐歌单
export const recommandMusic = params => request({
    url:'/personalized',
    // 将来传入params值{limit: 20}
    params
})

// 首页推荐最新音乐
export const newMusic = params => request({
    url: '/personalized/newsong',
    params
})

