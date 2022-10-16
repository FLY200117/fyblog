export const data = JSON.parse("{\"key\":\"v-9a72cfbc\",\"path\":\"/list.html\",\"title\":\"文章列表\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"文章列表\",\"layout\":\"List\"},\"excerpt\":\"\",\"headers\":[],\"git\":{},\"filePathRelative\":\"list.md\"}")

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
