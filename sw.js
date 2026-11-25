const V="aastr-v2";
const PRE=["./","index.html","info.html","stars.json","messier.json","indian.json","art.json","stories/story.css","stories/story.js"];
self.addEventListener("install",e=>{ self.skipWaiting(); e.waitUntil(caches.open(V).then(c=>Promise.all(PRE.map(u=>c.add(u).catch(()=>{}))))); });
self.addEventListener("activate",e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener("fetch",e=>{
  const r=e.request; if(r.method!=="GET") return;
  const u=new URL(r.url), img=/\.(png|jpe?g|webp|svg|gif|woff2?)$/i.test(u.pathname)||u.hostname.indexOf("fonts.g")===0;
  const net=()=>fetch(r).then(res=>{ if(res&&(res.ok||res.type==="opaque")){ const cp=res.clone(); caches.open(V).then(c=>c.put(r,cp)).catch(()=>{}); } return res; });
  const hit=()=>caches.match(r,{ignoreSearch:true}).then(m=>m||(r.mode==="navigate"?caches.match("index.html"):undefined));
  if(img) e.respondWith(caches.match(r).then(m=>m||net().catch(()=>hit())));
  else e.respondWith(Promise.race([net(),new Promise((_,j)=>setTimeout(j,5000))]).catch(()=>hit()).then(x=>x||net()));
});
