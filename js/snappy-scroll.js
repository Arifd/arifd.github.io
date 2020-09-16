/** 
  * snappy-scroll.js
  * ----------------
  *  
  * This library adds:
  * - scroll snapping to <section> and makes every <section> full screen
  * - keyboard, wheel and button precision navigation, no more scrolling! 
  * - scroll indicators which are also navigation buttons
  * - auto generated side-navbar
  * - beautiful and elegant scrolling transitions
  * 
  * - credit:
  * - svg icons: https://git.blivesta.com/flexicon/
  * 
  * @author Arif Driessen
  */

const ELEMENTS = document.getElementsByTagName('section');
console.log(ELEMENTS);
let VISIBILITIES = new Array(ELEMENTS.length); // normalized visibilty of each element
let LOCATION = 0; // Stores the index of which element has most viewport focus

// a lot of fancy scroll efffects happening so make sure our viewport is ready
// const metaTag = document.createElement('meta');
// metaTag.name = 'viewport'
// metaTag.content = 'user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height';
// document.getElementsByTagName('head')[0].appendChild(metaTag);

// Event listeners
window.addEventListener('load', ()=>{
  mobileFullScreen();
  applyCSS();
});
window.addEventListener('resize', mobileFullScreen);
// window.addEventListener('touchstart', () => document.documentElement.requestFullscreen());

// FIRST TIME SCROLL LISTENER
window.addEventListener('scroll', firstScrollInteraction);
function firstScrollInteraction() {
  scrollIndicatorDown.classList.remove('fade');
  window.removeEventListener('scroll', firstScrollInteraction);
}

// always know which elements are visible and where we are
window.addEventListener('scroll', ()=>{
  VISIBILITIES = listElementVisibilities();
  LOCATION = mostVisibleElementIndex();
  onLocationChange();
  transitionElementsOnScroll();
  scrollIndicatorDisplay();
});

let onLocationChange = (function() {
  console.log('hello')
  let prevLocation = 0;
  return function() {
    if (LOCATION != prevLocation) {
      // disable  prevLocation's highlighting
      // console.log(document.getElementById(`navIcon-${ELEMENTS[prevLocation].id}`).style);
      document.getElementById(`navIcon-${ELEMENTS[prevLocation].id}`).classList.remove('navIcon-highlight');
      // highlight the appropriate navIcon
      document.getElementById('navIcon-'+ELEMENTS[LOCATION].id).classList.add('navIcon-highlight');
    }
  prevLocation = LOCATION;
  }
})();

