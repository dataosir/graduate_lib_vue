<template>
    <div>
        <MainVue>
            <div>
                <!-- 搜索表单 -->
                <div class="search">
                    <el-input class="name-input" placeholder="请输入图书名称" v-model="params.name"></el-input>
                    <el-input class="name-input" placeholder="请输入作者" v-model="params.author"></el-input>
                    <el-input class="name-input" placeholder="请输入分类" v-model="params.category"></el-input>
                    <el-button color="rgb(242,230,146)" @click="load">搜索</el-button>
                    <el-button color="rgb(227,182,32)" @click="reset">重置</el-button>
                </div>
                <el-table :data="tableData" row-key="id" default-expand-all stripe>
                    <!-- <el-table-column prop="id" label="编号"></el-table-column> -->
                    <el-table-column prop="name" label="名称"></el-table-column>
                    <el-table-column prop="description" label="描述" width="250"></el-table-column>
                    <el-table-column prop="publishDate" label="出版日期"></el-table-column>
                    <el-table-column prop="price" label="价钱" width="100"></el-table-column>
                    <el-table-column prop="author" label="作者"></el-table-column>
                    <el-table-column prop="category" label="分类"></el-table-column>
                    <el-table-column label="状态" width="150">
                        <template #default="scope">
                            <el-button color="#626aef" v-if="scope.row.status === 1" round disabled>已借出</el-button>
                            <el-button color="rgb(103,194,58)" v-if="scope.row.status === 0" round
                                disabled>未借出</el-button>
                            <!-- <el-switch v-model="scope.row.status"
                                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" active-value=0
                                inactive-value=1 disabled /> -->
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" width="300px">
                        <template #default="scope">
                            <!-- scope.row 当前行数据 -->
                            <el-button color="rgb(242,230,146)"
                                @click="$router.push('/book/edit?id=' + scope.row.id)">编辑</el-button>
                            <el-popconfirm title="您确定要删除当前书籍吗？" @confirm="del(scope.row)">
                                <template #reference>
                                    <el-button color="red">删除</el-button>
                                </template>
                            </el-popconfirm>
                            <el-button type="info" v-if="scope.row.status === 0"
                                @click="handelBorrow(scope.row)">借书</el-button>
                            <el-button v-if="scope.row.status === 1" type="info" disabled>还书</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <div class="example-pagination-block pagination">
                    <el-pagination layout="prev, pager, next" :total="total" v-model:page-size="params.pageSize"
                        :current-page="params.pageNum" @update:current-page="handleCurrentChange" />
                </div>
                <el-dialog title="添加借书信息" v-model="dialogFormVisible" width="40%">
                    <el-form :model="form" label-width="120px" ref="ruleFormRef" :rules="rules" style="width: 85%">
                        <el-form-item label="借书学生姓名" prop="stuname">
                            <el-input v-model="form.stuname" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="借书学生学号" prop="stunumber">
                            <el-input v-model="form.stunumber" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">关 闭</el-button>
                        <el-button color="#40485b" @click="borrowSubmit">确 定</el-button>
                    </div>
                </el-dialog>
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
            author: '',
            category: '',
            pageNum: 1,
            pageSize: 10
        })
        const ruleFormRef = ref('')
        let rules = {
            stuname: [
                { required: true, message: '请输入学生姓名', trigger: 'blur' }
            ],
            stunumber: [
                { required: true, message: '请输入分学生学号', trigger: 'blur' }
            ]
        }
        let form = reactive({
            name: '',
            author: '',
            stuname: '',
            stunumber: '',
            price: null,
        })
        let dialogFormVisible = ref(false)
        function load() {
            request.get('/book/page', { params })
                .then(res => {
                    if (res.code === "200") {
                        tableData.value = res.data.list
                        total.value = res.data.total
                    }

                }).catch(() => {
                    console.log("出错了");
                })
        }
        function reset() {
            params.name = ''
            params.author = ''
            params.category = ''
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
        let borrowId;
        let borrowInfo = reactive({
            stuname: '',
            stunumber: ''
        })
        function handelBorrow(row) {
            dialogFormVisible.value = true
            console.log(dialogFormVisible.value);

            borrowId = row.id;

            form.name = row.name
            form.author = row.author
            form.price = row.price

        }

        const borrowSubmit = () => {//提交借书信息
            ruleFormRef.value.validate((valid, fields) => {
                if (valid) {
                    borrowInfo.stuname = form.stuname
                    borrowInfo.stunumber = form.stunumber
                    console.log(borrowInfo);
                    request.post('/user/borrow', borrowInfo)
                        .then(res => {
                            if (res.code === "200") {
                                request.put("/book/change/" + borrowId).then(res => {
                                    if (res.code === "200") {
                                        load()
                                    } else {
                                        error_msg("修改失败" + res.msg)
                                    }
                                })
                                request.post("/borrow", form)
                                    .then(res => {
                                        if (res.code === "200") {
                                            susses_msg("添加成功")
                                        } else {
                                            error_msg("添加失败,错误:" + res.msg)
                                        }
                                    })
                                ruleFormRef.value.resetFields()
                            } else {
                                error_msg("修改失败" + res.msg)
                            }

                        }).catch(() => {
                            console.log("出错了");
                        })


                } else {
                    console.log('error submit!', fields)
                    return false
                }
            })
        }
        function del(row) {
            request.delete("/book/delete/" + row.id).then(res => {
                if (res.code === "200") {
                    susses_msg("删除成功")
                    load()
                } else {
                    error_msg("删除失败" + res.msg)
                }
            })
            if (row.status === 1)
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
            rules,
            ruleFormRef,
            dialogFormVisible,
            form,
            borrowSubmit,
            load,
            reset,
            handleCurrentChange,
            del,
            handelBorrow,
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