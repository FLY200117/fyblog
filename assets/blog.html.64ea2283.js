import{_ as p,r as i,o as l,c,b as n,d as s,a as e,e as t}from"./app.1281bbb5.js";const o="/fyblog/images/blog/blog.png",r={},u=n("h1",{id:"\u535A\u5BA2\u7F51\u7AD9",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u535A\u5BA2\u7F51\u7AD9","aria-hidden":"true"},"#"),s(" \u535A\u5BA2\u7F51\u7AD9")],-1),d=n("p",null,"\u4E00\u4E2A\u535A\u5BA2\u7F51\u7AD9\u642D\u5EFA\u7684\u6587\u7AE0\uFF1A",-1),v={href:"https://juejin.cn/search?query=%E5%8D%9A%E5%AE%A2%E6%A1%86%E6%9E%B6&type=0",target:"_blank",rel:"noopener noreferrer"},k=n("p",null,"\u7F51\u7AD9\u89E3\u51B3\u5B8C\u540E\uFF0C\u6211\u4EEC\u9700\u8981\u90E8\u7F72\u5230\u670D\u52A1\u5668\u4E0A\uFF0C\u5E02\u9762\u4E0A\u6709\u5F88\u591A\u6210\u719F\u7684\u4E91\u5382\u5546\uFF0C\u4ED6\u4EEC\u90FD\u63D0\u4F9B\u4E86\u4E00\u7CFB\u5217\u5F3A\u5927\u7684\u90E8\u7F72\u80FD\u529B\uFF0C\u7531\u4E8E\u662F\u535A\u5BA2\u7F51\u7AD9\uFF0C\u5982\u679C\u6211\u4EEC\u9009\u62E9\u7684\u662FSSG\u6846\u67B6\uFF0C\u90A3\u4E48\u9700\u8981\u641C\u7D22\u652F\u6301SSG\u7684\u4E91\u5382\u5546\uFF0C\u535A\u5BA2\u6846\u67B6\u4E2D\u4E5F\u6709\u90E8\u7F72\u8BF4\u660E",-1),m=n("h2",{id:"\u6846\u67B6\u9009\u578B",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u6846\u67B6\u9009\u578B","aria-hidden":"true"},"#"),s(" \u6846\u67B6\u9009\u578B")],-1),b={href:"https://v2.vuepress.vuejs.org/zh/",target:"_blank",rel:"noopener noreferrer"},g=t(`<h3 id="\u9879\u76EE\u521B\u5EFA" tabindex="-1"><a class="header-anchor" href="#\u9879\u76EE\u521B\u5EFA" aria-hidden="true">#</a> \u9879\u76EE\u521B\u5EFA</h3><p>\u9996\u5148\uFF0C\u6211\u4EEC\u9700\u8981\u521B\u5EFA\u4E00\u4E2A\u535A\u5BA2\u6587\u4EF6\u5939\uFF0C\u7136\u540E\u521D\u59CB\u5316\u5E76\u521B\u5EFA\u9879\u76EE</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">mkdir</span> vuepress2
<span class="token builtin class-name">cd</span> vuepress2

<span class="token function">git</span> init
<span class="token function">npm</span> init

<span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-D</span> vuepress@next
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>\u5982\u679Cnpm\u5B89\u88C5\u4E0D\u4E86\u7684\uFF0C\u53EF\u4EE5\u4F7F\u7528\u4E0B\u9762\u547D\u4EE4\uFF1A<code>npm install -D vuepress@next --registry=https://registry.npmmirror.com/</code></p></div><p>\u7136\u540E\uFF0C\u9700\u8981\u5728<code>package.json</code>\u4E2D\u6DFB\u52A0\u811A\u672C</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;docs:dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vuepress dev docs&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;docs:build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vuepress build docs&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5C06\u9ED8\u8BA4\u7684\u4E34\u65F6\u76EE\u5F55\u548C\u7F13\u5B58\u76EE\u5F55\u6DFB\u52A0\u5230<code>.gitignore</code>\u6587\u4EF6\u4E2D</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>node_modules
.temp
.cache
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u521B\u5EFA\u4E00\u4E2A\u6587\u4EF6\u5939docs\uFF0C\u91CC\u9762\u521B\u5EFA\u4E00\u4E2A\u65B0\u7684README.md\u6587\u4EF6\uFF0C\u7136\u540E\u8F93\u5165# hello world\uFF0C\u6700\u540E\u8BA9\u6211\u4EEC\u8FD0\u884C\u811A\u672C\u6765\u770B\u770B\u7ED3\u679C\u5982\u4F55\uFF1A<code>npm run docs:dev</code></p><p><img src="`+o+'" alt="blog"></p><p>\u8FD9\u6837\uFF0C\u6211\u4EEC\u7684\u535A\u5BA2\u57FA\u7840\u5C31\u521B\u5EFA\u5B8C\u6210\u4E86</p><h3 id="\u4E30\u5BCC\u9879\u76EE" tabindex="-1"><a class="header-anchor" href="#\u4E30\u5BCC\u9879\u76EE" aria-hidden="true">#</a> \u4E30\u5BCC\u9879\u76EE</h3><p>vuepress\u63D0\u4F9B\u4E86\u8BB8\u591A\u5F3A\u5927\u7684\u529F\u80FD\uFF0C\u4E0B\u9762\u6211\u4EEC\u5C31\u6765\u4F7F\u7528\u5176\u6765\u4E30\u5BCC\u6211\u4EEC\u7684\u9879\u76EE\u3002</p>',13),h=n("code",null,"npmjs",-1),y=n("code",null,"keywords:vuepress-theme",-1),f={href:"https://www.npmjs.com/search?q=keywords:vuepress-theme",target:"_blank",rel:"noopener noreferrer"},_=t(`<p>\u4E0B\u9762\u6211\u4EEC\u793A\u8303\u7684\u662F\u5B98\u7F51\u63D0\u4F9B\u7684\u9ED8\u8BA4\u4E3B\u9898</p><p>\u5728<code>docs</code>\u4E0B\u518D\u65B0\u5EFA\u4E00\u4E2A<code>.vuepress</code>\u6587\u4EF6\u5939\uFF0C\u5728\u91CC\u9762\u653E\u5165\u914D\u7F6E\u6587\u4EF6<code>config.js</code>,\u9879\u76EE\u7684\u7ED3\u6784\u5982\u4E0B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\u251C\u2500 docs
\u2502  \u251C\u2500 .vuepress
\u2502  \u2502  \u2514\u2500 config.js
\u2502  \u2514\u2500 README.md
\u251C\u2500 .gitignoret
\u2514\u2500 package.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5728config\u6587\u4EF6\u4E2D\u914D\u7F6E\u57FA\u7840\u5185\u5BB9</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineUserConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vuepress&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineUserConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">lang</span><span class="token operator">:</span> <span class="token string">&#39;zh-CN&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;\u4F60\u597D\uFF0C VuePress \uFF01&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">description</span><span class="token operator">:</span> <span class="token string">&#39;\u8FD9\u662F\u6211\u7684\u7B2C\u4E00\u4E2A VuePress \u7AD9\u70B9&#39;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u63A5\u4E0B\u6765\u4E30\u5BCC\u4E0B\u6211\u4EEC\u7684\u4E3B\u9875\uFF0C\u4E3B\u9875\u7684\u5185\u5BB9\u662F\u5728README.md\u4E2D\u7684\uFF0C\u6240\u4EE5\u6211\u4EEC\u53EA\u9700\u8981\u66F4\u6539\u8BE5\u6587\u4EF6\u5373\u53EF\uFF0C\u8FD9\u91CC\u4F7F\u7528\u5B98\u7F51\u63A8\u8350\u7684README\u6587\u4EF6</p><div class="language-Frontmatter ext-Frontmatter line-numbers-mode"><pre class="language-Frontmatter"><code>---
home: true
heroImage: /images/home.jpg
heroImageDark: /images/home2.jpg
heroText: \u6210\u957F\u6307\u5357
tagline: \u5206\u4EAB\u6280\u672F
features:
- title: \u7B80\u6D01\u5F00\u53D1
  details: \u8BE5\u6587\u6863\u4E3B\u8981\u4F7F\u7528Vuepress\u5F00\u53D1
- title: \u4EAB\u53D7\u6280\u672F
  details: \u5728\u8FD9\u91CC\u80FD\u770B\u5230\u6211\u5728\u7A0B\u5E8F\u5458\u9053\u8DEF\u4E0A\u7684\u5B66\u4E60\u4E0E\u5206\u4EAB\uFF0C\u6B22\u8FCE\u5404\u4F4D\u6280\u672F\u5927\u4F6C\u76F8\u4E92\u4EA4\u6D41\u3002
- title: \u4EA4\u4E2A\u670B\u53CB
  details: \u7231\u6253\u7BEE\u7403\u548C\u6E38\u620F\uFF0C\u64B8\u94C1\u548C\u7F8E\u98DF\u4E5F\u662F\u6211\u7684\u6700\u7231\uFF0C\u6B22\u8FCE\u5404\u4F4D\u7801\u53CB\u7EBF\u4E0B\u{1F93A}
footer: &quot;WeChat:  yufei200117 | Copyright \xA9 2022-present Evan You&quot;
---
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u91CC\u7684\u56FE\u7247\u8D44\u6E90\u4E3B\u8981\u6765\u6E90\u4E8E.vuepress\u6587\u4EF6\u4E0B\u7684public\u76EE\u5F55\u4E0B\u7684images\u6587\u4EF6\uFF0C\u8FD9\u91CC\u56E0\u4E3A\u5C42\u7EA7\u6709\u70B9\u591A\uFF0C\u6211\u76F4\u63A5\u653E\u4E0A\u76EE\u5F55\u7ED3\u6784</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\u251C\u2500 docs
\u2502  \u251C\u2500 .vuepress
\u2502  \u2502  \u2514\u2500 config.js
\u2502  \u2502  \u2514\u2500 public
\u2502  \u2502  \u2502  \u2514\u2500 images
\u2502  \u2502  \u2502  \u2502  \u2514\u2500 home.jpg
\u2502  \u2514\u2500 README.md
\u251C\u2500 .gitignoret
\u2514\u2500 package.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7136\u540E\u4F7F\u7528\u9ED8\u8BA4\u4E3B\u9898\u914D\u7F6E\u535A\u5BA2\u7684navbar</p><p>\u8FD9\u91CC\u7684link\u662F\u4EE5docs\u4E3A\u6839\u76EE\u5F55\u7684\uFF0C\u6240\u4EE5\u6211\u4EEC\u5728docs\u4E0B\u521B\u5EFA\u4E00\u4E2Apages\u6765\u4F5C\u4E3A\u6587\u7AE0\u7684\u7BA1\u7406\u6587\u4EF6\uFF0C\u5728\u91CC\u9762\u653E\u5165\u4E00\u7BC7test1.md\uFF0C\u7136\u540E\u518D\u5199\u5165# test1d\u7684\u5185\u5BB9\uFF0C\u518D\u5728link\u4E2D\u5199\u5165\u5373\u53EF</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineUserConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">lang</span><span class="token operator">:</span> <span class="token string">&#39;zh-CN&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;\u4F60\u597D\uFF0C VuePress \uFF01&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">description</span><span class="token operator">:</span> <span class="token string">&#39;\u8FD9\u662F\u6211\u7684\u7B2C\u4E00\u4E2A VuePress \u7AD9\u70B9&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">theme</span><span class="token operator">:</span> <span class="token function">defaultTheme</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">navbar</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
              <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;\u4E3B\u9875&#39;</span><span class="token punctuation">,</span>
              <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/&#39;</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
              <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;test1&#39;</span><span class="token punctuation">,</span>
              <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                  <span class="token punctuation">{</span>
                      <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;1&#39;</span><span class="token punctuation">,</span>
                      <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/pages/test1.md&#39;</span>
                  <span class="token punctuation">}</span><span class="token punctuation">,</span>
                  <span class="token punctuation">{</span>
                    <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;2&#39;</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span>
                  <span class="token punctuation">}</span>
              <span class="token punctuation">]</span>
          <span class="token punctuation">}</span>
      <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FDB\u53BB\u4E4B\u540E\uFF0C\u5982\u679C\u6211\u4EEC\u60F3\u8981\u914D\u7F6E\u5DE6\u8FB9\u7684\u4FA7\u8FB9\u680F\uFF0C\u90A3\u53EF\u4EE5\u5728\u4E3B\u9898\u4E2D\u6DFB\u52A0sidebar\u5C5E\u6027\uFF0C\u518D\u5728\u91CC\u9762\u8FDB\u884C\u4E00\u4E2A\u8DEF\u7531\u5173\u8054</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token literal-property property">sidebar</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token string-property property">&#39;/pages/&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
           <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;test1&#39;</span><span class="token punctuation">,</span>
           <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/pages/test1.md&#39;</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5982\u679C\u6211\u4EEC\u60F3\u8981\u5728\u535A\u5BA2\u4E2D\u6DFB\u52A0\u81EA\u5B9A\u4E49\u7EC4\u4EF6\u65F6\uFF0Cmarkdown\u8BED\u6CD5\u4E5F\u80FD\u89E3\u6790vue\u8BED\u6CD5\uFF0C\u8FD9\u662F\u56E0\u4E3A\u6BCF\u4E2Amd\u6587\u4EF6\u9996\u5148\u4F1A\u88AB\u7F16\u8BD1\u4E3Ahtml\uFF0C\u7136\u540E\u8F6C\u6362\u4E3A\u4E00\u4E2AVue\u5355\u6587\u4EF6\u7EC4\u4EF6SFC\uFF0C\u6240\u4EE5\u5199\u5728\u91CC\u9762\u7684vue\u8BED\u6CD5\u662F\u80FD\u88AB\u89E3\u6790\u7684\uFF0C\u6240\u6709\u9664\u4E86script\u548Cstyle\u6807\u7B7E\u5305\u88F9\u7684\u5185\u5BB9\u90FD\u4F1A\u5148\u88AB\u7F16\u8BD1\u4E3AHTML\uFF0C\u7136\u540E\u88AB\u5F53\u4F5Ctemplate\u7684\u5185\u5BB9\uFF0C\u6211\u4EEC\u53EF\u4EE5\u6765\u7F16\u5199\u4E00\u4E2Ademo.md\u6587\u4EF6</p><div class="language-markdown ext-md line-numbers-mode"><pre class="language-markdown"><code><span class="token italic"><span class="token punctuation">_</span><span class="token content">\u4F60\u597D\uFF0C {{ msg }}</span><span class="token punctuation">_</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>RedDiv</span><span class="token punctuation">&gt;</span></span>

