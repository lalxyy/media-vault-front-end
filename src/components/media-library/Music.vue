<template>
  <div>
    <h2>Music</h2>

    <!--<el-tabs type="border-card">-->
    <!--<el-tab-pane>-->
    <!--<span slot="label"><i class="el-icon-date"></i> 我的行程</span>-->
    <!--我的行程-->
    <!--</el-tab-pane>-->
    <!--<el-tab-pane label="消息中心">消息中心</el-tab-pane>-->
    <!--<el-tab-pane label="角色管理">角色管理</el-tab-pane>-->
    <!--<el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>-->
    <!--</el-tabs>-->

    <!-- TODO Testing `Border-Card` Navigation -->
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"></i> Test Mode 1</span>

        <!-- Uses a table to show the data if `Music` -->
        <el-table :data="filterTableData" stripe style="width: 100%">
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
          <el-table-column prop="duration" label="Duration" width="200">
            <template scope="scope">
              {{getTimeString(scope.row.time)}}
            </template>
          </el-table-column>

          <!-- TODO 感觉音乐应该用不着显示体积？都差不多 -->
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
              <el-button size="small" type="primary">
                <i class="el-icon-upload2"></i> Download
              </el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-tab-pane>
      <el-tab-pane label="消息中心">消息中心</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
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
  import data from '@/assets/data';

  export default {
    data() {
      return {
        data
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
        return this.data.filter(element => element.type === 'Music')
      }
    }
  };
</script>
