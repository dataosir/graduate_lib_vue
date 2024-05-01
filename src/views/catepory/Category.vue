<template>
    <div>
        <MainVue>
            <div>
                <!-- 搜索表单 -->
                <div class="search">
                    <el-input class="name-input" placeholder="请输入分类名称" v-model="params.name"></el-input>
                    <el-button color="rgb(242,230,146)" @click="load">搜索</el-button>
                    <el-button color="rgb(227,182,32)" @click="reset">重置</el-button>
                </div>
                <el-table :data="tableData" row-key="id" default-expand-all stripe>
                    <el-table-column prop="id" label="编号"></el-table-column>
                    <el-table-column prop="name" label="名称"></el-table-column>
                    <el-table-column prop="remark" label="备注"></el-table-column>
                    <el-table-column label="操作">
                        <template #default="scope">
                            <!-- scope.row 当前行数据 -->

                            <el-button color="rgb(242,230,146)"
                                @click="$router.push('/category/edit?id=' + scope.row.id)">编辑</el-button>
                            <el-popconfirm title="您确定要删除当前分类吗？" @confirm="del(scope.row.id)">
                                <template #reference>
                                    <el-button color="red">删除</el-button>
                                    <!-- @click="$router.push('/user/delete?id=' + scope.row.id)" -->
                                </template>
                            </el-popconfirm>
                            <el-button color="#40485b" @click="handelAdd(scope.row)"
                                v-if="!scope.row.pid">添加二级分类</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <div class="example-pagination-block pagination">
                    <el-pagination layout="prev, pager, next" :total="total" v-model:page-size="params.pageSize"
                        :current-page="params.pageNum" @update:current-page="handleCurrentChange" />
                </div>
                <el-dialog title="添加二级分类" v-model="dialogFormVisible" width="40%">
                    <el-form :model="form" label-width="100px" ref="ruleFormRef" :rules="rules" style="width: 85%">
                        <el-form-item label="分类名称" prop="name">
                            <el-input v-model="form.name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="分类备注" prop="remark">
                            <el-input v-model="form.remark" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">关 闭</el-button>
                        <el-button color="#40485b" @click="onSubmit">确 定</el-button>
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
            pageNum: 1,
            pageSize: 10
        })
        const ruleFormRef = ref('')
        let rules = {
            name: [
                { required: true, message: '请输入分类名称', trigger: 'blur' }
            ]
        }
        let form = reactive({
            name: '',
            remark: '',
            pid: ''
        })
        let pid = ref(null)
        let dialogFormVisible = ref(false)
        function handelAdd(row) {
            pid.value = row.id
            dialogFormVisible.value = true
            console.log(dialogFormVisible.value);
        }
        const onSubmit = () => {
            ruleFormRef.value.validate((valid, fields) => {
                if (valid) {
                    console.log('submit!')
                    form.pid = pid.value
                    request.post("/category", form)
                        .then(res => {
                            console.log(res)
                            if (res.code === "200") {
                                susses_msg("二级分类添加成功")
                            } else {
                                error_msg("添加失败,错误:" + res.msg)
                            }
                        })
                    load()
                    ruleFormRef.value.resetFields()
                } else {
                    console.log('error submit!', fields)
                    return false
                }
            })


        }
        function load() {
            request.get('/category/page', { params })
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
            request.delete("/category/delete/" + id).then(res => {
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
            form,
            rules,
            ruleFormRef,
            dialogFormVisible,
            load,
            reset,
            handleCurrentChange,
            del,
            onSubmit,
            handelAdd
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