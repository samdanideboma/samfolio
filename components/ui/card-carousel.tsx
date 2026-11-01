"use client";
import { useId, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Navigation, Pagination, A11y, Keyboard } from 'swiper/modules';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import type { Swiper as SwiperInstance } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
interface CarouselProps {images:{src:string;alt:string}[];autoplayDelay?:number;showPagination?:boolean;showNavigation?:boolean;}
export function CardCarousel({images,autoplayDelay=3500,showPagination=true,showNavigation=true}:CarouselProps){
 const id=useId().replace(/:/g,'');const reduced=useReducedMotion();const [api,setApi]=useState<SwiperInstance>();const [paused,setPaused]=useState(false);
 return <div className="static-carousel"><Swiper onSwiper={setApi} modules={[EffectCoverflow,Autoplay,Navigation,Pagination,A11y,Keyboard]} effect="coverflow" centeredSlides slidesPerView="auto" spaceBetween={35} grabCursor loop={images.length>2} keyboard={{enabled:true,onlyInViewport:true}} speed={reduced?0:650} autoplay={reduced?false:{delay:autoplayDelay,disableOnInteraction:false,pauseOnMouseEnter:true}} coverflowEffect={{rotate:0,stretch:0,depth:100,modifier:2.5,slideShadows:false}} pagination={showPagination?{clickable:true}:false} navigation={showNavigation?{prevEl:`.prev-${id}`,nextEl:`.next-${id}`}:false} a11y={{containerMessage:'AI static image showcase'}}>
 {images.map((image,index)=><SwiperSlide key={image.src+index}><img src={image.src} alt={image.alt} width={500} height={650} loading="lazy"/></SwiperSlide>)}
 </Swiper><div className="static-controls">{showNavigation&&<><button className={`prev-${id}`} aria-label="Previous image"><ArrowLeft size={18}/></button><button className={`next-${id}`} aria-label="Next image"><ArrowRight size={18}/></button></>}{!reduced&&<button aria-label={paused?'Resume image slideshow':'Pause image slideshow'} aria-pressed={paused} onClick={()=>{if(paused)api?.autoplay.start();else api?.autoplay.stop();setPaused(!paused)}}>{paused?<Play size={17}/>:<Pause size={17}/>}</button>}</div></div>;
}
