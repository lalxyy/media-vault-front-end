<template>
  <div>
    <h2>Photos</h2>

    <!-- TODO Testing `Border-Card` Navigation -->
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"></i> Test Mode 1</span>

        <!-- Uses a table to show the data if `Music` -->
        <el-table :data="filterTableData" stripe style="width: 100%">
          <!-- Title -->
          <el-table-column prop="title" label="Title" width="300"></el-table-column>

          <!-- Year -->
          <el-table-column prop="year" label="Year" width="100"></el-table-column>

          <!-- Available Operations -->
          <el-table-column label="Operations">
            <template scope="scope">
              <!--<el-button size="small" type="primary">-->
              <!--<i class="el-icon-upload2"></i> Download-->
              <!--</el-button>-->
              <el-button :plain="true" type="info" size="small">Preview</el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-tab-pane>

      <!-- TODO Test Tab for new View-->
      <el-tab-pane label="剧场卡片化缩略图">
        <template>
          <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in 6" :key="item">
              <h3>{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </template>
      </el-tab-pane>

      <el-tab-pane label="卡片式缩略图">
        <el-row>
          <el-col :span="8" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
            <el-card :body-style="{ padding: '0px' }">
              <!--<img src="~examples/assets/images/hamburger.png" class="image">-->
              <!--<img src="../../../static/thumbnails/movies/a-clockwork-orange.jpg" class="image" width="200" height="200"/>-->
              <img src="../../../static/thumbnails/movies/a-clockwork-orange.jpg" class="image"/>
              <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                  <time class="time">{{ currentDate }}</time>
                  <el-button type="text" class="button">操作按钮</el-button>
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
      }
    },
    computed: {
      // Only needs Music in this table
      filterTableData() {
        return this.data.filter(element => element.type === 'Photos')
      }
    }
  };
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

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

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
