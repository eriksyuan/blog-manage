<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="文章标题">
              <a-input v-model="queryParam.keyword" placeholder />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="分类">
              <a-select v-model="queryParam.classify" placeholder="请选择" default-value="0">
                <a-select-option
                  v-for="(classify,index) in classifies"
                  :key="index"
                  :value="classify._id"
                >{{ classify.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="发布状态">
              <a-select v-model="queryParam.issue" placeholder="请选择" default-value="0">
                <a-select-option value="0">已发布</a-select-option>
                <a-select-option value="1">未发布</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col>
            <span class="table-page-search-submitButtons" style="float:right;overflow:'hidden'">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <s-table
      ref="table"
      size="default"
      rowKey="key"
      :columns="columns"
      :data="loadData"
      showPagination="auto"
    >
      <span slot="issue" slot-scope="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
      </span>
      <template slot="cover" slot-scope="text">
        <template v-if="text!==''">
          <a-popover>
            <template slot="content">
              <img style="width:400px" :src="text" />
            </template>
            <a>图</a>
          </a-popover>
        </template>
      </template>
      <span slot="action" slot-scope="text, record">
        <template>
          <!-- <a @click="handleEdit(record)">编辑</a> -->
          <router-link :to="{name:'EditArticle',params:{id:record._id}}">编辑</router-link>
          <a-divider type="vertical" />
          <template v-if="record.issue!==0">
            <a @click="issue(record,0)">发布</a>
          </template>
          <template v-else>
            <a @click="issue(record,1)">下线</a>
          </template>
          <a-divider type="vertical" />
          <a style="color:red" @click="$refs.remolveA.init(record)">删除</a>
          <a-divider type="vertical" />
          <a-dropdown v-if="filterclassify(record).length>0">
            <a class="ant-dropdown-link" href="#">
              移动到
              <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item
                @click="moveToClassify(record._id,item._id)"
                v-for="(item,index) in filterclassify(record)"
                :key="index"
              >{{ item.name }}</a-menu-item>
            </a-menu>
          </a-dropdown>
        </template>
      </span>
    </s-table>
    <remove-article ref="remolveA" @ok="removea"></remove-article>
  </a-card>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'

import { mapGetters } from 'vuex'
import { getArticles, change } from '@/api/article'
import { getObjFromValue } from '@/utils/util'
import RemoveArticle from './modules/removeArticle'

const statusMap = {
  0: {
    status: 'processing',
    text: '已发布'
  },
  1: {
    status: 'default',
    text: '未发布'
  }
}

export default {
  name: 'TableList',
  components: {
    STable,
    Ellipsis,
    RemoveArticle
  },
  data () {
    return {
      coverEditing: false,
      mdl: {},
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '文章标题',
          dataIndex: 'title',
          width: '100px'
        },
        {
          title: '阅读次数',
          dataIndex: 'readNum'
        },
        {
          title: '点赞次数',
          dataIndex: 'likeNum'
        },
        {
          title: '发布状态',
          dataIndex: 'issue',
          scopedSlots: { customRender: 'issue' }
        },
        {
          title: '分类',
          dataIndex: 'classify',
          customRender: text => getObjFromValue(this.classifies, '_id', text).name
        },

        {
          title: '最后编辑时间',
          dataIndex: 'lastEditTime',
          sorter: true,
          customRender: text => moment(text).format('YYYY-M-D HH:mm:ss')
        },
        {
          title: '主图',
          dataIndex: 'image',
          scopedSlots: { customRender: 'cover' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '250px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getArticles(Object.assign(parameter, this.queryParam)).then(res => {
          return res.data
        })
      }
    }
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    }
  },
  computed: {
    ...mapGetters(['classifies'])
  },
  methods: {
    removea (id) {
      this.$refs.table.refresh(true)
    },
    moveToClassify (id, classify) {
      change({ id, classifyId: classify }).then(res => {
        if (res.status === 0) {
          this.$message.success('移动成功')
          this.$refs.table.refresh(true)
        }
      })
    },
    filterclassify (article) {
      const arr = []
      this.classifies.map(item => {
        if (article.classify !== item._id) {
          arr.push(item)
        }
      })
      return arr
    },
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    },
    issue (record, issue) {
      change({ id: record._id, issue }).then(res => {
        if (res.status === 0) {
          this.$message.success(issue === 0 ? '发布成功' : '下线成功')
          this.$refs.table.refresh(true)
        }
      })
    }
  }
}
</script>
