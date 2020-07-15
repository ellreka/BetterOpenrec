console.log("load script: better openrec");
const movieElement: HTMLDivElement | null = document.querySelector(
  ".movie-page-article"
);
const chatElement: HTMLElement | null = document.querySelector(
  ".movie-page-chat-aside"
);

const bodyElement: HTMLBodyElement | null = document.querySelector("body");

let left = false;
const setSettingButton = () => {
  const chatInputAreaElement: HTMLElement | null = document.querySelector(
    ".InputArea__LeftBlock-azxri0-6"
  );
  if (chatInputAreaElement) {
    const settingButton: HTMLElement = document.createElement("div");
    settingButton.className = "better-openrec_setting";
    settingButton.addEventListener("click", () => {
      changeChatLocation((left = !left));
    });
    const settingButtonStyle = {
      width: "100px",
      height: "100px",
      background: "red",
    };
    Object.assign(settingButton.style, settingButtonStyle);
    console.log(chatInputAreaElement);
    chatInputAreaElement.appendChild(settingButton);
  }
};
const changeChatLocation = (left: boolean = false) => {
  if (movieElement && chatElement) {
    const movieStyle = left
      ? {
          marginLeft: "36rem",
          marginRight: "0",
        }
      : {
          marginLeft: "0",
          marginRight: "36rem",
        };
    const chatStyle = left
      ? {
          left: "0",
          right: "auto",
        }
      : {
          left: "auto",
          right: "0",
        };
    Object.assign(movieElement.style, movieStyle);
    Object.assign(chatElement.style, chatStyle);
  }
  console.log(left);
  resizeChatSize(left);
};
const resizeChatSize = (left: boolean) => {
  const resizeBar: HTMLElement = document.createElement("div");
  resizeBar.className = "better-openrec_resizebar";
  const resizeBarStyle = {
    width: "8px",
    height: "100%",
    position: "absolute",
    top: "0",
    right: left ? "0" : "auto",
    left: left ? "auto" : "0",
    cursor: "col-resize",
  };
  Object.assign(resizeBar.style, resizeBarStyle);
  if (movieElement && chatElement) {
    chatElement.appendChild(resizeBar);
    const resizeEvent = (e: MouseEvent) => {
      if (left) {
        chatElement.style.width = `${e.clientX}px`;
        movieElement.style.marginLeft = `${e.clientX}px`;
      } else {
        chatElement.style.width = `calc(100vw - ${e.clientX}px)`;
        movieElement.style.marginRight = `calc(100vw - ${e.clientX}px)`;
      }
    };
    resizeBar.addEventListener("mousedown", () => {
      if (bodyElement) bodyElement.style.userSelect = "none";
      window.addEventListener("mousemove", resizeEvent);
      window.addEventListener("mouseup", () => {
        window.removeEventListener("mousemove", resizeEvent);
        if (bodyElement) bodyElement.style.userSelect = "auto";
      });
    });
  }
};

window.onload = () => {
  changeChatLocation();
  setSettingButton();
};
