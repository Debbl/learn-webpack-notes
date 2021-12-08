import "../css/index.css";
import Imagezznh from "../img/zznh.png";

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

  return element;
}

document.body.appendChild(component());
