/* ആസ്ട്രോറിയം കഥാ പേജ് — പൊതു സ്ക്രിപ്റ്റ് */
(function(){
  var d=document, h=d.documentElement, embed=window.parent!==window;
  h.classList.toggle("embed",embed);
  try{ if(embed&&parent.document.documentElement.classList.contains("night")) h.classList.add("night"); }catch(e){}
  var fs=+localStorage.getItem("st_fs")||100;
  function setFs(v){ fs=Math.max(80,Math.min(160,v)); h.style.fontSize=fs+"%"; try{ localStorage.setItem("st_fs",fs); }catch(e){} }
  setFs(fs);
  d.querySelectorAll("[data-fs]").forEach(function(b){ b.onclick=function(){ setFs(fs+10*Number(b.dataset.fs)); }; });
  var bar=d.getElementById("bar");
  addEventListener("scroll",function(){ var m=h.scrollHeight-innerHeight; bar.style.width=(m>0?scrollY/m*100:0)+"%"; },{passive:true});
  d.querySelectorAll(".goto").forEach(function(b){ b.onclick=function(){ var p=b.dataset.goto.split(":"); parent.postMessage({type:"aa-goto",kind:p[0],key:p[1]},"*"); }; });
  d.querySelectorAll(".qq").forEach(function(q){
    var a=+q.dataset.a, bs=[].slice.call(q.querySelectorAll("button"));
    bs.forEach(function(b,i){ b.onclick=function(){ if(q.dataset.done) return; q.dataset.done=1;
      bs.forEach(function(x,j){ if(j===a-1) x.classList.add("ok"); else if(x===b) x.classList.add("no"); }); }; });
  });
})();
