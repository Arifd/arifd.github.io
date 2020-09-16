// Create and add a <style> tag with all the CSS used by this library
(function applyCSS() {
  const css = `html, body {
overflow:hidden;
scroll-behavior:smooth;
scroll-snap-type:y mandatory;
}

.universe-bg {
background-color:rgb(48, 48, 48);
box-shadow:inset 0px 0px 5px 0px rgba(51, 51, 51, 0.75), 0px 0px 5px 0px rgba(51, 51, 51, 0.75);
}

.universe {
min-width:100%;
margin:0 auto;
display:flex;
}

.navCol {
min-width:0px;
max-width:0px;
height:100%;
transition:all 0.25s ease;
}

.mainCol {
z-index:1;
flex-grow:1;
height:100%;
box-shadow:0 4px 8px 0 rgba(0, 0, 0, 1),
            0 6px 20px 0 rgba(0, 0, 0, 0.5);
}

.tempTransition {
  transition: all 0.25s cubic-bezier(0,1,1,1) 0.25s;
}

section {
scroll-snap-align:center;
width:100%;
height:100vh;
}

.spacer {
  position: relative;
  width:100%;
  height:200vh;
}

.navPanel {
  overflow:hidden;
  width:100%;
  height:100vh;
  position:fixed;
  top:0;
  left:0;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  transform: translateY(-100vh);
  transition:0.25s;
}
.navPanel::before {
  content: "";
  background-color:#000000;
  background-image: url(data:image/png;base64,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);
  opacity:0.8;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width:100%;
  height:100vh;
  box-shadow: inset 0px 0px 60px 0px #000000;
}

.navIcon {
border:2px solid #A7A7A732;
color:#A7A7A7;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
margin:2px;
padding:2px;
height:42px;
width:200px;
box-shadow:0px 0px 5px 0px rgba(0,0,0,1);
background:#303030;
transition:all 0.25s ease;
}

.navIcon-highlight {
color:#ffffff;
border:2px solid #969696; 
cursor:pointer;
}

.nav-icon-label {
text-transform:uppercase;
}

.nav-icon-desc {
text-align:center;
padding-right:10px;
font-size:0.5em;
color:rgb(127,127,127);
}

.svgIcon {
position:fixed;
z-index:2;
width:32px;
height:32px;
box-shadow:0px 0px 2px 0px rgba(51,51,51,0.75);
}

.svgIconPath {
stroke-width:1px;
stroke:#A7A7A7;
opacity:0.75;
fill:#555555;
}

.svgIconPath-highlight {
fill:#ffffff;
}

.sideNavButton {
border-top-left-radius:0px;
border-bottom-left-radius:0px;
position:fixed;
top:1vh;
}`;

  const head = document.getElementsByTagName('head')[0];
  const style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(css));
  head.appendChild(style);
})();