// CSS settings
function applyCSS() {
  const css = `html {
    overflow: hidden;
    scroll-behavior: smooth;
    scroll-snap-type: y proximity;
  }

  .universe-bg {
    background-color: rgb(48, 48, 48);
  }

  .universe {
    min-width: 100%;
    margin: 0 auto;
    display: flex;
  }

  section {
    background-color: #ecf0f1;
    overflow-x: hidden;
    width: 100%;
    height: 100vh;
    scroll-snap-align: center;
    -webkit-box-shadow: inset 0px 0px 5px 0px rgba(51,51,51,0.75);
    -moz-box-shadow: inset 0px 0px 5px 0px rgba(51,51,51,0.75);
    box-shadow: inset 0px 0px 5px 0px rgba(51,51,51,0.75);
  }

  /* a shadow class for anything that wants it */
  .shadow {
    -webkit-box-shadow: 0px 0px 20px 0px rgba(51,51,51,0.75);
    -moz-box-shadow: 0px 0px 20px 0px rgba(51,51,51,0.75);
    box-shadow: 0px 0px 20px 0px rgba(51,51,51,0.75);
  }

  .topShadow {
    -webkit-box-shadow: 0px -20px 20px 0px rgba(51,51,51,0.75);
    -moz-box-shadow: 0px -20px 20px 0px rgba(51,51,51,0.75);
    box-shadow: 0px -20px 20px 0px rgba(51,51,51,0.75);
  }

  /* a fade class for anything that wants it */
  .fade {
    animation: fade-animate 2s infinite;
    -webkit-animation: fade-animate 2s infinite;
    -moz-animation: fade-animate 2s infinite; 
  }
  
  @keyframes fade-animate{
    0% {opacity:0}
    40% {opacity:1}
    80% {opacity:0}
    100% {opacity:0}
  }
  @-webkit-keyframes fade-animate{
    0% {opacity:0}
    40% {opacity:1}
    80% {opacity:0}
    100% {opacity:0}
  }
  @-moz-keyframes fade-animate{
    0% {opacity:0}
    40% {opacity:1}
    80% {opacity:0}
    100% {opacity:0}
    }

  .navIcon {
    border: 2px solid #A7A7A732;
    color: #A7A7A7;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    margin: 2px;
    height: 60px;
    width: 200px;
    -webkit-box-shadow: 5px 0px 5px 0px rgba(0,0,0,1);
    -moz-box-shadow: 5px 0px 5px 0px rgba(0,0,0,1);
    box-shadow: 5px 0px 5px 0px rgba(0,0,0,1);
    transition: all 0.25s ease;
  }
  
  .navIcon-highlight {
    color: #ffffff;
    transform: translateX(20px);
    cursor: pointer;
  }
  
  .nav-icon-label {
    text-transform: uppercase;
  }

  .nav-icon-desc {
    font-size: 0.5em;
    color: rgb(127,127,127);
  }
  
  .svgIcon {
    position: fixed;
    z-index: 2;
    width: 32px;
    height: 32px;
    -webkit-box-shadow: 0px 0px 2px 0px rgba(51,51,51,0.75);
    -moz-box-shadow: 0px 0px 2px 0px rgba(51,51,51,0.75);
    box-shadow: 0px 0px 2px 0px rgba(51,51,51,0.75);
    transition: all 0.6s ease;
  }

  .svgIconPath {
    stroke-width: 1px;
    stroke: #A7A7A7;
    opacity: 0.75;
    fill: #555555;
  }

  .sideNavButton {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    position: fixed;
    /* margin-left: -4px; */
    top:1vh;
  }

  .scrollArrowUp {
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  
  .scrollArrowDown {
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
  }}`;

  const head = document.getElementsByTagName('head')[0];
  const style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(css));
  head.appendChild(style);
}

// Utility functions
const clamp = (val, min, max) => Math.min(Math.max(min, val), max);

// hack: mobile browsers don't adjust vh for address bar. So we have to do it manually. (onload)
function mobileFullScreen() {
  const height = `${window.innerHeight}px`;
  navCol.style.height = height;
  for (let e of ELEMENTS) e.style.height = height;
}

// side navbar button
const sideNavButton = document.createElementNS("http://www.w3.org/2000/svg", "svg");
sideNavButton.onclick = () => {
  showSideNavPanel();
  svgIconHoverHighlighter(sideNavButtonPath, 'touch');
};
sideNavButton.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
const sideNavButtonPath = document. createElementNS("http://www.w3.org/2000/svg", "path");
sideNavButtonPath.classList.add('svgIconPath');
sideNavButton.onmouseenter = ()=> svgIconHoverHighlighter(sideNavButtonPath);
sideNavButton.onmouseleave = ()=> sideNavButtonPath.style.fill = '#555555';
sideNavButtonPath.setAttribute('d', `M6.001 7.128L6 10.438l19.998-.005L26 7.124zM6.001 21.566L6 24.876l19.998-.006.002-3.308zM6.001 14.341L6 17.65l19.998-.004.002-3.309z`);
sideNavButton.appendChild(sideNavButtonPath);
sideNavButton.classList.add('svgIcon');
sideNavButton.classList.add('sideNavButton');
document.body.appendChild(sideNavButton);

// Steps for navigation side panel:
// create a container that holds two columns, nav and main
// dynamically create a navbar, put in nav column
// get everything in body and put in main column
// show/hide adjusts width of nav-column

const universe = document.createElement('div');
universe.setAttribute('class', 'universe-bg universe');

