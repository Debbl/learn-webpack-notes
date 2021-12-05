// import "css-loader!../css/index.css"; // loader 内联方式
import "../css/index.css"; // 配置文件的方式

function component() {
  const element = document.createElement("div");

  element.innerHTML = ["Hello", "Webpack"].join(" ");
  element.className = "content";

  return element;
}

document.body.appendChild(component());
