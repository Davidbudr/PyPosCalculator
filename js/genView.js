import help from "./helper.js";
function view() {
  const helper = help();
  const canvas = document.querySelector("#root");
  const ctx = canvas.getContext("2d");
  const view = document.querySelector("#view");

  const svgCode = document.querySelector("#svgCode");
  const posCode = document.querySelector("#posCode");

  const verts = document.querySelector('input[name="verts"]');
  const rots = document.querySelector('input[name="rotation"]');
  const size = document.querySelector('input[name="size"]');
  const close = document.querySelector('input[name="closed"]');
  const color = document.querySelector('input[name="strokeColor"]');
  const strokewidth = document.querySelector('input[name="strokeWidth"]');

  const createSvg = () => {
    const halfwidth = (Number(size.value) + Number(strokewidth.value))
    canvas.height = halfwidth * 2;
    canvas.width = halfwidth * 2;
    canvas.style.top = (view.clientHeight / 2) - halfwidth + 'px';
    canvas.style.left = (view.clientWidth / 2) - halfwidth + 'px';
    const positions = helper.position(
      Number(verts.value),
      { x: Number(size.value), y: Number(size.value) },
      Number(size.value),
      Number(rots.value),
      Number(strokewidth.value),
      close.checked
    );

    let codeString = "[";

    ctx.strokeStyle = color.value;
    ctx.lineWidth = strokewidth.value;
    positions.forEach((pos, i, j) => {
      codeString += `{x:${pos.x},y:${pos.y}}`;
      if (i < j - 1){
        codeString += ",";
      }
      if (i === 0) {
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
      } else {
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
      }
    });
    codeString += "]";

    posCode.value = codeString;
    svgCode.value = helper.code(
      color.value,
      strokewidth.value,
      positions,
      (Number(size.value) + Number(strokewidth.value)) * 2
    );
  };
  const redraw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    createSvg();
  };
  const addEvents = () => {
    verts.addEventListener("change", redraw);
    rots.addEventListener("change", redraw);
    size.addEventListener("change", redraw);
    close.addEventListener("change", redraw);
    color.addEventListener("change", redraw);
    strokewidth.addEventListener("change", redraw);
    redraw();
  };

  return {
    create: createSvg,
    init: addEvents,
  };
}

export default view;
