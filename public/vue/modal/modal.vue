<template id="modal">
  <div v-show="showModal" class="m-modal"  transition="m-modal">
      <div class="modal-dialog">
        <div class="modal-content {{clazz}}" v-bind:style="{width: width+'px'}">
          <div class="modal-header">
            <span class="close" @click="close">×</span>
            <h4 class="modal-title" id="myModalLabel">
              <slot name="head">提示</slot>
            </h4>
          </div>
          <div class="modal-body">
            <slot name="content">This is content</slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <button class="btn btn-primary" @click="confirm">保存</button>
              <button class="btn btn-default" @click="close"  v-if="!onlyOk">{{closeTitle}}</button>
            </slot>
          </div>
        </div>
    </div>
  </div>
</template>

<script>

  export default{
    data () {
      return {
        width: 640,
        clazz: "",
        onlyOk: false,
        closeTitle: "取消",
        showModal:false
      }
    },
    methods: {
      show(){
        this.showModal=true;
      },
      confirm(){
        this.$emit('confirm',this._data);
        this.showModal=false;
      },
      close(){
        this.showModal=false;
      }
    }
  }
</script>
