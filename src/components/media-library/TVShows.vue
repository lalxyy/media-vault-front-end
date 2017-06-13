<template>
  <div>
    <h2>TV Shows</h2>
    <el-table :data="filterTableData" stripe style="width: 100%">
      <el-table-column prop="title" label="Title" width="300"></el-table-column>
      <el-table-column label="Episodes" width="50">
        <template scope="scope">
          {{scope.row.episodes.length}}
        </template>
      </el-table-column>

      <el-table-column label="File Size" width="100">
        <template scope="scope">
          <!-- Needs to compute the total size of the TV shows-->
          {{computeTotalSize(scope.row.episodes).toFixed(2)}}&nbsp;{{scope.row.episodes[0].size.measure}}
        </template>
      </el-table-column>

      <el-table-column label="Operations">
        <template scope="scope">
          <el-button size="small" type="primary" @click="goToDetails(scope.row.id)">Details</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import tableData from '@/assets/data';

  export default {
    mounted() {
      window.console.log(tableData);
    },
    data () {
      return {
        tableData
      };
    },
    methods: {
      goToDetails (id) {
        this.$router.push({name: 'MediaDetails', params: {id}})
      },
      computeTotalSize(episodes) {
        let totalSize = 0;
        episodes.forEach(episode => {
          totalSize += episode.size.size;
        })
        return totalSize;
      }
    },
    computed: {
      filterTableData () {
        return this.tableData.filter(element => element.type === 'TVShows');
      }
    }
  }
</script>

<style>
  /**/
</style>
