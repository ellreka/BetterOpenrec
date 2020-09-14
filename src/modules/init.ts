import { setStorage, getStorage } from './storage'

let config: {
  isRight: boolean
  chatWidth: number
}

export async function init() {
  config = {
    isRight: (await getStorage('isRight')) ?? true,
    chatWidth: (await getStorage('chatWidth')) ?? 360
  }
  const bodyElement = document.querySelector('body')
  const movieElement: HTMLElement | null = document.querySelector(
    '.movie-page-article'
  )
  const chatElement: HTMLElement | null = document.querySelector(
    '.movie-page-chat-aside'
  )
  const container = document.querySelector(
    '.MovieToolbar__Wrapper-g5e6ic-0.zoHlM'
  )
  const settingButton = document.createElement('div')
  settingButton.className = 'better-openrec_settingButton'
  const style = {
    width: '30px',
    height: '30px',
    background: 'red'
  }
  Object.assign(settingButton.style, style)
  settingButton.addEventListener('click', () => {
    getStorage<boolean>('isRight').then((response) => {
      setStorage('isRight', !response)
      config.isRight = !response
      console.log(config)
    })
  })

  if (bodyElement && movieElement && chatElement && container) {
    container.appendChild(settingButton)
    return {
      bodyElement,
      movieElement,
      chatElement,
      settingButton: settingButton,
      config
    }
  } else {
    console.error({
      bodyElement,
      movieElement,
      chatElement,
      container
    })
    throw new Error('better-openrec: どれかが取得できていない')
  }
}
