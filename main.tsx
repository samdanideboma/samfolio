import React from 'react';
import { createRoot } from 'react-dom/client';
import { RandomLetterSwap } from '@/components/ui/random-letter-swap';
import Default from './demo';
import './styles/globals.css';
import './styles/home.css';
import './styles/home-hero.css';
import './styles/home-club.css';
const root=document.getElementById('navigation-root');
if(root)createRoot(root).render(<React.StrictMode><nav aria-label="Main navigation">{[{label:'Home',href:'#home'},{label:'Work',href:'#services'},{label:'About',href:'#about'},{label:'Contact',href:'#contact'}].map(link=><RandomLetterSwap key={link.label} {...link} className="text-sm font-medium text-muted-foreground hover:text-foreground" staggerDuration={.025} transition={{duration:.6,type:'spring'}} />)}</nav></React.StrictMode>);
const demo=document.getElementById('demo-root');
if(demo)createRoot(demo).render(<Default/>);

import ClientFeedback from '@/components/ui/testimonial';
const testimonials=document.getElementById('testimonial-root');
if(testimonials)createRoot(testimonials).render(<ClientFeedback/>);

import ContactSection from '@/components/ui/contact-section';
const contact=document.getElementById('contact-root');
if(contact)createRoot(contact).render(<ContactSection/>);

import ServiceFolders from '@/components/ui/service-folders';
const services=document.getElementById('services-root');
if(services)createRoot(services).render(<ServiceFolders/>);
