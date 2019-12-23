<template>
  <a-modal :width="640" :visible="visible" title="任务添加" @ok="handleSubmit" @cancel="visible = false">
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item
        label="分类名称"
      >
        <a-input v-decorator="['classifyName', {rules:[{required: true, message: '请输入分类名称'}]}]" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { mapActions } from 'vuex'
import { creatNewClassify } from '@/api/article'
export default {
  name: 'TaskForm',
  data () {
    return {
      visible: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    ...mapActions(['GetClassifies']),
    add () {
      this.visible = true
    },
    edit (record) {
      const { form: { setFieldsValue } } = this
      this.visible = true
      this.$nextTick(() => {
        setFieldsValue({ taskName: 'test' })
      })
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.visible = true
      validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          creatNewClassify(
            values.classifyName
          ).then(res => {
            this.visible = false
            if (res.status === 0) {
              this.GetClassifies().then()
            }
          })
        }
      })
    }
  }
}
</script>
