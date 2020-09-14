import 'crx-hotreload'

chrome.runtime.onInstalled.addListener(function () {
  console.log('installed')
})

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (
    changeInfo.status === 'complete' &&
    tab.url &&
    tab.url.indexOf('https://www.openrec.tv') > -1
  ) {
    chrome.tabs.executeScript(tabId, {
      file: 'content.js'
    })
  }
})
