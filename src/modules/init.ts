import { getStorage } from './storage'
import { initChatPosition, initResizeChatBar } from './main'

export async function init() {
  // body要素
  const bodyElement = document.querySelector('body')
  // 動画要素
  const movieElement: HTMLElement | null = document.querySelector(
    '.movie-page-article'
  )
  //チャット欄要素
  const chatElement: HTMLElement | null = document.querySelector(
    '.movie-page-chat-aside'
  )
  if (bodyElement && movieElement && chatElement) {
    //初期設定
    const chatWidth = (await getStorage<number>('chatWidth')) ?? 360
    const isRight = (await getStorage<boolean>('isRight')) ?? true
    initChatPosition(movieElement, chatElement, chatWidth, isRight)
    initResizeChatBar(
      bodyElement,
      movieElement,
      chatElement,
      chatWidth,
      isRight
    )
  } else {
    console.error({
      bodyElement,
      movieElement,
      chatElement
    })
    throw new Error('better-openrec: どれかが取得できていない')
  }
}
