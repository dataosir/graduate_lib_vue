<template>
  <div>
    <MainVue>
      <div>
        <!-- 搜索表单 -->
        <div class="search">
          <el-input class="name-input" placeholder="请输入名称" v-model="params.name"></el-input>
          <el-input class="id-input" placeholder="请输入学号" v-model="params.stunumber"></el-input>
          <el-button color="rgb(242,230,146)" @click="load">搜索</el-button>
          <el-button color="rgb(227,182,32)" @click="reset">重置</el-button>
        </div>
        <el-table :data="tableData" stripe>
          <el-table-column prop="username" label="卡号"></el-table-column>
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="age" label="年龄"></el-table-column>
          <el-table-column prop="stunumber" label="学号"></el-table-column>
          <el-table-column prop="money" label="金额"></el-table-column>
          <el-table-column prop="sex" label="性别"></el-table-column>
          <el-table-column prop="updatetime" label="更新时间"></el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <!-- scope.row 当前行数据 -->
              <el-button color="rgb(242,230,146)"
                         @click="$router.push('/user/edit?id=' + scope.row.id)">编辑
              </el-button>
              <el-popconfirm title="您确定要删除当前管理员吗？" @confirm="del(scope.row.id)">
                <template #reference>
                  <el-button color="red">删除</el-button>
                  <!-- @click="$router.push('/user/delete?id=' + scope.row.id)" -->
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="example-pagination-block pagination">
          <el-pagination layout="prev, pager, next" :total="total" v-model:page-size="params.pageSize"
                         :current-page="params.pageNum" @update:current-page="handleCurrentChange"/>
        </div>
        <!--
            WARNING以上事件不推荐使用（但由于兼容的原因仍然支持，在以后的版本中将会被删除）
            ；如果要监听 current-page 和 page-size 的改变，
            使用 v-model 双向绑定是个更好的选择。
         -->
      </div>
    </MainVue>
  </div>


</template>
<script>

import MainVue from '../../components/Main.vue'
import {ref, onMounted, reactive} from 'vue'
import request from '../../utils/request'
import {ElNotification} from 'element-plus'

export default {
  setup() {
    let tableData = ref([])
    let total = ref(0)
    let params = reactive({
      name: '',
      stunumber: '',
      pageNum: 1,
      pageSize: 10
    })

    function load() {
      request.get('/user/page', {params})
          .then(res => {
            if (res.code === "200") {
              // console.log(res);
              tableData.value = res.data.list
              total.value = res.data.total
            }

          }).catch(() => {
        console.log("出错了");
      })
    }

    function reset() {
      params.name = ''
      params.stunumber = ''
      params.pageNum = 1
      params.pageSize = 10
      load()
    }

    function handleCurrentChange(pageNum) {//分页
      params.pageNum = pageNum
      console.log(params.pageNum);
      load()
    }

    onMounted(() => {
      load()
    })

    function susses_msg() {
      ElNotification({
        title: 'Success',
        message: '删除成功',
        type: 'success',
        duration: 1500,
      })
    }

    function error_msg(msg) {
      ElNotification({
        title: 'warning',
        message: "删除失败,错误:" + msg,
        type: 'warning',
        duration: 1500,
      })
    }

    function del(id) {
      request.delete("user/delete/" + id).then(res => {
        if (res.code === "200") {
          susses_msg()
          load()
        } else {
          error_msg()
        }
      })
    }

    return {
      tableData,
      total,
      params,
      load,
      reset,
      handleCurrentChange,
      del
    }
  },
  components: {
    MainVue
  }
}
</script>
<style scoped>
a:link,
a:visited {
  color: white;
  text-decoration: none;
}

a:hover,
a:active {
  color: white;
}


.name-input {
  width: 240px;
}

.search {
  margin-bottom: 10px;
}

.id-input {
  width: 240px;
  margin: 0 20px;
}

.pagination {
  margin-top: 20px;
}
</style>