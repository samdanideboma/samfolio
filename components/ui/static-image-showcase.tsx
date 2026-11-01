import { CardCarousel } from '@/components/ui/card-carousel';
const images=[
 {src:'/assets/static-images/artwork-01.jpg',alt:'Construction campaign design'},
 {src:'/assets/static-images/artwork-02.jpg',alt:'Workflow automation campaign design'},
 {src:'/assets/static-images/artwork-03.jpg',alt:'Insurance campaign design'},
 {src:'/assets/static-images/artwork-04.png',alt:'Food advertising design'},
 {src:'/assets/static-images/artwork-05.png',alt:'Bakery creative design'},
 {src:'/assets/static-images/artwork-06.png',alt:'Jewelry product design'},
 {src:'/assets/static-images/artwork-07.png',alt:'Apparel product design'},
 {src:'/assets/static-images/artwork-08.png',alt:'Handbag product design'}
];
export default function StaticImageShowcase(){return <><div className="static-heading"><span className="eyebrow">AI STATIC IMAGES</span><h2>Still images.<br/><em>Endless possibilities.</em></h2></div><CardCarousel images={images}/></>}
