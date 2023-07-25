const delay = ms => new Promise(res => setTimeout(res, ms));

async function copyField (selector, copiedSelector){
  const field = document.querySelector(selector);
  const copied = document.querySelector(copiedSelector);
  navigator.clipboard.writeText(field.value);
  copied.style.display = '';
  await delay(2000);
  hide(copiedSelector);
}
function hide (selector){
    const copied = document.querySelector(selector);
    copied.style.display = 'none';
}