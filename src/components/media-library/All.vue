<template>
  <div>
    <h2>Entire Library</h2>
    <el-table :data="tableData" stripe style="width: 100%">
      <!-- Title -->
      <el-table-column label="Title" width="300" prop="title"></el-table-column>

      <!-- Type -->
      <el-table-column label="Type" width="100">
        <template scope="scope">
          {{scope.row.type}}
        </template>
      </el-table-column>

      <!-- (Total) File Size -->
      <el-table-column label="File Size" width="100">
        <template scope="scope">
          <!-- Uses `v-if` to judge the type of the operations-->
          <template v-if="scope.row.type === 'Movies'">
            {{scope.row.size.size}}&nbsp;{{scope.row.size.measure}}
          </template>
          <!-- Uses `v-else-if` -->
          <template v-else-if="scope.row.type === 'TVShows'">
            <!-- Needs to compute the total size of the TV shows-->
            {{computeTotalSize(scope.row.episodes).toFixed(2)}}&nbsp;{{scope.row.episodes[0].size.measure}}
            <!--{{computeTotalSize(scope.row.episodes).toFixed(2)}}&nbsp;{{'GB'}}-->
          </template>
          <!-- Filter Music -->

          <!-- Filter Photos -->

        </template>
      </el-table-column>

      <el-table-column label="Operations">
        <!-- Sets the scope to "scope" -->
        <template scope="scope">
          <!-- Uses `v-if` to judge the type of the operations-->
          <template v-if="scope.row.type === 'Movies'">
            <el-button size="small" type="primary">
              <i class="el-icon-upload2"></i> Download
            </el-button>
          </template>
          <!-- Uses `v-else-if` -->
          <template v-else-if="scope.row.type === 'TVShows'">
            <el-button size="small" type="primary">Details</el-button>
          </template>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
  import tableData from '@/assets/data'

  export default {
    data () {
      return {
        tableData: tableData
      }
    },
    methods: {
      computeTotalSize(episodes) {
        let totalSize = 0;
        episodes.forEach(episode => {
          totalSize += episode.size.size;
        })
        return totalSize;
      }
    }
  };
</script>

<style>
  /**/
</style>
