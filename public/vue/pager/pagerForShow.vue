<template id="modalForShow">
  <pager :pager="pager" @change="changePage"></pager>
</template>

<script>
  import pager from './pager.vue'
  export default{
    data () {
      return {
        pager:{
          total:600,
          pageSize:20,
          pageNo:1
        }
      }
    },
    methods:{
      changePage(){
      }
    },
    components: {
      pager
    }
  }
</script>
