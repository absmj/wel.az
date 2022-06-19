<template>

</template>

<script>
import {mapActions} from 'vuex'

export default {
    async asyncData({ params, store , filter}){
        let f_ = Buffer.from(params.id, 'base64').toString();

        if( /(["'][gcdy]["']\:\[(\d+[,\d+]*)*\])*,(["'][rt]["']\:[\d+]*)*/gmi.test(f_)){
            await store.dispatch('filtering', JSON.parse(f_))
            store.dispatch('setFirstAsk', null)    
        }
        return {f_}

    },

    async created(){
        await this.$store.dispatch("getFilms")
    }
    
}
</script>

<style>

</style>