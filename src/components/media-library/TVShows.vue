<template>
  <div>
    <!--<h1>TV Shows</h1>-->
    <el-menu mode="horizontal" theme="dark" style="margin-top: 20px">
      <el-row :gutter="20">
        <el-col :span="18">
          <div class="mediaTitle">
            TV Shows
          </div>
        </el-col>

        <el-col :span="6">
          <!--<el-button type="info" icon="search"-->
          <!--style="margin-top: 22px; float: right; margin-right: 30px"-->
          <!--@click=" "-->
          <!--&gt;Testing Operations-->
          <!--</el-button>-->
          <!-- TODO 测试使用按钮组 -->
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


    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-information"></i> View in List Mode</span>


        <el-table :data="tableData" ref="table" stripe style="width: 100%">
          <el-table-column type="selection" width="55"></el-table-column>

          <!-- Basic (extends from Media) -->
          <el-table-column prop="title" label="Title" width="300">
            <template scope="scope">
              {{scope.row.title}}
            </template>
          </el-table-column>
          <el-table-column prop="rating" label="Rating" width="100">
            <template scope="scope">
              {{scope.row.rating}}
            </template>
          </el-table-column>

          <!-- Other Basic TV Show Information -->
          <el-table-column prop="premiered" label="Premiered" width="120">
            <template scope="scope">
              {{scope.row.premiered}}
            </template>
          </el-table-column>
          <el-table-column prop="studio" label="Studio" width="100">
            <template scope="scope">
              {{scope.row.studio}}
            </template>
          </el-table-column>
          <el-table-column prop="mpaa" label="MPAA" width="100">
            <template scope="scope">
              {{scope.row.mpaa}}
            </template>
          </el-table-column>


          <!-- The information of the content of the Movie -->
          <el-table-column label="Genres" width="300">
            <!-- TODO 多个按钮形式？或者文本用什么进行分隔？-->
            <template scope="scope">
              {{getCommaSplitGenres(scope.row.genres)}}
            </template>
          </el-table-column>
          <!-- Plot - Ignored in List Mode -->
          <el-table-column prop="actors" label="Actors" width="300">
            <!-- TODO Actor 多个按钮形式？或者文本用什么进行分隔？-->
            <template scope="scope">
              {{getCommaSplitActors(scope.row.actors)}}
            </template>
          </el-table-column>


          <!--<el-table-column prop label="Episodes" width="100">-->
          <!--&lt;!&ndash; TODO 这里是有多个episode啊！不可能直接显示长度啊！不过倒是可以显示数量！ &ndash;&gt;-->
          <!--<template scope="scope">-->
          <!--&lt;!&ndash;{{scope.row.episodes.length}}&ndash;&gt;-->
          <!--</template>-->
          <!--</el-table-column>-->


          <!-- Size (extends from Media) -->
          <!--<el-table-column prop="size" label="File Size" width="100">\-->
          <!--<template scope="scope">-->
          <!--&lt;!&ndash; Needs to compute the total size of the TV shows&ndash;&gt;-->
          <!--&lt;!&ndash; TODO 这里要改一下了！ &ndash;&gt;-->
          <!--{{scope.row.size}}-->
          <!--&lt;!&ndash;{{computeTotalSize(scope.row.episodes).toFixed(2)}}&nbsp;{{scope.row.episodes[0].size.measure}}&ndash;&gt;-->
          <!--</template>-->
          <!--</el-table-column>-->


          <!--<el-table-column label="Operations">-->
          <!--<el-table-column label="Operations" width="250" fixed="right">-->
          <el-table-column label="Operations" width="200" fixed="right">
            <template scope="scope">
              <el-button size="small" type="primary"
                         @click="goToDetails(scope.row.id), openFullScreen()"
                         v-loading.fullscreen.lock="fullScreenLoading">
                Details
              </el-button>
              <!-- Cannot Download all episodes directly -->
              <el-button size="small" type="danger"
                         @click="deleteItem(scope.row.id), openFullScreen"
                         v-loading.fullscreen.lock="fullScreenLoading">
                <i class="el-icon-delete2"></i> Delete
              </el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-tab-pane>

      <el-tab-pane>
        <span slot="label"><i
          class="el-icon-menu"></i> View in Thumbnail Mode</span>
        <el-row>
          <el-col :span="6" v-for="(item, $index) in tableData" :key="item.id" :offset="1">
            <el-card :body-style="{padding: 0}" style="margin-top: 10px; background-color: dodgerblue">
              <img :src="baseURL + item.thumbnailURL" style="width: 100%; display: block" />
              <div style="padding: 14px">
                <span>{{item.title}}</span>
                <div class="bottom clearfix">
                  <el-button type="text" class="button" @click="goToDetails(item.id)">Details</el-button>
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
  import BaseURL from '@/utils/BaseURL';

  export default {
    beforeMount () {
      this.load();
    },
//    mounted() {
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
        this.$axios.get('/api/tv-show').then(response => {
          if (response.data.isSuccessful) {
            this.tableData = response.data.data;
          }
        })
      },
      getCommaSplitGenres(genres) {
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

      getCommaSplitActors(actors) {
        let str = "";
        for (let i = 0; i < actors.length; ++i) {
          if (i !== actors.length - 1) {
            str += (actors[i].name + ", ")
          } else {
            str += actors[i].name;
          }
        }
        return str;
      },

      goToDetails (id) {
        this.$router.push({name: 'TVShowDetails', params: {id}})
      },

      computeTotalSize(episodes) {
        let totalSize = 0;
        episodes.forEach(episode => {
          totalSize += episode.size.size;
        })
        return totalSize;
      },

      deleteItem (id) {
//        this.$confirm('Are you sure to delete the item? ', 'Warning', {
//          confirmButtonText: 'Confirm',
//          cancelButtonText: 'Cancel',
//          type: 'warning'
//        })
//        .then(
        this.$axios.delete('/api/tv-show/' + id).then(response => {
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
//        return this.tableData.filter(element => element.type === 'TVShows');
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
