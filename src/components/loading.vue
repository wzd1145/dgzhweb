<template>
    <div class="loadingpop">
        <img src="../assets/img/loading.gif">
    </div>
</template>

<script>
export default {
    name: "loading"
};
</script>

<style scoped lang="scss">
.loadingpop {
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.6);

    img {
        width: 30px;
        height: 30px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }
}
</style>
