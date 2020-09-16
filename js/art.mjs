// art: draw squares
export default function bgArt() {
  let home = document.getElementById('home');
  let width = home.offsetWidth;
  let height = home.offsetHeight;
  let squares = squaresIn(width, height);
  let canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  let ctx = canvas.getContext('2d');
  let squareInfo = squares[squares.length-1]; // choose only the last one for now.
  console.log(squareInfo);
  for (let i = 0; i < squareInfo.numSquares; i++) {
    // let div = document.createElement("div");
    // div.style.zIndex = 0;
    // div.style.position = 'absolute';
    // div.style.left = `${Math.floor((i * squareInfo.size) % width)}px`;
    // div.style.top = `${Math.floor((i * squareInfo.size) / width)}px`;
    // div.style.width = `${squareInfo.size}px`;
    // div.style.height = `${squareInfo.size}px`;
    // // aesthetics
    // div.style.border = '1px solid grey';
    // div.style.backgroundColor = '#333333';
    // // append div
    // home.appendChild(div);

    const x = Math.floor((i * squareInfo.size) % width);
    const y = Math.floor((i * squareInfo.size) / width);
    ctx.fillRect(x, y, 1, 1);
  }
  // canvas.style.zIndex = 0;
  canvas.style.position = 'absolute';
  canvas.style.left = '0px';
  canvas.style.top = '0px';
  home.appendChild(canvas);
}

/*
 * This function returns info about how many squares of which sizes can fit perfectly inside a bigger space.
 */

export function squaresIn(width, height) {
  console.log(`Computing the number of squares for ${width} x ${height}`);
  const xPotential = factor(width);
  const yPotential = factor(height);
  const sharedValues = xPotential.filter(x => {
    let found = false;
    yPotential.forEach(y => { if (x === y) found = true });
    return found;
  });
  // now that we have an array with the factors in common,
  // we want to copy those factors along with any multiples of the factors
  let squareSizes = [...sharedValues];
  for (const i in sharedValues)
    for (const j in sharedValues)
      if (i !== j)
        squareSizes.push(sharedValues[i] * sharedValues[j]);
  // filter unique values
  squareSizes = [...new Set(squareSizes)];
  // now create an object with some info.
  let result = [];
  for (const i of squareSizes) {
    let square = {};
    square.numSquares = (width / i) * (height / i); 
    square.size = i;
    result.push(square);
  }
  // check if we have anything, if we don't we need to adjust numbers and try again
  if (result.length === 0) {
    console.log('no squares possible');
    if ((width % 2) !== 0) {
      console.log('width is not an even number, trying again adjusting width');
      return squaresIn(width - 1, height);
    }
    else if ((height % 2) !== 0) {
      console.log('height is not an even number, trying again adjusting height');
      return squaresIn(width, height - 1);
    }
    else {
      console.log('trying again, subtracting 1 pixel from both width and height');
      return squaresIn(width - 1, height - 1);
    }
  }
  return result;
}

/*
 * Factorize function, thanks to Alexei Kourbatov.
 * http://www.javascripter.net/math/primes/factorization.htm
 */

function factor(n, result = []) {
  if (isNaN(n) || !isFinite(n) || n%1!=0 || n==0) return result.concat(n);
  if (n<0) return result.concat(factor(-n));
  var minFactor = leastFactor(n);
  if (n==minFactor) return result.concat(n);
  result.push(minFactor);
  return result.concat(factor(n/minFactor));
 }
 
 // find the least factor in n by trial division
function leastFactor(n) {
  if (isNaN(n) || !isFinite(n)) return NaN;  
  if (n==0) return 0;  
  if (n%1 || n*n<2) return 1;
  if (n%2==0) return 2;  
  if (n%3==0) return 3;  
  if (n%5==0) return 5;  
  var m = Math.sqrt(n);
  for (var i=7;i<=m;i+=30) {
   if (n%i==0)      return i;
   if (n%(i+4)==0)  return i+4;
   if (n%(i+6)==0)  return i+6;
   if (n%(i+10)==0) return i+10;
   if (n%(i+12)==0) return i+12;
   if (n%(i+16)==0) return i+16;
   if (n%(i+22)==0) return i+22;
   if (n%(i+24)==0) return i+24;
  }
  return n;
}