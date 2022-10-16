<template>
  <ParentLayout>
    <template #page-bottom>
      <CommentService />
    </template>
    <!-- <template #page-content-bottom>
      <PageBottom />
    </template> -->
  </ParentLayout>
</template>
<script>
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import PageBottom from './PageBottom.vue'

export default {
  components: {
    ParentLayout,
    PageBottom
  }
}
</script>

<style lang="css">
.money,.comment{
  text-align: center;
}
</style>