"use client";
import { motion, useInView, useReducedMotion, type Variants } from 'motion/react';
import type { ReactNode, RefObject } from 'react';
type Props={as?:'div'|'h1'|'h2'|'p';children:ReactNode;className?:string;animationNum?:number;customVariants?:Variants;timelineRef:RefObject<HTMLDivElement|null>};
export function TimelineContent({as='div',children,className,animationNum=0,customVariants,timelineRef}:Props){
  const visible=useInView(timelineRef,{once:true,amount:.1});
  const reduced=useReducedMotion();
  const Tag={div:motion.div,h1:motion.h1,h2:motion.h2,p:motion.p}[as];
  return <Tag className={className} custom={animationNum} initial={reduced?false:'hidden'} animate={reduced||visible?'visible':'hidden'} variants={reduced?{visible:{opacity:1,y:0,filter:'none'}}:customVariants}>{children}</Tag>;
}
