import{_ as r,c as a,a as s,b as e,e as t,d as n,f as o,r as d,o as m}from"./app-DllDb-Cu.js";const p="/assets/ssl-cert-verify-CX_hP0c8.png",u={};function S(c,l){const i=d("font");return m(),a("div",null,[l[14]||(l[14]=s('<h2 id="基本概念" tabindex="-1"><a class="header-anchor" href="#基本概念"><span>基本概念</span></a></h2><ul><li>私钥：私密部分 <ul><li>解密公钥加密的数据</li><li>数字签名：私钥对数据生成此数据的数字签名摘要信息</li></ul></li><li>公钥：公开部分 <ul><li>公钥加密数据，只有私钥才能解</li><li>数字签名：验证使用私钥签名的数据</li></ul></li><li>证书：由证书颁发机构 CA 签发的电子文档，包含公钥和身份信息（CN，DN，SAN）</li><li>证书颁发机构 CA：受信的第三方，负责验证和签发证书</li><li>证书链：指实体证书经过中间证书最终到根证书的一系列证书。这样可以通过证书链可追溯到一个受信任的根证书，从而验证证书的真实性。</li></ul><h2 id="怎样验证证书是否与服务器匹配" tabindex="-1"><a class="header-anchor" href="#怎样验证证书是否与服务器匹配"><span>怎样验证证书是否与服务器匹配？</span></a></h2><ul><li>主要是检查证书中的主机名与客户端请求的服务器地址是否一致</li><li>旧的证书格式中，通常是用 CN 进行匹配</li><li>SAN (Subject Alternative Name) 现代证书允许配置多个域名或IP匹配规则 <ul><li>完全匹配，通配符匹配（*只匹配本级，不能跨级匹配），部分匹配</li></ul></li></ul><h2 id="san-通配符" tabindex="-1"><a class="header-anchor" href="#san-通配符"><span>SAN 通配符</span></a></h2>',5)),e("ul",null,[e("li",null,[l[1]||(l[1]=t("通配符 ")),l[2]||(l[2]=e("code",null,"*",-1)),l[3]||(l[3]=t(" 只能在域名的 ")),n(i,{color:"red"},{default:o(()=>l[0]||(l[0]=[t("左侧")])),_:1})]),e("li",null,[l[9]||(l[9]=t("只能是")),n(i,{color:"red"},{default:o(()=>l[4]||(l[4]=[t("子域名")])),_:1}),l[10]||(l[10]=t("，不能用于")),n(i,{color:"red"},{default:o(()=>l[5]||(l[5]=[t("顶级域名")])),_:1}),l[11]||(l[11]=t("，如：*.com 或 *.example.com 都是无效的 ")),e("ul",null,[e("li",null,[l[7]||(l[7]=t("所以")),n(i,{color:"red"},{default:o(()=>l[6]||(l[6]=[t("通配证书SAN")])),_:1}),l[8]||(l[8]=t("必须同时配置：*.example.com,example.com，因 example.com 是顶级域名"))])])]),l[12]||(l[12]=e("li",null,[e("strong",null,"单层通配："),e("code",null,"*.example.com"),t(" 可匹配 "),e("code",null,"sub.example.com"),t("，但不能匹配 "),e("code",null,"sub.sub.example.com"),t("，因只能代替一个子域名层次。")],-1)),l[13]||(l[13]=e("li",null,[t("不支持多层通配：如 "),e("code",null,"*.*.example.com")],-1))]),l[15]||(l[15]=e("h2",{id:"ssl-tls-认证过程",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#ssl-tls-认证过程"},[e("span",null,"SSL/TLS 认证过程")])],-1)),l[16]||(l[16]=e("figure",null,[e("img",{src:p,alt:"cert verify",tabindex:"0",loading:"lazy"}),e("figcaption",null,"cert verify")],-1))])}const g=r(u,[["render",S],["__file","ssl.html.vue"]]),N=JSON.parse('{"path":"/code/net/ssl.html","title":"SSL/TLS 加密","lang":"zh-CN","frontmatter":{"title":"SSL/TLS 加密","icon":"fa-brands fa-expeditedssl","date":"2024-11-13T11:26:57.000Z","category":["架构","网络"],"tag":["架构","网络","SSL"],"order":10,"star":true,"description":"基本概念 私钥：私密部分 解密公钥加密的数据 数字签名：私钥对数据生成此数据的数字签名摘要信息 公钥：公开部分 公钥加密数据，只有私钥才能解 数字签名：验证使用私钥签名的数据 证书：由证书颁发机构 CA 签发的电子文档，包含公钥和身份信息（CN，DN，SAN） 证书颁发机构 CA：受信的第三方，负责验证和签发证书 证书链：指实体证书经过中间证书最终到根...","head":[["meta",{"property":"og:url","content":"https://www.takeseem.com/code/net/ssl.html"}],["meta",{"property":"og:site_name","content":"全球指数"}],["meta",{"property":"og:title","content":"SSL/TLS 加密"}],["meta",{"property":"og:description","content":"基本概念 私钥：私密部分 解密公钥加密的数据 数字签名：私钥对数据生成此数据的数字签名摘要信息 公钥：公开部分 公钥加密数据，只有私钥才能解 数字签名：验证使用私钥签名的数据 证书：由证书颁发机构 CA 签发的电子文档，包含公钥和身份信息（CN，DN，SAN） 证书颁发机构 CA：受信的第三方，负责验证和签发证书 证书链：指实体证书经过中间证书最终到根..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-11-16T12:14:26.000Z"}],["meta",{"property":"article:tag","content":"架构"}],["meta",{"property":"article:tag","content":"网络"}],["meta",{"property":"article:tag","content":"SSL"}],["meta",{"property":"article:published_time","content":"2024-11-13T11:26:57.000Z"}],["meta",{"property":"article:modified_time","content":"2024-11-16T12:14:26.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"SSL/TLS 加密\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-11-13T11:26:57.000Z\\",\\"dateModified\\":\\"2024-11-16T12:14:26.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"全球指数\\",\\"url\\":\\"https://www.takeseem.com\\"}]}"]]},"headers":[{"level":2,"title":"基本概念","slug":"基本概念","link":"#基本概念","children":[]},{"level":2,"title":"怎样验证证书是否与服务器匹配？","slug":"怎样验证证书是否与服务器匹配","link":"#怎样验证证书是否与服务器匹配","children":[]},{"level":2,"title":"SAN 通配符","slug":"san-通配符","link":"#san-通配符","children":[]},{"level":2,"title":"SSL/TLS 认证过程","slug":"ssl-tls-认证过程","link":"#ssl-tls-认证过程","children":[]}],"git":{"createdTime":1731483454000,"updatedTime":1731759266000,"contributors":[{"name":"takeseem","email":"takeseem@gmail.com","commits":1}]},"readingTime":{"minutes":1.48,"words":443},"filePathRelative":"code/net/ssl.md","localizedDate":"2024年11月13日","excerpt":"<h2>基本概念</h2>\\n<ul>\\n<li>私钥：私密部分\\n<ul>\\n<li>解密公钥加密的数据</li>\\n<li>数字签名：私钥对数据生成此数据的数字签名摘要信息</li>\\n</ul>\\n</li>\\n<li>公钥：公开部分\\n<ul>\\n<li>公钥加密数据，只有私钥才能解</li>\\n<li>数字签名：验证使用私钥签名的数据</li>\\n</ul>\\n</li>\\n<li>证书：由证书颁发机构 CA 签发的电子文档，包含公钥和身份信息（CN，DN，SAN）</li>\\n<li>证书颁发机构 CA：受信的第三方，负责验证和签发证书</li>\\n<li>证书链：指实体证书经过中间证书最终到根证书的一系列证书。这样可以通过证书链可追溯到一个受信任的根证书，从而验证证书的真实性。</li>\\n</ul>","autoDesc":true}');export{g as comp,N as data};