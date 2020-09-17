import { setStorage, getStorage } from './storage'
import { throttle } from 'throttle-debounce'

type InitChatPosition = (
  movie: HTMLElement,
  chat: HTMLElement,
  chatWidth: number,
  isRight: boolean
) => void

/**
 * チャット欄の位置を変更する関数
 */
const changeChatPosition: InitChatPosition = (
  movie,
  chat,
  chatWidth,
  isRight
) => {
  const windowWidth = window.innerWidth
  const movieStyle = {
    width: `${windowWidth} - ${chatWidth}px`,
    marginLeft: isRight ? '0' : `${chatWidth}px`,
    marginRight: isRight ? `${chatWidth}px` : '0'
  }

  const chatStyle = {
    width: `${chatWidth}px`,
    right: isRight ? '0' : 'auto',
    left: isRight ? 'auto' : '0'
  }
  Object.assign(movie.style, movieStyle)
  Object.assign(chat.style, chatStyle)
}

const resizeChatSize = (resizeBar: HTMLElement, isRight: boolean) => {
  const resizeBarStyle = {
    width: '8px',
    height: '100%',
    position: 'absolute',
    top: '0',
    right: isRight ? 'auto' : '-4px',
    left: isRight ? '-4px' : 'auto',
    cursor: 'col-resize'
  }
  Object.assign(resizeBar.style, resizeBarStyle)
}

/**
 *
 * @param movie -動画要素
 * @param chat -チャット欄
 * @param chatWidth -チャット欄のサイズ
 * @param isRight -チャットの場所
 */
export const initChatPosition: InitChatPosition = (
  movie,
  chat,
  chatWidth,
  isRight
) => {
  changeChatPosition(movie, chat, chatWidth, isRight)

  //動画下のメニュー要素
  const container = document.querySelector(
    '.MovieToolbar__Wrapper-g5e6ic-0.zoHlM'
  )

  //設定ボタン作成
  const settingButton = document.createElement('div')
  settingButton.className = 'better-openrec_settingButton'
  const style = {
    width: '30px',
    height: '30px',
    background: 'red'
  }
  Object.assign(settingButton.style, style)

  //設定ボタンのクリックイベント
  settingButton.addEventListener('click', async () => {
    const resizeBar: HTMLElement | null = document.querySelector(
      '.better-openrec_resizebar'
    )
    const chatWidth = (await getStorage<number>('chatWidth')) ?? 360
    const isRight = (await getStorage<boolean>('isRight')) ?? true
    changeChatPosition(movie, chat, chatWidth, !isRight)
    if (resizeBar) resizeChatSize(resizeBar, !isRight)
    setStorage('isRight', !isRight)
  })
  if (container) container.appendChild(settingButton)
}

type InitResizeChatBar = (
  body: HTMLElement,
  movie: HTMLElement,
  chat: HTMLElement,
  chatWidth: number,
  isRight: boolean
) => void

export const initResizeChatBar: InitResizeChatBar = (
  body,
  movie,
  chat,
  chatWidth,
  isRight
) => {
  //リサイズバー作成
  const resizeBar = document.createElement('div')
  resizeBar.className = 'better-openrec_resizebar'
  chat.appendChild(resizeBar)
  resizeChatSize(resizeBar, isRight)
  let newChatWidth = chatWidth
  const resizeChatWidth = throttle(100, (e: MouseEvent, isRight: boolean) => {
    console.log('resize')
    newChatWidth = isRight ? window.innerWidth - e.clientX : e.clientX
    changeChatPosition(movie, chat, newChatWidth, isRight)
  })
  const resizeEvent = async (e: MouseEvent) => {
    const isRight = (await getStorage<boolean>('isRight')) ?? true
    resizeChatWidth(e, isRight)
  }
  resizeBar.addEventListener('mousedown', async () => {
    body.style.userSelect = 'none'
    window.addEventListener('mousemove', resizeEvent)
    window.addEventListener('mouseup', () => {
      console.log('mouseup')
      setStorage('chatWidth', newChatWidth)
      window.removeEventListener('mousemove', resizeEvent)
      body.style.userSelect = 'auto'
    })
  })
}
