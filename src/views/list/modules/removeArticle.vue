<template>
  <a-modal :title="article.title" :visible="visible" @ok="ok" @cancel="cancel">
    <a-form>
      <a-form-item label="请输入你要删除文章的名称以确认">
        <a-input v-model="title"></a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { removeArticle } from '@/api/article'

export default {
  name: 'RemoveArticel',
  data () {
    return {
      article: {},
      visible: false,
      title: ''
    }
  },
  props: {},
  methods: {
    ok () {
      if (this.title === this.article.title) {
        removeArticle({ id: this.article._id }).then((res) => {
          if (res.status === 0) {
            this.$message.success('删除成功')
            this.visible = false
            this.$emit('ok')
          }
        })
      } else {
        this.$message.error('错误，请确认')
        this.visible = false
      }
    },
    cancel () {
      this.visible = false
    },
    init (article) {
      this.title = ''
      this.article = article
      this.visible = true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
