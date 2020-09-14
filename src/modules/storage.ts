type Keys = 'isRight' | 'chatWidth'

export function setStorage(key: Keys, value: string | number | boolean) {
  chrome.storage.local.set({ [key]: value }, function () {
    console.log('Value is set to ' + value)
  })
}

export function getStorage<T>(key: Keys) {
  return new Promise<T>((resolve) => {
    chrome.storage.local.get([key], function (result) {
      resolve(result[key])
    })
  })
}
