<template>
  <div>
    <!-- TODO Top Menu of Media -->
    <!--<h2></h2>-->
    <!--<el-menu mode="horizontal">-->
    <!--<h1>Movies</h1>-->
    <el-menu mode="horizontal" theme="dark" style="margin-top: 20px">
      <el-row :gutter="20">
        <el-col :span="18">
          <div class="mediaTitle">
            Movies
          </div>
        </el-col>

        <el-col :span="6">
          <!--<el-button type="info" icon="search"-->
          <!--style="margin-top: 22px; float: right; margin-right: 30px"-->
          <!--@click=" "-->
          <!--&gt;Testing Operations-->
          <!--</el-button>-->
          <el-button-group style="margin-top: 15px; float: right; margin-right: 30px">
            <!--<el-button type="primary" icon="arrow-left">上一页</el-button>-->
            <!--<el-button type="primary">下一页<i class="el-icon-arrow-right el-icon&#45;&#45;right"></i></el-button>-->

            <el-button type="primary" icon="delete">
              Delete Item(s)
            </el-button>
          </el-button-group>
        </el-col>
      </el-row>
    </el-menu>

    <!--</el-menu>-->

    <!-- TODO Testing `Border-Card` Navigation -->
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-information"></i> View in List Mode</span>

        <!-- TODO Content -->
        <el-table ref="table" :data="tableData" stripe style="width: 100%">
          <!-- Basic (extends from Media) -->
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="title" label="Title" width="300"></el-table-column>
          <el-table-column prop="rating" label="Rating" width="100"></el-table-column>

          <!-- Basic Media Information of Movie -->
          <el-table-column prop="duration" label="Duration" width="100">
            <template scope="scope">
              {{getTimeString(scope.row.duration)}}
            </template>
          </el-table-column>

          <!-- The information of the content of the Movie -->
          <el-table-column prop="genres" label="Genres" width="150">
            <template scope="scope">
              {{getCommaSplitGenres(scope.row.genres)}}
            </template>
          </el-table-column>
          <!-- Plot - Ignored in List Mode -->

          <!-- Size (extends from Media) -->
          <el-table-column prop="size" label="File Size" width="150">
            <template scope="scope">
              {{byteToFitUnit(scope.row.size)}}
            </template>
          </el-table-column>

          <!-- Available Operations -->
          <!--<el-table-column label="Operations" style="min-width: 600px;">-->
          <!--<el-table-column label="Operations" width="300">-->
          <el-table-column label="Operations" width="300" fixed="right">
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
        <el-row>
          <el-col :span="6" v-for="(item, $index) in tableData" :key="item.id" :offset="1">
            <el-card :body-style="{padding: 0}" style="margin-top: 10px">
              <img :src="baseURL + item.thumbnailURL" style="width: 100%; display: block" />
              <div style="padding: 14px">
                <span>{{item.title}}</span>
                <div class="bottom clearfix">
                  <el-button type="text" class="button" @click="goDetails(item.id)">Details</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  //  import tableData from '@/assets/data';
  //  import ElTable from "../../../node_modules/element-ui/packages/table/src/table";
  import BaseURL from '@/utils/BaseURL';
  import TypeConvert from '@/utils/TypeConvert';

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
        baseURL: BaseURL,
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
        return TypeConvert.durationToHMS(time);
      },
      goDetails (id) {
//        this.$router.push({name: 'MovieDetails', params: {id}})

        this.fullScreenLoading = true;
        setTimeout(() => {
          this.$router.push({name: 'MovieDetails', params: {id}})
          this.fullScreenLoading = false;
        }, 500);
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
        window.open(this.baseURL + fileURL, '_blank');
      },
      byteToFitUnit (byte) {
        return TypeConvert.byteToFitUnit(byte);
      },
      openFullScreen(){
        this.fullScreenLoading = true;
        setTimeout(() => {
          this.fullScreenLoading = false;
        }, 500);
      },

      // TODO Delete Item(s)
      deleteItems () {
        let selectionList = [];
        if (this.multipleSelection !== []) {

          this.multipleSelection.forEach(row => {
              selectionList.push(row.id);
            }
          );

          this.$axios.delete('/api/photo/' + selectionList).then(response => {
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
        }
      },

      // TODO Handling selection change events
      handleSelectionChange(val) {
        this.multipleSelection = val;
        window.console.log(val);
        window.console.log(val[0]);
      },
    },
    computed: {
//      filterTableData () {
//        return this.tableData.filter(element => element.type === 'Movies');
//      }
    }
  }
</script>

<style scoped>
  .mediaTitle {
    font-size: 26px;
    padding-top: 14px;
    padding-bottom: 15px;
    padding-left: 30px;
    color: #FAFAFA;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
