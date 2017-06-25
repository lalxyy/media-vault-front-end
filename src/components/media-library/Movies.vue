<template>
  <div>
    <h2>Movies</h2>
    <el-table :data="filterTableData" stripe style="width: 100%">
      <!-- Basic (extends from Media) -->
      <el-table-column prop="title" label="Title" width="300">

      </el-table-column>
      <el-table-column prop="rating" label="Rating" width="100">

      </el-table-column>

      <!-- Basic Media Information of Movie -->
      <el-table-column prop="duration" label="Duration" width="200">
        <template scope="scope">
          <!-- TODO 需要改-->
          {{getTimeString(scope.row.time)}}
        </template>
      </el-table-column>

      <!-- The information of the content of the Movie -->
      <el-table-column prop="genres" label="Genres" width="300">
        <!-- TODO 多个按钮形式？或者文本用什么进行分隔？-->
        <template scope="scope">
          {{getCommaSplitGenres(scope.row.genres)}}
        </template>
      </el-table-column>
      <!-- Plot - Ignored in List Mode -->

      <!-- Size (extends from Media) -->
      <el-table-column prop="size" label="File Size" width="100">
        <template scope="scope">
          {{scope.row.size}}
          <!-- 旧版 -->
          <!--{{scope.row.size.size}}&nbsp;{{scope.row.size.measure}}-->
        </template>
      </el-table-column>

      <!-- Available Operations -->
      <el-table-column label="Operations" width="300">
        <template scope="scope">
          <el-button type="primary" size="small" @click="goDetails(scope.row.id)">
            Details
          </el-button>
          <el-button size="small" type="primary" @click="downloadFile(scope.row.fileURL)">
            <i class="el-icon-upload2"></i> Download
          </el-button>
          <el-button size="small" type="danger" @click="deleteItem(scope.row.id)">
            <i class="el-icon-delete2"></i> Delete
          </el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
//  import tableData from '@/assets/data';
//  import ElTable from "../../../node_modules/element-ui/packages/table/src/table";


  export default {
//    components: {ElTable},
    // TODO Get data from GET request
    beforeMount () {
      this.$axios.get('/api/movie').then(response => {
        this.tableData = response.data.data;
        window.console.log(response);
        this.tableData = response.data.data;
      });
    },
//    mounted () {
//      window.console.log(tableData);
//    },
    data () {
      return {
        tableData: []
      };
    },
    methods: {
      getCommaSplitGenres (genres) {
        let str = "";
        for (let i = 0; i < genres.length; ++i) {
          if (i !== genres.length - 1) {
            str += (genres[i] + ", ")
          } else {
            str += genres[i];
          }
        }
        return str;
      },
      getTimeString (time) {
        return `${Math.floor(time / 3600)} hrs ${Math.floor(
          (time % 3600) / 60)} mins ${(time % 3600) % 60} secs`;
      },
      goDetails (id) {
        this.$router.push({name: 'MediaDetails', params: {id}})
      },
      deleteItem (id) {
        // TODO ID 没用上啊。。。。
        this.$confirm('Are you sure to delete the item? ', 'Warning', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: 'Succeeded'
          })
        })
      },
      downloadFile (fileURL) {
        window.open(fileURL, '_blank');
      }
    },
    computed: {
//      filterTableData () {
//        return this.tableData.filter(element => element.type === 'Movies');
//      }
    }
  }
</script>

<style>
  /**/
</style>
