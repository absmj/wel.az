<template>
	<Player v-if="$store.state.film" :type = "'1'" />
</template>
<script>
import Player from '@/components/Player.vue'
export default {
		components: {
      Player
    },
    created()
    {
    	console.log(this.$store.state.film);
        // window.location.href = '/'
    }
}
</script>
