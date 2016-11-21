<template id="notifyForShow">
  <button class="btn btn-success" @click="showModal('success')">success</button>
  <button class="btn btn-info" @click="showModal('info')">info</button>
  <button class="btn btn-warning" @click="showModal('warning')">warning</button>
  <button class="btn btn-danger" @click="showModal('danger')">danger</button>
  <notify v-ref:notify></notify>
</template>

<script>
  import notify from './notify.vue'
  export default{
    data () {
      return {}
    },
    methods: {
      showModal(type){
        this.$refs.notify.create(type,'操作成功',1000);
      }
    },
    components: {
      notify
    }
  }
</script>
