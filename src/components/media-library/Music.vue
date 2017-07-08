<template>
  <div>
    <!--<h1>Music</h1>-->
    <el-menu mode="horizontal" theme="dark" style="margin-top: 20px">
      <el-row :gutter="20">
        <el-col :span="18">
          <div class="mediaTitle">
            Music
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

    <!-- TODO Testing `Border-Card` Navigation -->
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-information"></i> View in List Mode</span>

        <!-- Uses a table to show the data if `Music` -->
        <el-table :data="tableData" stripe style="width: 100%">
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

          <!-- Basic Media Information of Music -->
          <el-table-column prop="duration" label="Duration" width="100">
            <template scope="scope">
              {{getTimeString(scope.row.duration)}}
            </template>
          </el-table-column>

          <!-- Size (extends from Media) -->
          <el-table-column prop="size" label="File Size" width="100">
            <template scope="scope">
              {{byteToFitUnit(scope.row.size)}}
              <!-- 旧版 -->
              <!--{{scope.row.size.size}}&nbsp;{{scope.row.size.measure}}-->
            </template>
          </el-table-column>


          <!-- Available Operations -->
          <el-table-column label="Operations" style="min-width: 300px;">
            <template scope="scope">
              <el-button size="small" type="primary"
                         @click="openFullScreen(scope.row.fileURL)"
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
                  <el-button type="text" class="button" @click="goToDetails(item.id)">Details</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>

    <!-- Shown in List Mode-->
    <!--<template v-if="mode = 'list'">-->
    <!--&lt;!&ndash; Uses a table to show the data if `Music` &ndash;&gt;-->
    <!--<el-table :data="filterTableData" stripe style="width: 100%">-->
    <!--&lt;!&ndash; Title &ndash;&gt;-->
    <!--<el-table-column prop="title" label="Title" width="300"></el-table-column>-->

    <!--&lt;!&ndash; Duration &ndash;&gt;-->
    <!--<el-table-column label="Duration" width="200">-->
    <!--<template scope="scope">-->
    <!--{{getTimeString(scope.row.time)}}-->
    <!--</template>-->
    <!--</el-table-column>-->

    <!--&lt;!&ndash; Year &ndash;&gt;-->
    <!--<el-table-column prop="year" label="Year" width="100"></el-table-column>-->

    <!--&lt;!&ndash; Available Operations &ndash;&gt;-->
    <!--<el-table-column label="Operations">-->
    <!--<template scope="scope">-->
    <!--<el-button size="small" type="primary">-->
    <!--<i class="el-icon-upload2"></i> Download-->
    <!--</el-button>-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--</el-table>-->
    <!--</template>-->
    <!--<template v-else-if="mode = 'thumbnail'">-->
    <!--&lt;!&ndash; some content of thumbnail mode&ndash;&gt;-->
    <!--</template>-->

  </div>
</template>

<script>
  import BaseURL from '@/utils/BaseURL';
  import TypeConvert from '@/utils/TypeConvert';
//  import data from '@/assets/data';

  export default {
    beforeMount () {
      this.load()
    },
    data() {
      return {
        baseURL: BaseURL,
        tableData: [],
        fullScreenLoading: false
      };
    },
    methods: {
      load () {
        this.$axios.get('/api/music').then(response => {
          if (response.data.isSuccessful) {
            this.tableData = response.data.data;
          }
        })
      },
      getTimeString (time) {
        return TypeConvert.durationToHMS(time);
      },
      byteToFitUnit (byte) {
        return TypeConvert.byteToFitUnit(byte);
      },

      openFullScreen(fileURL){
        this.fullScreenLoading = true;
        setTimeout(() => {
          window.open(this.baseURL + fileURL, '_blank');
          this.fullScreenLoading = false;
        }, 500);
      },

      goToDetails (id) {
        this.$router.push({name: 'MusicDetails', params: {id}})
      },

      deleteItem (id) {
        this.$axios.delete('/api/music/' + id).then(response => {
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
    computed: {
      // Only needs Music in this table
//      filterTableData() {
//        return this.data.filter(element => element.type === 'Music')
//      }
    }
  };
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
