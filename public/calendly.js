/* Opens the Calendly booking popup for any link with a data-calendly attribute.
   If the popup can't load, the link still opens the Calendly page normally. */
(function(){
 var loaded=false,pending=null;
 function load(cb){
  if(window.Calendly){cb();return}
  pending=cb;if(loaded)return;loaded=true;
  var l=document.createElement('link');l.rel='stylesheet';l.href='https://assets.calendly.com/assets/external/widget.css';document.head.appendChild(l);
  var s=document.createElement('script');s.src='https://assets.calendly.com/assets/external/widget.js';s.async=true;
  s.onload=function(){if(pending)pending()};
  s.onerror=function(){loaded=false;pending=null};
  document.head.appendChild(s);
 }
 document.addEventListener('click',function(e){
  var a=e.target.closest&&e.target.closest('a[data-calendly]');
  if(!a||e.metaKey||e.ctrlKey||e.shiftKey)return;
  e.preventDefault();
  var url=a.href;
  if(window.Calendly){window.Calendly.initPopupWidget({url:url});return}
  load(function(){window.Calendly.initPopupWidget({url:url})});
  setTimeout(function(){if(!window.Calendly)window.open(url,'_blank','noopener')},3500);
 });
 // warm the widget up once the page is idle so the popup opens instantly
 window.addEventListener('load',function(){(window.requestIdleCallback||setTimeout)(function(){load(function(){})})});
})();
