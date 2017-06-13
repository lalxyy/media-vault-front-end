<template>
  <div>
    <h2>Movies</h2>
    <el-table :data="filterTableData" stripe style="width: 100%">
      <el-table-column prop="title" label="Title" width="300"></el-table-column>
      <el-table-column label="Duration" width="200">
        <template scope="scope">
          {{getTimeString(scope.row.time)}}
        </template>
      </el-table-column>
      <el-table-column prop="year" label="Year" width="100"></el-table-column>
      <el-table-column label="File Size" width="100">
        <template scope="scope">
          {{scope.row.size.size}}&nbsp;{{scope.row.size.measure}}
        </template>
      </el-table-column>
      <el-table-column label="Operations">
        <template scope="scope">
          <el-button size="small" type="primary">
            <i class="el-icon-upload2"></i> Download
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import tableData from '@/assets/data';

  export default {
    mounted () {
      window.console.log(tableData);
    },
    data () {
      return {
        tableData
      };
    },
    methods: {
      getTimeString (time) {
        return `${Math.floor(time / 3600)} hrs ${Math.floor((time % 3600) / 60)} mins ${(time % 3600) % 60} secs`;
      }
    },
    computed: {
      filterTableData () {
        return this.tableData.filter(element => element.type === 'Movies');
      }
    }
  }
</script>

<style>
  /**/
</style>
