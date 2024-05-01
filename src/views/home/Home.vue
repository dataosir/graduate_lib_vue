<template>
    <div id="test">
        <MainVue>
            <div class="item">欢迎管理员{{ admin.username }}登录</div>
            <div class="item">您的邮箱为{{ admin.email }}</div>

        </MainVue>
    </div>
</template>

<script>
import jsCookie from 'js-cookie';
import MainVue from '../../components/Main.vue'
import request from '../../utils/request';
import { onMounted } from 'vue';
export default {
    setup() {
        let admin = jsCookie.get('admin') ? JSON.parse(jsCookie.get('admin')) : {};

        onMounted(() => {
            request.get('/admin/' + admin.id).then(res => {
                admin = res.data
            })
        })
        return {
            admin
        }
    },
    components: {

        MainVue
    }
}
</script>
<style scoped>
.item {
    font-size: 30px;
    /* text-align: center; */
    font-weight: bold;
    padding: 10px;
    color: #24282c;
}
</style>