<template id="modalForShow">
  <button class="btn btn-primary" @click="showModal">showModal</button>
  <modal v-ref:modal @confirm="confirm">
    <p slot="head">This is a title!</p>
    <p slot="content">This is a modal!</p>
  </modal>
</template>

<script>
  import modal from './modal.vue'
  export default{
    data () {
      return {}
    },
    methods: {
      showModal(){
        this.$refs.modal.show();
      },
      confirm(data){
        console.log(data);
      }
    },
    components: {
      modal
    }
  }
</script>
