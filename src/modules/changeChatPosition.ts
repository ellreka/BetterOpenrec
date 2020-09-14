type ChangeChatPosition = (
  movie: HTMLElement,
  chat: HTMLElement,
  chatWidth: number,
  isRight: boolean
) => void

/**
 *
 * @param movie -動画要素
 * @param chat -チャット欄
 * @param chatWidth -チャット欄のサイズ
 * @param isRight -チャットの場所
 */
export const changeChatPosition: ChangeChatPosition = (
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
  // resizeChatSize(left)
}

export const resizeChatSize = (left: boolean) => {
  const resizeBar = document.createElement('div')
  resizeBar.className = 'better-openrec_resizebar'
  const resizeBarStyle = {
    width: '8px',
    height: '100%',
    position: 'absolute',
    top: '0',
    right: left ? '-4px' : 'auto',
    left: left ? 'auto' : '-4px',
    cursor: 'col-resize'
  }
  Object.assign(resizeBar.style, resizeBarStyle)
  // if (movieElement && chatElement) {
  //   chatElement.appendChild(resizeBar)
  //   const resizeEvent = (e: MouseEvent) => {
  //     chatWidth = left ? e.clientX : window.innerWidth - e.clientX
  //     changeChatLocation(left)
  //   }
  //   resizeBar.addEventListener('mousedown', () => {
  //     if (bodyElement) bodyElement.style.userSelect = 'none'
  //     window.addEventListener('mousemove', resizeEvent)
  //     window.addEventListener('mouseup', () => {
  //       window.removeEventListener('mousemove', resizeEvent)
  //       if (bodyElement) bodyElement.style.userSelect = 'auto'
  //     })
  //   })
  // }
}
