import {recurring,movable,islamic,calendarOverrides} from './data.js';
export const pad=n=>String(n).padStart(2,'0');
export const key=d=>`${d.getUTCFullYear()}-${pad(d.getUTCMonth()+1)}-${pad(d.getUTCDate())}`;
export const date=(y,m,d)=>new Date(Date.UTC(y,m,d,12));
export function monthCells(year,month){const first=date(year,month,1).getUTCDay(),length=date(year,month+1,0).getUTCDate();return {first,length,weeks:Math.ceil((first+length)/7),days:Array.from({length},(_,i)=>({day:i+1,row:(first+i)%7,col:Math.floor((first+i)/7),date:key(date(year,month,i+1))}))};}
const formatter=(locale,calendar,opts)=>{try{const f=new Intl.DateTimeFormat(locale,{calendar,timeZone:'Asia/Kuala_Lumpur',...opts});return f.resolvedOptions().calendar===calendar?f:null}catch{return null}};
const hf=formatter('en-u-nu-latn','islamic-civil',{day:'numeric',month:'numeric',year:'numeric'});
const cf=formatter('zh-CN','chinese',{day:'numeric',month:'long',year:'numeric'});
const parts=(f,d)=>f?Object.fromEntries(f.formatToParts(d).map(x=>[x.type,x.value])):null;
export const hijri=d=>{const p=parts(hf,d);return p?{day:+p.day,month:+p.month,year:+p.year}:null};
export const lunar=d=>parts(cf,d);
export const hijriShort=['Muh','Saf','RAw','RAk','Jam I','Jam II','Rej','Syb','Ram','Syw','Zkd','Zhj'];
export const hijriNames=['Muharram','Safar','Rabiulawal','Rabiulakhir','Jamadilawal','Jamadilakhir','Rejab','Syaaban','Ramadan','Syawal','Zulkaedah','Zulhijah'];
function easter(y){let a=y%19,b=Math.floor(y/100),c=y%100,d=Math.floor(b/4),e=b%4,f=Math.floor((b+8)/25),g=Math.floor((b-f+1)/3),h=(19*a+b-d-g+15)%30,i=Math.floor(c/4),k=c%4,l=(32+2*e+2*i-h-k)%7,m=Math.floor((a+11*h+22*l)/451),n=h+l-7*m+114;return date(y,Math.floor(n/31)-1,n%31+1)}
const cache=new Map();
const livePublic=new Map();
export function installPublicFeed(year,rows){livePublic.set(year,rows);cache.delete(year)}
export function installManagedFeed(years){for(const [year,data]of Object.entries(years)){calendarOverrides[year]=data;cache.delete(+year)}}
export function yearEvents(y){if(cache.has(y))return cache.get(y);let list=recurring.map(r=>({...r,date:`${y}-${r.md}`,official:false}));
for(const r of movable){let day=1+(r.weekday-date(y,r.month-1,1).getUTCDay()+7)%7+7*(r.n-1);list.push({...r,date:key(date(y,r.month-1,day)),category:'public',official:false})}
const gf=easter(y);gf.setUTCDate(gf.getUTCDate()-2);list.push({id:'goodfriday',date:key(gf),nameMs:'Good Friday',nameEn:'Good Friday',states:['SBH','SWK'],category:'public',official:false});
for(let d=date(y,0,1);d.getUTCFullYear()===y;d.setUTCDate(d.getUTCDate()+1)){
const h=hijri(d),l=lunar(d),k=key(d);
if(h)for(const r of islamic)if(h.month===r.month&&h.day===r.day)list.push({...r,date:k,category:'public',official:false});
if(l){const month=l.month,day=+l.day;let festival=null;
if((month==='正月'||month==='一月')&&day<=2)festival={id:'cny'+day,nameMs:'Tahun Baru Cina'+(day===2?' (Hari Kedua)':''),nameEn:'Chinese New Year'+(day===2?' (Day 2)':''),category:'public'};
if((month==='正月'||month==='一月')&&day===15)festival={id:'chap',nameMs:'Chap Goh Meh',nameEn:'Chap Goh Meh',category:'festival'};
if(month==='八月'&&day===15)festival={id:'midautumn',nameMs:'Perayaan Kuih Bulan',nameEn:'Mid-Autumn Festival',category:'festival'};
if(month==='五月'&&day===5)festival={id:'dragonboat',nameMs:'Perayaan Perahu Naga',nameEn:'Dragon Boat Festival',category:'festival'};
if(festival)list.push({...festival,date:k,states:['ALL'],official:false});}
}
const o=calendarOverrides[y];if(o){const overrides=[...o.publicHolidays,...o.specialEvents,...o.replacementHolidays];const ids=new Set(overrides.map(x=>x.id));list=list.filter(x=>!ids.has(x.id));list.push(...overrides);for(const r of o.schoolHolidays){for(let d=new Date(r.start+'T12:00:00Z');key(d)<=r.end;d.setUTCDate(d.getUTCDate()+1))list.push({...r,date:key(d)})}}
if(livePublic.has(y)){
 const originals=list.filter(e=>e.category==='public');
 const norm=s=>s.toLowerCase().replace(/baharu/g,'baru').replace(/puasa/g,'aidilfitri').replace(/qurban/g,'aidiladha').replace(/[^a-z0-9]/g,'');
 const remote=livePublic.get(y).map(r=>{const match=originals.find(e=>norm(e.nameMs)===norm(r.nameMs));return {...r,nameEn:match?.nameEn||r.nameEn}});
 const corrections=o?.replacementHolidays||[];
 list=list.filter(e=>e.category!=='public').concat(remote.filter(r=>!corrections.some(c=>c.date===r.date&&norm(c.nameMs)===norm(r.nameMs))),corrections);
}
list.sort((a,b)=>a.date.localeCompare(b.date));cache.set(y,list);return list;
}
export function eventsFor(y,state='ALL'){return yearEvents(y).filter(e=>state==='ALL'||e.states.includes('ALL')||e.states.includes(state))}
export function shiftMonth(y,m,delta){const n=y*12+m+delta;return n<2026*12||n>2099*12+11?{year:y,month:m}:{year:Math.floor(n/12),month:n%12}}
// Sunday-based teaching weeks: the week containing January 1 is week 1.
// This is intentionally not ISO week numbering, which can place January in the previous year.
export function yearWeek(d){const start=date(d.getUTCFullYear(),0,1);return Math.floor((Math.floor((d-start)/86400000)+start.getUTCDay())/7)+1}
export function monthWeekNumbers(y,m){const c=monthCells(y,m);return Array.from({length:c.weeks},(_,i)=>yearWeek(date(y,m,Math.max(1,i*7-c.first+1))))}
export function malaysiaToday(now=new Date()){
 const p=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kuala_Lumpur',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now).map(x=>[x.type,x.value]));
 return {year:+p.year,month:+p.month-1,day:+p.day,key:`${p.year}-${p.month}-${p.day}`};
}
