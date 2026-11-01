import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './world.css'
export function World({tone='day',archiveLit=0.4,children,still=false}) {
 const ref=useRef(null)
 useEffect(()=>{
   const el=ref.current
   if(!el || still || matchMedia('(prefers-reduced-motion: reduce)').matches)return
   const image=el.querySelector('img')
   const x=gsap.quickTo(image,'x',{duration:1.3,ease:'power2.out'})
   const y=gsap.quickTo(image,'y',{duration:1.3,ease:'power2.out'})
   const move=e=>{x((e.clientX/innerWidth-.5)*18);y((e.clientY/innerHeight-.5)*10)}
   window.addEventListener('pointermove',move,{passive:true})
   return()=>{window.removeEventListener('pointermove',move);gsap.killTweensOf(image)}
 },[still])
 return <div className="world" ref={ref} aria-hidden="true" data-tone={tone}>
  <img className="cinema-landscape" src="/data-city.png" alt="" />
  <div className="cinema-haze" />
  {Array.from({length:18},(_,i)=><span key={i} className="cinema-spark" style={{'--x':`${(i*37+17)%100}%`,'--y':`${(i*23+13)%90}%`,'--delay':`${-i*.43}s`,opacity:.25+archiveLit*.55}}/>)}
  {children}
 </div>
}