<span class="token italic"><span class="token punctuation">_</span><span class="token content">\u5F53\u524D\u8BA1\u6570\u4E3A\uFF1A {{ count }}</span><span class="token punctuation">_</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>RedDiv</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>count++<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\u70B9\u6211\uFF01<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span>
import { h, ref } from &#39;vue&#39;

const RedDiv = (_, ctx) =&gt; h(
  &#39;div&#39;,
  {
    class: &#39;red-div&#39;,
  },
  ctx.slots.default()
)
const msg = &#39;Markdown \u4E2D\u7684 Vue&#39;
const count = ref(0)
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span>
.red-div {
  color: red;
}
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u73B0\u5728\u6211\u4EEC\u5C31\u80FD\u968F\u5FC3\u6240\u6B32\u7684\u914D\u7F6E\u6211\u4EEC\u60F3\u8981\u7684\u535A\u5BA2\u5185\u5BB9\u4E86</p><h2 id="\u670D\u52A1\u5668\u90E8\u7F72" tabindex="-1"><a class="header-anchor" href="#\u670D\u52A1\u5668\u90E8\u7F72" aria-hidden="true">#</a> \u670D\u52A1\u5668\u90E8\u7F72</h2><p>\u670D\u52A1\u7AEF\u90E8\u7F72\u6709\u5F88\u591A\u65B9\u5F0F\uFF0C\u8FD9\u91CC\u9009\u7528\u7684\u662FGithub Pages\uFF0C\u548CGithub Actions</p><p>\u4E0A\u4F20\u9879\u76EE\u524D\uFF0C\u9700\u8981\u66F4\u6539config\u6587\u4EF6\u4E2D\u7684base\u5C5E\u6027\uFF0C\u66F4\u6539\u4E3A<code>&#39;/ \u4F60\u7684\u4ED3\u5E93\u540D /&#39;</code></p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>  <span class="token literal-property property">base</span><span class="token operator">:</span> <span class="token string">&#39;/test/&#39;</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u9996\u5148\u6211\u4EEC\u521B\u5EFA\u4E00\u4E2Agithub\u4ED3\u5E93\uFF0C\u7136\u540E\u4E0A\u4F20\u9879\u76EE\uFF0C\u6CE8\u610F\u914D\u7F6E<code>.gitignore</code>\u6587\u4EF6</p><p>\u7136\u540E\u53BB\u83B7\u53D6\u6211\u4EEC\u7684ACCESS_TOKEN\uFF0C\u70B9\u51FB\u53F3\u4E0A\u89D2\u5934\u50CF\uFF0C\u70B9\u51FBSettings -&gt; Developer settings -&gt; Personal access tokens -&gt; Generate new token\uFF0C\u7136\u540E\u52FE\u9009repo\u540E\u751F\u6210token\uFF0C\u5C06token\u590D\u5236\u4E0B\u6765\uFF0C\u8FDB\u5165Settings -&gt; Secrets -&gt; Actions -&gt; New repository secret\uFF0CNAME\u5C31\u586BACCESS_TOKEN\uFF0Cvalue\u5C31\u586B\u521A\u521A\u751F\u6210\u7684token</p><p>\u70B9\u51FB\u9879\u76EE\u4E2D\u7684Actions\uFF0C\u7136\u540E\u65B0\u5EFA\u4E00\u4E2Aworkflow\uFF0C\u5728\u91CC\u9762\u65B0\u5EFA\u7684workflow\u6587\u4EF6\u4E2D\u586B\u5165\u4EE5\u4E0B\u5185\u5BB9</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> docs

