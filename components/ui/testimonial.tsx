"use client";
import { useRef } from 'react';
import { TimelineContent } from '@/components/ui/timeline-animation';
const reviews = [
 {name:'Muhannad B.',initials:'MB',quote:'Samantha delivered a 3-minute campaign video from a brief and a handful of stills, and it came out better than I pictured it. Every revision note was applied precisely and fast, she asked the right questions up front, and she even made free social-media statics on her own. Clear communication the whole way. I would hire her again without hesitation.'},
 {name:'Raymond N.',initials:'RN',quote:'Samantha was an absolute pleasure to work with! She communicated clearly throughout, followed instructions closely, and delivered high-quality work right on schedule. Highly professional and receptive to feedback'},
 {name:'Jia G.',initials:'JG',quote:'She played a key role in helping me grow my business from the ground up, generating quality leads and driving sales. Highly skilled, proactive, and an excellent communicator. An absolute pleasure to work with!'},
 {name:'Joseph H.',initials:'JH',quote:"She's much more than a video editor. From managing administrative tasks and lead generation to creating real estate content and running sales-driven campaigns, she consistently goes above and beyond. Reliable, versatile, and fantastic to work with!"},
 {name:'Vivian W.',initials:'VW',quote:'Excellent video editor! She consistently delivers high-quality social media videos with impressive turnaround times. Creative, efficient, and easy to work with. Highly recommended!'},
 {name:'Marina M.',initials:'MM',quote:"We've worked with her for quite some time, and she's been a valuable part of our team. From organizing and optimizing our Shopify store to managing organic social media content, she brings an impressive range of skills that have helped strengthen our online presence and grow our business."},
 {name:'Jerry L.',initials:'JL',quote:'She consistently delivers high-quality AI-generated content and advertising creatives with fast turnaround times. Talented, dependable, and a great creative partner for our brand!'},
 {name:'Keith H.',initials:'KH',quote:'She did an amazing job helping us with our Meta Ads campaigns, from creating engaging ad creatives to managing and optimizing campaigns for better performance. She understands what makes an ad convert and always brings fresh ideas to the table. Skilled, reliable, and great to work with. Highly recommended!'},
 {name:'Michael V.',initials:'MV',quote:'We’ve worked with Sam on multiple batches of video ads for our pet products. We send her winning reference ads and product clips, and she turns them into videos that fit our brand. She’s picked up on our style along the way. That’s made the whole process much easier for us.'},
];
const revealVariants={visible:(i:number)=>({y:0,opacity:1,filter:'blur(0px)',transition:{delay:i*.08,duration:.5}}),hidden:{filter:'blur(10px)',y:20,opacity:0}};
export default function ClientFeedback(){
 const testimonialRef=useRef<HTMLDivElement>(null);
 return <div className="feedback-demo w-full"><section ref={testimonialRef} className="client-reviews">
 <div className="block-head block-head-split"><div><p className="kicker">Client Reviews</p><TimelineContent as="h2" timelineRef={testimonialRef} customVariants={revealVariants} className="reviews-heading">Good work. <span>Better partnerships.</span></TimelineContent></div></div>
 <div className="reviews-grid reviews-masonry">{[[0,1,8],[2,3,4],[5,6,7]].map((indices,column)=><div className="review-column" key={column}>{indices.map(index=>{const review=reviews[index];return <TimelineContent key={review.name} timelineRef={testimonialRef} customVariants={revealVariants} animationNum={index} className={`review-card review-tone-${column===1?1:(index===1||index===6?2:0)} review-position-${index}`}>
 <blockquote>“{review.quote}”</blockquote>
 <div className="review-author"><span className="review-initials" aria-hidden="true">{review.initials}</span><span>{review.name}</span></div>
 </TimelineContent>})}</div>)}</div>
 </section></div>;
}

