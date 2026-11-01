import { createRoot } from 'react-dom/client';
import AppleCardCarousel, { WideVideoRow } from '@/components/ui/carousel-08';
import './styles/globals.css';
import './styles/ai-video.css';
const root=document.getElementById('project-showcase-root');
if(root)createRoot(root).render(<AppleCardCarousel/>);

import StaticImageShowcase from '@/components/ui/static-image-showcase';
const staticRoot=document.getElementById('static-images-root');
if(staticRoot)createRoot(staticRoot).render(<StaticImageShowcase/>);

const wideRoot=document.getElementById('wide-videos-root');
if(wideRoot)createRoot(wideRoot).render(<WideVideoRow/>);
