<template>
    <div>
        <MainVue>
            <div class="add">
                <h1>修改图书信息页面</h1>
                <el-form :inline="true" :model="form" class="form" :rules="rules" ref="ruleFormRef" label-width="200px"
                    center>
                    <el-form-item label="图书名称" prop="name">
                        <el-input v-model="form.name" placeholder="请输入图书名称" />
                    </el-form-item>
                    <el-form-item label="图书描述" prop="description">
                        <el-input type="textarea" v-model="form.description" placeholder="请输入图书描述"
                            style="width: 400px;" />
                    </el-form-item>
                    <el-form-item label="图书介绍" prop="author">
                        <el-input v-model="form.author" placeholder="请输入图书作者" />
                    </el-form-item>
                    <el-form-item label="图书出版日期" prop="publishDate">
                        <el-date-picker v-model="form.publishDate" type="date" placeholder="请选择出版日期"
                            value-format="YYYY-MM-DD" />
                    </el-form-item>
                    <el-form-item label="图书标价" prop="price">
                        <el-input v-model="form.price" placeholder="请输入图书标价" />
                    </el-form-item>
                    <el-form-item label="图书分类" prop="category">
                        <el-cascader v-model="form.category" :options="categorys"
                            :props="{ value: 'name', label: 'name' }" />
                    </el-form-item>
                </el-form>
                <div class="btn">
                    <el-button color="rgb(242,230,146)" @click="onSubmit">提交</el-button>
                    <el-button color="rgb(227,182,32)" @click="$router.push('/book/list')">返回</el-button>
                    <!-- <el-button color="rgb(227,182,32)" @click="error_msg()">弹窗</el-button> -->
                </div>
            </div>
        </MainVue>
    </div>
</template>

<script>

import MainVue from '../../components/Main.vue'
import { ref, onMounted, reactive } from 'vue'
import request from '../../utils/request'
import { useRoute, useRouter } from 'vue-router'
import { susses_msg, error_msg } from '../../utils/message'
export default {
    setup() {
        let form = ref({
            name: '',
            description: '',
            price: '',
            category: '',
            author: '',
            publishDate: ''
        })
        let categorys = ref([])
        const router = useRouter()
        const route = useRoute()
        onMounted(() => {
            request.get('/category/tree').then(res => {
                categorys.value = res.data
            })
            let id = route.query.id
            request.get("book/" + id).then(res => {
                form.value = res.data
                let s = []
                if (form.value.category) {
                    s = form.value.category.split('/')
                }
                form.value.category = s
                // console.log(form.value.category);
            })


        })
        const ruleFormRef = ref('')
        const rules = reactive({
            name: [
                { required: true, message: '请输入书名', trigger: 'blur' },
            ],
            price: [{ type: 'number', message: '价钱必须为数字', trigger: 'blur' }]
        })

        const onSubmit = () => {
            // console.log(form.value.category);
            ruleFormRef.value.validate((valid, fields) => {
                if (valid) {
                    let s = ''
                    for (let i in form.value.category)
                        if (i != 0) s = s + '/' + form.value.category[i]
                        else s += form.value.category[i]
                    form.value.category = s
                    request.put("/book/update", form.value)
                        .then(res => {
                            // console.log(res)
                            if (res.code === "200") {
                                susses_msg("修改成功")
                                router.push('/book/list')

                            } else {
                                error_msg("修改错误" + res.msg)
                            }
                        })
                } else {
                    console.log('error submit!', fields)
                    return false
                }
            })
        }
        return {
            form,
            categorys,
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