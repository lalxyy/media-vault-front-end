<template>
  <div>
    <!-- TODO Temporary Top Menu in-page -->
    <el-row style="margin-bottom: 10px">
      <el-button type="text" size="large" @click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i> Back
      </el-button>
    </el-row>

    <!-- TODO Content (Details) -->
    <el-row :gutter="80">
      <!-- TODO Left -->
      <el-col :span="8">
        <div class="grid-content"></div>

        <el-row>
          <!-- TODO 旧代码的缩略图和文字部分 -->
          <!--<el-col :span="6" style="padding-right: 20px">-->
            <!--<img :src="exact.thumbnailURL" style="max-width: 100%" />-->
          <!--</el-col>-->
          <!--<el-col :span="18">-->
            <!--<div class="row"><h2>{{exact.title}}</h2></div>-->
            <!--<div v-if="exact.year" class="row"><h4>{{exact.year}}</h4></div>-->
            <!--<div class="row">{{exact.type}}</div>-->
            <!--<div v-if="exact.episodes" class="row">{{exact.episodes.length}} episodes</div>-->
          <!--</el-col>-->
        <!--</el-row>-->

          <img v-if="type !== 'photo'" :src="baseURL + exact.thumbnailURL" style="max-width: 100%" />
          <img v-else :src="baseURL + exact.fileURL" style="max-width: 100%" />
    </el-row>

      </el-col>

      <!-- TODO Right -->
      <el-col :span="16">
        <div class="grid-content"></div>
        <el-row>
          <div class="row"><h2>{{exact.title}}</h2></div>
          <!--<div v-if="exact.year" class="row"><h4>{{exact.year}}</h4></div>-->
          <div class="row">{{type.replace('-', ' ')}}</div>
          <div v-if="exact.episodes" class="row">{{exact.episodes.length}} Episodes</div>
          <div v-if="exact.duration" class="row">Duration: {{getTimeString(exact.duration)}}</div>
        </el-row>

        <el-row v-if="exact.plot">
          <h3>Plot</h3>
          <p>{{exact.plot}}</p>
        </el-row>

        <template v-if="type === 'tv-show'">
          <el-row>
            <el-col style="text-align: left" :span="12">
              <h3>Episodes List</h3>
            </el-col>
            <!--<el-col style="text-align: right" :span="12">-->
            <!--<div style="margin-top: 19px">-->
            <!--Editable <el-switch v-model="tvShowsTableEditable"></el-switch>-->
            <!--</div>-->
            <!--</el-col>-->
          </el-row>
          <el-table :data="exact.episodes" stripe style="width: 100%">
            <el-table-column v-if="tvShowsTableEditable" type="selection" width="55">
            </el-table-column>
            <el-table-column prop="season" label="Season" width="100"></el-table-column>
            <el-table-column prop="episode" label="Episode" width="100"></el-table-column>
            <el-table-column label="Duration" width="150">
              <template scope="scope">
                <!--{{getTimeString(scope.row.time)}}-->
              </template>
            </el-table-column>
            <el-table-column label="File Size" width="150">
              <template scope="scope">
                {{byteToFitUnit(scope.row.size)}}
              </template>
            </el-table-column>
            <el-table-column label="Operation">
              <template scope="scope">
                <el-button size="small" type="primary" @click="downloadFile(scope.row.fileURL)">
                  <i class="el-icon-upload2"></i>&nbsp;Download
                </el-button>
                <el-button size="small" type="danger" @click="deleteItem(scope.row.season, scope.row.episode)">
                  <i class="el-icon-delete2"></i>&nbsp;Delete
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>

      </el-col>
    </el-row>

  </div>
</template>

<script>
  import BaseURL from '@/utils/BaseURL';
  import TypeConvert from '@/utils/TypeConvert';
//  import tableData from '@/assets/data';

  export default {
    beforeMount () {
//      this.$axios.get('/api/tv-show').then(response => {
//        if (response.data.isSuccessful) {
//          this.tableData = response.data.data;
//        }
//      })
      this.getData();
    },
    data () {
      return {
        baseURL: BaseURL,
        id: parseInt(this.$route.params.id),
        type: '',
        exact: {},
        tvShowsTableEditable: false,
        tableData: []
      };
    },
    mounted () {
//      tableData.forEach(element => {
//        if (element.id === this.id) {
//          this.exact = element;
//        }
//      })
    },
    methods: {
      getData () {
        this.type = this.$route.path.split('/')[2];
        window.console.log(this.type);
        window.console.log('/api/' + this.type + '/' + this.id);
        this.$axios.get('/api/' + this.type + '/' + this.id).then(response => {
          if (response.data.isSuccessful) {
            this.exact = response.data.data;
          }
        });
      },
      byteToFitUnit (byte) {
        return TypeConvert.byteToFitUnit(byte);
      },
      getTimeString (time) {
        return `${Math.floor(time / 3600)} hrs ${Math.floor((time % 3600) / 60)} mins ${(time % 3600) % 60} secs`;
      },
      deleteItem (season, episode) {
        this.$axios.delete('/api/tv-show/' + this.exact.id + '/episode', {
          params: {
            season: season,
            episode: episode
          }
        }).then(response => {
          window.console.log(response);
          if (response.data.isSuccessful) {
            this.$message({
              type: 'success',
              message: "Succeed"
            });
          }
        });
//        this.$confirm('Are you sure to delete the item? ', 'Warning', {
//          confirmButtonText: 'Confirm',
//          cancelButtonText: 'Cancel',
//          type: 'warning'
//        }).then(() => {
//          this.$message({
//            type: 'success',
//            message: 'Succeeded'
//          });
//          this.getData();
//        })
      },
      downloadFile (fileURL) {
        window.open(this.baseURL + fileURL, '_blank');
      },
      deleteExactItem (itemId) {
        this.$axios.delete('/api/' + this.type + '/' + itemId).then(response => {
          if (response.data.isSuccessful) {
            this.$message({
              type: 'success',
              message: "Succeed"
            });

            this.$router.go(-1);
          }
        })
      }
    },
    computed: {
      //
    }
  };
</script>

<style>
  .row {
    margin-top: 10px;
  }

  .el-row {
    /*margin-bottom: 20px;*/
    /*margin-left: 40px;*/
  /*&:last-child {*/
     /*margin-bottom: 0;*/
   /*}*/
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
