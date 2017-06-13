<template>
  <h2>{{exact.title}}</h2>
  <el-row>
    <el-col :span="8"></el-col>
  </el-row>
</template>

<script>
  import tableData from '@/assets/data';

  export default {
    mounted () {
      tableData.forEach(element => {
        if (element.id === this.id) {
          this.exact = element;
        }
      })
    },
    data () {
      return {
        id: parseInt(this.$route.params.id),
        exact: {}
      };
    },
    computed: {
      isTVShows () {
        return this.exact.type === 'TVShows';
      },
      isMovies () {
        return this.exact.type === 'Movies';
      },
    }
  };
</script>

<style>
  /**/
</style>
