<template>
    <div id="login">
        <div class="loginview">
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="from">
                <div class="title">登录</div>
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="请输入用户名" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="ruleForm.password" show-password placeholder="请输入密码" />
                </el-form-item>
                <el-form-item>
                    <el-button class="submit" color="rgb(249 0 0 / 51%)" @click="onSubmit">登录</el-button>
                    <el-button class="reset" color="#ffe852" @click="ruleFormRef.resetFields()"
                        style="margin-left: 200px;">清空</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import request from '../../utils/request'
import { reactive, ref } from 'vue'
import { susses_msg, error_msg } from '../../utils/message'
import Cookies from 'js-cookie'

const ruleForm = reactive({
    username: '',
    password: ''
})
const rules = reactive({
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

let ruleFormRef = ref('')

const router = useRouter()
const onSubmit = () => {
    ruleFormRef.value.validate((valid, fields) => {
        if (valid) {
            request.post('admin/login', ruleForm).then(res => {
                if (res.code === '200') {
                    susses_msg("登录成功")
                    router.push('/home')
                    if (res.data !== null) {
                        Cookies.set('admin', JSON.stringify(res.data))
                    }
                } else {
                    error_msg("登录失败" + res.msg)
                }
            })
        } else {
            // error_msg("用户名或密码不能为空")
            console.log('error submit!', fields)
            return false
        }
    })

}

</script>

<style scoped>
#login {
    width: 100vw;
    height: 100vh;
    background-color: rgb(226, 86, 86);
}

.loginview {
    width: 500px;
    height: 350px;
    background-color: white;
    border-radius: 10px;
    transform: translateY(150px);
    margin: auto;
    padding: 50px;
}

.title {
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    color: brown;
    margin-bottom: 20px;
}

.submit {
    width: 25%;
}

.reset {
    width: 25%;
    margin-left: 100px;
}
</style>