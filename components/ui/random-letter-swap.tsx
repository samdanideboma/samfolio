"use client";
import { motion, useReducedMotion, type Transition } from 'motion/react';
import { useState, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';
type Props = Omit<ComponentPropsWithoutRef<'a'>,'children'|'onAnimationStart'> & {label:string;staggerDuration?:number;transition?:Transition};
export function RandomLetterSwap({label,staggerDuration=.025,transition={duration:.6,type:'spring'},className,href='#',onMouseEnter,onMouseLeave,onFocus,onBlur,...props}:Props){
  const [active,setActive]=useState(false);
  const reduced=useReducedMotion();
  return <a {...props} href={href} aria-label={label} className={cn('inline-flex overflow-hidden rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4',className)}
    onMouseEnter={e=>{setActive(true);onMouseEnter?.(e)}} onMouseLeave={e=>{setActive(false);onMouseLeave?.(e)}}
    onFocus={e=>{setActive(true);onFocus?.(e)}} onBlur={e=>{setActive(false);onBlur?.(e)}}>
    <span aria-hidden="true" className="inline-flex">{Array.from(label).map((letter,index)=>{
      const order=(index*7+3)%Math.max(label.length,1);
      return <span key={index} className="relative inline-block overflow-hidden" style={{height:'1.4em',whiteSpace:'pre'}}>
        <motion.span className="block" animate={{y:active&&!reduced?'-100%':'0%'}} transition={reduced?{duration:0}:{...transition,delay:order*staggerDuration}}>{letter}</motion.span>
        <motion.span className="absolute inset-0 block" animate={{y:active&&!reduced?'0%':'100%'}} transition={reduced?{duration:0}:{...transition,delay:order*staggerDuration}}>{letter}</motion.span>
      </span>;
    })}</span>
  </a>;
}
