<template>
  <p class="text-white">{{g}}</p>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    async asyncData({ params, store }){
        let f_ = params.id.split("-"), g=[], c=[], y = [];
        console.log(f_);
        f_.forEach(v=>{
            let f__ = v.split('-');
            if(f__[1] == 'g') g = f__[0].split(',');
            else if(f__[1] == 'c') c = f__[0].split(',');
            else if(f__[1] == 'd') d = f__[0].split(',');
        })

        // store.dispatch('filter', {g: g, c: c, y: y})
        return {g}
    },

    created(){
        
    }
    
}
</script>

<style>

</style>