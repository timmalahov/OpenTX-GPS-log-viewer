(this["webpackJsonpgps-log-web"]=this["webpackJsonpgps-log-web"]||[]).push([[0],{19:function(e,t,n){},20:function(e,t,n){},26:function(e,t,n){"use strict";n.r(t);var r,a=n(0),c=n.n(a),o=n(9),i=n.n(o),l=(n(19),n(20),n(5)),s=n(4),d=n(14),u=n(1),j=function(e){var t=e.onFileLoaded,n=e.minified,r=void 0!==n&&n,c=Object(a.useCallback)((function(e){e.forEach((function(e){var n=new FileReader;n.onabort=function(){return console.log("file reading was aborted")},n.onerror=function(){return console.log("file reading has failed")},n.onload=function(){var e=n.result;t&&t(e)},n.readAsText(e)}))}),[]),o=Object(d.a)({onDrop:c,accept:"text/csv",maxFiles:1}),i=o.getRootProps,l=o.getInputProps,j=(o.isDragActive,o.isDragAccept),b=o.isDragReject;return Object(u.jsxs)("div",Object(s.a)(Object(s.a)({},i()),{},{children:[Object(u.jsx)("input",Object(s.a)({},l())),Object(u.jsx)("div",{className:"dropzone ".concat(j?" accept":""," ").concat(b?" reject":""),children:b?Object(u.jsx)("p",{children:r?"Not allowed":"Unexpected file type. Please make sure you're using .csv files"}):Object(u.jsx)("p",{children:r?"Drop new file here":"Drag'n'drop log file here, or click to select files"})})]}))},b=function(e){for(var t=e.split("\n"),n=[],r=t[0].split(","),a=1;a<t.length;a++){for(var c={},o=t[a].split(","),i=0;i<r.length;i++)c[r[i]]=o[i];n.push(c)}return n},f=n(13),p=n.n(f),h=n(29),S=n(30),g=n(31);n(25);!function(e){e.Date="Date",e.Time="Time",e.FM="FM",e.RSS_one="1RSS(dB)",e.RSS_two="2RSS(dB)",e.RQly="RQly(%)",e.RSNR="RSNR(dB)",e.ANT="ANT",e.RFMD="RFMD",e.TPWR="TPWR(mW)",e.TRSS="TRSS(dB)",e.TQly="TQly(%)",e.TSNR="TSNR(dB)",e.Ptch="Ptch(rad)",e.Roll="Roll(rad)",e.Yaw="Yaw(rad)",e.RxBt="RxBt(V)",e.Curr="Curr(A)",e.Capa="Capa(mAh)",e.Bat_="Bat_(%)",e.GPS="GPS",e.GSpd="GSpd(kmh)",e.Hdg="Hdg(@)",e.Alt="Alt(m)",e.Sats="Sats",e.Rud="Rud",e.Ele="Ele",e.Thr="Thr",e.Ail="Ail",e.SA="SA",e.SB="SB",e.SC="SC",e.SD="SD",e.SE="SE",e.SF="SF",e.LSW="LSW",e.TxBat="TxBat(V)"}(r||(r={}));var m={width:"100%",height:"100%"},O=new p.a;O.setGradient("#004ad4","#00e6ff","#00ff9b","#00d42d","#54ff00","#ffd300","#ff000b");var x=function(e){var t=e.logInfo,n=Object(a.useState)(null),c=Object(l.a)(n,2),o=c[0],i=c[1],s=t.filter((function(e){return!!e.GPS})).map((function(e){return{lat:Number(e.GPS.split(" ")[0]),lng:Number(e.GPS.split(" ")[1])}})),d=t.reduce((function(e,t){return Number(e[r.Alt]||"")>Number(t[r.Alt]||"")?e:t}));O.setMidpoint(Math.floor(.66*Number(d[r.Alt])));return Object(u.jsx)("div",{className:"map-container",children:Object(u.jsxs)(S.a,{center:[51.505,-.09],zoom:13,style:m,whenCreated:i,children:[Object(u.jsx)(g.a,{attribution:'\xa9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),function(e){var n=s.reduce((function(e,t,n,r){return r[n+1]?(e.push({start:t,end:r[n+1]}),e):e}),[]);return null===o||void 0===o||o.panTo([n[0].start.lat,n[0].start.lng]),n.map((function(n,a){var c=Number(e[a+1][r.Alt])>0?e[a+1][r.Alt]:1;return Object(u.jsx)(h.a,{pathOptions:{color:O.getColor(c),stroke:!0},positions:[[n.start.lat,n.start.lng],[n.end.lat,n.end.lng]]},"poly_".concat(t[a].Date).concat(t[a].Time))}))}(t)]})})},v=c.a.memo(x),R=function(e){var t=Object.assign({},e);return Object(u.jsx)("div",{className:"sidebar",children:t.children})},T=c.a.memo(R),N=function(e){Object.assign({},e);var t=Object(a.useState)(null),n=Object(l.a)(t,2),r=n[0],c=n[1],o=Object(a.useCallback)((function(e){var t=b(e);c(t)}),[]);return Object(u.jsx)("div",{className:"container",children:r?Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(v,{logInfo:r}),Object(u.jsx)(T,{children:Object(u.jsx)("div",{className:"dropzone-container minified",children:Object(u.jsx)(j,{onFileLoaded:o,minified:!0})})})]}):Object(u.jsx)("div",{className:"dropzone-container",children:Object(u.jsx)(j,{onFileLoaded:o})})})},A=c.a.memo(N);var F=function(){return Object(u.jsx)("div",{className:"App",children:Object(u.jsx)(A,{})})},B=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,32)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,o=t.getTTFB;n(e),r(e),a(e),c(e),o(e)}))};i.a.render(Object(u.jsx)(c.a.StrictMode,{children:Object(u.jsx)(F,{})}),document.getElementById("root")),B()}},[[26,1,2]]]);
//# sourceMappingURL=main.74e45db1.chunk.js.map