const navCol = document.createElement('div');
navCol.style.cssText = 'min-width:0px;max-width:0px;height:100vh;transition:all 0.5s ease;';
const navContainer = document.createElement('div');
navContainer.style.cssText = 'width:100%;height:100vh;position:fixed;display:flex;flex-direction:column;';
{
  const spacer = document.createElement('div');
  spacer.style.cssText = 'flex-grow:0;height:50vh;';
  navContainer.appendChild(spacer);
}
for (const e of ELEMENTS) {
  const item = document.createElement('div');
  item.tabIndex = 0;
  item.classList.add('navIcon');
  item.setAttribute('id', `navIcon-${e.id}`);
  item.onmouseenter = () => item.classList.add('navIcon-highlight');
  item.onmouseleave = () => item.classList.remove('navIcon-highlight');
  item.onclick = () => {navigate(e.id); item.classList.remove('navIcon-highlight')};
  const desc = e.getAttribute('data-desc');
  item.innerHTML = `<p class="nav-icon-label">${e.id.replace('-',' ')}</p><p class="nav-icon-desc">${desc? desc : ''}</p>`;
  navContainer.appendChild(item);
}
{
  const spacer = document.createElement('div');
  spacer.style.cssText = 'flex-grow:0;height:50vh;';
  navContainer.appendChild(spacer);
}
navCol.appendChild(navContainer);
universe.appendChild(navCol);

const mainCol = document.createElement('div');
mainCol.setAttribute('class', 'universe-bg');
mainCol.style.overflowX = 'hidden';
mainCol.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)';
mainCol.style.zIndex = 1; // always be above navCol, to hide overlap
mainCol.style.flexGrow = 1;
// mainCol.style.minWidth = '100vw';
mainCol.style.height = '100%';
mainCol.style.transition = 'all 0.5s ease';
// place a div inside mainCol with the content and fixed size so that
// when sideNavPanel opens it pushes content right but doesn't create overflow (overflow: hidden doesn't work)
const mainContainer = document.createElement('div');
mainContainer.style.minWidth = '100vw';
mainContainer.append(...ELEMENTS);
mainCol.append(mainContainer);
universe.appendChild(mainCol);

document.body.append(universe);

function showSideNavPanel() {
  const e = ELEMENTS[LOCATION];
  // temp force disable scroll
  universe.style.overflow = 'hidden';
  // hide current section
  // e.style.transition = 'opacity 0.5s ease';
  // e.style.opacity = 0.5;
  // hide ScrollIndicators
  scrollIndicatorDown.style.display = 'none';
  scrollIndicatorUp.style.display = 'none';
  // change icon
  sideNavButtonPath.setAttribute('d', `M7.004 23.087l7.08-7.081-7.07-7.071L8.929 7.02l7.067 7.069L23.084 7l1.912 1.913-7.089 7.093 7.075 7.077-1.912 1.913-7.074-7.073L8.917 25z`);
  // make button and section-onclick escape out
  sideNavButton.onclick = hideSideNavPanel;
  e.addEventListener('click', hideSideNavPanel);
  // show nav panel
  navCol.style.minWidth = '200px';
  navCol.style.maxWidth = '200px';
}

function hideSideNavPanel() {
  const e = ELEMENTS[LOCATION];
  // reenable scroll
  universe.style.overflow = 'inherit';
  e.removeEventListener('click', hideSideNavPanel);
  // prep button back to normal behaviour
  sideNavButton.onclick = () => {
    showSideNavPanel();
    svgIconHoverHighlighter(sideNavButtonPath, 'touch');
  };
  // show current section
  e.style.transition = 'opacity 0.5s ease';
  e.style.opacity = 1;
  // show ScrollIndicators
  scrollIndicatorDisplay();
  // change icon
  sideNavButtonPath.setAttribute('d', `M6.001 7.128L6 10.438l19.998-.005L26 7.124zM6.001 21.566L6 24.876l19.998-.006.002-3.308zM6.001 14.341L6 17.65l19.998-.004.002-3.309z`);
  // hide nav panel
  navCol.style.minWidth = '0px';
  navCol.style.maxWidth = '0px';
}

// Scroll indicator DOWN
const scrollIndicatorDown = document.createElementNS("http://www.w3.org/2000/svg", "svg");
scrollIndicatorDown.onclick = () => {
  navigate(1);
  svgIconHoverHighlighter(scrollIndicatorDownPath, 'touch');
};
scrollIndicatorDown.addEventListener('click', ()=>navigate(1));
scrollIndicatorDown.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
const scrollIndicatorDownPath = document. createElementNS("http://www.w3.org/2000/svg", "path");
scrollIndicatorDownPath.classList.add('svgIconPath');
scrollIndicatorDown.onmouseenter = ()=> svgIconHoverHighlighter(scrollIndicatorDownPath);
scrollIndicatorDown.onmouseleave = ()=> scrollIndicatorDownPath.style.fill = '#555555';
scrollIndicatorDownPath.setAttribute('d', `M16.003 18.626l7.081-7.081L25 13.46l-8.997 8.998-9.003-9 1.917-1.916z`);
scrollIndicatorDown.appendChild(scrollIndicatorDownPath);
scrollIndicatorDown.setAttribute('class', 'svgIcon fade');
scrollIndicatorDown.style.borderBottomRightRadius = 0;
scrollIndicatorDown.style.bottom = '1vh';
scrollIndicatorDown.style.right = '0';
document.body.appendChild(scrollIndicatorDown);

