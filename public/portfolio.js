const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
document.getElementById('year').textContent=new Date().getFullYear();
if(!reduced && 'IntersectionObserver' in window){document.body.classList.add('js-motion');const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}
if(!reduced && matchMedia('(hover: hover)').matches){document.querySelectorAll('.magnetic').forEach(button=>{button.addEventListener('pointermove',event=>{const r=button.getBoundingClientRect();button.style.transform=`translate(${(event.clientX-r.left-r.width/2)*.1}px, ${(event.clientY-r.top-r.height/2)*.15}px)`});button.addEventListener('pointerleave',()=>button.style.transform='');});}
const glassHero=document.querySelector('.hero');
if(glassHero && !matchMedia('(prefers-reduced-motion: reduce)').matches && matchMedia('(hover: hover)').matches){
 let glassFrame=0;
 glassHero.addEventListener('pointermove',event=>{cancelAnimationFrame(glassFrame);glassFrame=requestAnimationFrame(()=>{const bounds=glassHero.getBoundingClientRect();glassHero.style.setProperty('--glass-x',`${(event.clientX-bounds.left)/bounds.width*100}%`);glassHero.style.setProperty('--glass-y',`${(event.clientY-bounds.top)/bounds.height*100}%`);});});
 glassHero.addEventListener('pointerleave',()=>{cancelAnimationFrame(glassFrame);glassHero.style.removeProperty('--glass-x');glassHero.style.removeProperty('--glass-y');});
}
const stageTime=document.getElementById('stage-time');
if(stageTime){
 const fmtTime=new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Manila',hour:'numeric',minute:'2-digit'});
 const fmtDate=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Manila',day:'numeric',month:'short',year:'numeric'});
 const tick=()=>{const now=new Date();stageTime.textContent=`${fmtTime.format(now).toLowerCase().replace(' ','')} · ${fmtDate.format(now)}`;};
 tick();setInterval(tick,30000);
}
const stageCard=document.querySelector('.stage-card');
if(stageCard){
 const slides=[...stageCard.querySelectorAll('.stage-slide')];
 const bar=stageCard.querySelector('.stage-progress i');
 const interval=5000;let index=0,timer=0;
 stageCard.style.setProperty('--stage-interval',`${interval}ms`);
 const show=next=>{
  slides[index].classList.remove('is-active');
  index=(next+slides.length)%slides.length;
  slides[index].classList.add('is-active');
  if(reduced){bar.style.width=`${(index+1)/slides.length*100}%`;return;}
  bar.classList.remove('is-running');void bar.offsetWidth;bar.classList.add('is-running');
  clearTimeout(timer);timer=setTimeout(()=>show(index+1),interval);
 };
 stageCard.querySelectorAll('.stage-arrow').forEach(button=>button.addEventListener('click',()=>show(index+Number(button.dataset.dir))));
 show(0);
}
