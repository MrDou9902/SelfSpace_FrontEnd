import music1 from '@/assets/music/A Little Story.mp3'
import music2 from '@/assets/music/FuGa pang - 【FREE】lucky.ogg'
import music3 from '@/assets/music/増田俊郎 (ますだ としお) - 「籠のなか」 (笼之中).mp3'

export interface singleMusic {
  musicName: string
  src: string
  allTime: string
  sliderLength: number
}

export const musicList: Array<singleMusic> = [
  {
    musicName: 'Valentin (ヴァレンティン) - A Little Story',
    src: music1,
    allTime: '03:26',
    sliderLength: 206
  },
  {
    musicName: 'FuGa pang - 【FREE】lucky',
    src: music2,
    allTime: '02:37',
    sliderLength: 157
  },
  {
    musicName: '増田俊郎 (ますだ としお) - 「籠のなか」 (笼之中)',
    src: music3,
    allTime: '02:18',
    sliderLength: 138
  }
]
