<template id="pager">
  <div class="m-pager">
    <ul class="pagination clearfix" r-hide="!total">
      <li @click=this.nav(currentPage-1) class='{{currentPage==1? "disabled": ""}}'><a
        href='javascript:;'>上一页</a></li>
      <template v-if="total - 5 > show * 2">
        <li @click="nav(1)" v-bind:class="[currentPage==1?'active':'']"><a href="#">1</a></li>
        <li v-if="begin > 2"><a>...</a></li>

        <li v-for="i in end-begin+1" @click="nav(i+begin)" v-bind:class="[currentPage==i+begin?'active':'']"><a href="#">{{i+begin}}</a>
        </li>

        <li v-if="end < total-1"><a>...</a></li>

        <li @click="nav(total)" v-bind:class="[currentPage==total?'active':'']"><a href="#">{{total}}</a></li>
      </template>
      <template v-else>

        <li v-for="i in total" @click="nav(i+1)" v-bind:class="[currentPage==i+1?'active':'']"><a href="#">{{i+1}}</a></li>

      </template>

      <li @click="this.nav(currentPage + 1)" class='pagenxt {{currentPage==total? "disabled": ""}}'><a
        href='javascript:;'>下一页</a>
      </li>
    </ul>
  </div>
</template>

<script>

  export default{
    data () {
      var pager = this.pager, data = {};
      data.currentPage = pager.pageNo || 1;
      data.total = Math.ceil(pager.total / pager.pageSize) || 0;
      data.totalCount = pager.total;
      data.show = Math.floor(5 / 2);//half between begin & end,the distance is 5
      data.begin = data.currentPage - data.show;
      data.end = data.currentPage + data.show;

      if (data.begin < 2) data.begin = 2;
      if (data.end > data.total - 1) data.end = data.total - 1;
      if (data.currentPage - data.begin <= 1) data.end = data.end + data.show + data.begin - data.currentPage;
      if (data.end - data.currentPage <= 1) data.begin = data.begin - data.show - data.currentPage + data.end;

      return data
    },
    watch: {
      'currentPage'(current){
        this.begin = current - this.show;
        this.end = current + this.show;
        if (this.begin < 2) this.begin = 2;
        if (this.end > this.total - 1) this.end = this.total - 1;
        if (current - this.begin < this.show) this.end = this.end + (this.begin + this.show - current);
        if (this.end - current < this.show) this.begin = this.begin + (this.end - this.show - current );
      }
    },
    props: ['pager'],
    components: {},
    methods: {
      nav(index){
        if (index < 1) return;
        if (index > this.total) return;
        if (index === this.currentPage) return;
        this.$set('currentPage', index);
        this.$emit('change', index);
      }
    }
  }
</script>
