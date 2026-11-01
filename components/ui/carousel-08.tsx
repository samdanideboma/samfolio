"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";


const videos = [1,2,9,3,4,5,6,7,8,10,11].map(id=>({id,src:`/assets/videos/project-${String(id).padStart(2,'0')}.mp4`}));

function VideoCard({video,wide}:{video:{id:number;src:string};wide?:boolean}){
 const ref=React.useRef<HTMLVideoElement>(null);
 const [volume,setVolume]=React.useState(1);
 const [muted,setMuted]=React.useState(false);
 const [playing,setPlaying]=React.useState(false);
 const toggle=()=>{const player=ref.current;if(!player)return;if(player.paused)void player.play();else player.pause();};
 React.useEffect(()=>{if(ref.current){ref.current.defaultMuted=false;ref.current.muted=false;ref.current.volume=1;}},[]);
 const changeVolume=(value:number)=>{const player=ref.current;if(!player)return;player.volume=value;player.muted=value===0;setVolume(value);setMuted(value===0);};
 return <div className={wide?"showcase-video-card wide":"showcase-video-card"}>
 <video ref={ref} playsInline preload="metadata" controlsList="nodownload noplaybackrate noremoteplayback" disablePictureInPicture disableRemotePlayback onContextMenu={event=>event.preventDefault()} onClick={toggle} onPlaying={()=>setPlaying(true)} onPause={()=>setPlaying(false)} onEnded={()=>setPlaying(false)} aria-label={`Project video ${video.id}`}
 onVolumeChange={event=>{setVolume(event.currentTarget.volume);setMuted(event.currentTarget.muted);}}
 onPlay={event=>{const current=event.currentTarget;current.muted=false;if(current.volume===0)current.volume=1;setMuted(false);setVolume(current.volume);document.querySelectorAll<HTMLVideoElement>('.showcase-video-card video').forEach(other=>{if(other!==current)other.pause();});}}>
 <source src={video.src+'#t=0.1'} type="video/mp4"/>Your browser does not support video playback.
 </video>
 <div className="video-sound" onPointerDown={event=>event.stopPropagation()} onKeyDown={event=>event.stopPropagation()}>
 <button type="button" className="video-play" aria-label={playing?"Pause video":"Play video"} onClick={toggle}>{playing?<Pause size={15}/>:<Play size={15}/>}</button>
 <button type="button" aria-label={muted?'Unmute video':'Mute video'} aria-pressed={muted} onClick={()=>{if(ref.current){ref.current.muted=!ref.current.muted;if(!ref.current.muted&&ref.current.volume===0)changeVolume(.5);}}}>{muted||volume===0?<VolumeX size={15}/>:<Volume2 size={15}/>}</button>
 <input type="range" min="0" max="1" step="0.05" value={muted?0:volume} onChange={event=>changeVolume(Number(event.target.value))} aria-label={`Volume for project video ${video.id}`} aria-valuetext={`${Math.round((muted?0:volume)*100)} percent`}/>
 </div></div>;
}

const AppleCardCarousel = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(true);

  React.useEffect(() => {
    if (!api) return;
    const update = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  return (
    <div className="project-showcase w-full py-5 sm:py-10">
      {/* Header */}
      <div className="px-4 sm:px-8 mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-foreground">
          Ideas in motion.
        </h2>
      </div>

      
      {/* Card Strip */}
      <Carousel
        setApi={setApi}
        opts={{ align: "start", dragFree: true }}
        className="w-full"
      >
        <CarouselContent className="-ml-6 px-4 sm:px-8 py-4">
          {videos.map((video) => (
            <CarouselItem key={video.id} className="pl-6 basis-auto">
              <VideoCard video={video}/>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Bottom-right controls */}
      <div className="flex justify-end gap-2 px-4 sm:px-8 mt-6">
        <Button
          aria-label="Previous projects"
          variant="outline"
          size="icon"
          onClick={() => api?.scrollPrev()}
          disabled={!canScrollPrev}
          className="h-10 w-10 rounded-full bg-background shadow-xs"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button
          aria-label="Next projects"
          variant="outline"
          size="icon"
          onClick={() => api?.scrollNext()}
          disabled={!canScrollNext}
          className="h-10 w-10 rounded-full bg-background shadow-xs"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AppleCardCarousel;


const wideVideos = [{id:101,title:'Game Trailer',src:'/assets/videos/wide-01.mp4'},{id:102,title:'Ads',src:'/assets/videos/wide-02.mp4'},{id:103,title:'Product Detail Video',src:'/assets/videos/wide-03.mp4'}];

export function WideVideoRow(){
 const track=React.useRef<HTMLDivElement>(null);
 const [at,setAt]=React.useState(0);
 const scrollBy=(dir:number)=>{const el=track.current;if(!el)return;el.scrollBy({left:dir*(el.clientWidth*.8),behavior:'smooth'});};
 const onScroll=()=>{const el=track.current;if(!el)return;const card=el.firstElementChild as HTMLElement|null;const step=card?card.offsetWidth+20:1;setAt(Math.min(wideVideos.length-1,Math.round(el.scrollLeft/step)));};
 return <div className="project-showcase wide-row">
 <div className="wide-head"><div><span className="eyebrow">WIDESCREEN</span><h2>Wide frames. Full stories.</h2></div>
 <div className="wide-nav"><span>{String(at+1).padStart(2,'0')} / {String(wideVideos.length).padStart(2,'0')}</span><button type="button" onClick={()=>scrollBy(-1)} aria-label="Previous video"><ArrowLeft size={18}/></button><button type="button" onClick={()=>scrollBy(1)} aria-label="Next video"><ArrowRight size={18}/></button></div></div>
 <div className="wide-track" ref={track} onScroll={onScroll}>{wideVideos.map((video,i)=><figure className="wide-item" key={video.id}><VideoCard video={video} wide/><figcaption><span>{String(i+1).padStart(2,'0')}</span>{video.title}</figcaption></figure>)}</div></div>;
}
