(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[222],{3021:(e,t,a)=>{Promise.resolve().then(a.bind(a,2210))},2210:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>d});var c=a(3528),s=a(5316),r=a(158),n=a.n(r),i=a(4691),l=a(2130);function d(){let[e,t]=(0,s.useState)(Array(9).fill(null)),[a,r]=(0,s.useState)("X"),[d,m]=(0,s.useState)("Next player: ".concat(a)),[p,u]=(0,s.useState)([{id:0,nextPlayer:a,squares:e,status:d}]);return(0,c.jsxs)("main",{children:[(0,c.jsxs)("div",{className:n().main,children:[(0,c.jsxs)("div",{children:[(0,c.jsx)("div",{className:"text-2xl",children:"井字棋游戏"}),(0,c.jsx)("div",{children:d}),(0,c.jsx)(h,{squares:e,handleClick:c=>{let s,n;if(null!==e[c]||x(e))return;let i=e.slice();i[c]=a,t(i),x(i)?(n="Winner: ".concat(a),s=a):(s="X"===a?"O":"X",n="Next player: ".concat(s),r(s)),m(n),u([...p,{id:p.length,player:a,nextPlayer:s,squares:i,status:n}])}})]}),(0,c.jsx)(o,{records:p,onJump:e=>{let a=p[e];t(a.squares),m(a.status),r(a.nextPlayer),u(p.slice(0,e+1))}})]}),(0,c.jsx)(l.J,{project:i.rF})]})}function o(e){let{records:t,onJump:a}=e;return(0,c.jsxs)("div",{children:[(0,c.jsx)("div",{children:"历史记录"}),t.map((e,t)=>{let s=0===t?"Go to game start":"".concat(e.player,": go to move # ").concat(t);return(0,c.jsxs)("div",{children:[t,".",(0,c.jsx)("button",{className:n().historyButton,onClick:()=>a(t),children:s})]},t)})]})}function h(e){let{squares:t,handleClick:a}=e;return(0,c.jsxs)("div",{children:[(0,c.jsxs)("div",{className:n().row,children:[(0,c.jsx)(m,{v:t[0],onClick:()=>a(0)}),(0,c.jsx)(m,{v:t[1],onClick:()=>a(1)}),(0,c.jsx)(m,{v:t[2],onClick:()=>a(2)})]}),(0,c.jsxs)("div",{className:n().row,children:[(0,c.jsx)(m,{v:t[3],onClick:()=>a(3)}),(0,c.jsx)(m,{v:t[4],onClick:()=>a(4)}),(0,c.jsx)(m,{v:t[5],onClick:()=>a(5)})]}),(0,c.jsxs)("div",{className:n().row,children:[(0,c.jsx)(m,{v:t[6],onClick:()=>a(6)}),(0,c.jsx)(m,{v:t[7],onClick:()=>a(7)}),(0,c.jsx)(m,{v:t[8],onClick:()=>a(8)})]})]})}function m(e){let{v:t,onClick:a}=e;return(0,c.jsx)("div",{className:n().square,onClick:a,children:t})}function x(e){let t=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];for(let a=0;a<t.length;a++){let[c,s,r]=t[a];if(e[c]&&e[c]===e[s]&&e[c]===e[r])return e[c]}return null}},4691:(e,t,a)=>{"use strict";a.d(t,{DE:()=>l,Jf:()=>d,Mv:()=>h,RJ:()=>m,RK:()=>x,dt:()=>j,dv:()=>n,m7:()=>i,r7:()=>u,rF:()=>o,zw:()=>p});var c=a(8756),s=a(7318);let r="https://www.takeseem.com",n="https://github.com/takeseem/demo-react",i=n+"/tree/main",l=n+"/commits/main",d=n+"/blame/main",o={id:"game-ttt",name:"井字棋游戏",desc:"本项目来自于 React 官方快速入门教程：井字棋游戏。本教程将引导你逐步实现一个简单的井字棋游戏，并且不需要你对 React 有任何了解。在此过程中你会学习到一些编写 React 程序的基本知识，完全理解它们可以让你对 React 有比较深入的理解。",href:"/demo/game-ttt",icon:c.CYF,pagePath:"/app/demo/game-ttt/page.tsx",link:"https://zh-hans.react.dev/learn/tutorial-tic-tac-toe"},h={id:"react-think",name:"React 哲学",desc:"本项目来自于 React 官方文档：React 哲学。",href:"/demo/react-think",icon:c.GQu,pagePath:"/app/demo/react-think/page.tsx",link:"".concat(r,"/code/fe/react/react-think.html")},m={id:"react-typescript",name:"使用 TypeScript",desc:"TypeScript 是一种向 JavaScript 代码添加类型定义的常用方法，天然支持 JSX。",href:"/demo/react-typescript",icon:c.COT,pagePath:"/app/demo/react-typescript/page.tsx",link:"https://zh-hans.react.dev/learn/typescript"},x={id:"react-jsx",name:"描述 UI",desc:"React 是一个用于构建用户界面（UI）的 JavaScript 库，用户界面由按钮、文本和图像等小单元内容构建而成。React 帮助你把它们组合成可重用、可嵌套的 组件。从 web 端网站到移动端应用，屏幕上的所有内容都可以被分解成组件。在本章节中，你将学习如何创建、定制以及有条件地显示 React 组件。",href:"/demo/react-jsx",icon:s.wgI,pagePath:"/app/demo/react-jsx/page.tsx",link:"".concat(r,"/code/fe/react/react-learn-01-ui.html")},p={id:"react-add-inter",name:"React 交互",desc:"界面上的控件会根据用户的输入而更新。例如，点击按钮切换轮播图的展示。在 React 中，随时间变化的数据被称为状态（state）。你可以向任何组件添加状态，并按需进行更新。在本章节中，你将学习如何编写处理交互的组件，更新它们的状态，并根据时间变化显示不同的效果。",href:"/demo/react-add-inter",icon:c.Z8x,pagePath:"/app/demo/react-add-inter/page.tsx",link:"".concat(r,"/code/fe/react/react-learn-02-add-inter.html")},u={id:"react-state",name:"React 状态管理",desc:"随着你的应用不断变大，更有意识的去关注应用状态如何组织，以及数据如何在组件之间流动会对你很有帮助。冗余或重复的状态往往是缺陷的根源。在本节中，你将学习如何组织好状态，如何保持状态更新逻辑的可维护性，以及如何跨组件共享状态。",href:"/demo/react-state",icon:c.H37,pagePath:"/app/demo/react-state/page.tsx",link:"".concat(r,"/code/fe/react/react-learn-03-state.html")},j=[o,h,m,x,p,u]},2130:(e,t,a)=>{"use strict";a.d(t,{J:()=>d});var c=a(3528),s=a(4691),r=a(7318),n=a(8756),i=a(8239),l=a(7369);function d(e){let{project:t}=e;return(0,c.jsxs)("div",{className:"p-4",children:[(0,c.jsxs)(l.default,{href:t.link,target:"_blank",children:[(0,c.jsx)(i.g,{icon:t.icon,className:"rotate-[15deg]"})," ",t.name]}),(0,c.jsx)("div",{className:"p-4 max-w-md",children:t.desc}),(0,c.jsxs)("div",{children:[(0,c.jsx)("div",{children:(0,c.jsxs)(l.default,{href:s.m7+t.pagePath,target:"_blank",children:[(0,c.jsx)(i.g,{icon:r.Vz1})," ","源码：",(0,c.jsx)("code",{children:t.pagePath})]})}),(0,c.jsx)("div",{children:(0,c.jsxs)(l.default,{href:s.Jf+t.pagePath,target:"_blank",children:[(0,c.jsx)(i.g,{icon:r.FyU})," ","Blame"]})}),(0,c.jsx)("div",{children:(0,c.jsxs)(l.default,{href:s.DE+t.pagePath,target:"_blank",children:[(0,c.jsx)(i.g,{icon:n.Yj9})," ","提交记录"]})})]})]})}},158:e=>{e.exports={main:"game-ttt_main__mFqvu",row:"game-ttt_row__V9XAO",square:"game-ttt_square__NZobo",historyButton:"game-ttt_historyButton__ZgCAQ"}}},e=>{var t=t=>e(e.s=t);e.O(0,[651,263,203,208,27,465,743,358],()=>t(3021)),_N_E=e.O()}]);