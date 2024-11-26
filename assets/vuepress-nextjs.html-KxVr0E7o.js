import{_ as s,c as a,a as i,o as n}from"./app-CjUQWLON.js";const t={};function r(l,e){return n(),a("div",null,e[0]||(e[0]=[i(`<h2 id="需求背景" tabindex="-1"><a class="header-anchor" href="#需求背景"><span>需求背景</span></a></h2><ul><li><a href="https://github.com/takeseem/takeseem.github.io" target="_blank" rel="noopener noreferrer">博客</a>使用 <a href="https://theme-hope.vuejs.press/zh/" target="_blank" rel="noopener noreferrer">VuePress Theme Hope</a> 构建：<a href="">https://www.takeseem.com/</a></li><li><a href="https://github.com/takeseem/demo-react" target="_blank" rel="noopener noreferrer">demo-react</a> 用 <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">Next.js</a> 开发，希望集成到博客的 /demo-react 路径下：<a href="">https://www.takeseem.com/demo-react/</a></li></ul><h2 id="解决方案" tabindex="-1"><a class="header-anchor" href="#解决方案"><span>解决方案</span></a></h2><ul><li>demo-react 设置 <a href="https://github.com/takeseem/demo-react/blob/main/next.config.ts#L4" target="_blank" rel="noopener noreferrer">next.config.ts</a>：<code>output: &quot;export&quot;, basePath: &quot;/demo-react&quot;,</code> 以便 build 静态化到 /out 目录。</li><li>vuepress 项目 <a href="https://github.com/takeseem/takeseem.github.io/blob/main/src/.vuepress/navbar.ts#L12" target="_blank" rel="noopener noreferrer">navbar.ts</a> 新增 <code>{ text: &quot;Demo React&quot;, link: \`\${hostname}/demo-react\` }</code><ul><li>为什么没有使用相对路径？</li><li>用绝对路径主要是不希望 vue 拦截 <code>/demo-react</code> 路由。我尝试通过 AI 排除这个路由，失败了，主要是现在还不会 vue，先放弃。</li></ul></li><li>vuepress github <a href="https://github.com/takeseem/takeseem.github.io/blob/main/.github/workflows/deploy-docs.yml#L47" target="_blank" rel="noopener noreferrer">workflows</a> 增加流程：下载 demo-react -&gt; 构建项目 &amp; 构建产物移动到 vuepress 中<div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" data-title="yaml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">- </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">demo-react checkout</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  uses</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">actions/checkout@v4</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  with</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    repository</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;takeseem/demo-react&#39;</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    ref</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;main&#39;</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    path</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">demo-react</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">- </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">demo-react build and mv</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  working-directory</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">demo-react</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  run</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">|</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    pnpm i</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    pnpm run build</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    mv out ../src/.vuepress/dist/demo-react</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h2 id="本地测试验证" tabindex="-1"><a class="header-anchor" href="#本地测试验证"><span>本地测试验证</span></a></h2><ul><li>nginx 配置</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>  location / {</span></span>
<span class="line"><span>    # vuepress 站点构建产物：pnpm run docs:build</span></span>
<span class="line"><span>    root /data/workspace/node/takeseem.github.io/src/.vuepress/dist;</span></span>
<span class="line"><span>    autoindex on;</span></span>
<span class="line"><span>    index index.html index.htm;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  # 也可以把产物路径映射到 dist/demo-react</span></span>
<span class="line"><span>  ## ln -sf -T /data/workspace/node/demo-react/out /data/workspace/node/takeseem.github.io/src/.vuepress/dist/demo-react</span></span>
<span class="line"><span>  location /demo-react {</span></span>
<span class="line"><span>    # next.js 项目的构建产物：pnpm run build</span></span>
<span class="line"><span>    alias /data/workspace/node/demo-react/out;</span></span>
<span class="line"><span>    autoindex on;</span></span>
<span class="line"><span>    index index.html index.htm;</span></span>
<span class="line"><span>  }</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>访问验证 <ul><li><a href="">http://localhost:8080/</a></li><li><a href="">http://localhost:8080/demo-react</a></li></ul></li></ul>`,8)]))}const o=s(t,[["render",r],["__file","vuepress-nextjs.html.vue"]]),d=JSON.parse('{"path":"/code/vuepress/vuepress-nextjs.html","title":"VuePress 集成 Next.js 项目","lang":"zh-CN","frontmatter":{"title":"VuePress 集成 Next.js 项目","icon":"fa-brands fa-vuejs","date":"2024-11-26T11:33:57.000Z","category":["vuepress","nextjs"],"tag":["vue","vuepress","nextjs","建站"],"order":10,"star":true,"description":"需求背景 博客使用 VuePress Theme Hope 构建：https://www.takeseem.com/ demo-react 用 Next.js 开发，希望集成到博客的 /demo-react 路径下：https://www.takeseem.com/demo-react/ 解决方案 demo-react 设置 next.config.t...","head":[["meta",{"property":"og:url","content":"https://www.takeseem.com/code/vuepress/vuepress-nextjs.html"}],["meta",{"property":"og:site_name","content":"全球指数"}],["meta",{"property":"og:title","content":"VuePress 集成 Next.js 项目"}],["meta",{"property":"og:description","content":"需求背景 博客使用 VuePress Theme Hope 构建：https://www.takeseem.com/ demo-react 用 Next.js 开发，希望集成到博客的 /demo-react 路径下：https://www.takeseem.com/demo-react/ 解决方案 demo-react 设置 next.config.t..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-11-26T06:41:37.000Z"}],["meta",{"property":"article:tag","content":"vue"}],["meta",{"property":"article:tag","content":"vuepress"}],["meta",{"property":"article:tag","content":"nextjs"}],["meta",{"property":"article:tag","content":"建站"}],["meta",{"property":"article:published_time","content":"2024-11-26T11:33:57.000Z"}],["meta",{"property":"article:modified_time","content":"2024-11-26T06:41:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"VuePress 集成 Next.js 项目\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-11-26T11:33:57.000Z\\",\\"dateModified\\":\\"2024-11-26T06:41:37.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"全球指数\\",\\"url\\":\\"https://www.takeseem.com\\"}]}"]]},"headers":[{"level":2,"title":"需求背景","slug":"需求背景","link":"#需求背景","children":[]},{"level":2,"title":"解决方案","slug":"解决方案","link":"#解决方案","children":[]},{"level":2,"title":"本地测试验证","slug":"本地测试验证","link":"#本地测试验证","children":[]}],"git":{"createdTime":1732603297000,"updatedTime":1732603297000,"contributors":[{"name":"takeseem","email":"takeseem@gmail.com","commits":1}]},"readingTime":{"minutes":1.08,"words":325},"filePathRelative":"code/vuepress/vuepress-nextjs.md","localizedDate":"2024年11月26日","excerpt":"<h2>需求背景</h2>\\n<ul>\\n<li><a href=\\"https://github.com/takeseem/takeseem.github.io\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">博客</a>使用 <a href=\\"https://theme-hope.vuejs.press/zh/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">VuePress Theme Hope</a> 构建：<a href=\\"\\">https://www.takeseem.com/</a></li>\\n<li><a href=\\"https://github.com/takeseem/demo-react\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">demo-react</a> 用 <a href=\\"https://nextjs.org/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Next.js</a> 开发，希望集成到博客的 /demo-react 路径下：<a href=\\"\\">https://www.takeseem.com/demo-react/</a></li>\\n</ul>","autoDesc":true}');export{o as comp,d as data};
