<template>
  <div>
    <el-menu mode="horizontal" theme="dark" style="margin-top: 20px">
      <div class="mediaTitle">
        Photos
      </div>
    </el-menu>

    <!-- TODO Testing `Border-Card` Navigation -->
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-information"></i> View in List Mode</span>

        <!-- Uses a table to show the data if `Music` -->
        <el-table :data="tableData" stripe style="width: 100%">
          <!-- TODO New Fields-->
          <!-- Basic (extends from Media) -->
          <el-table-column prop="title" label="Title" width="300">
            <template scope="scope">
              {{scope.row.title}}
            </template>
          </el-table-column>
          <!--<el-table-column prop="rating" label="Rating" width="100">-->
            <!--<template scope="scope">-->
              <!--{{scope.row.rating}}-->
            <!--</template>-->
          <!--</el-table-column>-->


          <!-- Size (extends from Media) -->
          <el-table-column prop="size" label="File Size" width="100">
            <template scope="scope">
              {{byteToFitUnit(scope.row.size)}}
              <!-- 旧版 -->
              <!--{{scope.row.size.size}}&nbsp;{{scope.row.size.measure}}-->
            </template>
          </el-table-column>

          <!-- Available Operations -->
          <!-- TODO 没用加载界面 `, openFullScreen()` -->
          <el-table-column label="Operations">
            <template scope="scope">
              <!--<el-button size="small" type="primary">-->
              <!--<i class="el-icon-upload2"></i> Download-->
              <!--</el-button>-->
              <el-button :plain="true" type="info" size="small"
                         @click="downloadFile(scope.row.fileURL)"
                         v-loading.fullscreen.lock="fullScreenLoading">
                Preview
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

        <el-row style="margin: 10px">
          <el-col :span="24" v-if="tableData.length == 0" style="text-align: center; color: #8c939d">
            No Data
          </el-col>
          <el-col :span="6" v-for="item in tableData" :key="o" :offset="index > 0 ? 2 : 0">
            <el-card :body-style="{ padding: '0px' }">
              <!--<img src="~examples/assets/images/hamburger.png" class="image">-->
              <!--<img src="../../../static/thumbnails/movies/a-clockwork-orange.jpg" class="image" width="200" height="200"/>-->
              <img :src="baseURL + item.fileURL" class="image"/>
              <div style="padding: 14px;">
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
  import TypeConvert from '@/utils/TypeConvert';
  import BaseURL from '@/utils/BaseURL';

  export default {
    beforeMount () {
      this.load();
    },
    data() {
      return {
        baseURL: BaseURL,
        tableData: [],
        currentDate: new Date(), // TODO Test for 卡片显示
        fullScreenLoading: false
      };
    },
    methods: {
      load () {
        this.$axios('/api/photo').then(response => {
          if (response.data.isSuccessful) {
            this.tableData = response.data.data;
          }
        });
      },
      getTimeString (time) {
        return TypeConvert.durationToHMS(time);
      },
      byteToFitUnit (byte) {
        return TypeConvert.byteToFitUnit(byte);
      },
      downloadFile (fileURL) {
        window.open(baseURL + fileURL, '_blank');
      },
      deleteItem (id) {
        this.$axios.delete('/api/photo/' + id).then(response => {
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

      goToDetails (id) {
        this.$router.push({name: 'PhotoDetails', params: {id}})
      },

      openFullScreen(){
        this.fullScreenLoading = true;
        setTimeout(() => {
          this.fullScreenLoading = false;
        }, 500);
      }
    },
    computed: {
      // Only needs Music in this table
//      filterTableData() {
//
//        return this.data.filter(element => element.type === 'Photos')
//      }
    }
  };
  // TODO https://github.com/mzabriskie/axios
  //  let instance = axios.create({
  //    baseURL: '/api/',
  //    timeout: 500
  //  });


</script>

<style>
  /* For 剧场式卡片化显示 测试 */
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  /*.el-carousel__item:nth-child(2n) {*/
  /*background-color: #99a9bf;*/
  /*}*/

  /*.el-carousel__item:nth-child(2n+1) {*/
  /*background-color: #d3dce6;*/
  /*}*/

  /* For 卡片式显示 测试 */
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    /*max-width: 200px;*/
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .mediaTitle {
    font-size: 26px;
    padding-top: 14px;
    padding-bottom: 15px;
    padding-left: 30px;
    color: #FAFAFA;
  }
</style>
