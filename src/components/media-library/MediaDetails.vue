<template>
  <div>
    <el-row style="margin-bottom: 10px">
      <el-button type="text" size="large" @click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i> Back
      </el-button>
    </el-row>
    <el-row>
      <el-col :span="6" style="padding-right: 20px">
        <img :src="exact.thumbnailURL" style="max-width: 100%" />
      </el-col>
      <el-col :span="18">
        <div class="row"><h2>{{exact.title}}</h2></div>
        <div v-if="exact.year" class="row"><h4>{{exact.year}}</h4></div>
        <div class="row">{{exact.type}}</div>
        <div v-if="exact.episodes" class="row">{{exact.episodes.length}} episodes</div>
      </el-col>
    </el-row>

    <template v-if="exact.type === 'TVShows'">
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
        <el-table-column label="Duration" width="200">
          <template scope="scope">
            {{getTimeString(scope.row.time)}}
          </template>
        </el-table-column>
        <el-table-column label="File Size" width="150">
          <template scope="scope">
            {{scope.row.size.size}}&nbsp;{{scope.row.size.measure}}
          </template>
        </el-table-column>
        <el-table-column label="Operation">
          <template scope="scope">
            <el-button size="small" type="primary" @click="downloadFile(scope.row.fileURL)">
              <i class="el-icon-upload2"></i>&nbsp;Download
            </el-button>
            <el-button size="small" type="danger" @click="deleteItem(scope.row)">
              <i class="el-icon-delete2"></i>&nbsp;Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
  import tableData from '@/assets/data';

  export default {
    mounted () {
      tableData.forEach(element => {
        if (element.id === this.id) {
          this.exact = element;
        }
      })
    },
    data () {
      return {
        id: parseInt(this.$route.params.id),
        exact: {},
        tvShowsTableEditable: false
      };
    },
    methods: {
      beforeRouteUpdate (to, from, next) {
        tableData.forEach(element => {
          if (element.id === to.params.id) {
            this.exact = element;
          }
        })
        next()
      },
      getTimeString (time) {
        return `${Math.floor(time / 3600)} hrs ${Math.floor((time % 3600) / 60)} mins ${(time % 3600) % 60} secs`;
      },
      deleteItem (id) {
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
      downloadFile (fileURL) {
        window.open(fileURL, '_blank');
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
</style>
