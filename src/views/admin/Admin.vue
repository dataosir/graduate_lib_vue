<template>
    <div>
        <MainVue>
            <div>
                <!-- 搜索表单 -->
                <div class="search">
                    <el-input class="name-input" placeholder="请输入用户名" v-model="params.username"></el-input>
                    <el-input class="id-input" placeholder="请输入邮箱" v-model="params.email"></el-input>
                    <el-button color="rgb(242,230,146)" @click="load">搜索</el-button>
                    <el-button color="rgb(227,182,32)" @click="reset">重置</el-button>
                </div>
                <el-table :data="tableData" stripe>
                    <el-table-column prop="username" label="用户名"></el-table-column>
                    <el-table-column prop="password" label="密码"></el-table-column>
                    <!-- <el-table-column prop="newpassword" label="确认密码"></el-table-column> -->
                    <el-table-column prop="email" label="邮箱"></el-table-column>
                    <el-table-column label="操作">
                        <template #default="scope">
                            <!-- scope.row 当前行数据 -->
                            <el-button color="rgb(242,230,146)"
                                @click="$router.push('/admin/edit?id=' + scope.row.id)">编辑</el-button>
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
                        :current-page="params.pageNum" @update:current-page="handleCurrentChange" />
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
import { ref, onMounted, reactive } from 'vue'
import request from '../../utils/request'
import { susses_msg, error_msg } from '../../utils/message'
export default {
    setup() {
        let tableData = ref([])
        let total = ref(0)
        let params = reactive({
            username: '',
            email: '',
            pageNum: 1,
            pageSize: 10
        })
        function load() {
            request.get('/admin/page', { params })
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
            params.username = ''
            params.email = ''
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

        function del(id) {
            request.delete("admin/delete/" + id).then(res => {
                if (res.code === "200") {
                    susses_msg("删除成功")
                    load()
                } else {
                    error_msg("删除失败" + res.msg)
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