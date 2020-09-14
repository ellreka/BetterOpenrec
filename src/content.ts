import { init } from './modules/init'
import { changeChatPosition } from './modules/changeChatPosition'

async function contentScripts() {
  const {
    bodyElement,
    movieElement,
    chatElement,
    settingButton,
    config
  } = await init()
  console.log(config)
  changeChatPosition(
    movieElement,
    chatElement,
    config.chatWidth,
    config.isRight
  )
}

contentScripts()
