<template>
  <div>
    <!--<h1>Music</h1>-->
    <el-menu mode="horizontal" theme="dark" style="margin-top: 20px">
      <div class="mediaTitle">
        Music
      </div>
    </el-menu>

    <!-- TODO Testing `Border-Card` Navigation -->
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-information"></i> View in List Mode</span>

        <!-- Uses a table to show the data if `Music` -->
        <el-table :data="tableData" stripe style="width: 100%">
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
              {{scope.row.duration}}
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
              <el-button size="small" type="primary"
                         @click="openFullScreen()"
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
//  import data from '@/assets/data';

  export default {
    beforeMount () {
      this.load()
    },
    data() {
      return {
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
        return `${Math.floor(time / 3600)} hrs ${Math.floor(
          (time % 3600) / 60)} mins ${(time % 3600) % 60} secs`;
      },

      openFullScreen(){
        this.fullScreenLoading = true;
        setTimeout(() => {
          this.fullScreenLoading = false;
        }, 500);
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

<style>
  .mediaTitle {
    font-size: 26px;
    padding-top: 14px;
    padding-bottom: 15px;
    padding-left: 30px;
    color: #FAFAFA;
  }
</style>
