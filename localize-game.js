import {extraDays,extraMonths} from './locales.js';import {eventLocales} from './event-locales.js';
export function localizeQuestions(questions,lang,events=[]){if(!['zh','ta'].includes(lang))return questions;
 for(const q of questions){const d=new Date(q.answerDate+'T12:00:00Z'),n=d.getUTCDate(),m=d.getUTCMonth(),y=d.getUTCFullYear(),day=extraDays[lang][d.getUTCDay()],mn=extraMonths[lang][m],nice=lang==='zh'?`${y}年${m+1}月${n}日`:`${n} ${mn} ${y}`,zh=lang==='zh';
 q.explanation=zh?`答案：${nice}，${day}。`:`விடை: ${nice}, ${day}.`;
 q.hint=zh?'查看日期数字、左边的星期和下方的周数。':'தேதி எண்ணையும் இடப்பக்கக் கிழமையையும் கீழே உள்ள வார எண்ணையும் பார்க்கவும்.';
 switch(q.type){case 'find':q.prompt=zh?`找到并点击${nice}。`:`${nice} தேதியைக் கண்டுபிடித்துத் தொடவும்.`;break;
 case 'weekday':q.prompt=zh?`${nice}是星期几？`:`${nice} என்ன கிழமை?`;break;
 case 'listen':q.prompt=zh?'听星期名称，点击该星期的一个日期。':'கிழமையைக் கேட்டு அந்தக் கிழமையின் ஒரு தேதியைத் தொடவும்.';break;
 case 'after':{const before=n-7;q.prompt=zh?`${y}年${m+1}月${before}日的七天后是几号？`:`${before} ${mn} ${y} தேதிக்கு 7 நாட்களுக்குப் பிறகு என்ன தேதி?`;break}
 case 'holiday':{const event=events.find(e=>e.date===q.answerDate&&q.id.includes(e.nameMs));const title=eventLocales[event?.nameEn]?.[lang]||event?.nameMs||'';q.prompt=zh?`找到“${title}”并点击日期。`:`“${title}” நாளைக் கண்டுபிடித்துத் தொடவும்.`;break}
 case 'week':{const week=q.id.replace('week','');q.prompt=zh?`点击第${week}周内的一个日期。`:`${week} ஆம் வாரத்தில் ஒரு தேதியைத் தொடவும்.`;break}
 case 'monthstart':q.prompt=zh?`点击${y}年${m+1}月的第一天。`:`${mn} ${y} மாதத்தின் முதல் நாளைத் தொடவும்.`;break;
 case 'monthend':q.prompt=zh?`点击${y}年${m+1}月的最后一天。`:`${mn} ${y} மாதத்தின் கடைசி நாளைத் தொடவும்.`;break;
 case 'monthweek':q.prompt=zh?`${nice}在本月的第几周？`:`${nice} இந்த மாதத்தின் எத்தனையாவது வாரம்?`;q.choices=q.choices.map(c=>({...c,label:zh?`第${c.value}周`:`${c.value} ஆம் வாரம்`}));q.explanation=zh?`${nice}在本月第${q.answers[0]}周。`:`${nice} இந்த மாதத்தின் ${q.answers[0]} ஆம் வாரத்தில் உள்ளது.`;break}
 }
 return questions}
