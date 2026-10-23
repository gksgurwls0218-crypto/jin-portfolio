/* Structural Zone Covering — animated pitch player (shared by KO/EN pages).
   Usage: <div class="tp" data-scenes="A,B"></div>. Text language follows <html lang>. */
(function(){
const LANG=(document.documentElement.lang||"en").slice(0,2)==="ko"?"ko":"en";
const L=x=>typeof x==="string"?x:(x[LANG]||x.en);
const UI={restart:{ko:"처음부터",en:"Restart"},speed:{ko:"재생 속도",en:"Playback speed"},pause:{ko:"일시정지",en:"Pause"},play:{ko:"재생",en:"Play"},
  flight:{ko:"s 비행 (추정)",en:"s in flight (est.)"}};
const NS="http://www.w3.org/2000/svg";
const BASE={GK:[170,300],LB:[60,240],LCB:[135,252],RCB:[205,252],RB:[280,240],D6:[170,195],L8:[118,152],R8:[222,152],LW:[68,104],ST:[170,78],RW:[272,104]};
const LAB={GK:"GK",LB:"LB",LCB:"LCB",RCB:"RCB",RB:"RB",D6:"6",L8:"8",R8:"8",LW:"LW",ST:"ST",RW:"RW"};
const A_END={LW:[50,110],L8:[88,142],LCB:[118,198],D6:[168,198],RCB:[158,256],RB:[226,250],R8:[212,160],RW:[244,116],ST:[96,80],LB:[60,246]};
const T=(ko,en)=>({ko,en});

const SC={
P:{tab:T("페인 포인트 · 압박 실패","Pain point · press beaten"),dur:6.2,
 opp:{o1:[72,62],o2:[120,118],o3:[165,212],o4:[40,178],o5:[306,178]},
 keys:[{t:[0.2,1.2],us:{LW:[80,74],L8:[122,128],LB:[48,188],D6:[172,176],ST:[150,64],R8:[214,140]}},
  {t:[0.4,1.3],opp:{o3:[160,186]}},{t:[0.5,1.4],us:{LCB:[156,202]}},
  {t:[1.2,2.3],opp:{o2:[130,192]}},{t:[2.3,3.0],opp:{o2:[140,250]}},{t:[3.0,5.0],opp:{o2:[152,284]}},
  {t:[2.6,5.0],us:{LCB:[150,262],RCB:[168,268],L8:[136,236],LB:[90,250],D6:[170,230]}},{t:[3.4,5.0],us:{GK:[160,288]}}],
 ball:{p:[78,68],seg:[{t:[1.6,2.3],to:[158,182]},{t:[2.35,3.0],to:[142,252]},{t:[3.0,6.2],follow:"o2"}]},
 ov:[{k:"void",t:[2.3,4.6],r:[104,212,96,72]},{k:"text",t:[2.4,4.6],at:[100,232],s:T("LCB가 비운 공간","Space left by LCB"),c:"t-v",a:"end"},
  {k:"text",t:[3.0,6.2],at:[214,226],s:T("전력 복귀 스프린트","Recovery sprints"),c:"t-v",a:"start"},{k:"ripple",t:[0.5,1.6],id:"LCB"}],
 cap:[[0,T("맨마킹 압박: 각자 자기 상대를 잡는다","Man-marking press: everyone takes their own man")],
  [1.0,T("펄스 나인이 내려가자 LCB가 따라 나간다 · 자리 이탈","The false nine drops and the LCB follows · position abandoned")],
  [2.3,T("압박이 한 번 벗겨지면 LCB가 비운 공간이 열린다","One pass beats the press and the space the LCB left opens up")],
  [3.1,T("후방 수적 열세 + 넓은 공간 → 전력 복귀 스프린트","Outnumbered at the back + open space → recovery sprints")]]},
A:{tab:T("A · 아웃 채널링","A · Out-channelling"),dur:6.6,
 opp:{o1:[150,32],o2:[32,98],o3:[100,124],o4:[165,214],o5:[306,178],o6:[46,186]},
 keys:[{t:[0.3,0.9],us:{ST:[150,56]}},{t:[0.9,1.4],us:{ST:[126,54]}},{t:[2.0,3.2],us:A_END}],
 ball:{p:[154,38],seg:[{t:[1.4,2.2],to:[38,104]}]},
 ov:[{k:"ripple",t:[0.3,1.6],id:"ST"},{k:"text",t:[0.4,2.2],at:[182,48],s:T("트리거 · 아웃 채널링","Trigger · out-channelling"),c:"t",a:"start"},
  {k:"text",t:[2.1,3.1],at:[200,232],s:T("동시에 좁힘","Narrow together"),c:"t",a:"middle"},
  {k:"core",t:[3.0,6.6],r:[44,184,206,88]},{k:"text",t:[3.0,6.6],at:[246,282],s:T("3-2 코어","3-2 core"),c:"t-m",a:"end"},
  {k:"void",t:[3.0,6.6],r:[262,130,66,178]},{k:"text",t:[3.0,6.6],at:[295,124],s:T("비워 둔다","Left empty"),c:"t-v",a:"middle"}],
 cap:[[0,T("상대 후방 빌드업 시작","Opponent starts building from the back")],
  [0.3,T("공격수가 커브 런으로 아웃 채널링 → 트리거","Striker's curved run channels play outside → the trigger")],
  [1.4,T("공이 측면으로 · 볼 쪽 CB가 3선으로 전진","Ball goes wide · ball-side CB steps up to the midfield line")],
  [2.2,T("동시에 반대편 CB·풀백이 좁혀 3백","At the same time the far CB and full-back narrow into a back three")],
  [3.2,T("3-2 코어 완성 · 반대편 윙어는 혼자 둔다","3-2 core set · the far winger is left alone")]]},
B:{tab:T("B · 인 채널링","B · In-channelling"),dur:6.6,
 opp:{o1:[170,32],o2:[140,150],o3:[30,186],o4:[310,186],o5:[176,226]},
 keys:[{t:[0.3,0.9],us:{ST:[214,58]}},{t:[0.9,1.4],us:{ST:[194,42]}},{t:[1.2,2.2],opp:{o2:[140,166]}},
  {t:[2.0,3.2],us:{LW:[88,140],RW:[254,140],L8:[100,184],R8:[198,166],D6:[188,206],LCB:[132,206],LB:[96,256],RCB:[176,262],RB:[250,256],ST:[150,126]}}],
 ball:{p:[174,38],seg:[{t:[1.4,2.2],to:[146,170]},{t:[2.2,6.6],follow:"o2"}]},
 ov:[{k:"ripple",t:[0.3,1.6],id:"ST"},{k:"text",t:[0.4,2.2],at:[224,40],s:T("트리거 · 인 채널링","Trigger · in-channelling"),c:"t",a:"start"},
  {k:"ell",t:[2.6,6.6],c:[140,170],rr:[62,38]},{k:"text",t:[2.6,6.6],at:[226,128],s:T("중앙 트랩","Central trap"),c:"t-m",a:"middle"},
  {k:"void",t:[3.0,6.6],r:[12,140,46,168]},{k:"void",t:[3.0,6.6],r:[282,140,46,168]},
  {k:"text",t:[3.0,6.6],at:[35,134],s:T("비워 둔다","Left empty"),c:"t-v",a:"middle"},{k:"text",t:[3.0,6.6],at:[305,134],s:T("비워 둔다","Left empty"),c:"t-v",a:"middle"}],
 cap:[[0,T("상대 후방 빌드업 시작","Opponent starts building from the back")],
  [0.3,T("공격수가 바깥에서 안으로 커브 런 → 인 채널링","Striker curves from outside in → in-channelling")],
  [1.4,T("공이 중앙 트랩으로 · 3선 미드필더 기준 공 쪽 CB 전진","Ball into the central trap · the CB on the ball's side of the No.6 steps up")],
  [2.2,T("나머지 후방이 좁혀 3백 · 사방에서 둘러싼다","The rest of the back line narrows into three · surrounded on all sides")],
  [3.2,T("양 측면은 비워 둔다","Both flanks are left empty")]]},
S:{tab:T("전환이 나왔을 때","When the switch comes"),dur:7,us0:A_END,
 opp:{o1:[150,32],o2:[36,142],o3:[100,124],o4:[160,212],o5:[304,178]},
 keys:[{t:[0.9,3.5],us:{LB:[100,252],LCB:[150,254],RCB:[206,256],RB:[284,206],D6:[206,204],R8:[262,168],RW:[276,128],L8:[150,160],LW:[110,120],ST:[150,92]}},
  {t:[0.9,3.5],opp:{o2:[60,150],o3:[140,132],o4:[192,214]}},
  {t:[3.5,6.0],opp:{o5:[288,196]}},{t:[3.6,6.0],us:{RB:[279,222],R8:[276,186]}}],
 ball:{p:[42,148],seg:[{t:[0.8,3.5],to:[298,172],arc:[170,-10]},{t:[3.5,7],follow:"o5"}]},
 ov:[{k:"fly",t:[0.8,7],d:"M42 148 Q170 -10 298 172"},{k:"timer",t:[0.8,7],at:[170,58],from:0.8,max:2.7},
  {k:"ripple",t:[0.9,2.4],id:"LCB"},{k:"ripple",t:[3.5,5.2],id:"RB"},
  {k:"text",t:[3.6,7],at:[322,252],s:T("접근 · 지연","Approach · delay"),c:"t",a:"end"}],
 cap:[[0,T("전진한 CB 덕분에 왼쪽은 수적 우위 · 전환이 어렵다","The stepped-up CB creates a left-side overload · switching is hard")],
  [0.8,T("정확한 전환이 나와도 공은 높게 뜬다","Even an accurate switch has to travel high")],
  [1.6,T("공이 떠 있는 동안 구조 전체가 이동 · LCB는 복귀","While the ball is in the air the whole structure shifts · the LCB returns")],
  [3.5,T("가장 가까운 RB가 접근 · 뺏지 않고 시간을 끈다","The nearest player, the RB, approaches · delays instead of diving in")],
  [5.0,T("간격이 살아 있어 전진 드리블 공간이 없다","Distances are intact, so there is no room to dribble forward")]]},
R1:{tab:T("선택 ① 그 자리에서 압도","Option ① Overwhelm in place"),dur:6.4,
 opp:{o1:[190,32],o2:[306,96],o3:[236,126],o4:[118,34],o5:[34,178]},
 keys:[{t:[0.3,0.9],us:{ST:[200,52]}},{t:[0.9,1.5],us:{ST:[236,66]}},
  {t:[2.1,3.3],us:{ST:[262,82],RW:[292,116],R8:[246,128],RCB:[222,200],D6:[178,198],RB:[282,244],LCB:[178,256],LB:[112,250],L8:[150,160],LW:[96,112]}},
  {t:[3.3,4.2],us:{RW:[298,104],ST:[284,90]}}],
 ball:{p:[194,38],seg:[{t:[1.5,2.3],to:[300,102]},{t:[4.0,4.3],to:[296,108]},{t:[4.7,5.4],to:[244,134]}]},
 ov:[{k:"ripple",t:[3.3,4.4],id:"RW"},{k:"text",t:[4.2,6.4],at:[318,84],s:T("탈취","Won"),c:"t-v",a:"end"}],
 cap:[[0,T("오른쪽으로 아웃 채널링","Out-channelling to the right")],[1.5,T("스트라이커가 측면에 자리를 잡았다","The striker has settled on the flank")],
  [2.3,T("RW는 그 자리에 남아 수적 우위로 압도","The RW stays and overwhelms with numbers")],[4.0,T("탈취 → 숏카운터","Ball won → short counter")]]},
R2:{tab:T("선택 ② 자리를 바꾼다","Option ② Swap positions"),dur:6.6,
 opp:{o1:[190,32],o2:[306,96],o3:[236,126],o4:[118,34],o5:[34,178]},
 keys:[{t:[0.3,0.9],us:{ST:[200,52]}},{t:[0.9,1.5],us:{ST:[236,66]}},
  {t:[2.1,3.3],us:{ST:[270,88],RW:[184,80],R8:[246,128],RCB:[222,200],D6:[178,198],RB:[282,244],LCB:[178,256],LB:[112,250],L8:[150,160],LW:[96,112]}},
  {t:[3.3,4.3],opp:{o2:[298,112]}},{t:[3.6,4.4],us:{ST:[292,108]}}],
 ball:{p:[194,38],seg:[{t:[1.5,2.3],to:[300,102]},{t:[3.3,4.3],follow:"o2"},{t:[4.3,4.5],to:[292,112]},{t:[4.8,5.5],to:[186,76]}]},
 labels:[{t:3.0,id:"ST",s:"RW"},{t:3.0,id:"RW",s:"ST"}],
 ov:[{k:"ripple",t:[2.8,4.0],id:"ST"},{k:"ripple",t:[2.8,4.0],id:"RW"},{k:"text",t:[3.0,6.6],at:[226,62],s:T("역할 교대","Roles swapped"),c:"t",a:"middle"},
  {k:"text",t:[5.0,6.6],at:[186,104],s:T("바뀐 자리의 역할로 공격","Attacks in the new role"),c:"t-m",a:"middle"}],
 cap:[[0,T("오른쪽으로 아웃 채널링","Out-channelling to the right")],[1.5,T("스트라이커가 측면에 자리를 잡았다","The striker has settled on the flank")],
  [2.3,T("RW가 스트라이커 자리로 · 같은 역할, 다른 선수","The RW moves into the striker's slot · same role, different player")],
  [4.3,T("탈취 후에도 바뀐 위치의 역할로 공격한다","After the regain, each attacks in the role of the new position")]]},
C:{tab:T("연쇄 반응","Chain reaction"),dur:5.6,
 opp:{o1:[150,32],o2:[32,98],o3:[100,124],o4:[165,214],o5:[306,178],o6:[46,186]},
 keys:[{t:[0.2,0.7],us:{ST:[150,56]}},{t:[0.7,1.1],us:{ST:[126,54]}},{t:[1.6,2.6],us:{ST:[96,80]}},
  {t:[0.6,1.8],us:{LW:A_END.LW}},{t:[0.75,1.95],us:{L8:A_END.L8}},{t:[0.9,2.1],us:{LCB:A_END.LCB}},{t:[1.0,2.2],us:{D6:A_END.D6}},
  {t:[1.1,2.3],us:{RCB:A_END.RCB}},{t:[1.2,2.4],us:{RB:A_END.RB,R8:A_END.R8}},{t:[1.3,2.5],us:{RW:A_END.RW}}],
 ball:{p:[154,38],seg:[{t:[1.4,2.4],to:[38,104]}]},
 ov:[{k:"ripple",t:[0.2,1.2],id:"ST"},{k:"ripple",t:[0.6,1.6],id:"LW"},{k:"ripple",t:[0.75,1.75],id:"L8"},{k:"ripple",t:[0.9,1.9],id:"LCB"},
  {k:"ripple",t:[1.0,2.0],id:"D6"},{k:"ripple",t:[1.1,2.1],id:"RCB"},{k:"ripple",t:[1.2,2.2],id:"RB"},{k:"ripple",t:[1.2,2.2],id:"R8"},{k:"ripple",t:[1.3,2.3],id:"RW"},
  {k:"clock",t:[0,5.6],at:[20,30]},{k:"text",t:[2.4,5.6],at:[56,90],s:T("공 도착","Ball arrives"),c:"t-v",a:"start"}],
 cap:[[0,T("트리거: 공격수의 채널링","Trigger: the striker's channelling")],[0.6,T("옆 선수를 보고 따라간다 · LW와 8","Follow the neighbour · LW and No.8")],
  [0.9,T("LCB 출발","LCB sets off")],[1.1,T("RCB·RB가 동시에 좁힌다","RCB and RB narrow together")],
  [1.4,T("공이 출발할 때 연쇄는 이미 진행 중","When the ball leaves, the chain is already running")],[2.4,T("공 도착 · 구조는 이미 3-2","Ball arrives · the structure is already 3-2")]]}
};

const ease=x=>x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2;
const lerp=(a,b,u)=>[a[0]+(b[0]-a[0])*u,a[1]+(b[1]-a[1])*u];
function el(n,a,p){const e=document.createElementNS(NS,n);for(const k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e}
function build(sc){
  const us0=Object.assign({},BASE,sc.us0||{});const tr={};
  for(const id in us0) tr[id]=[{t:0,p:us0[id]}];
  for(const id in sc.opp) tr[id]=[{t:0,p:sc.opp[id]}];
  for(const k of sc.keys){for(const grp of ["us","opp"]){if(!k[grp])continue;
    for(const id in k[grp]){const a=tr[id];const last=a[a.length-1].p;a.push({t:k.t[0],p:last});a.push({t:k.t[1],p:k[grp][id]});}}}
  for(const id in tr) tr[id].sort((a,b)=>a.t-b.t);
  sc._tr=tr;
}
function posAt(a,t){
  if(t<=a[0].t) return a[0].p;
  for(let i=1;i<a.length;i++){const b=a[i],p=a[i-1];if(t<=b.t){if(b.t===p.t)return b.p;return lerp(p.p,b.p,ease((t-p.t)/(b.t-p.t)));}}
  return a[a.length-1].p;
}
function ballAt(sc,t){
  let cur=sc.ball.p;
  for(const s of sc.ball.seg){const [t0,t1]=s.t;if(t<t0)return cur;
    if(s.follow){const pp=posAt(sc._tr[s.follow],Math.min(t,t1));const q=[pp[0]+6,pp[1]+6];if(t<=t1)return q;cur=q;continue;}
    if(t<=t1){const u=ease((t-t0)/(t1-t0));
      if(s.arc){const c=s.arc,m=1-u;return [m*m*cur[0]+2*m*u*c[0]+u*u*s.to[0],m*m*cur[1]+2*m*u*c[1]+u*u*s.to[1]];}
      return lerp(cur,s.to,u);}
    cur=s.to;}
  return cur;
}
function drawPitch(svg){
  const g=el("g",{},svg);
  el("rect",{x:10,y:10,width:320,height:300,class:"ln"},g);
  el("rect",{x:85,y:245,width:170,height:65,class:"ln"},g);
  el("rect",{x:132,y:285,width:76,height:25,class:"ln"},g);
  el("path",{d:"M120 10 A50 50 0 0 0 220 10",class:"ln"},g);
  el("path",{d:"M140 245 A32 32 0 0 1 200 245",class:"ln"},g);
  for(const x of [85,132,208,255]) el("line",{x1:x,y1:10,x2:x,y2:310,class:"lane"},g);
  [["W",47],["HS",108],["C",170],["HS",232],["W",293]].forEach(([s,x])=>{el("text",{x:x,y:20,class:"lane-t"},g).textContent=s;});
}
function mount(root){
  const ids=root.dataset.scenes.split(",");const hero=root.dataset.hero==="1";
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  ids.forEach(i=>{if(!SC[i]._tr)build(SC[i])});
  root.innerHTML="";let tabs=null;
  if(ids.length>1){tabs=document.createElement("div");tabs.className="tp-tabs";tabs.setAttribute("role","tablist");root.appendChild(tabs);}
  const stage=document.createElement("div");stage.className="tp-stage";root.appendChild(stage);
  const svg=el("svg",{viewBox:"0 0 340 320",role:"img"});stage.appendChild(svg);
  const cap=document.createElement("div");cap.className="tp-cap";cap.setAttribute("aria-live","polite");
  let btn,prog,clock;
  const state={i:0,t:0,playing:!reduce,speed:1,visible:false,hold:0,manual:false};
  const cur=()=>SC[ids[state.i]];
  if(!hero){const bar=document.createElement("div");bar.className="tp-bar";
    btn=document.createElement("button");btn.type="button";
    const rs=document.createElement("button");rs.type="button";rs.textContent="↺";rs.setAttribute("aria-label",L(UI.restart));
    const sp=document.createElement("button");sp.type="button";sp.textContent="1×";sp.setAttribute("aria-label",L(UI.speed));
    prog=document.createElement("div");prog.className="tp-prog";prog.appendChild(document.createElement("i"));
    clock=document.createElement("span");clock.className="tp-clock";
    bar.append(btn,rs,sp,prog,clock);root.appendChild(bar);
    btn.onclick=()=>{state.playing=!state.playing;if(state.playing&&state.t>=cur().dur)state.t=0;state.manual=true;sync();};
    rs.onclick=()=>{state.t=0;state.playing=true;state.manual=true;sync();};
    sp.onclick=()=>{state.speed=state.speed===1?0.5:1;sp.textContent=state.speed===1?"1×":"0.5×";};}
  root.appendChild(cap);
  let G={};
  function setup(){
    svg.innerHTML="";drawPitch(svg);const sc=cur();
    svg.setAttribute("aria-label",L(sc.tab)+": "+sc.cap.map(c=>L(c[1])).join(" / "));
    G={ov:[],pl:{}};const og=el("g",{},svg);
    for(const o of sc.ov){let n;
      if(o.k==="void")n=el("rect",{x:o.r[0],y:o.r[1],width:o.r[2],height:o.r[3],class:"void"},og);
      else if(o.k==="core")n=el("rect",{x:o.r[0],y:o.r[1],width:o.r[2],height:o.r[3],rx:8,class:"core"},og);
      else if(o.k==="ell")n=el("ellipse",{cx:o.c[0],cy:o.c[1],rx:o.rr[0],ry:o.rr[1],class:"core"},og);
      else if(o.k==="fly")n=el("path",{d:o.d,class:"fly"},og);
      else if(o.k==="text"){n=el("text",{x:o.at[0],y:o.at[1],class:o.c,"text-anchor":o.a},og);n.textContent=L(o.s);}
      else if(o.k==="timer"||o.k==="clock")n=el("text",{x:o.at[0],y:o.at[1],class:"t-big","text-anchor":o.k==="timer"?"middle":"start"},og);
      else if(o.k==="ripple")n=el("circle",{r:10,class:"rip"},og);
      if(n){n.style.opacity=0;G.ov.push([o,n]);}}
    const pg=el("g",{},svg);
    for(const id in sc._tr){const g=el("g",{},pg);
      if(id[0]==="o"){el("circle",{r:6.5,class:"opp"},g);G.pl[id]={g};}
      else{el("circle",{r:9,class:"us"},g);const tx=el("text",{class:"us-t"},g);tx.textContent=LAB[id];G.pl[id]={g,tx};}}
    G.ball=el("circle",{r:3.4,class:"ball"},pg);G.cap=-1;
    if(tabs)tabs.querySelectorAll("button").forEach((b,j)=>b.setAttribute("aria-selected",j===state.i?"true":"false"));
  }
  if(tabs)ids.forEach((id,j)=>{const b=document.createElement("button");b.type="button";b.setAttribute("role","tab");b.textContent=L(SC[id].tab);
    b.onclick=()=>{state.i=j;state.t=0;state.playing=true;state.manual=true;setup();sync();render();};tabs.appendChild(b);});
  function sync(){if(btn){btn.textContent=state.playing?"❚❚":"▶";btn.setAttribute("aria-label",L(state.playing?UI.pause:UI.play));}}
  function render(){
    const sc=cur(),t=state.t;
    for(const id in G.pl){const p=posAt(sc._tr[id],t);G.pl[id].g.setAttribute("transform",`translate(${p[0].toFixed(1)},${p[1].toFixed(1)})`);
      if(G.pl[id].tx){let s=LAB[id];(sc.labels||[]).forEach(l=>{if(l.id===id&&t>=l.t)s=l.s;});if(G.pl[id].tx.textContent!==s)G.pl[id].tx.textContent=s;}}
    const b=ballAt(sc,t);G.ball.setAttribute("cx",b[0].toFixed(1));G.ball.setAttribute("cy",b[1].toFixed(1));
    for(const [o,n] of G.ov){
      let op=(t>=o.t[0]&&t<=o.t[1])?Math.min(1,(t-o.t[0])/.25,(o.t[1]-t)/.25):0;
      if(o.t[1]>=sc.dur&&t>=o.t[0])op=Math.min(1,(t-o.t[0])/.25);
      if(o.k==="ripple"){const p=posAt(sc._tr[o.id],t);const ph=(Math.max(0,t-o.t[0])%0.9)/0.9;n.setAttribute("cx",p[0]);n.setAttribute("cy",p[1]);n.setAttribute("r",10+ph*14);op*=1-ph;}
      if(o.k==="timer"){const v=Math.max(0,Math.min(o.max,t-o.from));n.textContent=v.toFixed(1)+L(UI.flight);}
      if(o.k==="clock")n.textContent="t = "+t.toFixed(1)+"s";
      n.style.opacity=op;}
    let ci=0;sc.cap.forEach((c,j)=>{if(t>=c[0])ci=j;});
    if(ci!==G.cap){G.cap=ci;cap.innerHTML=`<span class="n">${String(ci+1).padStart(2,"0")}/${String(sc.cap.length).padStart(2,"0")}</span>`;cap.appendChild(document.createTextNode(L(sc.cap[ci][1])));}
    if(prog)prog.firstChild.style.width=(Math.min(1,t/sc.dur)*100)+"%";
    if(clock)clock.textContent=t.toFixed(1)+"s";
  }
  setup();if(reduce)state.t=cur().dur;sync();render();
  let last=performance.now();
  function loop(now){const dt=Math.min(.05,(now-last)/1000);last=now;
    if(state.playing&&state.visible){const sc=cur();
      if(state.t<sc.dur){state.t=Math.min(sc.dur,state.t+dt*state.speed);render();}
      else{state.hold+=dt;if(state.hold>1.6){state.hold=0;state.t=0;
        if(!hero&&ids.length>1&&!state.manual){state.i=(state.i+1)%ids.length;setup();}render();}}}
    requestAnimationFrame(loop);}
  new IntersectionObserver(es=>es.forEach(e=>state.visible=e.isIntersecting),{threshold:.25}).observe(root);
  requestAnimationFrame(loop);
}
document.querySelectorAll(".tp").forEach(mount);
})();
