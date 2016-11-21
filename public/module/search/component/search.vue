<style lang="scss" scoped>
  h1{
    font-size: 30px;
    text-align: center;
  }
</style>
<template>
  <div class="m-search">
    <div class='searchCnt  s-bgG'>
      <div class="searchCntWrap">
        <div>
          <a v-link="{path:'/new'}" class="btn btn-success glyphicon glyphicon-plus pull-right"></a>
        </div>
        <h1 class='text-center'>MS-COMPONENT</h1>
        <div class="form-group u-searchBox">
          <input type="text" placeholder="请输入组件中文名或者componentsName(不填为全部)" class="form-control searchipt"
                 v-model="searchText" v-on:keyup.enter="searchComponent" autofocus/>
          <button @click="searchComponent" class="btn btn-default glyphicon glyphicon-search"></button>
        </div>
      </div>
    </div>
    <div class="container searchResult" v-if="componentsList.length">
      <ul class="row">
        <li class="item" v-for="cp in componentsList">
          <hr v-if="$index!=0">
          <h2>{{cp.name}}</h2>
          <component :is="cp.componentName"></component>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    import modal from 'vuePro/modal/modalForShow.vue'
    import pager from 'vuePro/pager/pagerForShow.vue'
    import upload from 'vuePro/upload/upload.vue'
    import notify from 'vuePro/notify/notifyFowShow.vue'

  export default{
    data () {
      return {
        searchText: '',
        componentsList: []
      }
    },
    components: {
      modal,
      pager,
      upload,
      notify
    },
    methods: {
      searchComponent () {
        this.$http.get('/component/search?name=' + this.searchText).then((response)=> {
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
