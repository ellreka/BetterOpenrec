function init() {
  console.log("load script: better openrec");

  const bodyElement: HTMLBodyElement | null = document.querySelector("body");

  const movieElement: HTMLDivElement | null = document.querySelector(
    ".movie-page-article"
  );
  const chatElement: HTMLElement | null = document.querySelector(
    ".movie-page-chat-aside"
  );

  let left = false;

  let chatWidth = 360;

  const set = () => {
    changeChatLocation(left);
    // set setting button
    console.log(bodyElement);
    console.log(movieElement);
    console.log(chatElement);
    const settingButton: HTMLElement = document.createElement("div");
    settingButton.className = "better-openrec_setting";
    settingButton.addEventListener("click", () => {
      left = !left;
      changeChatLocation(left);
    });
    const settingButtonStyle = {
      width: "100px",
      height: "100px",
      background: "red",
    };
    Object.assign(settingButton.style, settingButtonStyle);
    const timer = setInterval(() => {
      const chatInputAreaElement: HTMLElement | null = document.querySelector(
        ".InputArea__LeftBlock-azxri0-6"
      );
      if (chatInputAreaElement) {
        clearInterval(timer);
        chatInputAreaElement.appendChild(settingButton);
      }
    }, 1000);
  };

  // change chat location
  const changeChatLocation = (left: boolean) => {
    if (movieElement && chatElement) {
      const movieStyle = {
        width: `${window.innerWidth} - ${chatWidth}px`,
        marginLeft: left ? `${chatWidth}px` : "0",
        marginRight: left ? "0" : `${chatWidth}px`,
      };

      const chatStyle = {
        width: `${chatWidth}px`,
        left: left ? "0" : "auto",
        right: left ? "auto" : "0",
      };
      Object.assign(movieElement.style, movieStyle);
      Object.assign(chatElement.style, chatStyle);
    }
    console.log(left);
    resizeChatSize(left);
  };

  // resize chat size
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
        chatWidth = left ? e.clientX : window.innerWidth - e.clientX;
        console.log(chatWidth);
        changeChatLocation(left);
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
  set();
}

window.onload = () => {
  init();
};
