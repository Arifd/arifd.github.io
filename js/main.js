import genColours from './genColours.js';

(function interesting() {
  const text = document.getElementById('interesting');
  const ender = document.getElementById('ender');
  setTimeout(()=>text.innerHTML = 'useful', 3000);
  setTimeout(()=>ender.innerHTML = '?', 6000);
  setTimeout(()=>{
    text.innerHTML = '';
    ender.innerHTML = '!';
  }, 9000);
})();

function lazyLoadIFrames() {
  const threshold = 0.75;
  var iframes = document.getElementsByTagName('iframe');
  if ("IntersectionObserver" in window) {
      // create observer functionality
      const iframesObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.intersectionRatio > threshold) {       
              // visible             
              entry.target.src = entry.target.dataset.src;
            } else {
              // not visible
              entry.target.src = 'about:blank';
            }
        });
      },{threshold});

      // init observers
      for (let i = 0; i < iframes.length; i++) iframesObserver.observe(iframes[i]);

      console.log('Lazy loading all iFrames', iframesObserver);
    }
  else {
    // if the IntersectionObserver is not available just load all.. sorry
    for (var i = 0; i < iframes.length; i++)
      if (iframes[i].getAttribute('data-src'))
        iframes[i].setAttribute('src', iframes[i].getAttribute('data-src'));
  }
}; window.addEventListener('load', lazyLoadIFrames);

// let extra = null; // only define this once (below), to save repeated calculations on scroll events.
// function dontLetTextOverflow() {
//   // If anything in the body is overflowing,
//   // decrement the font size of that element and any children
//   // untill overflow is no more.

//   // Least janky version of all three, curiously.
//   function getComputedTopRightBottomLeft(/**string*/property, element) {
//     console.log('poop');
//     let css = window.getComputedStyle(element).getPropertyValue(property);
//     if (css) css = css.match(/[+-]?\d+(?:\.\d+)?/g).map(str => Math.round(Number(str)));
//     switch (css.length) {
//       case 1:
//         return [css[0],css[0],css[0],css[0]];
//       case 2:
//         return [css[0],css[1],css[0],css[1]];
//       case 3:
//         return [css[0],css[1],css[2],css[1]];
//       case 4:
//         return css;
//       default:
//         return [0,0,0,0];
//     }
//   }

//   // function getComputedTopRightBottomLeft(/**string*/property, element) {
//   //   let css = window.getComputedStyle(element).getPropertyValue(property);
//   //   if (css) css = css.split(' ');
//   //   switch (css.length) {
//   //     case 1:
//   //       return [parseInt(css[0]),parseInt(css[0]),parseInt(css[0]),parseInt(css[0])];
//   //     case 2:
//   //       return [parseInt(css[0]),parseInt(css[1]),parseInt(css[0]),parseInt(css[1])];
//   //     case 3:
//   //       return [parseInt(css[0]),parseInt(css[1]),parseInt(css[2]),parseInt(css[1])];
//   //     case 4:
//   //       return [parseInt(css[0]),parseInt(css[1]),parseInt(css[2]),parseInt(css[3])];
//   //     default:
//   //       return [0,0,0,0];
//   //   }
//   // }

//   // function getComputedTopRightBottomLeft(/**string*/property, element) {
//   //   return [
//   //     parseInt(window.getComputedStyle(element).getPropertyValue(property+'-top')),
//   //     parseInt(window.getComputedStyle(element).getPropertyValue(property+'-right')),
//   //     parseInt(window.getComputedStyle(element).getPropertyValue(property+'-bottom')),
//   //     parseInt(window.getComputedStyle(element).getPropertyValue(property+'-left'))
//   //   ];
//   // }

//   function isOverflown(element) {
//     if (!extra) extra = getComputedTopRightBottomLeft('margin', element);
//     return element.scrollHeight > (element.clientHeight + extra[0] + extra[2]) || element.scrollWidth > (element.clientWidth + extra[1] + extra[3]);
//   }

//   function getComputedFontSize(element) {
//     return 
//   }

//   function bfsElementsInTree(input) {
//     // perform a breadth first search in order to have elements ordered by depth. (Deepest last)
//     let output = [];
  
//     if (Symbol.iterator in input)
//       // input is a HTMLcollection
//       for (let i = 0, max = input.length; i < max; i++)
//         output[i] = input[i];
//     else
//       output.push(input);
    
