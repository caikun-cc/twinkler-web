<template>
    <div class="account-root">
        <div class="account-container">
            <router-view/>
        </div>
    </div>
</template>

<script>
export default {
    name: "AccountLayout"
}
</script>

<style scoped>

.account-root {
    height: 100vh;
    background: #f2f3f5;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>