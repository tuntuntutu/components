<style lang='scss' scoped>
  .m-newComponent {
    h1{
      font-size: 30px;
      text-align: center;
    }
    .backBtn{
      position: fixed;
      top:0;
      color:white;
      font-size:20px;
      border:1px solid #9e9e9e;
      padding:5px;
      border-radius: 50%;
      &:hover{
        text-decoration: none;
      }
    }
    .addBtnCnt{
      margin-top:10px;
      .addBtn{
        width:100px;
        color:#fff;
        background: #5dd46d;
        border:1px solid #fff;
        font-weight: bold;
        outline:0;
      }
    }
    .form-group{
      .ipt{
        margin: 10px auto;
        width: 50%;
      }
    }
  }
</style>
<template>
  <div class="g-head s-bgG">
    <div class="container m-newComponent">
      <a class="backBtn glyphicon glyphicon-arrow-left" v-link="{path:'/index'}"></a>
      <h1>新增Component</h1>
      <div class="form-group">
        <input class="form-control ipt" type="text" placeholder="请输入组件中文名" v-model="name">
        <input class="form-control ipt" type="text" placeholder="请输入componentName" v-model="componentName">
        <div class="text-center addBtnCnt">
          <button class="btn btn-default addBtn" @click="add">添加</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  export default{
    data () {
      return {
        name: '',
        componentName: ''
      }
    },
    methods: {
      add () {
        if (!this.name || !this.componentName) {
          this.$notify('error', '请输入组件信息', 2000);
        }
        this.$http.get('/component/new?name=' + this.name + "&componentName=" + this.componentName).then((response)=> {
          // 响应成功回调
          this.componentsList = response.data.data || [];

        }, (response) => {
          // 响应错误回调
          console.error(response.data);
        });
      }
    }
  }
</script>
