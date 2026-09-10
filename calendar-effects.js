export class PageTurnSound{
 constructor(){this.audio=null}
 stop(){if(this.audio){this.audio.pause();this.audio.currentTime=0}}
 play(){try{this.audio??=new Audio(new URL('./assets/audio/page-turn-real.wav',import.meta.url).href);this.stop();this.audio.volume=.8;void this.audio.play().catch(()=>{})}catch{}}
}
export class AnswerSound{
 constructor({AudioContext=globalThis.AudioContext||globalThis.webkitAudioContext}={}){this.AudioContext=AudioContext;this.context=null;this.nodes=[]}
 stop(){for(const node of this.nodes){try{node.stop()}catch{}}this.nodes=[]}
 play(correct){if(!this.AudioContext)return;this.stop();try{this.context??=new this.AudioContext();const ctx=this.context;void ctx.resume().catch(()=>{});const start=ctx.currentTime+.015;const notes=correct?[523.25,659.25,783.99]:[220,174.61];notes.forEach((frequency,i)=>{const osc=ctx.createOscillator(),gain=ctx.createGain(),t=start+i*.105;osc.type='sine';osc.frequency.value=frequency;gain.gain.setValueAtTime(0,t);gain.gain.linearRampToValueAtTime(.11,t+.018);gain.gain.exponentialRampToValueAtTime(.001,t+.22);osc.connect(gain);gain.connect(ctx.destination);osc.start(t);osc.stop(t+.23);this.nodes.push(osc)})}catch{}}
}
// Fold along x + y = crease; its lower-right corner travels to the upper left.
function foldPolygon(points, crease, keepFront){
 const out=[];
 for(let i=0;i<points.length;i++){
  const a=points[i],b=points[(i+1)%points.length];
  const inside=p=>keepFront?p[0]+p[1]<=crease:p[0]+p[1]>=crease;
  if(inside(a))out.push(a);
  if(inside(a)!==inside(b)){const t=(crease-a[0]-a[1])/(b[0]+b[1]-a[0]-a[1]);out.push([a[0]+t*(b[0]-a[0]),a[1]+t*(b[1]-a[1])])}
 }
 return out;
}
function softFoldPath(points,radius){
 if(points.length<3)return '';
 const corners=points.map((p,i)=>{
  const prev=points[(i+points.length-1)%points.length],next=points[(i+1)%points.length];
  const move=q=>{const d=Math.hypot(q[0]-p[0],q[1]-p[1]);const t=d?Math.min(radius/d,.3):0;return [p[0]+(q[0]-p[0])*t,p[1]+(q[1]-p[1])*t]};
  return {p,a:move(prev),b:move(next)};
 });
 return corners.map((c,i)=>`${i?'L':'M'}${c.a} Q${c.p} ${c.b}`).join(' ')+' Z';
}
export function pageTurn(paper,delta,update,{reduced=globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches}={}){
 paper.querySelector('.page-turn-sheet')?.remove();
 if(reduced){update();return}
 const doc=paper.ownerDocument||document,view=doc.defaultView||globalThis;
 const sheet=doc.createElement('div');sheet.className='page-turn-sheet';sheet.setAttribute('aria-hidden','true');sheet.inert=true;
 const front=doc.createElement('div');front.className='page-turn-front';front.innerHTML=paper.innerHTML;
 front.querySelectorAll('[id]').forEach(el=>{if(el.id==='calendar')el.classList.add('page-calendar');el.removeAttribute('id')});front.querySelectorAll('[data-date],[data-weekday]').forEach(el=>{el.removeAttribute('data-date');el.removeAttribute('data-weekday')});
 const ns='http://www.w3.org/2000/svg',svg=doc.createElementNS(ns,'svg');svg.classList.add('page-turn-curl');
 // A moving light band gives the bent paper thickness; the shadow follows the curl.
 svg.innerHTML='<defs><linearGradient id="curl-paper" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#a59e90"/><stop offset=".09" stop-color="#ede8dc"/><stop offset=".3" stop-color="#fffef9"/><stop offset="1" stop-color="#f8f5ed"/></linearGradient></defs><path class="curl-shadow"/><path class="curl-back" fill="url(#curl-paper)"/>';
 // Unique gradient ids also avoid duplicate ids during rapid navigation.
 const gradient=svg.querySelector('linearGradient');const gradientId='curl-'+Math.random().toString(36).slice(2);gradient.id=gradientId;svg.querySelector('.curl-back').setAttribute('fill',`url(#${gradientId})`);
 sheet.append(front,svg);update();paper.append(sheet);
 const w=paper.clientWidth||paper.getBoundingClientRect().width,h=paper.clientHeight||paper.getBoundingClientRect().height;
 svg.setAttribute('viewBox',`0 0 ${w} ${h}`);
 const rect=[[0,0],[w,0],[w,h],[0,h]],back=svg.querySelector('.curl-back'),shadow=svg.querySelector('.curl-shadow');
 let start;
 const frame=now=>{
  if(!sheet.isConnected)return;
  start??=now;const t=Math.min((now-start)/1150,1);
  // Continuous geometry avoids polygon vertex-count interpolation jumps.
  const progress=t*t*(3-2*t),crease=(w+h)*(1-progress),lift=Math.sin(Math.PI*t);
  const face=foldPolygon(rect,crease,true);
  front.style.clipPath='polygon('+(face.length?face:[[0,0],[0,0],[0,0]]).map(p=>p.join('px ')+'px').join(',')+')';
  const folded=foldPolygon(rect,crease,false).map(([x,y])=>[crease-y,crease-x]);
  const path=softFoldPath(folded,6+22*lift);back.setAttribute('d',path);shadow.setAttribute('d',path);
  const lightWidth=65+100*lift;
  gradient.setAttribute('x1',crease/2);gradient.setAttribute('y1',crease/2);gradient.setAttribute('x2',crease/2-lightWidth);gradient.setAttribute('y2',crease/2-lightWidth);
  shadow.style.opacity=String(.12+.18*lift);shadow.style.transform=`translate(${4+10*lift}px,${5+13*lift}px)`;
  if(t<1)view.requestAnimationFrame(frame);else sheet.remove();
 };
 if(view.requestAnimationFrame)view.requestAnimationFrame(frame);else setTimeout(()=>sheet.remove(),1200);
}
// Match named celebrations, never generic words such as "raya" inside "perayaan".
const EVENT_ART_RULES = [
 [/\b(pengisytiharan tarikh kemerdekaan|declaration of independence date|declaration of independence day)\b/, 'independence-declaration'],
 [/\bchap goh me[hi]\b/, 'chap-goh-meh'],
 [/\b(jumaat agung|good friday)\b/, 'good-friday'],
 [/\b(hari pekerja|labou?r day)\b/, 'labour'],
 [/\b(wesak|vesak)\b/, 'wesak'],
 [/\b(kuih bulan|mid[ -]autumn|mooncake)\b/, 'mooncake'],
 [/\b(perahu naga|dragon boat|duanwu)\b/, 'dragonboat'],
 [/\bgawai\b/, 'gawai'],
 [/\b(muharam|muharram|maal hijrah|islamic new year)\b/, 'muharram'],
 [/\b(israk|isra|mikraj|miraj)\b/, 'israk'],
 [/\b(ramadan|ramadhan)\b/, 'ramadan'],
 [/\bnuzul\b/, 'quran'],
 [/\b(arafah|arafat)\b/, 'arafah'],
 [/\b(aidiladha|qurban|korban|eid[ -]al[ -]adha|raya haji)\b/, 'adha'],
 [/\b(maulid|maulidur|mawlid|prophet muhammad)\b|keputeraan nabi/, 'maulid'],
 [/\bthaipusam\b/, 'thaipusam'],
 [/\bkaamatan\b/, 'kaamatan'],
 [/\b(aidilfitri|raya puasa|eid[ -]al[ -]fitr)\b/, 'raya'],
 [/\b(tahun baru cina|chinese new year|lunar new year)\b/, 'chinese'],
 [/\b(deepavali|diwali)\b/, 'diya'],
 [/\b(krismas|christmas)\b/, 'christmas']
];
export function eventArt(event){
 if(!event || event.category==='school')return null;
 const text=[event.nameMs,event.nameEn].filter(Boolean).join(' ').toLowerCase();
 for(const [pattern,art] of EVENT_ART_RULES)if(pattern.test(text))return art;
 if(/\b(hari malaysia|malaysia day|hari kebangsaan|national day|merdeka day|agong|ydpa)\b/.test(text))return 'flag-malaysia';
 if(/\b(hol|birthday|keputeraan|hari jadi|warisan|heritage|sarawak|pertabalan|installation|coronation|pengisytiharan|declaration)\b/.test(text)){
  const flags={PNG:'penang',JHR:'johor',SWK:'sarawak',PHG:'pahang',NSN:'negeri-sembilan',MLK:'melaka',TRG:'terengganu',SBH:'sabah',PLS:'perlis',KDH:'kedah',KTN:'kelantan',PRK:'perak',SGR:'selangor'};
  if(event.states?.length===1&&flags[event.states[0]])return 'flag-'+flags[event.states[0]];
 }
 return null;
}
