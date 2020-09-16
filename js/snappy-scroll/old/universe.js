// This creates an outer fullscreen container called universe with two columns inside
// The left for the navigation panel, and the right the <body> content
// when the navbar opens, it's actually the universe that is opening the left column.

import navbar from './side-nav-bar.js';

class Universe {
  constructor() {
    this.container = document.createElement('div');
    this.navCol = document.createElement('div');
    this.mainCol = document.createElement('div');

    // Main content goes inside a container so that it when pushed off screen it doesn't create overflow. (overflow:hidden; doesn't seem to have an effect here)
    this.mainContainer = document.createElement('div');

    this.init();
    this.genMainContent();
    this.append();
  }

  init() {
    this.container.setAttribute('class', 'universe-bg universe');
    this.container.id = 'ssUniverseContainer';
    
    this.navCol.className = 'navCol';
    
    this.mainCol.setAttribute('class', 'universe-bg mainCol');
    
    this.mainContainer.style.cssText = 'min-width:100vw;transition:opacity 0.25s ease;';
    this.mainContainer.id = 'ssMainContainer';

    this.offsetScrollbars();
  }

  offsetScrollbars() {
    // push the scroll bar off the screen
    function getScrollbarWidth() {

      // Creating invisible container
      const outer = document.createElement('div');
      outer.style.visibility = 'hidden';
      outer.style.overflow = 'scroll'; // forcing scrollbar to appear
      outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
      document.body.appendChild(outer);
    
      // Creating inner element and placing it in the container
      const inner = document.createElement('div');
      outer.appendChild(inner);
    
      // Calculating difference between container's full width and the child width
      const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
    
      // Removing temporary elements from the DOM
      outer.parentNode.removeChild(outer);
    
      return scrollbarWidth;
    }
    function apply(element) {
      const offsetWidth = getScrollbarWidth();
      element.style.width = `calc(100vw + ${offsetWidth}px)`;
      element.style.height = '100vh';
      element.style.overflowY = 'auto';
      element.style.paddingRight = offsetWidth + 'px';
      element.style.boxSizing = 'content-box';
    }
    apply(this.mainCol);
    apply(this.container);
  }

  genMainContent() {
    this.mainContainer.append(...document.body.children);
    document.body.appendChild(navbar.button.svg);
  }

  append() {
    this.navCol.appendChild(navbar.container);
    this.container.appendChild(this.navCol);
    
    this.mainCol.append(this.mainContainer);
    this.container.appendChild(this.mainCol);
    
    document.body.append(this.container);
  }
}

const universe = new Universe();
export default universe;