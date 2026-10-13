export function connectLedger(config,{window=globalThis.window,document=globalThis.document}={}){
 const channel=crypto.randomUUID(),pending=new Map();let peer=null,readyResolve;
 const ready=new Promise(resolve=>readyResolve=resolve);let readyTimer;
 const frame=document.createElement('iframe');frame.style.cssText='width:1px;height:1px;border:0;position:fixed;bottom:0;left:0;opacity:0;pointer-events:none';frame.title='공유 장부 연결';
 const src=new URL(config.endpoint);src.searchParams.set('appId',config.appId);src.searchParams.set('parentOrigin',window.location.origin);src.searchParams.set('channel',channel);frame.src=src.href;
 window.addEventListener('message',event=>{frame.dataset.lastOrigin=event.origin;
  if(!/^https:\/\/(?:[a-z0-9-]+[-.])?script\.googleusercontent\.com$/.test(event.origin)||event.data?.channel!==channel)return;
  if(event.data.ready&&!peer){peer=event.source;frame.dataset.ready='true';clearTimeout(readyTimer);readyResolve();return;}
  if(event.source!==peer)return;
  const p=pending.get(event.data.id);if(!p)return;pending.delete(event.data.id);clearTimeout(p.timer);event.data.error?p.reject(Error(event.data.error)):p.resolve(event.data.result);
 });
 document.body.append(frame);
 return {async request(request){await (peer?Promise.resolve():Promise.race([ready,new Promise((_,reject)=>readyTimer=setTimeout(()=>reject(Error('공유 장부 연결이 지연됐어요. 다시 시도하세요.')),60000))]));return new Promise((resolve,reject)=>{const id=crypto.randomUUID(),timer=setTimeout(()=>{pending.delete(id);reject(Error('서버 저장 확인이 지연됐어요. 새로고침으로 결과를 확인하세요.'));},60000);pending.set(id,{resolve,reject,timer});peer.postMessage({channel,id,request},'*');});}};
}
