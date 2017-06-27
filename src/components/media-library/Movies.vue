<template>
  <div>
    <!-- TODO Top Menu of Media -->
    <!--<h2></h2>-->
    <!--<el-menu mode="horizontal">-->
    <!--<h1>Movies</h1>-->
    <el-menu mode="horizontal" theme="dark" style="margin-top: 20px">
      <div class="mediaTitle">
        Movies
      </div>
    </el-menu>

    <!-- TODO Search 需要加！-->
    <!--</el-menu>-->

    <!-- TODO Testing `Border-Card` Navigation -->
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-information"></i> View in List Mode</span>

        <!-- TODO Content -->
        <el-table :data="tableData" stripe style="width: 100%">
          <!-- Basic (extends from Media) -->
          <el-table-column prop="title" label="Title" width="300"></el-table-column>
          <el-table-column prop="rating" label="Rating" width="100"></el-table-column>

          <!-- Basic Media Information of Movie -->
          <el-table-column prop="duration" label="Duration" width="200">
            <template scope="scope">
              <!-- TODO 需要改-->
              {{scope.row.duration}}
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
          <el-table-column label="Operations">
            <!--<el-table-column label="Operations" width="300">-->
            <template scope="scope">
              <el-button type="primary" size="small"
                         @click="goDetails(scope.row.id), openFullScreen()"
                         v-loading.fullscreen.lock="fullScreenLoading">
                Details
              </el-button>
              <el-button size="small" type="primary"
                         @click="downloadFile(scope.row.fileURL), openFullScreen()"
                         v-loading.fullscreen.lock="fullScreenLoading">
                <i class="el-icon-upload2"></i> Download
              </el-button>
              <el-button size="small" type="danger"
                         @click="deleteItem(scope.row.id)"
                         v-loading.fullscreen.lock="fullScreenLoading">
                <i class="el-icon-delete2"></i> Delete
              </el-button>
            </template>
          </el-table-column>

        </el-table>
      </el-tab-pane>

      <el-tab-pane>
        <span slot="label"><i class="el-icon-menu"></i> View in Thumbnail Mode</span>
<!--TODO-->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  //  import tableData from '@/assets/data';
  //  import ElTable from "../../../node_modules/element-ui/packages/table/src/table";


  export default {
//    components: {ElTable},
    // TODO Get data from GET request
    beforeMount () {
      this.load();
    },
//    mounted () {
//      window.console.log(tableData);
//    },
    data () {
      return {
        tableData: [],
        fullScreenLoading: false
      };
    },
    methods: {
      load () {
        this.$axios.get('/api/movie').then(response => {
          if (response.data.isSuccessful) {
            this.tableData = response.data.data;
          }
          window.console.log(response);
        });
      },
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
        this.$router.push({name: 'MovieDetails', params: {id}})
      },
      deleteItem (id) {
        this.$axios.delete('/api/movie/' + id).then(response => {
          if (response.data.isSuccessful) {
            this.$message({
              type: 'success',
              message: 'Delete Successful'
            });
            this.load();
          }
        }).catch(error => {
          window.console.log(error);
        });
      },
      downloadFile (fileURL) {
        window.open(fileURL, '_blank');
      },

      openFullScreen(){
        this.fullScreenLoading = true;
        setTimeout(() => {
          this.fullScreenLoading = false;
        }, 500);
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
  .mediaTitle {
    font-size: 26px;
    padding-top: 14px;
    padding-bottom: 15px;
    padding-left: 30px;
    color: #FAFAFA;
  }
</style>
