import {tamilStarts} from './tamil-starts.js';
import {hijri,hijriNames,hijriShort,lunar,key,date} from './calendar.js';
const tamilNames=['சித்திரை','வைகாசி','ஆனி','ஆடி','ஆவணி','புரட்டாசி','ஐப்பசி','கார்த்திகை','மார்கழி','தை','மாசி','பங்குனி'];
const roman=['Chithirai','Vaikasi','Aani','Aadi','Avani','Purattasi','Aippasi','Karthigai','Margazhi','Thai','Maasi','Panguni'];
export function tamilDate(d){const k=key(d);let lo=0,hi=tamilStarts.length;while(lo<hi){const mid=(lo+hi)>>1;if(tamilStarts[mid][0]<=k)lo=mid+1;else hi=mid}const start=tamilStarts[lo-1];if(!start)return null;return {month:start[1],name:tamilNames[start[1]],roman:roman[start[1]],day:Math.round((Date.parse(k+'T12:00:00Z')-Date.parse(start[0]+'T12:00:00Z'))/86400000)+1}}
export function secondaryDate(d){const h=hijri(d),c=lunar(d),t=tamilDate(d);return {hijri:h?`${h.day} ${hijriShort[h.month-1]}`:'',hijriFull:h?`${h.day} ${hijriNames[h.month-1]} ${h.year}H`:'',chinese:c?`${c.month}${c.day}`:'',chineseYear:c?(c.yearName||c.relatedYear||''):'',tamil:t?`${t.name} ${t.day}`:'',tamilFull:t?`${t.name} (${t.roman}) ${t.day}`:''}}
export function calendarHeading(y,m){const a=secondaryDate(date(y,m,1)),b=secondaryDate(date(y,m+1,0)),h1=hijri(date(y,m,1)),h2=hijri(date(y,m+1,0));return {chinese:`${a.chineseYear}年 · ${lunar(date(y,m,1))?.month||''} – ${lunar(date(y,m+1,0))?.month||''}`,islam:h1?`${hijriNames[h1.month-1]}${h1.month!==h2.month?' – '+hijriNames[h2.month-1]:''} (${h1.year}H)`:''}}
export const wallColumn=column=>column===5?0:column;
