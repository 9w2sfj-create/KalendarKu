// Fit the complete, unchanged calendar surface into the desktop reading area.
const desktop=matchMedia('(min-width: 1000px) and (min-height: 600px)');
const main=document.querySelector('main'), sidebar=document.createElement('aside');
sidebar.className='classroom-sidebar';sidebar.setAttribute('aria-label','Kawalan pembelajaran');
for(const id of ['.learning-bar','#game-panel','#month-summary','#current-date-label','.teacher-panel'])sidebar.append(document.querySelector(id));
main.append(sidebar);
const frame=document.querySelector('.calendar-scroll'),paper=document.querySelector('#paper');
let pending=0;
function fit(){cancelAnimationFrame(pending);pending=requestAnimationFrame(()=>{
 if(!desktop.matches){paper.style.removeProperty('--paper-scale');return}
 const scale=Math.min(frame.clientWidth/paper.offsetWidth,frame.clientHeight/paper.offsetHeight,1.6);
 paper.style.setProperty('--paper-scale',String(scale));
})}
const observer=new ResizeObserver(fit);observer.observe(frame);observer.observe(paper);
desktop.addEventListener('change',fit);window.addEventListener('resize',fit);document.fonts.ready.then(fit);fit();
