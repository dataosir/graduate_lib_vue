<template>
    <div>
        <MainVue>
            <div class="add">
                <h1>修改管理员信息页面</h1>
                <el-form :inline="true" :model="form" class="form" label-width="200px" center>
                    <el-form-item label="用户名">
                        <el-input v-model="form.username" placeholder="请输入用户名" />
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="form.password" placeholder="请输入密码" />
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="form.email" placeholder="请输入邮箱" />
                    </el-form-item>
                </el-form>
                <div class="btn">
                    <el-button color="rgb(30,30,30)" @click="onSubmit">提交</el-button>
                    <el-button color="rgb(227,182,32)" @click="$router.push('/use。r/list')">返回</el-button>
                    <!-- <el-button color="rgb(227,182,32)" @click="error_msg()">弹窗</el-button> -->
                </div>
            </div>
        </MainVue>
    </div>
</template>

<script>

import MainVue from '../../components/Main.vue'
import { ref, onMounted } from 'vue'
import request from '../../utils/request'
import { useRoute, useRouter } from 'vue-router'
import { susses_msg, error_msg } from '../../utils/message'
export default {
    setup() {
        let form = ref({
            username: '',
            password: '',
            email: '',
        })
        const router = useRouter()
        const route = useRoute()
        onMounted(() => {
            let id = route.query.id
            request.get("admin/" + id).then(res => {
                console.log(res.data);
                form.value = res.data

            })
        })


        const onSubmit = () => {
            request.put("/admin/update", form.value)
                .then(res => {
                    // console.log(res)
                    if (res.code === "200") {
                        susses_msg("修改成功")
                        router.push('/admin/list')

                    } else {
                        error_msg("修改错误" + res.msg)
                    }
                })
        }
        return {
            form,
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