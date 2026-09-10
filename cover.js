const cover=document.getElementById('calendar-cover');
const language=document.getElementById('cover-language');
const copy={
 ms:{eyebrow:'KALENDAR MALAYSIA',title:'Setiap hari,\nsatu penemuan.',description:'Kenali tarikh, raikan perayaan dan belajar bersama.',open:'Buka Kalendar',footer:'Hari · Bulan · Perayaan · Cerita kita',home:'Muka depan kalendar'},
 en:{eyebrow:'MALAYSIAN CALENDAR',title:'A new discovery,\nevery day.',description:'Explore dates, celebrate festivals and learn together.',open:'Open Calendar',footer:'Days · Months · Festivals · Our stories',home:'Calendar cover'},
 zh:{eyebrow:'马来西亚日历',title:'每一天，\n都有新发现。',description:'认识日期、欢庆节日，一起快乐学习。',open:'打开日历',footer:'日期 · 月份 · 节日 · 我们的故事',home:'日历封面'},
 ta:{eyebrow:'மலேசிய நாட்காட்டி',title:'ஒவ்வொரு நாளும்\nஒரு புதிய கண்டுபிடிப்பு.',description:'தேதிகளை அறிந்து, விழாக்களைக் கொண்டாடி, ஒன்றாகக் கற்போம்.',open:'நாட்காட்டியைத் திற',footer:'நாட்கள் · மாதங்கள் · விழாக்கள் · நம் கதைகள்',home:'நாட்காட்டி முகப்பு'}
};
function refreshCover(){
 const lang=document.getElementById('lang').value||'ms',t=copy[lang]||copy.ms;
 language.value=lang;cover.lang=lang;
 for(const key of ['eyebrow','description','open'])document.getElementById('cover-'+key).textContent=t[key];
 document.getElementById('cover-year').textContent=document.getElementById('year').value||new Date().getFullYear();
 document.getElementById('cover-home').setAttribute('aria-label',t.home);
}
function sizeCover(){
 const rect=document.getElementById('paper').getBoundingClientRect();
 const page=cover.querySelector('.cover-page');
 page.style.width=rect.width+'px';page.style.height=rect.height+'px';
 page.style.left=Math.max(0,rect.left)+'px';page.style.top=Math.max(68,rect.top)+'px';
}
function openCover(){refreshCover();sizeCover();if(!cover.open)cover.showModal();requestAnimationFrame(sizeCover)}
window.addEventListener('resize',()=>{if(cover.open)requestAnimationFrame(sizeCover)});
new ResizeObserver(()=>{if(cover.open)requestAnimationFrame(sizeCover)}).observe(document.getElementById('paper'));
language.addEventListener('change',()=>{const select=document.getElementById('lang');select.value=language.value;select.dispatchEvent(new Event('change'));refreshCover()});
document.getElementById('cover-open').addEventListener('click',()=>{cover.close();document.getElementById('month-title').focus()});
document.getElementById('cover-home').addEventListener('click',openCover);
openCover();
