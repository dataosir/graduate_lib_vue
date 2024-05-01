<template>
    <div>
        <MainVue>
            <div>
                <!-- 搜索表单 -->
                <div class="search">
                    <el-input class="name-input" placeholder="请输入借书名称" v-model="params.name"></el-input>
                    <el-input class="name-input" placeholder="请输入学生学号" v-model="params.stunumber"></el-input>
                    <el-input class="name-input" placeholder="请输入学生姓名" v-model="params.stuname"></el-input>
                    <el-button color="rgb(242,230,146)" @click="load">搜索</el-button>
                    <el-button color="rgb(227,182,32)" @click="reset">重置</el-button>
                </div>
                <el-table :data="tableData" row-key="id" default-expand-all stripe>
                    <!-- <el-table-column prop="id" label="编号"></el-table-column> -->
                    <el-table-column prop="name" label="借书名称"></el-table-column>
                    <el-table-column prop="stunumber" label="学生学号"></el-table-column>
                    <el-table-column prop="stuname" label="学生姓名"></el-table-column>
                    <el-table-column prop="price" label="价钱"></el-table-column>
                    <el-table-column prop="author" label="作者"></el-table-column>
                    <el-table-column prop="createtime" label="出版日期"></el-table-column>
                    <el-table-column label="操作" width="400">
                        <template #default="scope">
                            <!-- scope.row 当前行数据 -->

                            <el-button color="rgb(242,230,146)" @click="$router.push('/borrow/edit?id=' + scope.row.id)"
                                disabled>编辑</el-button>
                            <el-popconfirm title="您确定要删除当前借书信息？" @confirm="del(scope.row.id)">
                                <template #reference>
                                    <el-button color="red">删除</el-button>
                                    <!-- @click="$router.push('/user/delete?id=' + scope.row.id)" -->
                                </template>
                            </el-popconfirm>
                            <el-popconfirm title="确定要还书吗？会删除当前数据" @confirm="borrowBook(scope.row)">
                                <template #reference>
                                    <el-button color="#626aef">还书</el-button>
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
            name: '',
            stunumber: '',
            stuname: '',
            pageNum: 1,
            pageSize: 10
        })
        const ruleFormRef = ref('')

        function load() {
            request.get('/borrow/page', { params })
                .then(res => {
                    if (res.code === "200") {
                        // console.log(res);
                        tableData.value = res.data.list
                        // tableData.value.publishDate = res.data.list.publish_date
                        total.value = res.data.total
                    }

                }).catch(() => {
                    console.log("出错了");
                })
        }
        function reset() {
            params.name = ''
            params.stunumber = ''
            params.stuname = ''
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
            request.delete("/borrow/delete/" + id).then(res => {
                if (res.code === "200") {
                    susses_msg("删除成功")
                } else {
                    error_msg("删除失败" + res.msg)
                }
            })

        }
        function borrowBook(row) {
            del(row.id)
            request.put("/book/changeByName/" + row.name).then(res => {
                if (res.code === "200") {
                    load()
                } else {
                    error_msg("修改失败" + res.msg)
                }
            })
        }
        return {
            tableData,
            total,
            params,
            ruleFormRef,
            load,
            reset,
            handleCurrentChange,
            del,
            borrowBook
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
    margin-right: 20px;
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