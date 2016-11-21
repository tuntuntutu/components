<style lang="scss">
  .m-notify {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    .item {
      position: relative;
      width: 20rem;
      background-color: #fff;
      margin-right: 1rem;
      border-radius: 4px;
      padding: 1rem 1.5rem;
      margin-bottom: 1rem;
      &.success, &.warning, &.danger, &.info {
        color: white;
        padding-left: 4rem;
      }
      &.success {
        background-color: #87d068;
        .tipIcon {
          color: #87d068;
        }
      }
      &.info {
        background-color: #2db7f5;
        .tipIcon {
          color: #2db7f5;
        }
      }
      &.warning {
        background-color: #fa0;
        .tipIcon {
          color: #fa0;
        }
      }
      &.danger {
        background-color: #f50;
        .tipIcon {
          color: #f50;
        }
      }
    }
    .tipIcon {
      position: absolute;
      top: 50%;
      font-size: 1.5rem;
      left: 1rem;
      margin-top: -.75rem;
      line-height: 1.5rem;
    }
    .closeIcon {
      position: absolute;
      top: .2rem;
      right: .5rem;
      font-size: .8rem;
      color: #ccc;
      &:hover {
        color: #969696;
      }
    }
    &-transition {
      transition: all .5s ease;
    }
    &-enter {
      opacity: 0;
    }
    &-leave {
      opacity: 0;
      position: absolute;
    }
    &-move {
      transition: transform .5s cubic-bezier(.55, 0, .1, 1);
    }
  }
</style>
<template id="notify">
  <div class="m-notify" v-show="notifications.length">
    <div v-for="item in notifications" class="item" :class="iconClass(item)" transition="m-notify">
      <span class="tipIcon"></span>
      <div class="closeIcon glyphicon glyphicon-remove" @click="closeItem(item)"></div>
      <div class="content">{{item.content}}</div>
    </div>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        notifications: []
      }
    },
    methods: {
      iconClass(item){
        let obj = {};
        if (item.clazz) {
          obj[item.clazz] = true;
        } else {
          obj = {info: true}
        }
        return obj;
      },
      create(type, content, delay){
        //type:success/info/error/warning
        if (!type) type = 'info';
        var obj = {content: content, clazz: type};
        this.notifications.push(obj);
        if (delay) {
          setTimeout(function () {
            this.notifications.$remove(obj);
          }.bind(this), delay)
        }
      },
      closeItem(item){
        this.notifications.$remove(item);
      }
    }
  }
</script>
