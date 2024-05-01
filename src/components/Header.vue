<template>
    <div class="header">
        <div class="one"><span>红书书管理系统</span></div>
        <div class="two">
            <el-dropdown color="white">
                <span class="el-dropdown-link">
                    {{ username }}
                    <el-icon>
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="layout">
                            <div class="layout">退出</div>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>

    </div>

</template>

<script >
import { ArrowDown } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import jsCookie from 'js-cookie';
export default {
    props: ['username'],
    setup() {
        const router = useRouter()
        function layout() {
            jsCookie.remove('admin')
            router.push('/login')
        }
        return {
            layout,
        }
    },
    components: {
        ArrowDown
    }
}


</script>

<style scoped>
.example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
}

.header {
    height: 60px;
    line-height: 60px;
    background-color: rgb(216, 29, 0);
    border-bottom: 2px solid rgb(131, 0, 0);
    margin-bottom: 2px;
    display: flex;
}

.one {
    width: 300px;
}

.two {
    padding-top: 20px;
    flex: 1;
    margin-right: 30px;
    text-align: right;
}

.two span {
    font-weight: blod;
    color: white;
    font-size: 18px;
}

.header .one {
    margin-left: 40px;
    font-size: 24px;
    color: white;
    font-weight: blod;
}

.layout {
    width: 70px;
    text-align: center;
}
</style>