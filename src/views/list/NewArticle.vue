<template>
  <div>
    <a-spin :spinning="spinning" tip="Loading...">
      <a-form >
        <a-row justify="space-around" type="flex">
          <a-col :span="6">
            <a-form-item label="文章标题">
              <a-input v-model="title" placeholder />
            </a-form-item>
          </a-col>
          <a-col :span="2" >
            <a-form-item label="分类">
              <a-select placeholder="请选择" v-model="classify">
                <a-select-option
                  v-for="(item,index) in classifies"
                  :key="index"
                  :value="item._id"
                >{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="主图线上地址">
              <a-input v-model="imgUrl" placeholder />
              <a-popover v-if="imgUrl!==''">
                <template slot="content">
                  <img style="width:400px" :src="imgUrl" />
                </template>
                <a>查看</a>
              </a-popover>
            </a-form-item>
          </a-col>
          <a-col :span="3">
            <a-form-item label="上传本地图片">
              <a-upload
                name="file"
                action="/api/serve/upload"
                :remove="removeImg"
                @change="handleChange"
              >
                <a-button>
                  <a-icon type="upload" />Click to Upload
                </a-button>
              </a-upload>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-form-item label="描述">
            <a-textarea placeholder="Basic usage" v-model="description" />
          </a-form-item>
        </a-row>
        <a-col :md=" 24" :sm="24">
          <span
            class="table-page-search-submitButtons"
            :style="{ float: 'right', overflow: 'hidden' } "
          >
            <a-button type="primary" @click="saveArticle(0)">发布</a-button>
            <a-button style="margin-left: 8px" @click="saveArticle(1)">保存</a-button>
            <a-button style="margin-left: 8px">预览</a-button>
          </span>
        </a-col>
      </a-form>
      <mavon-editor
        ref="md"
        @imgAdd="articleImgAdd"
        :toolbars="toolbars"
        v-model="handbook"
        style="max-height: 100vh"
      ></mavon-editor>
    </a-spin>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import { PageView } from '@/layouts'

import { creatNewArticle, getClassifies } from '@/api/article'
import { upload, remove } from '@/api/upload'
import { mapGetters } from 'vuex'
import 'mavon-editor/dist/css/index.css'
export default {
  data () {
    return {
      title: '新建文章',
      classify: '请选择分类',
      description: '',
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: false, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: false, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      },
      handbook: '# 标题',
      spinning: false,
      id: '',
      imgUrl: ''
    }
  },
  computed: {
    ...mapGetters(['classifies'])
  },
  mounted () {

  },
  watch: {

  },
  methods: {
    getclassfies () {
      getClassifies().then(res => {
        if (res.status === 0) {
          this.classifies = res.data.classifyList
        }
      })
    },
    saveArticle (issue) {
      if (this.classify === '请选择分类') {
        this.$message.info('请先选择分类')
        return
      }
      this.spinning = true
      creatNewArticle({
        id: this.id,
        classifyId: this.classify,
        title: this.title,
        content: this.handbook,
        image: this.imgUrl,
        description: this.description,
        issue
      }).then(res => {
        this.spinning = false
        if (res.status === 0) {
          this.id = res.data._id
          this.$message.success(issue === 0 ? '发布' : '保存' + '成功')
        }
      })
    },
    articleImgAdd (pos, file) {
      var formdata = new FormData()
      formdata.append('file', file)
      upload(formdata).then(res => {
        this.$refs.md.$img2Url(pos, res.data.file)
      })
    },
    removeImg (f) {
      const filename = this.imgUrl.split('/').pop()
      remove({ filename }).then(res => {
        if (res.status === 0) {
          this.imgUrl = ''
        }
      })
    },
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.spinning = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        this.imgUrl = info.file.response.data.file
        this.spinning = false
      }
    }
  },
  components: {
    mavonEditor,
    PageView

  }
}
</script>

<style lang="less" scope>
.v-note-wrapper {
  z-index: 300 !important;
}
</style>
