console.log("load script: better openrec");
const movieElement: HTMLDivElement | null = document.querySelector(
  ".movie-page-article"
);
const chatElement: HTMLElement | null = document.querySelector(
  ".movie-page-chat-aside"
);

const changeChatLocation = () => {
  if (movieElement && chatElement) {
    const movieStyle = {
      marginLeft: "36rem",
      marginRight: "0",
      left: "0",
    };
    Object.assign(movieElement.style, movieStyle);
  }
};
const resizeChatSize = () => {
  const resizeBar: HTMLElement = document.createElement("div");
  resizeBar.className = "better-openrec_resizebar";
  const resizeBarStyle = {
    width: "8px",
    height: "100%",
    position: "absolute",
    top: "0",
    right: "0",
    cursor: "col-resize",
  };
  Object.assign(resizeBar.style, resizeBarStyle);
  if (movieElement && chatElement) {
    chatElement.appendChild(resizeBar);
    const resizeEvent = (e: MouseEvent) => {
      chatElement.style.width = `${e.clientX}px`;
      movieElement.style.marginLeft = `${e.clientX}px`;
      movieElement.style.width = `calc(100vw - ${e.clientX}px)`;
    };
    resizeBar.addEventListener("mousedown", () => {
      window.addEventListener("mousemove", resizeEvent);
      window.addEventListener("mouseup", () => {
        window.removeEventListener("mousemove", resizeEvent);
      });
    });
  }
};

changeChatLocation();
resizeChatSize();