//     for (let i = 0; i < output.length; i++) {
//       const children = output[i].children;
//       for (let j = 0, max = children.length; j < max; j++)
//         output.push(children[j]);
//     }
    
//     return output;
//   }

//   const elements = bfsElementsInTree(document.getElementsByClassName('fit-text'));

//   for (let i=elements.length-1; i >= 0; i--) {
//     const element = elements[i];
//     let size = getComputedFontSize(element);
//     while (isOverflown(element) && size) {
//       size--;
//       element.style.fontSize = size + 'px';
//     }
//   }
// };
// window.addEventListener('load', dontLetTextOverflow);
// window.addEventListener('resize', dontLetTextOverflow);

function genOpeningStatement() {
  const setCharAt = (str,index,char) => str.substr(0, index) + char + str.substr(index + 1);
  let interesting = 'interesting';
  const statement = `Hello. I can make computers do ${interesting} things`;
  function distort() {
    let result = '';
    const a = Math.floor(Math.random() * interesting.length);
    const b = Math.floor(Math.random() * interesting.length);
    let temp = h1.innerText[a];
    result = setCharAt(interesting, a, interesting[b]);
    result = setCharAt(result, b, temp);
    h1.innerText = result;
  }
  const header = document.getElementById('header');
  let h1 = document.createElement('h1');
  h1.innerText = statement;
  header.appendChild(h1);
  setInterval(distort, 1000);
};

// anywhere where the gradient class name is added, JS will paint a random gradient of 3 colours.
function applyGradientClass(){
  const threeColours = genColours(3);
  const elements = document.getElementsByClassName('gradient');
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.backgroundImage = `linear-gradient(${Math.random()*360}deg, ${threeColours[0]}, ${threeColours[1]}, ${threeColours[2]})`;
  }
}

////// below is to be deleted
////// below is to be deleted
////// below is to be deleted
////// below is to be deleted
////// below is to be deleted
////// below is to be deleted


// Draw Abstract-y art thing
function drawArt() {
  const numBoxes = 40;
  const container = document.getElementById('header');
  // const space = document.getElementById('header-right').getBoundingClientRect();
  const colours = genColours(numBoxes);

  // generate X random boxes
  let boxes = [];
  for (let i = 0; i < numBoxes; i++) {
    let box = {}
    box.x = Math.floor(Math.random() * window.innerWidth);
    box.y = window.innerHeight - Math.floor(Math.random() * (i/numBoxes) * window.innerHeight);
    box.w = 0;
    box.h = 0;
    box.colour = '#ffffff';
    box.mature = false; // turns mature when the box is as big as should be
    boxes[i] = box;
  }

  function detectColiision(a, b) {
    return (a.x < b.x + b.w &&
            a.x + a.w > b.x &&
            a.y < b.y + b.h &&
            a.y + a.h > b.y);
  }

  // Detect collisions.
  // increment size until we hit a collision
  let allBoxesMature = false;
  while (!allBoxesMature) {
    for (let i = 0; i < numBoxes; i++) {
      if (!boxes[i].mature) {
        // detect collision with other objects
        for (let j = 0; j < numBoxes; j++) if (i != j) if (detectColiision(boxes[i],boxes[j])) { boxes[i].mature = true; break; }
        // detect wall collision
        if ((boxes[i].x + boxes[i].w) >= window.innerWidth)  { boxes[i].mature = true; break; }
        // if ((boxes[i].y + boxes[i].h) >= window.innerHeight) { boxes[i].mature = true; break; }
        // didn't break out, then increase size and try again!
        boxes[i].w++;
        boxes[i].h++;
      }
    }
    // assume are boxes are mature unless our final check here returns otherwise
    allBoxesMature = true;
    boxes.forEach(box => {if (!box.mature) allBoxesMature = false});
  };

  // finally draw result
  boxes.forEach(box => {
    let div = document.createElement("div");
    div.style.zIndex = 0;
    div.style.backgroundColor = box.colour;
    div.style.position = 'absolute';
    div.style.left = `${box.x}px`;
    div.style.top = `${box.y - box.h}px`;
    div.style.width = `${box.w}px`;
    div.style.height = `${box.h}px`;
    // aesthetics
    div.style.borderRadius = `${Math.random()*10}px`;
    div.style.border = '1px dotted grey'
    div.style.boxShadow = "1px 2px 3px grey";
    div.classList.add('abstract-thing-div');
    container.appendChild(div);
  });
}