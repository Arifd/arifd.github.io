// This is the heart of snappy-scroll which full screens, animates and keeps track of location.

import navbar from './nav-panel.js';
// import universe from './universe.js';

const clamp = (val, min, max) => Math.min(Math.max(min, val), max);

class ScrollMechanics {
  constructor() {
    this.sections = document.getElementsByTagName('section');
    this.location = 0; // Stores the index of which <section> has most viewport focus

    this._transitioning = false; // blocks multiple navigation requests at the same time
    this._prevScroll = 0; // keep track of the previous scroll Y position (to detect direction)
    
    this.init();

    // window.addEventListener('scroll', () => this.update());
    window.addEventListener('resize', this.forceFullScreen.bind(this));
  }

  init() {
    this.forceFullScreen();
    this.addAestheticSpacers();
    this.initObserveActiveSection();
    // requestAnimationFrame(()=>universe.mainCol.addEventListener('scroll', ()=>this.detectScroll(event)));

    // start all offscreen sections at a dim setting to avoid first time scroll jitter
    // for (let i = 0; i < this.sections.length; i++)
    //   if (i != this.location) this.sections[i].style.opacity = 0.5;
  }

  forceFullScreen() {
    // Mobile browsers ignore the address bar in vh calculation.
    // and depending on if you have a scroll bar etc
    // To get around this we manually calculate it on every load and resize
    const height = `${window.innerHeight}px`;
    const width = `${window.innerWidth}px`;
    for (let i = 0; i < this.sections.length; i++) {
      this.sections[i].style.width = width;
      this.sections[i].style.height = height; // prefer mainContent height?
    }
  }

  addAestheticSpacers() {
    for (let i = 0; i < this.sections.length; i++) {
      // create a spacer with a top and bottom diagonal aesthetic
      const spacer = document.createElement('div');
      spacer.className = 'universe-bg spacer';
      const element = this.sections[i];
      element.parentNode.insertBefore(spacer, element.nextSibling); // append after
    }
  }

  // This function must be used for all website navigation
  // navigate(to) {
  //   console.log('navigate', to);
  //   let destination = '';
  //   // is 'to' a relative number or absolute location string?
  //   if (typeof to === 'string') { // is absolute
  //     destination = to;
  //     window.location.href = '#' + destination;
  //   } else if (typeof to === 'number') { // is relative (1/-1)
  //     if (this._transitioning) return;
  //     else this._transitioning = true;
  //     // to: -1: previous, 1: next
  //     // find out where you are, then navigate to next/previous element
  //     destination = clamp(this.location + to, 0, this.sections.length-1);
  //     window.location.href = `#${this.sections[destination].id}`;
  //     setTimeout(() => {
  //       this._transitioning = false;
  //       // window.addEventListener('scroll', this._scrollEventTracker);
  //       document.body.style.overflowY = 'auto';
  //       this._prevScroll = window.pageYOffset;
  //     }, 1000);
  //   }
  // }
  navigate(direction) {
    // you can also just send a destination as a string
    if (typeof direction === 'string') {
      window.location.href = '#' + direction;
      return;
    }
    // direction: + = DOWN - = UP
    const destination = clamp(this.location + direction, 0, this.sections.length-1);
    window.location.href = `#${this.sections[destination].id}`;
  }

  initObserveActiveSection() {
    const threshold = 0.5;
    const intersectionObserver = new IntersectionObserver(entries => {
      for (const entry of entries) // entries contains every change
        for (let i = 0; i < this.sections.length; i++) // get index number from id
          if (this.sections[i].id === entry.target.id)
            if (entry.intersectionRatio > threshold) {
              // update location
              this.location = i;
              // let navbar know we've changed location
              navbar.items[i].classList.add('navIcon-highlight');
              // animate the content
              this.animateSectionContent(i, 1);
            } else { // not visible
              navbar.items[i].classList.remove('navIcon-highlight');
              // this.transitionSection(i, 0);
              this.animateSectionContent(i, 0);
            }
    }, {threshold});

    // start observing
    for (let i = 0; i < this.sections.length; i++) intersectionObserver.observe(this.sections[i]);
  }

  transitionSection(location, visibility = undefined) {
    // add a fading aesthetic to the scrolling
    this.sections[location].style.opacity = visibility;
  }

  animateSectionContent(location, visibility = undefined) {
    // animate the content INSIDE the sections
    if (visibility === 1)
    for (let e of this.sections[location].children) {
      // fade in
      e.classList.add('tempTransition');
      e.style.transform = 'translateY(0px)';
      e.style.opacity = '1';
      setTimeout(() => {
        // set back to normal
        e.classList.remove('tempTransition');
      }, 500);
    }
    else if (visibility <= 0.1)
      for (let e of this.sections[location].children) {
        // fade out
        e.classList.add('tempTransition');
        e.style.transform = `translateY(20px)`;
        e.style.opacity = '0';
        setTimeout(() => {
          // set back to normal
          e.classList.remove('tempTransition');
        }, 500);
      }
  }
}

const scrollMechanics = new ScrollMechanics();
export default scrollMechanics;