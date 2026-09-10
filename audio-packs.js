import {audioPackIndex} from './audio-pack-index.js';
// Keep compressed bytes unchanged. Load only the pack needed by a spoken clip.
const packs=new Map();
function loadPack(part){
 if(packs.has(part)){const cached=packs.get(part);packs.delete(part);packs.set(part,cached);return cached}
 const pending=fetch(new URL(`./assets/audio/pack-${String(part).padStart(2,'0')}.bin`,import.meta.url))
  .then(response=>{if(!response.ok)throw new Error('Audio pack unavailable');return response.arrayBuffer()})
  .catch(error=>{if(packs.get(part)===pending)packs.delete(part);throw error});
 packs.set(part,pending);
 // At most three compressed packs remain cached, even after browsing many dates.
 while(packs.size>3)packs.delete(packs.keys().next().value);
 return pending;
}
export async function resolveAudioSource(src){
 const name=src.split('/').pop().split(/[?#]/)[0];
 const entry=audioPackIndex[name];
 if(!entry)return {url:src,release(){}};
 const [part,offset,length]=entry,buffer=await loadPack(part);
 if(buffer.byteLength<offset+length)throw new Error('Incomplete audio pack');
 const url=URL.createObjectURL(new Blob([buffer.slice(offset,offset+length)],{type:'audio/mpeg'}));
 return {url,release(){URL.revokeObjectURL(url)}};
}
