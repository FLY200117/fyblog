export const data = JSON.parse("{\"key\":\"v-8daa1a0e\",\"path\":\"/\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{\"home\":true,\"heroImage\":\"/images/home.jpg\",\"heroImageDark\":\"/images/home2.jpg\",\"heroText\":\"成长指南\",\"tagline\":\"分享技术\",\"features\":[{\"title\":\"简洁开发\",\"details\":\"该文档主要使用Vuepress开发\"},{\"title\":\"享受技术\",\"details\":\"在这里能看到我在程序员道路上的学习与分享，欢迎各位技术大佬相互交流。\"},{\"title\":\"交个朋友\",\"details\":\"爱打篮球和游戏，撸铁和美食也是我的最爱，欢迎各位码友线下🤺\"}],\"footer\":\"WeChat:  yufei200117 | Copyright © 2022-present Evan You\"},\"excerpt\":\"\",\"headers\":[],\"git\":{},\"filePathRelative\":\"README.md\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
