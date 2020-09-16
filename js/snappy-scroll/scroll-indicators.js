import scroll from './scroll-mechanics.js';

class ScrollInidcators {
  constructor(){
    this.up = {svg: document.createElementNS("http://www.w3.org/2000/svg", "svg"),
              path: document. createElementNS("http://www.w3.org/2000/svg", "path")
              };
    this.down = {svg: document.createElementNS("http://www.w3.org/2000/svg", "svg"),
                path: document. createElementNS("http://www.w3.org/2000/svg", "path")
                };

    this.init();
    window.addEventListener('scroll', () => this.display());
  }

  init() {
    // set indiviual
    this.up.svg.style.cssText = 'bottom:calc(1vh + 32px + 4px);right:0;';
    this.up.path.setAttribute('d', `M15.997 13.374l-7.081 7.081L7 18.54l8.997-8.998 9.003 9-1.916 1.916z`);

    this.up.svg.onclick = () => {
      scroll.navigate(-1);
      this.up.path.classList.remove('svgIconPath-highlight');
    };

    this.down.svg.style.cssText = 'bottom:1vh;right:0;';
    this.down.path.setAttribute('d', `M16.003 18.626l7.081-7.081L25 13.46l-8.997 8.998-9.003-9 1.917-1.916z`);

    this.down.svg.onclick = () => {
      scroll.navigate(1);
      this.down.path.classList.remove('svgIconPath-highlight');
    };

    // set commonalities
    const both = [this.up, this.down];
    for (const i of both) {
      i.svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
      i.svg.setAttribute('class', 'svgIcon');

      // i.svg.style.cssText += 'right:0;border-top-right-radius:0;border-bottom-right-radius:0;';
      i.path.classList.add('svgIconPath');
      
      i.svg.onmouseenter = () => i.path.classList.add('svgIconPath-highlight');
      i.svg.onmouseleave = () => i.path.classList.remove('svgIconPath-highlight');
      
      i.svg.appendChild(i.path);
      document.body.appendChild(i.svg);
    }
  }

  display() {
    scroll.location > 0 ? this.up.svg.style.display = 'initial' : this.up.svg.style.display = 'none';
    scroll.location < scroll.sections.length-1 ? this.down.svg.style.display = 'initial' : this.down.svg.style.display = 'none';  
  }
}

const scrollIndicators = new ScrollInidcators();
export default scrollIndicators;