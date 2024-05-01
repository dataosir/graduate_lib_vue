<template>
    <div id="adduser">
        <MainVue>
            <div class="add">
                <h1>添加管理员页面</h1>
                <el-form :inline="true" :model="form" :rules="rules" ref="ruleFormRef" class="form" label-width="200px"
                    center>
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="form.username" placeholder="请输入名称" />
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="form.password" placeholder="请输入密码" />
                    </el-form-item>
                    <el-form-item label="确认密码" prop="newpassword">
                        <el-input v-model="form.newpassword" placeholder="确认密码" />
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="form.email" placeholder="请输入邮箱" />
                    </el-form-item>
                </el-form>
                <div class="btn">
                    <el-button color="rgb(30,30,30)" @click="onSubmit">提交</el-button>
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
            username: '',
            password: null,
            newpassword: '',
            email: ''
        })
        const ruleFormRef = ref('')
        const router = useRouter()

        const checknewpassword = (rules, value, callback) => {
            if (!value) {
                callback(new Error("请输入确认密码!"))
            } else if (value != form.password) {
                callback(new Error("两次密码不相同!"))
            } else {
                callback()
            }
        }
        const rules = reactive({
            username: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
                { min: 1, max: 30, message: '用户名长度在 1 到 30', trigger: 'blur' },
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 1, max: 30, message: '密码长度在 1 到 30', trigger: 'blur' },
            ],
            email: [
                { required: true, message: '请输入邮箱', trigger: 'blur' },
                { min: 1, max: 30, message: '邮箱长度在 1 到 30', trigger: 'blur' },
            ],
            newpassword: [{ required: true, validator: checknewpassword }]
        })

        const onSubmit = () => {
            ruleFormRef.value.validate((valid, fields) => {
                if (valid) {
                    console.log('submit!')
                    ruleFormRef.value.resetFields()
                } else {
                    console.log('error submit!', fields)
                    return false
                }
            })

            request.post("/admin", form)
                .then(res => {
                    console.log(res)
                    if (res.code === "200") {
                        susses_msg("添加成功")
                        router.push('/admin/list')
                    } else {
                        error_msg("添加失败,错误:" + res.msg)
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