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