// Scroll indicator UP
const scrollIndicatorUp = document.createElementNS("http://www.w3.org/2000/svg", "svg");
scrollIndicatorUp.onclick = () => {
  navigate(1);
  svgIconHoverHighlighter(scrollIndicatorUpPath, 'touch');
};
scrollIndicatorUp.addEventListener('click', ()=>navigate(-1));
scrollIndicatorUp.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
const scrollIndicatorUpPath = document. createElementNS("http://www.w3.org/2000/svg", "path");
scrollIndicatorUpPath.classList.add('svgIconPath');
scrollIndicatorUp.onmouseenter = ()=> svgIconHoverHighlighter(scrollIndicatorUpPath);
scrollIndicatorUp.onmouseleave = ()=> scrollIndicatorUpPath.style.fill = '#555555';
scrollIndicatorUpPath.setAttribute('d', `M15.997 13.374l-7.081 7.081L7 18.54l8.997-8.998 9.003 9-1.916 1.916z`);
scrollIndicatorUp.appendChild(scrollIndicatorUpPath);
scrollIndicatorUp.setAttribute('class', 'svgIcon ScrollArrowUp');
scrollIndicatorUp.style.display = 'none';
scrollIndicatorUp.style.bottom = 'calc(1vh + 32px + 4px)';
scrollIndicatorUp.style.right = '0';
document.body.appendChild(scrollIndicatorUp);

// manage 'hover' effect for multiple devices
function svgIconHoverHighlighter(element, device = 'mouse') {
  let defaultHighlightColour = '#999999';
  let elementBgColour = null;
  if (element !== sideNavButtonPath) {
    const getElementBgColor = (location) => window.getComputedStyle(ELEMENTS[location]).getPropertyValue('background-color');
    const location = element === scrollIndicatorDownPath ? LOCATION+1 : LOCATION-1;
    elementBgColour = getElementBgColor(location);
  }
  element.style.fill = elementBgColour? elementBgColour : defaultHighlightColour;
  if (device !== 'mouse') setTimeout(()=> element.style.fill = '#555555', 500);
}

function getPercentVisible(element) {
  const rect = element.getBoundingClientRect();
  
  // If not even partially visible, return early
  if (rect.top >= window.innerHeight || rect.bottom <= 0) return 0;
  
  const topIsVisible = rect.top >= 0 && rect.top < window.innerHeight;
  const bottomIsVisible = rect.bottom < window.innerHeight && rect.bottom >= 0;
  
  const topCheck = function() {
    const pixelsVisible = window.innerHeight - rect.top;
    // const negativeSpace = window.innerHeight - negativeSpace;
    const percentVisible = pixelsVisible / rect.height;
    return percentVisible;
  }
  
  const bottomCheck = function() {
    const negativeSpace = window.innerHeight - rect.bottom;
    const pixelsVisible = clamp(window.innerHeight - negativeSpace, 0, rect.height);
    const percentVisible = pixelsVisible / rect.height;
    return percentVisible;
  }
  
  if (topIsVisible && bottomIsVisible) return 1;
  else if (topIsVisible) return topCheck();
  else if (bottomIsVisible) return bottomCheck();
  else return -1; // something went wrong!
}

function listElementVisibilities() {
  // Get visibility percentages for each element
  // index represents element order
  let visibilities = new Array(ELEMENTS.length).fill(0);
  for (let i = 0; i < ELEMENTS.length; i++) {
    const amount = getPercentVisible(ELEMENTS[i]);
    visibilities[i] = amount;
    }
  return visibilities;
}

