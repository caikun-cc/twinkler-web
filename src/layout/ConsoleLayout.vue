<template>
    <div class="console-root">
        <el-container>
            <el-aside width="220px">
                <div class="logo-side-container"><span>Twinkler</span></div>
                <el-menu>
                    <el-menu-item>首页</el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header>

                </el-header>
                <el-main>

                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    name: "ConsoleLayout"
}
</script>

<style scoped>
.console-root {
    height: 100vh;
}

.el-aside {
    height: 100vh;
    background: white;
}

.logo-side-container {
    background: coral;
    padding: 20px;
}

.logo-side-container > span {
    color: white;
    font-weight: bold;
    font-size: 1.2rem;
    letter-spacing: 3px;
    text-align: center;
    display: block;
}
</style>