<template>
  <a-card style="margin-top: 24px" :bordered="false" title="分类列表">
    <div class="operate">
      <a-button type="dashed" style="width: 100%" icon="plus" @click="$refs.taskForm.add()">添加</a-button>
    </div>

    <a-list size="large">
      <a-list-item :key="index" v-for="(item, index) in classifies">
        <a-list-item-meta :description="item.name"></a-list-item-meta>
        <div slot="actions">
          <a>编辑</a>
        </div>
        <div slot="actions">
          <a-popconfirm
            title="确定删除此分类"
            @confirm="remove(item._id)"
            okText="确定"
            cancelText="取消"
          >
            <a>删除</a>
          </a-popconfirm>

        </div>
        <div class="list-content">
          <div class="list-content-item">
            <span>文章数</span>
            <p>{{ item.articles.length }}</p>
          </div>
        </div>
      </a-list-item>
    </a-list>

    <task-form ref="taskForm" />
  </a-card>
</template>

<script>
import TaskForm from './modules/TaskForm.vue'
import { mapGetters, mapActions } from 'vuex'
import { removeClassify } from '@/api/article'
export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(['classifies'])
  },
  mounted () {

  },
  methods: {
    ...mapActions(['GetClassifies']),
    remove (id) {
      removeClassify(id).then(res => {
        if (res.status === 0) {
          this.$message.success('删除成功')
          this.GetClassifies()
        }
      })
    }
  },
  components: {
    TaskForm
  }
}
</script>

<style lang="less" scoped>
.list-content-item {
  color: rgba(0, 0, 0, 0.45);
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  margin-left: 40px;
  span {
    line-height: 20px;
  }
  p {
    margin-top: 4px;
    margin-bottom: 0;
    line-height: 22px;
  }
}
</style>
