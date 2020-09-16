class FitText {
  constructor() {
    this._elements = []; // contains {element, margins}
    this.init();
  }

  init() {
    for (const e of this.bfsElementsInTree(document.getElementsByClassName('fit-text')))
      this._elements.push({e, margins:this.getComputedMargins(e), origFontSize:this.getFontSize(e)});

    window.addEventListener('resize', this.update.bind(this));
    window.addEventListener('load', this.update.bind(this));
  }
  
  update() {
    for (let i=this._elements.length-1; i >= 0; i--) {
      const element = this._elements[i];
      let fontSize = element.origFontSize;
      element.e.style.fontSize = fontSize + 'px';
        while (this.isOverflown(element) && fontSize)
          element.e.style.fontSize = --fontSize + 'px';
    }
  }

  getFontSize(element) {
    return parseInt(window.getComputedStyle(element).getPropertyValue('font-size'));
  }

  isOverflown(element) {
    return element.e.scrollHeight > (element.e.clientHeight + element.margins[0] + element.margins[2]) || element.e.scrollWidth > (element.e.clientWidth + element.margins[1] + element.margins[3]);
  }

  bfsElementsInTree(input) {
    // perform a breadth first search in order to have elements ordered by depth. (Deepest last)
    let output = [];

    if (Symbol.iterator in input)
      // input is a HTMLcollection
      for (let i = 0, max = input.length; i < max; i++)
        output[i] = input[i];
    else
      output.push(input);
    
    for (let i = 0; i < output.length; i++) {
      const children = output[i].children;
      for (let j = 0, max = children.length; j < max; j++)
        output.push(children[j]);
    }
    
    return output;
  }

  // return numbers: [margin-top, margin-right, margin-bottom, margin-left]
  getComputedMargins(element) {
    let css = window.getComputedStyle(element).getPropertyValue('margin');
    if (css) css = css.match(/[+-]?\d+(?:\.\d+)?/g).map(str => Math.round(Number(str)));
    switch (css.length) {
      case 1:
        return [css[0],css[0],css[0],css[0]];
      case 2:
        return [css[0],css[1],css[0],css[1]];
      case 3:
        return [css[0],css[1],css[2],css[1]];
      case 4:
        return css;
      default:
        return [0,0,0,0];
    }
  }
}

const fitText = new FitText();