<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
import player from './pages/components/player'

export default {
    name: 'App',
    components: {
        player
    }
}
</script>

<style>
</style>
