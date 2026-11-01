/* Swap every native video control bar for a play/pause button and a small sound button on the side.
   Also removes the browser's download / picture-in-picture options. (A video file that is publicly hosted can
   never be made fully un-downloadable; this removes the easy routes.) */
(function(){
 var css='.vg-ctl{position:absolute;top:50%;right:10px;z-index:5;display:flex;flex-direction:column;gap:8px;transform:translateY(-50%)}'
 +'.vg-btn{display:grid;place-items:center;width:32px;height:32px;padding:0;border:0;border-radius:50%;background:#0a1a5cb3;color:#fff;cursor:pointer;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);transition:background .2s,transform .2s}'
 +'.vg-btn:hover,.vg-btn:focus-visible{background:#0a3fd8;transform:scale(1.08)}'
 +'.vg-btn.vg-play{width:38px;height:38px}.vg-btn svg{width:15px;height:15px;fill:currentColor}'
 +'.vg-vol{position:absolute;right:calc(100% + 8px);bottom:9px;width:64px;height:14px;opacity:0;pointer-events:none;accent-color:#b9f21e;transition:opacity .2s}'
 +'.vg-ctl:hover .vg-vol,.vg-ctl:focus-within .vg-vol{opacity:1;pointer-events:auto}'
 +'video[data-vg]{cursor:pointer}';
 var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
 var ICON={play:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l13-7.5z"/></svg>',pause:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>',
  vol:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9v6h4l5 4V5L7 9zM15.5 8.5a5 5 0 0 1 0 7l-1.4-1.4a3 3 0 0 0 0-4.2zM18 6a8.5 8.5 0 0 1 0 12l-1.4-1.4a6.5 6.5 0 0 0 0-9.2z"/></svg>',
  mute:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9v6h4l5 4V5L7 9zM16 9.4l1.4-1.4 2.1 2.1 2.1-2.1L23 9.4 20.9 11.5 23 13.6 21.6 15l-2.1-2.1L17.4 15 16 13.6l2.1-2.1z"/></svg>'};
 function setup(v){
  if(v.dataset.vg)return;v.dataset.vg='1';
  v.removeAttribute('controls');v.controls=false;
  v.setAttribute('controlsList','nodownload noplaybackrate noremoteplayback');
  v.disablePictureInPicture=true;v.disableRemotePlayback=true;
  v.addEventListener('contextmenu',function(e){e.preventDefault()});
  var host=v.parentElement;if(getComputedStyle(host).position==='static')host.style.position='relative';
  var ctl=document.createElement('div');ctl.className='vg-ctl';
  var play=document.createElement('button');play.type='button';play.className='vg-btn vg-play';
  var snd=document.createElement('button');snd.type='button';snd.className='vg-btn';
  var vol=document.createElement('input');vol.type='range';vol.min='0';vol.max='1';vol.step='0.05';vol.className='vg-vol';vol.setAttribute('aria-label','Volume');
  vol.value=v.muted?0:v.volume;
  function paint(){play.innerHTML=v.paused?ICON.play:ICON.pause;play.setAttribute('aria-label',v.paused?'Play video':'Pause video');
   var m=v.muted||v.volume===0;snd.innerHTML=m?ICON.mute:ICON.vol;snd.setAttribute('aria-label',m?'Unmute video':'Mute video');vol.value=m?0:v.volume}
  function toggle(){if(v.paused){document.querySelectorAll('video[data-vg]').forEach(function(o){if(o!==v)o.pause()});v.play()}else v.pause()}
  play.addEventListener('click',toggle);v.addEventListener('click',toggle);
  snd.addEventListener('click',function(){v.muted=!v.muted;if(!v.muted&&v.volume===0)v.volume=.5;paint()});
  vol.addEventListener('input',function(){v.volume=+vol.value;v.muted=v.volume===0;paint()});
  ['play','pause','ended','volumechange'].forEach(function(e){v.addEventListener(e,paint)});
  ctl.appendChild(play);ctl.appendChild(snd);ctl.appendChild(vol);v.insertAdjacentElement('afterend',ctl);paint();
 }
 function run(){document.querySelectorAll('video').forEach(setup)}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})();
