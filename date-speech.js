import {monthNames} from './learning.js';
const units=['','satu','dua','tiga','empat','lima','enam','tujuh','lapan','sembilan','sepuluh','sebelas'];
export function malayDay(n){if(!Number.isInteger(n)||n<1||n>31)throw RangeError('day');return n<12?units[n]:n<20?units[n-10]+' belas':units[Math.floor(n/10)]+' puluh'+(n%10?' '+units[n%10]:'')}
const ordinal=['','first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth','eleventh','twelfth','thirteenth','fourteenth','fifteenth','sixteenth','seventeenth','eighteenth','nineteenth','twentieth','twenty-first','twenty-second','twenty-third','twenty-fourth','twenty-fifth','twenty-sixth','twenty-seventh','twenty-eighth','twenty-ninth','thirtieth','thirty-first'];
export function datePhrases(day,month){if(!Number.isInteger(month)||month<0||month>11)throw RangeError('month');return {ms:`${malayDay(day)} hari bulan ${monthNames.ms[month]}`,en:`the ${ordinal[day]} of ${monthNames.en[month]}`,zh:`${month+1}月${day}日`,ta:`${monthNames.ta[month]} மாதம் ${day} ஆம் தேதி`}}
export const dateAssets={};
for(let month=0;month<12;month++){const length=new Date(Date.UTC(2028,month+1,0)).getUTCDate();for(let day=1;day<=length;day++)for(const [lang,text]of Object.entries(datePhrases(day,month)))dateAssets[lang+'|'+text]=`./assets/audio/date-${lang}-${month+1}-${day}${lang==='ms'&&[4,8,9,10,11].includes(month)?'-v2':''}.mp3`}
