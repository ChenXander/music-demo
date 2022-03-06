// api文件夹下 各个请求模块js统一到index.js再向外导出
import { recommandMusic, newMusic } from "./Home";
import { hotSearch,searchResultList } from "./Search";
import {getSongById,getLyricById} from './Play'

export const recommandMusicAPI = recommandMusic; // 请求推荐歌单的导出
export const newMusicAPI = newMusic; // 首页最新音乐
export const hotSearchAPI = hotSearch; // 热搜关键词
export const searchResultListAPI = searchResultList; // 热搜关键词
export const getSongByIdAPI = getSongById; // 歌曲-播放地址
export const getLyricByIdAPI = getLyricById; // 歌曲-歌词数据
