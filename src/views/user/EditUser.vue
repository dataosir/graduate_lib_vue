<template>
    <div id="adduser">
        <MainVue>
            <div class="add">
                <h1>修改学生页面</h1>
                <el-form :inline="true" :model="form" class="form" label-width="200px" center>
                    <el-form-item label="名称">
                        <el-input v-model="form.name" placeholder="请输入名称" />
                    </el-form-item>
                    <el-form-item label="年龄">
                        <el-input v-model="form.age" placeholder="请输入年龄" />
                    </el-form-item>
                    <el-form-item label="学号">
                        <el-input v-model="form.stunumber" placeholder="请输入学号" />
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-select v-model="form.sex" placeholder="请选择性别">
                            <el-option label="男" value="男" />
                            <el-option label="女" value="女" />
                        </el-select>
                    </el-form-item>
                </el-form>
                <div class="btn">
                    <el-button color="rgb(242,230,146)" @click="onSubmit">提交</el-button>
                    <el-button color="rgb(227,182,32)" @click="$router.push('/user/list')">返回</el-button>
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
            name: '',
            username: '',
            age: null,
            sex: '',
            stunumber: ''
        })
        const router = useRouter()
        const route = useRoute()
        onMounted(() => {
            let id = route.query.id
            request.get("user/" + id).then(res => {
                form.value = res.data

            })
        })


        const onSubmit = () => {
            request.put("/user/update", form.value)
                .then(res => {
                    // console.log(res)
                    if (res.code === "200") {
                        susses_msg("修改成功")
                        router.push('/user/list')

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