<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token comment"># \u6BCF\u5F53 push \u5230 main \u5206\u652F\u65F6\u89E6\u53D1\u90E8\u7F72</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>main<span class="token punctuation">]</span>
  <span class="token comment"># \u624B\u52A8\u89E6\u53D1\u90E8\u7F72</span>
  <span class="token key atrule">workflow_dispatch</span><span class="token punctuation">:</span>

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">docs</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest

    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v2
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token comment"># \u201C\u6700\u8FD1\u66F4\u65B0\u65F6\u95F4\u201D \u7B49 git \u65E5\u5FD7\u76F8\u5173\u4FE1\u606F\uFF0C\u9700\u8981\u62C9\u53D6\u5168\u90E8\u63D0\u4EA4\u8BB0\u5F55</span>
          <span class="token key atrule">fetch-depth</span><span class="token punctuation">:</span> <span class="token number">0</span>

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Setup Node.js
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v1
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token comment"># \u9009\u62E9\u8981\u4F7F\u7528\u7684 node \u7248\u672C</span>
          <span class="token key atrule">node-version</span><span class="token punctuation">:</span> <span class="token string">&#39;14&#39;</span>


      <span class="token comment"># \u5982\u679C\u7F13\u5B58\u6CA1\u6709\u547D\u4E2D\uFF0C\u5B89\u88C5\u4F9D\u8D56</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Install dependencies
        <span class="token key atrule">run</span><span class="token punctuation">:</span> npm install

      <span class="token comment"># \u8FD0\u884C\u6784\u5EFA\u811A\u672C</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build VuePress site
        <span class="token key atrule">run</span><span class="token punctuation">:</span> npm run docs<span class="token punctuation">:</span>build

      <span class="token comment"># \u67E5\u770B workflow \u7684\u6587\u6863\u6765\u83B7\u53D6\u66F4\u591A\u4FE1\u606F</span>
      <span class="token comment"># @see https://github.com/crazy-max/ghaction-github-pages</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy to GitHub Pages
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> crazy<span class="token punctuation">-</span>max/ghaction<span class="token punctuation">-</span>github<span class="token punctuation">-</span>pages@v2
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token comment"># \u90E8\u7F72\u5230 gh-pages \u5206\u652F</span>
          <span class="token key atrule">target_branch</span><span class="token punctuation">:</span> gh<span class="token punctuation">-</span>pages
          <span class="token comment"># \u90E8\u7F72\u76EE\u5F55\u4E3A VuePress \u7684\u9ED8\u8BA4\u8F93\u51FA\u76EE\u5F55</span>
          <span class="token key atrule">build_dir</span><span class="token punctuation">:</span> docs/.vuepress/dist
        <span class="token key atrule">env</span><span class="token punctuation">:</span>
          <span class="token comment"># @see https://docs.github.com/cn/actions/reference/authentication-in-a-workflow#about-the-github_token-secret</span>
          <span class="token key atrule">GITHUB_TOKEN</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.ACCESS_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6700\u540E\u518D\u56DE\u5230Setting -&gt; pages\u4E2D\uFF0C\u5C06Branch\u4E2D\u7684main\u6362\u6210gh-pages\uFF0C\u7136\u540Esave\u4FDD\u5B58\u4E00\u4E0B\uFF0C\u8FD9\u6837\u6211\u4EEC\u5C31\u53EF\u4EE5\u56DE\u5230Actions\u9875\u9762\u67E5\u770B\u9879\u76EE\u7684\u6784\u5EFA\u60C5\u51B5\uFF0C\u6700\u540E\u90E8\u7F72\u540E\u7684\u8DEF\u5F84\u53EF\u4EE5\u5728pages\u9875\u9762\u4E2D\u67E5\u770B</p>`,26);function x(j,w){const a=i("ExternalLinkIcon");return l(),c("div",null,[u,d,n("p",null,[s("\u642D\u5EFA\u4E00\u4E2A\u535A\u5BA2\uFF0C\u9996\u5148\u5C31\u662F\u8BE5\u7F51\u7AD9\u7684\u5B9A\u4F4D\uFF0C\u5982\u679C\u662FCSR\uFF0C\u90A3\u5C31\u9009\u62E9\u6B63\u5E38\u7684\u524D\u540E\u7AEF\u6846\u67B6\uFF0C\u5982\u679C\u60F3\u8981SSG\u9759\u6001\u751F\u6210\u63D0\u4F9B\u7684\u6027\u80FD\u4E0A\u7684\u4F18\u52BF\uFF0C\u90A3\u53EF\u4EE5\u9009\u62E9\u4E3B\u6D41\u6846\u67B6\u4E0B\u7684\u535A\u5BA2\u6846\u67B6\u6216\u8005\u4E00\u4E9B\u597D\u7528\u7684\u535A\u5BA2\u6846\u67B6\uFF0C\u8FD9\u91CC\u6846\u67B6\u7684\u9009\u578B\u5C31\u4E0D\u4E00\u4E00\u4ECB\u7ECD\u4E86\uFF0C\u5BF9\u81EA\u5DF1\u54EA\u4E2A\u6846\u67B6\u719F\u6089\u5C31\u9009\u54EA\u4E2A\uFF0C\u6216\u8005\u5982\u679C\u4F60\u90FD\u4E0D\u60F3\u7528V\u6216\u8005R\uFF0C\u4E5F\u6709\u4E00\u4E9B\u5F88\u597D\u7528\u7684\u6846\u67B6\uFF0C\u8BF7"),n("a",v,[s("\u81EA\u884C\u641C\u7D22"),e(a)])]),k,m,n("p",null,[s("\u6846\u67B6\u4E0A\u7684\u9009\u578B\uFF0C\u6211\u9009\u62E9\u7684\u662F"),n("a",b,[s("Vuepress2"),e(a)])]),g,n("p",null,[s("vuepress\u7684\u751F\u6001\u5708\u6781\u5176\u5E9E\u5927\uFF0C\u91CC\u9762\u6709\u5404\u79CD\u5404\u6837\u7684\u4E3B\u9898\uFF0C\u5982\u679C\u60F3\u8981\u67E5\u627E\u4ED6\u4EEC\uFF0C\u53EF\u4EE5\u524D\u5F80"),h,s("\u4E2D\u641C\u7D22"),y,s("\uFF0C"),n("a",f,[s("\u94FE\u63A5\u5728\u6B64"),e(a)])]),_])}const S=p(r,[["render",x],["__file","blog.html.vue"]]);export{S as default};
