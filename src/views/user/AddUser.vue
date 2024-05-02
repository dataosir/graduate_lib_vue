<template>
    <div id="adduser">
        <MainVue>
            <div class="add">
                <h1>添加学生页面</h1>
                <el-form :inline="true" :model="form" :rules="rules" ref="ruleFormRef" class="form" label-width="200px"
                    center>
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="form.name" placeholder="请输入名称" />
                    </el-form-item>
                    <!-- <el-form-item label="用户名">
                        <el-input v-model="form.username" placeholder="请输入用户名" />
                    </el-form-item> -->
                    <el-form-item label="年龄" prop="age">
                        <el-input v-model.number="form.age" placeholder="请输入年龄" />
                    </el-form-item>
                  <el-form-item label="金额" prop="money">
                    <el-input v-model.number="form.money" placeholder="请输入金额" />
                  </el-form-item>
                    <el-form-item label="学号" prop="stunumber">
                        <el-input v-model.number="form.stunumber" placeholder="请输入学号" />
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                        <el-select v-model="form.sex" placeholder="请选择性别">
                            <el-option label="男" value="男" />
                            <el-option label="女" value="女" />
                        </el-select>
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

export default {
    setup() {
        const form = reactive({
            name: '',
            username: '',
            age: null,
            sex: '',
            stunumber: ''
        })
        const formSize = ref('default')
        const ruleFormRef = ref('')


        const checkAge = (rules, value, callback) => {
            if (!value) {
                callback(new Error("请输入年龄!"))
            } else if (!Number.isInteger(value)) {
                callback(new Error("年龄必须为数字类型!"))
            } else if (value > 0 && value < 150) {
                callback()
            } else {
                callback(new Error("请输入正确的年龄!"))
            }
        }
        const rules = reactive({
            name: [
                { required: true, message: '请输入姓名', trigger: 'blur' },
                { min: 1, max: 15, message: '名称长度在 1 到 15', trigger: 'blur' },
            ],
            age: [
                { required: true, validator: checkAge },
            ],
            stunumber: [
                { required: true, message: '请输入学号', trigger: 'blur' },
                { type: 'number', message: '学号必须为数字', trigger: 'blur' }
            ]
        })

        const onSubmit = () => {
            ruleFormRef.value.validate((valid, fields) => {
                if (valid) {
                    request.post("/user", form)
                        .then(res => {
                            console.log(res)
                            if (res.code === "200") {
                                susses_msg("添加成功")
                                this.form = {}
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
            formSize,
            checkAge,
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