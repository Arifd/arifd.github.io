import scroll from './scroll-mechanics.js';
import universe from './universe.js';

class SideNavBar {
  constructor() {
    this.container = document.createElement('div');
    this.button = {svg: document.createElementNS("http://www.w3.org/2000/svg", "svg"),
                  path: document. createElementNS("http://www.w3.org/2000/svg", "path")};
    this.items = [];

    this._scrollCounter = 0; // used to calculate every other scroll

    this.init();
  }

  init() {
    // A full screen container with fixed position so the content is always in the same place, no matter where you scroll
    this.container.style.cssText = 'width:100%;height:100vh;position:fixed;display:flex;flex-direction:column;justify-content:center;';
    this.initContent();
    this.initButton();
  }

  initButton() {
    this.button.svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
    this.button.path.classList.add('svgIconPath');
    this.button.svg.onmouseenter = () => this.button.path.classList.add('svgIconPath-highlight');
    this.button.svg.onmouseleave = () => this.button.path.classList.remove('svgIconPath-highlight');
    this.setButtonDefault();
    this.button.svg.appendChild(this.button.path);
    this.button.svg.classList.add('svgIcon');
    this.button.svg.classList.add('sideNavButton');

    // Don't append yet because universe is going to pull everything from body into its mainCol
    // Let universe append it after.
    // document.body.appendChild(this.button.svg);
  }

  initContent() {
    for (const section of scroll.sections) {
      const item = document.createElement('div');
      item.tabIndex = 0;
      item.classList.add('navIcon');
      // item.setAttribute('id', `navIcon-${e.id}`);
      item.onmouseenter = () => item.classList.add('navIcon-highlight');
      item.onmouseleave = () => item.classList.remove('navIcon-highlight');
      item.onclick = () => {
        item.classList.remove('navIcon-highlight')
        this.hide();
        setTimeout(() => scroll.navigate(section.id), 250);
      };
      const desc = section.getAttribute('data-desc');
      item.innerHTML = `<p class="nav-icon-label">${section.id.replace(/-/g,' ')}</p><p class="nav-icon-desc">${desc? desc : ''}</p>`;
      
      this.items.push(item);
      this.container.appendChild(item);
    }
  }

  show() {
    this.container.style.display = 'flex';

    // make sure correct item is highlighted
    this.items[scroll.location].classList.add('navIcon-highlight');

    // dim mainContainer
    universe.mainContainer.style.opacity = 0.25;

    this.setButtonActive();
    
    // show nav panel (by morphing parent container)
    universe.navCol.style.minWidth = '200px';
    universe.navCol.style.maxWidth = '200px';
  }

  hide() {
    setTimeout(() => this.container.style.display = 'none', 250);

    this.setButtonDefault();
    
    // un-dim current section
    universe.mainContainer.style.opacity = 1;
    
    // hide nav panel
    universe.navCol.style.minWidth = '0px';
    universe.navCol.style.maxWidth = '0px';
  }

  setButtonDefault() {
    this.button.path.setAttribute('d', `M6.001 7.128L6 10.438l19.998-.005L26 7.124zM6.001 21.566L6 24.876l19.998-.006.002-3.308zM6.001 14.341L6 17.65l19.998-.004.002-3.309z`);
    this.button.svg.onclick = () => {
      this.show();
      this.button.path.classList.remove('svgIconPath-highlight');
    };
  }

  setButtonActive() {
    this.button.path.setAttribute('d', `M7.004 23.087l7.08-7.081-7.07-7.071L8.929 7.02l7.067 7.069L23.084 7l1.912 1.913-7.089 7.093 7.075 7.077-1.912 1.913-7.074-7.073L8.917 25z`);
    // make button and section-onclick escape out
    this.button.svg.onclick = () => this.hide();
    // scroll.sections[scroll.location].addEventListener('click', hideSideNavPanel);
  }
}

const sideNavBar = new SideNavBar();
export default sideNavBar;