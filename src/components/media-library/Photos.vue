<template>
  <div>
    <h2>Photos</h2>

    <!-- TODO Testing `Border-Card` Navigation -->
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label">List</span>

        <!-- Uses a table to show the data if `Music` -->
        <el-table :data="filterTableData" stripe style="width: 100%">
          <!-- TODO New Fields-->
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
            <template scope="scope">
              <!--<el-button size="small" type="primary">-->
              <!--<i class="el-icon-upload2"></i> Download-->
              <!--</el-button>-->
              <el-button :plain="true" type="info" size="small" @click="downloadFile(scope.row.fileURL)">
                Preview
              </el-button>
              <el-button size="small" type="danger" @click="deleteItem(scope.row.id)">
                <i class="el-icon-delete2"></i> Delete
              </el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-tab-pane>

      <!--<el-tab-pane label="Theater-like">-->
        <!--<template>-->
          <!--<el-carousel :interval="4000" type="card" height="600px">-->
            <!--<el-carousel-item v-for="item in filterTableData" :key="item">-->
              <!--&lt;!&ndash;<h3>{{ item }}</h3>&ndash;&gt;-->
              <!--<img style="width: 100%" :src="item.fileURL" class="image"/>-->
            <!--</el-carousel-item>-->
          <!--</el-carousel>-->
        <!--</template>-->
      <!--</el-tab-pane>-->

      <el-tab-pane label="Thumbnails">
        <el-row>
          <el-col :span="6" v-for="item in filterTableData" :key="o" :offset="index > 0 ? 2 : 0">
            <el-card :body-style="{ padding: '0px' }">
              <!--<img src="~examples/assets/images/hamburger.png" class="image">-->
              <!--<img src="../../../static/thumbnails/movies/a-clockwork-orange.jpg" class="image" width="200" height="200"/>-->
              <img :src="item.fileURL" class="image"/>
              <div style="padding: 14px;">
                <span>{{item.title}}</span>
                <div class="bottom clearfix">
                  <time class="time">{{ item.year }}</time>
                  <el-button type="text" class="button">Operations...</el-button>
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
  import data from '@/assets/data';
  import axios from 'axios';

  export default {
    data() {
      return {
        data: data,
        currentDate: new Date() // TODO Test for 卡片显示
      };
    },
    methods: {
      getTimeString (time) {
        return `${Math.floor(time / 3600)} hrs ${Math.floor(
          (time % 3600) / 60)} mins ${(time % 3600) % 60} secs`;
      },
      downloadFile (fileURL) {
        window.open(fileURL, '_blank');
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
    },
    computed: {
      // Only needs Music in this table
      filterTableData() {

        return this.data.filter(element => element.type === 'Photos')
      }
    }
  };
  // TODO https://github.com/mzabriskie/axios
  let instance = axios.create({
    baseURL: '/api/',
    timeout: 500
  });


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
</style>
