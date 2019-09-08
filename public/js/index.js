// Logo Animation
const logo = document.querySelectorAll('#logo path');
for (let i = 0; i < logo.length; i++) {
   console.log(`Letter ${i} length: ${logo[i].getTotalLength()}`);
}
let delay = 0.1;

logo.forEach(i => {
   i.style.strokeDasharray = i.getTotalLength() + 'px';
   i.style.strokeDashoffset = i.getTotalLength() + 'px';
   i.style.animation = `line-anim 2s ease forwards ${delay}s`;
   delay += 0.1;
});

TweenMax.to('#logo', 2.5, {
   scale: 0.5,
   y: -370,
   x: -800,
   delay: 4
});
TweenMax.to('#svg-logo path', 3.5, { stroke: '#f0d245', delay: 2 });
TweenMax.to('#nav-bar', 2.5, { opacity: 1, x: -100, delay: 6 });
TweenMax.to('#button', 3, {
   y: 0,
   opacity: 1,
   ease: Bounce.easeOut,
   delay: 10
});

// const logoDiv = document.querySelector('#logo');
// setTimeout(() => {
//    logoDiv.style.top = '-3%';
//    logoDiv.style.left = '-15%';
//    logoDiv.style.transform = 'scale(' + 0.5 + ')';
//    logoDiv.style.transition = 'all 2s ease';
// }, 4000);

// const button = document.querySelector('#button');
// setTimeout(() => {
//    button.style.transform = 'translate(' + 500 + '%, ' + 350 + '%)';
//    button.style.transition = 'all 2s ease';
// }, 4500);

// const navbar = document.querySelector('#nav-bar');
// setTimeout(() => {
//    let op = 0.1;
//    navbar.style.visibility = 'visible';
//    var timer = setInterval(function() {
//       if (op >= 1) {
//          clearInterval(timer);
//       }
//       navbar.style.opacity = op;
//       navbar.style.filter = 'alpha(opacity=' + op * 100 + ')';
//       op += op * 0.1;
//    }, 30);
// }, 5000);

// const introMusic = document.querySelector('#kbc-intro-music');
// introMusic.play();