function mostVisibleElementIndex() {
  let index = 0;
  VISIBILITIES.reduce((prev, curr, i) => {
    const mostVisible = Math.max(prev, curr);
    if (mostVisible === curr) index = i;
    return mostVisible;
  }, 0);
  return index;
}

function isPartiallyVisible(element) {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom >= 0;
}

function transitionElementsOnScroll() {
  // fade in and out on scroll
  for (let i = 0; i < ELEMENTS.length; i++) {
    ELEMENTS[i].style.transition = 'opacity 0.1s ease';
    ELEMENTS[i].style.opacity = VISIBILITIES[i];
    // ELEMENTS[i].style.transform = `scale(${(1 - VISIBILITIES[i]) * window.innerWidth}px)`;
    
    if (VISIBILITIES[i] === 1)
    for (let e of ELEMENTS[i].children) {
      // fade out
      e.style.opacity = 1;
      e.style.transition = 'all 0.6s cubic-bezier(0,1,1,1)';
      e.style.transform = 'translateX(0px)';
    }
    if (VISIBILITIES[i] <= 0.1)
      for (let e of ELEMENTS[i].children) {
        // fade in
        e.style.opacity = 0;
        e.style.transition = 'all 0s';
        e.style.transform = `translateX(20px)`;
      }
  }

  // fancy header-photo animation
  document.getElementById('header-photo').style.transform = `rotate3d(0, 1, 0, ${getPercentVisible(ELEMENTS[0]) * 720}deg)`;
}

function transitionElementContentOnNavigate(destination) {
  for (let e of ELEMENTS[LOCATION].children) {
    e.style.opacity = 0;
    e.style.transform = `translateX(${window.innerWidth}px)`;
  }
  for (let e of ELEMENTS[destination].children) {
    e.style.opacity = 1;
    e.style.transform = 'translateX(0px)';
  }
}

// function transitionElementsOnNavigate(destination) {
//   ELEMENTS[LOCATION].style.opacity = 0;
//   ELEMENTS[destination].style.opacity = 1;
// }

// determine which Scroll Indicators to show
function scrollIndicatorDisplay() {
  LOCATION > 0 ? scrollIndicatorUp.style.display = 'initial' : scrollIndicatorUp.style.display = 'none';
  LOCATION < ELEMENTS.length-1 ? scrollIndicatorDown.style.display = 'initial' : scrollIndicatorDown.style.display = 'none';
}

function navigate(to) {
  // is 'to' a relative number or absolute location string?
  if (typeof to === 'string') { // is absolute
    window.location.href = '#' + to;
  } else { // is number
    // to: -1: previous, 1: next
    // find out where you are, then navigate to next/previous element
    const destination = clamp(LOCATION + to, 0, ELEMENTS.length-1);
    window.location.href = `#${ELEMENTS[destination].id}`;
  }
  // trigger animation
  // transitionElementsOnNavigate(destination);
  // transitionElementContentOnNavigate(destination);
}

///////////////////////////////////////// INPUT

(function detectSwipe(){
  let touchstartX = 0,
      touchstartY = 0,
      touchendX = 0,
      touchendY = 0;

  window.addEventListener('touchstart', function(event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
    // document.documentElement.requestFullscreen();
  });
  
  window.addEventListener('touchend', function(event) {
    const SENSITIVITY = 40;
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    // determine horizontal swipe
    if (Math.abs(touchstartX - touchendX) > SENSITIVITY)
      touchendX > touchstartX  ? showSideNavPanel() : hideSideNavPanel();
    // determine vertical swipe
    if (Math.abs(touchstartY - touchendY) > SENSITIVITY)
      touchendY < touchstartY  ? navigate(1) : navigate(-1);
  });
})();

document.addEventListener('wheel', e => {
  console.log('wheel');
  e.deltaY < 0 ? navigate(-1) : navigate(1);
});

window.onkeydown = e => {
  console.log('key', e.keyCode);
  switch (e.keyCode) {
    case 38: // arrow up
      navigate(-1);
      break;
    case 40: // arrow down
      navigate(1);
      break;
      case 37: // arrow left
      hideSideNavPanel();
      break;
    case 39: // arrow right
      showSideNavPanel();
      break;
    case 33: // page up
      navigate(-1);
      break;
    case 34: // page down
      navigate(1);
      break;
    default:
      break;
  }
};