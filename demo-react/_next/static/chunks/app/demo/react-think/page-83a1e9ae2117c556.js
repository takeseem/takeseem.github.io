(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[549],{1798:(e,t,r)=>{Promise.resolve().then(r.bind(r,293))},293:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>h});var c=r(3528),s=r(4691),n=r(7318),a=r(8756),i=r(8239),d=r(7369),l=r(5316);function h(){return(0,c.jsxs)("main",{children:[(0,c.jsx)(g,{}),(0,c.jsx)(u,{})]})}let o=[{category:"Fruits",price:"$1",stocked:!0,name:"Apple"},{category:"Fruits",price:"$1",stocked:!0,name:"Dragonfruit"},{category:"Fruits",price:"$2",stocked:!1,name:"Passionfruit"},{category:"Vegetables",price:"$2",stocked:!0,name:"Spinach"},{category:"Vegetables",price:"$4",stocked:!1,name:"Pumpkin"},{category:"Vegetables",price:"$1",stocked:!0,name:"Peas"}];function u(){let[e,t]=(0,l.useState)(""),[r,s]=(0,l.useState)(!1),n=o.filter(t=>(!e||!!t.name.toLowerCase().includes(e))&&(!r||!!t.stocked));return(0,c.jsxs)("div",{style:{padding:"1rem"},children:[(0,c.jsx)(x,{searchTxt:e,handleSearchTxt:t,onlyStock:r,handleOnlyStock:s}),(0,c.jsx)(m,{products:n})]})}function x(e){let{searchTxt:t,handleSearchTxt:r,onlyStock:s,handleOnlyStock:n}=e;return(0,c.jsxs)("div",{children:[(0,c.jsx)("input",{type:"text",placeholder:"Search...",style:{padding:"0 0.5rem",backgroundColor:"gray"},value:t,onChange:e=>r(e.target.value)}),(0,c.jsx)("br",{}),(0,c.jsxs)("label",{children:[(0,c.jsx)("input",{type:"checkbox",checked:s,onChange:e=>n(e.target.checked)})," ","Only show products in stock"]})]})}function m(e){let{products:t}=e,r={};return t.forEach(e=>{let t=r[e.category];t||(t=[],r[e.category]=t),t.push(e)}),(0,c.jsx)("div",{children:(0,c.jsxs)("table",{children:[(0,c.jsx)("thead",{children:(0,c.jsxs)("tr",{children:[(0,c.jsx)("th",{style:{width:"80%"},children:"Name"}),(0,c.jsx)("th",{children:"Price"})]})}),(0,c.jsx)("tbody",{children:Object.entries(r).map(e=>{let[t,r]=e;return(0,c.jsx)(j,{category:t,products:r},t)})})]})})}function j(e){let{category:t,products:r}=e;return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("tr",{children:(0,c.jsx)("th",{colSpan:2,children:t})}),r.map(e=>(0,c.jsx)(p,{product:e},e.name))]})}function p(e){let{product:t}=e;return(0,c.jsxs)("tr",{children:[(0,c.jsx)("td",{children:(0,c.jsx)("p",{style:t.stocked?{}:{color:"red"},children:t.name})}),(0,c.jsx)("td",{children:t.price})]})}function g(){let e="/app/demo/react-think/page.tsx";return(0,c.jsxs)("div",{className:"p-4",children:[(0,c.jsxs)(d.default,{href:"".concat(s.hd,"/code/fe/react/react-think.html"),target:"_blank",children:[(0,c.jsx)(i.g,{icon:a.GQu,className:"rotate-[15deg]"})," React 哲学"]}),(0,c.jsxs)("div",{className:"p-4 max-w-md",children:["怎样使用 React 构建界面组件？",(0,c.jsx)("div",{children:(0,c.jsxs)(d.default,{href:s.m7+e,target:"_blank",children:[(0,c.jsx)(i.g,{icon:n.Vz1})," ","源码：",(0,c.jsx)("code",{children:e})]})}),(0,c.jsx)("div",{children:(0,c.jsxs)(d.default,{href:s.Jf+e,target:"_blank",children:[(0,c.jsx)(i.g,{icon:n.FyU})," ","Blame"]})}),(0,c.jsx)("div",{children:(0,c.jsxs)(d.default,{href:s.DE+e,target:"_blank",children:[(0,c.jsx)(i.g,{icon:a.Yj9})," ","提交记录"]})})]})]})}},4691:(e,t,r)=>{"use strict";r.d(t,{DE:()=>i,Jf:()=>d,dt:()=>l,dv:()=>n,hd:()=>s,m7:()=>a});var c=r(8756);let s="https://www.takeseem.com",n="https://github.com/takeseem/demo-react",a=n+"/tree/main",i=n+"/commits/main",d=n+"/blame/main",l=[{id:"game-ttt",name:"井字棋游戏",desc:"本项目来自于 React 官方快速入门教程：井字棋游戏。",href:"/demo/game-ttt",icon:c.CYF},{id:"react-think",name:"React 哲学",desc:"本项目来自于 React 官方文档：React 哲学。",href:"/demo/react-think",icon:c.GQu}]}},e=>{var t=t=>e(e.s=t);e.O(0,[203,263,208,27,465,743,358],()=>t(1798)),_N_E=e.O()}]);