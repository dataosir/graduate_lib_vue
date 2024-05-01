<template>
    <div id="adduser">
        <MainVue>
            <div class="add">
                <h1>添加图书页面</h1>
                <el-form :inline="true" :model="form" :rules="rules" ref="ruleFormRef" class="formview"
                    label-width="200px" center>
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
                        <el-input v-model.number="form.price" placeholder="请输入图书标价" />
                    </el-form-item>
                    <el-form-item label="图书分类" prop="category">
                        <el-cascader v-model="form.category" :options="categorys"
                            :props="{ value: 'name', label: 'name' }" />
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
import { ref, reactive, onMounted } from 'vue'
import request from '../../utils/request'
import { susses_msg, error_msg } from '../../utils/message'
import { useRouter } from 'vue-router'
export default {
    setup() {
        const form = reactive({
            name: '',
            author: '',
            description: '',
            publishDate: '',
            price: null,
            category: '',
        })
        const ruleFormRef = ref('')
        const router = useRouter()

        const rules = reactive({
            name: [
                { required: true, message: '请输入书名', trigger: 'blur' },
            ],
            price: [{ type: 'number', message: '价钱必须为数字', trigger: 'blur' }]
        })
        let categorys = ref([])
        onMounted(() => {
            request.get('/category/tree').then(res => {
                categorys.value = res.data
            })
        })

        const onSubmit = () => {
            ruleFormRef.value.validate((valid, fields) => {
                if (valid) {
                    let s = ''
                    for (let i in form.category)
                        if (i != 0) s = s + '/' + form.category[i]
                        else s += form.category[i]
                    console.log(s);
                    form.category = s
                    request.post("/book", form)
                        .then(res => {
                            if (res.code === "200") {
                                susses_msg("添加成功")
                                router.push('/book/list')
                            } else {
                                error_msg("添加失败,错误:" + res.msg)
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
            rules,
            ruleFormRef,
            categorys,
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

.formview {
    margin-top: 50px;
    margin-left: 200px;
    width: 80%;
}

.btn {
    text-align: right;
}

textarea {
    width: 400px;
}
</style>