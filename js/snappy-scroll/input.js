import scroll from './scroll-mechanics.js';
// import nav from './side-nav-bar.js';

(function detectSwipe(){
  let multitouch = 0; // keeps track of single finger gesture or not
  let touchstartX = 0,
      touchstartY = 0,
      touchendX = 0,
      touchendY = 0;

  window.addEventListener('touchstart', function(event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
    // document.documentElement.requestFullscreen();
    multitouch++;
  });
  
  window.addEventListener('touchend', function(event) {
    if (multitouch <= 1) {
      const SENSITIVITY = 40;
      touchendX = event.changedTouches[0].screenX;
      touchendY = event.changedTouches[0].screenY;
      // determine horizontal swipe (but disable if navbar open)
        if (Math.abs(touchstartX - touchendX) > SENSITIVITY)
          // touchendX > touchstartX  ? nav.show() : nav.hide();
      // determine vertical swipe
      if (Math.abs(touchstartY - touchendY) > SENSITIVITY)
        touchendY < touchstartY  ? scroll.navigate(1) : scroll.navigate(-1);
    }
    multitouch--;
  });
})();

document.addEventListener('wheel', e => {
  e.deltaY < 0 ? scroll.navigate(-1) : scroll.navigate(1);
});

window.onkeydown = e => {
  switch (e.keyCode) {
    case 38: // arrow up
      scroll.navigate(-1);
      break;
    case 40: // arrow down
      scroll.navigate(1);
      break;
      case 37: // arrow left
      nav.hide();
      break;
    case 39: // arrow right
      nav.show();
      break;
    case 33: // page up
      scroll.navigate(-1);
      break;
    case 34: // page down
      scroll.navigate(1);
      break;
    default:
      break;
  }
  return false;
};