<template>
  <div>
    <el-row style="margin-bottom: 10px">
      <el-button type="text" size="large">
        <i class="el-icon-arrow-left"></i> Back
      </el-button>
    </el-row>
    <el-row>
      <el-col :span="6">
        (pic)
      </el-col>
      <el-col :span="18">
        <div class="row"><h2>{{exact.title}}</h2></div>
        <div v-if="exact.year" class="row"><h6>{{exact.year}}</h6></div>
        <div class="row">{{exact.type}}</div>
        <div v-if="exact.episodes" class="row">{{exact.episodes.length}} episodes</div>
      </el-col>
    </el-row>

    <template v-if="exact.type === 'TVShows'">
      <h3>Episodes List</h3>
      <el-table :data="exact.episodes" stripe style="width: 100%">
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
            <el-button size="small" type="primary">
              <i class="el-icon-upload2"></i>&nbsp;Download
            </el-button>
            <el-button size="small" type="danger">
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
        exact: {}
      };
    },
    methods: {
      getTimeString (time) {
        return `${Math.floor(time / 3600)} hrs ${Math.floor((time % 3600) / 60)} mins ${(time % 3600) % 60} secs`;
      }
    },
    computed: {
      isTVShows () {
        return this.exact.type === 'TVShows';
      },
      isMovies () {
        return this.exact.type === 'Movies';
      },
    }
  };
</script>

<style>
  .row {
    margin-top: 10px;
  }
</style>
