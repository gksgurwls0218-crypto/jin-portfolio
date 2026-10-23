/* Canvas palette remap — draws the original animations in the site's
   light-pitch palette (same as the Structural Zone Covering player)
   without touching the animation code. Colours are mapped by role:
   pitch greens → light pitch, team blues/golds → charcoal,
   opponents (reds) → hollow grey discs, highlights → signal red,
   white lines/text → ink, dark label pills → white. */
(function(){
  if(!window.CanvasRenderingContext2D) return;
  const P=CanvasRenderingContext2D.prototype;
  const CHAR=[23,21,18], INK=[20,24,26], OPP=[95,111,126], VOID=[210,70,43];
  const FSD=Object.getOwnPropertyDescriptor(P,'fillStyle');
  const scratch=document.createElement('canvas').getContext('2d');
  const cache=new Map();
  function parse(c){
    if(typeof c!=='string') return null;
    if(cache.has(c)) return cache.get(c);
    let out=null;
    try{
      FSD.set.call(scratch,'#000'); FSD.set.call(scratch,c); const s=FSD.get.call(scratch);
      if(s[0]==='#'){out=[parseInt(s.slice(1,3),16),parseInt(s.slice(3,5),16),parseInt(s.slice(5,7),16),1];}
      else{const m=s.match(/[\d.]+/g); if(m) out=[+m[0],+m[1],+m[2],m[3]===undefined?1:+m[3]];}
    }catch(e){}
    if(out){const [r,g,b]=out.map(v=>v/255);const mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2,d=mx-mn;
      let h=0,s=0; if(d){s=d/(1-Math.abs(2*l-1)); h=mx===r?((g-b)/d)%6:mx===g?(b-r)/d+2:(r-g)/d+4; h*=60; if(h<0)h+=360;}
      out.push(h,s,l);}
    if(cache.size>4000) cache.clear();
    cache.set(c,out); return out;
  }
  // role of a colour
  function role(c){
    const p=parse(c); if(!p) return null;
    const [r,g,b,a,h,s,l]=p;
    if(l>0.86 && s<0.35) return {k:'white',a,l};
    if(l<0.09 || (s<0.25 && l<0.22)) return {k:'dark',a};
    if(s<0.18) return {k:'grey',a,l};
    if(h>=75 && h<=165 && l<0.36) return {k:'pitch',a,l};
    if(h>=75 && h<=165) return {k:'green',a,l};
    if(h>=165 && h<=195) return {k:'teal',a,l};
    if(h>195 && h<=260) return {k:'blue',a,l};
    if(h>=28 && h<75) return {k:'gold',a,l};
    if(h>=345 || h<28) return {k:'red',a,l};
    return {k:'other',a,l};
  }
  const rgba=(c,a)=>`rgba(${c[0]},${c[1]},${c[2]},${(+a).toFixed(3)})`;
  // shapes (fill or stroke of paths/rects)
  function mapShape(c,mode){
    const R=role(c); if(!R) return c;
    const a=R.a;
    switch(R.k){
      case 'pitch': { const L=Math.min(0.975,Math.max(0.925,0.93+(R.l-0.12)*0.22)); const v=Math.round(L*255);
        return a<0.98? rgba([255,255,255],Math.min(.94,a)) : `rgb(${v-3},${v},${v-2})`; }
      case 'white': return mode==='stroke'? rgba(INK,Math.min(.3,0.06+a*0.35)) : (a<0.25? rgba(INK,a*0.5) : rgba([255,255,255],a));
      case 'dark':  return mode==='stroke'? rgba(INK,Math.min(.6,a*0.6)) : rgba([255,255,255],Math.min(.94,a));
      case 'grey':  return R.l>0.6? rgba(INK,a*0.35) : rgba(INK,a*0.6);
      case 'blue':  return rgba(CHAR,a);
      case 'gold':  return mode==='stroke'? rgba(VOID,a) : rgba(CHAR,a);
      case 'green': return rgba(VOID,a);
      case 'teal':  return rgba(OPP,a);
      case 'red':   return mode==='stroke'? rgba(OPP,a) : (a<0.6? rgba(VOID,a*0.55) : rgba(OPP,a));
      default: return rgba(CHAR,a);
    }
  }
  function mapText(c,inside){
    const R=role(c); if(!R) return c;
    if(inside) return inside;            // text on a disc: contrast with the disc
    switch(R.k){
      case 'red': case 'green': return rgba(VOID,Math.max(.85,R.a));
      case 'grey': return rgba(INK,R.l>0.6?0.62:0.8);
      default: return rgba(INK,Math.max(0.75,Math.min(1,R.a+0.2)));
    }
  }
  const D=(n)=>Object.getOwnPropertyDescriptor(P,n);
  const fsD=D('fillStyle'), ssD=D('strokeStyle'), shD=D('shadowColor'), sbD=D('shadowBlur');
  Object.defineProperty(P,'fillStyle',{get(){return this.__fo!==undefined?this.__fo:fsD.get.call(this);},set(v){this.__fo=v;fsD.set.call(this,typeof v==='string'?mapShape(v,'fill'):v);},configurable:true});
  Object.defineProperty(P,'strokeStyle',{get(){return this.__so!==undefined?this.__so:ssD.get.call(this);},set(v){this.__so=v;ssD.set.call(this,typeof v==='string'?mapShape(v,'stroke'):v);},configurable:true});
  Object.defineProperty(P,'shadowColor',{get(){return shD.get.call(this);},set(v){shD.set.call(this,'rgba(0,0,0,0)');},configurable:true});
  Object.defineProperty(P,'shadowBlur',{get(){return sbD.get.call(this);},set(v){sbD.set.call(this,0);},configurable:true});
  const G=CanvasGradient.prototype, oStop=G.addColorStop;
  G.addColorStop=function(o,c){if(typeof c==='string'){const R=role(c);if(R&&R.a>0.5&&R.k!=='white'&&R.k!=='dark')this.__orig=c;}return oStop.call(this,o,mapShape(c,'fill'));};

  // disc tracking so labels drawn on players stay legible
  const oBegin=P.beginPath, oArc=P.arc, oEll=P.ellipse, oFill=P.fill, oFillRect=P.fillRect, oClear=P.clearRect, oText=P.fillText, oStroke=P.stroke;
  P.beginPath=function(){this.__arcs=[];this.__rects=[];return oBegin.apply(this,arguments);};
  const oRect=P.rect, oRR=P.roundRect;
  function pushRect(ctx,x,y,w,h){ if(!ctx.__rects) ctx.__rects=[]; const m=ctx.getTransform(); ctx.__rects.push([Math.abs(w*m.a),Math.abs(h*m.d)]); }
  P.rect=function(x,y,w,h){pushRect(this,x,y,w,h);return oRect.apply(this,arguments);};
  if(oRR) P.roundRect=function(x,y,w,h){pushRect(this,x,y,w,h);return oRR.apply(this,arguments);};
  // small solid label boxes ("pills") → white card with hairline, or red-tinted for warnings
  function pill(ctx,R,wpx,hpx,draw){
    const c=ctx.canvas; if(!R||R.a<0.3||R.k==='pitch'||R.k==='white') return false;
    if(wpx*hpx>0.08*c.width*c.height || hpx>0.2*c.height) return false;
    const fs0=fsD.get.call(ctx), ss0=ssD.get.call(ctx), lw=ctx.lineWidth;
    const warn=(R.k==='red'||R.k==='green');
    fsD.set.call(ctx, warn? rgba(VOID,0.12) : rgba([255,255,255],0.94));
    draw('fill');
    ssD.set.call(ctx, warn? rgba(VOID,0.5) : rgba(INK,0.18)); ctx.lineWidth=1/(ctx.getTransform().a||1);
    draw('stroke');
    fsD.set.call(ctx,fs0); ssD.set.call(ctx,ss0); ctx.lineWidth=lw; return true;
  }
  function pushArc(ctx,x,y,r){ if(!ctx.__arcs) ctx.__arcs=[]; const m=ctx.getTransform(); const pt=m.transformPoint(new DOMPoint(x,y)); ctx.__arcs.push([pt.x,pt.y,r*Math.hypot(m.a,m.b)]); }
  P.arc=function(x,y,r){pushArc(this,x,y,r);return oArc.apply(this,arguments);};
  P.ellipse=function(x,y,rx,ry){pushArc(this,x,y,Math.max(rx,ry));return oEll.apply(this,arguments);};
  P.fill=function(){
    const arcs=this.__arcs||[]; const orig=(this.__fo&&typeof this.__fo==='object'&&this.__fo.__orig)?this.__fo.__orig:this.__fo; const R=typeof orig==='string'?role(orig):null;
    const disc=arcs.length===1 && arcs[0][2]>2.5 && arcs[0][2]<40;
    if(disc && R){
      if(!this.__discs) this.__discs=[];
      const [x,y,r]=arcs[0];
      if(R.k==='red' && R.a>=0.6){ // opponent → hollow disc
        const lw=this.lineWidth, ss=ssD.get.call(this), fs0=fsD.get.call(this);
        fsD.set.call(this,'#ffffff'); const res=oFill.apply(this,arguments);
        ssD.set.call(this,rgba(OPP,R.a)); this.lineWidth=Math.max(1.4,r*0.22); oStroke.call(this);
        this.lineWidth=lw; ssD.set.call(this,ss); fsD.set.call(this,fs0);
        this.__discs.push([x,y,r,'ink']); return res;
      }
      if(R.k==='white' && R.a>0.6){ // ball / white disc → white with ink ring
        const res=oFill.apply(this,arguments); const lw=this.lineWidth, ss=ssD.get.call(this);
        ssD.set.call(this,rgba(INK,.85)); this.lineWidth=Math.max(1,r*0.18); oStroke.call(this); this.lineWidth=lw; ssD.set.call(this,ss);
        this.__discs.push([x,y,r,'ink']); return res;
      }
      if(R.a>0.6){ this.__discs.push([x,y,r,(R.k==='dark')?'ink':'white']); this.__team=[x,y,r]; }
    }
    const rects=this.__rects||[];
    if(!arcs.length && rects.length===1 && R){ const self=this, args=arguments;
      if(pill(this,R,rects[0][0],rects[0][1],m=>m==='fill'?oFill.apply(self,args):oStroke.call(self))) return; }
    return oFill.apply(this,arguments);
  };
  P.stroke=function(){
    const arcs=this.__arcs||[], t=this.__team;
    if(t && arcs.length===1 && Math.abs(arcs[0][0]-t[0])<0.5 && Math.abs(arcs[0][1]-t[1])<0.5 && Math.abs(arcs[0][2]-t[2])<0.5){
      const R=typeof this.__so==='string'?role(this.__so):null;
      if(R && (R.k==='white'||R.k==='dark'||R.k==='grey')) return; // no sheen ring on player discs
    }
    return oStroke.apply(this,arguments);
  };
  // canvas type → the site's faces (labels in JetBrains Mono, text in Inter/Noto Sans KR)
  const fD=D('font');
  Object.defineProperty(P,'font',{get(){return fD.get.call(this);},set(v){
    if(typeof v==='string'){const m=v.match(/^(.*?)(\d*\.?\d+)(px|pt|rem|em)(\/[^\s]+)?\s+(.+)$/);
      if(m){const fam=m[5]; const mono=/mono|courier|monospace/i.test(fam);
        v=`${m[1]}${m[2]}${m[3]}${m[4]||''} ${mono?'"JetBrains Mono",ui-monospace,monospace':'Inter,"Noto Sans KR",sans-serif'}`;}}
    fD.set.call(this,v);},configurable:true});
  function reset(ctx,w,h){ const c=ctx.canvas; if(w*h>=0.6*c.width*c.height/(Math.pow(ctx.getTransform().a||1,2))) ctx.__discs=[]; }
  P.fillRect=function(x,y,w,h){reset(this,Math.abs(w),Math.abs(h));
    const o=this.__fo; if(typeof o==='string'){const m=this.getTransform(); const self=this, args=arguments;
      if(pill(this,role(o),Math.abs(w*m.a),Math.abs(h*m.d),k=>k==='fill'?oFillRect.apply(self,args):self.strokeRect.call(self,x,y,w,h))) return;}
    return oFillRect.apply(this,arguments);};
  P.clearRect=function(x,y,w,h){reset(this,Math.abs(w),Math.abs(h));return oClear.apply(this,arguments);};
  P.fillText=function(t,x,y){
    const orig=this.__fo;
    if(typeof orig!=='string') return oText.apply(this,arguments);
    let inside=null; const ds=this.__discs||[];
    if(ds.length){const m=this.getTransform(); const pt=m.transformPoint(new DOMPoint(x,y));
      for(let i=ds.length-1;i>=0;i--){const d=ds[i]; if(Math.hypot(pt.x-d[0],pt.y-d[1])<=d[2]*1.05){inside=d[3]==='white'?'#ffffff':rgba(INK,.9);break;}}}
    const cur=fsD.get.call(this);
    fsD.set.call(this,mapText(orig,inside));
    const res=oText.apply(this,arguments);
    fsD.set.call(this,cur);
    return res;
  };
})();
