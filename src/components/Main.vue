<template>
    <div>
        <HeaderVue :username="admin.username"></HeaderVue>
        <div class="by">
            <AsideVue></AsideVue>
            <div class="main">
                <slot></slot>
            </div>

        </div>
    </div>
</template>
<script >
import AsideVue from './Aside.vue';
import HeaderVue from './Header.vue'

import jsCookie from 'js-cookie';

export default {
    props: ['username'],
    setup() {
        let admin = jsCookie.get('admin') ? JSON.parse(jsCookie.get('admin')) : {};

        return {
            admin
        }
    },
    components: {
        AsideVue,
        HeaderVue
    }
}

</script>
<style scoped>
.main {
    flex: 1;
    width: 0;
    background-color: rgb(226, 226, 227);
    padding: 10px;
}

.by {
    display: flex;
    min-height: calc(100vh - 62px);
}
</style>