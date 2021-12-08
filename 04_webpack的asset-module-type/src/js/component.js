import "../css/index.css";
import Imagezznh from "../img/zznh.png";
import "../font/iconfont.css";

function component() {
  const element = document.createElement('div');

  element.innerHTML = ['Hello', 'webpack'].join(' ');
  element.className = "content";

  const imgEl = new Image();
  imgEl.src = Imagezznh;
  element.appendChild(imgEl);

  const bgDiv = document.createElement('div');
  bgDiv.style.width = 200 + 'px';
  bgDiv.style.height = 200 + 'px';
  bgDiv.className = "bg-image";
  bgDiv.style.backgroundColor = 'red';
  element.appendChild(bgDiv);

  // 字体图标
  const iEl = document.createElement('i');
  iEl.className = 'iconfont icon-ashbin';
  element.appendChild(iEl);

  return element;
}

document.body.appendChild(component());
