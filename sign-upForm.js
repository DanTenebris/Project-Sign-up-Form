const loginLink = document.querySelector('.haveAccount > a');

const credit = document.querySelector('.credit');
const main = document.querySelector('main');

const creditStyle = getComputedStyle(credit);
const color1 = creditStyle.color;

const hasVScroll = main.scrollHeight > (window.innerHeight || document.documentElement.clientHeight);

/* if (hasVScroll) {
  credit.style.position = 'absolute';
} else {
  credit.style.position = 'fixed';
} */

/* const isElementXPercentInViewport = function(el, percentVisible) {
  let
    rect = el.getBoundingClientRect(),
    windowHeight = (window.innerHeight || document.documentElement.clientHeight);

  return !(
    Math.floor(100 - (((rect.top >= 0 ? 0 : rect.top) / +-rect.height) * 100)) < percentVisible ||
    Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) < percentVisible
  )
}; */

console.log(credit);
console.log(color1);
/* console.log(isElementXPercentInViewport(loginLink, 100)); */
/* console.log(loginLink.getBoundingClientRect()); */
console.log(main.scrollHeight);
console.log(hasVScroll);
console.log(document.body.scrollHeight);