console.log("evaled");
// import hotreload from "crx-hotreload";

chrome.runtime.onInstalled.addListener(function () {
  console.log("installed");
});
