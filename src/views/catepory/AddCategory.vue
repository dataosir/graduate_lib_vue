<template>
    <div id="adduser">
        <MainVue>
            <div class="add">
                <h1>添加图书分类页面</h1>
                <el-form :inline="true" :model="form" :rules="rules" ref="ruleFormRef" class="form" label-width="200px"
                    center>
                    <el-form-item label="分类名称" prop="name">
                        <el-input v-model="form.name" placeholder="请输入分类名称" />
                    </el-form-item>
                    <el-form-item label="分类介绍" prop="remark">
                        <el-input v-model="form.remark" placeholder="请输入分类介绍" />
                    </el-form-item>
                </el-form>
                <div class="btn">
                    <el-button color="rgb(242,230,146)" @click="onSubmit">提交</el-button>
                    <!-- <el-button @click="resetForm(ruleFormRef)">Reset</el-button> -->
                    <!-- <el-button color="rgb(227,182,32)" @click="error_msg('弹窗')">弹窗</el-button> -->
                </div>
            </div>
        </MainVue>
    </div>
</template>

<script>

import MainVue from '../../components/Main.vue'
import { ref, reactive } from 'vue'
import request from '../../utils/request'
import { susses_msg, error_msg } from '../../utils/message'
import { useRouter } from 'vue-router'
export default {
    setup() {
        const form = reactive({
            name: '',
            remark: '',
        })
        const ruleFormRef = ref('')
        const router = useRouter()

        const rules = reactive({
            name: [
                { required: true, message: '请输入分类名', trigger: 'blur' },
            ],
        })

        const onSubmit = () => {
            ruleFormRef.value.validate((valid, fields) => {
                if (valid) {
                    request.post("/category", form)
                        .then(res => {
                            console.log(res)
                            if (res.code === "200") {
                                susses_msg("添加成功")
                                router.push('/category/list')
                            } else {
                                error_msg("添加失败,错误:" + res.msg)
                            }
                        })
                    ruleFormRef.value.resetFields()
                } else {
                    console.log('error submit!', fields)
                    return false
                }
            })


        }
        return {
            form,
            rules,
            ruleFormRef,
            onSubmit,
        }
    },
    components: {
        MainVue
    }
}
</script>
<style scoped>
.add {
    padding: 20px;
    background-color: white;
}

h1 {
    text-align: center;
}

.form {
    margin-top: 50px;
    margin-left: 200px;
    width: 70%;
}

.btn {
    text-align: right;
}
</style>