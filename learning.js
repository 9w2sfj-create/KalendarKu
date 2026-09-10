import {resolveAudioSource} from './audio-packs.js';
import {extraDays,extraMonths,localeTag} from './locales.js';
import {multilingualAudio} from './multilingual-audio.js';
export const dayNames={ms:['Ahad','Isnin','Selasa','Rabu','Khamis','Jumaat','Sabtu'],en:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']};
export const monthNames={ms:['Januari','Februari','Mac','April','Mei','Jun','Julai','Ogos','September','Oktober','November','Disember'],en:['January','February','March','April','May','June','July','August','September','October','November','December']};
Object.assign(dayNames,extraDays);Object.assign(monthNames,extraMonths);
export function audioSequence(kind,index,language='both'){const names=kind==='day'?dayNames:kind==='month'?monthNames:null;if(!names||!Number.isInteger(index)||index<0||index>=names.ms.length)return [];return (language==='both'?['ms','en']:[language]).filter(l=>names[l]).map(l=>({src:multilingualAudio[l+'|'+names[l][index]]||`./assets/audio/${kind}-${l}-${index}${kind==='month'&&l==='ms'&&[4,8,9,10,11].includes(index)?'-v2':''}.mp3`,text:names[l][index],lang:l}))}
// One queue handles recorded neural clips and newly added text without overlap.
export class LearningAudio {
 constructor(player,{caption=()=>{},error=()=>{},setTimer=(...args)=>globalThis.setTimeout(...args),clearTimer=id=>globalThis.clearTimeout(id),resolveSource=resolveAudioSource,speech=globalThis.speechSynthesis,Utterance=globalThis.SpeechSynthesisUtterance}={}){Object.assign(this,{player,caption,error,setTimer,clearTimer,resolveSource,speech,Utterance});this.generation=0;this.muted=false;this.timer=null;this.player.volume=.8}
 stop(){this.generation++;this.clearTimer(this.timer);this.player.onended=null;this.player.onerror=null;this.player.pause();this.source?.release();this.source=null;if(this.utterance){this.utterance.onend=null;this.utterance.onerror=null;this.utterance=null}this.speech?.cancel();this.caption(null)}
 setMuted(value){this.muted=!!value;if(this.muted)this.stop()}
 play(items){this.stop();if(this.muted||!items.length)return;const token=this.generation;let i=0;
 const fail=()=>{if(token===this.generation){this.stop();this.error()}};
 const finish=()=>{if(token===this.generation)this.timer=this.setTimer(next,300)};
 const say=item=>{if(!this.speech||!this.Utterance){fail();return}const u=new this.Utterance(item.text);u.lang=localeTag[item.lang]||'ms-MY';u.rate=.95;const voices=this.speech.getVoices().filter(v=>v.lang.toLowerCase().startsWith(item.lang));u.voice=(item.lang==='ms'?voices.find(v=>/osman|amir|male|lelaki/i.test(v.name)):null)||voices.find(v=>/natural|neural|premium|enhanced/i.test(v.name))||voices.find(v=>v.lang===u.lang)||voices[0]||null;u.onend=finish;u.onerror=fail;this.utterance=u;this.speech.speak(u)};
 const next=async()=>{if(token!==this.generation)return;this.source?.release();this.source=null;const item=items[i++];if(!item){this.caption(null);return}this.caption(item);if(!item.src){say(item);return}try{const source=await this.resolveSource(item.src);if(token!==this.generation){source.release();return}this.source=source;this.player.src=source.url;this.player.onended=finish;this.player.onerror=fail;await this.player.play()}catch{fail()}};next()
 }
}
