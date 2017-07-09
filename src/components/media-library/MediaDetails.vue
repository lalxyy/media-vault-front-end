<template>
  <div>
    <!-- TODO Temporary Top Menu in-page -->
    <el-row style="margin-bottom: 10px">
      <el-button type="text" size="large" @click="goBack()"
                 v-loading.fullscreen.lock="fullScreenLoading">
        <i class="el-icon-arrow-left"></i> Back
      </el-button>
    </el-row>

    <!-- TODO Content (Details) -->
    <el-row :gutter="80">
      <!-- TODO Left -->
      <el-col :span="8">
        <div class="grid-content"></div>

        <el-row>
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

          <img v-if="type !== 'photo'" :src="baseURL + exact.thumbnailURL"
               style="max-width: 100%"/>
          <img v-else :src="baseURL + exact.fileURL" style="max-width: 100%"/>
        </el-row>

      </el-col>

      <!-- TODO Right -->
      <el-col :span="16">
        <div class="grid-content"></div>
        <el-row>
          <div class="row"><h2 style="display: inline">{{exact.title}}</h2>&nbsp;&nbsp;&nbsp;&nbsp;<el-button type="primary" @click="toggleEditDialog" style="margin-bottom: 5px"><i class="el-icon-edit"></i> Edit</el-button></div>
          <!--<div v-if="exact.year" class="row"><h4>{{exact.year}}</h4></div>-->
          <div class="row">{{displayTypeString}}</div>
          <div v-if="exact.episodes" class="row">{{exact.episodes.length}} Episodes</div>
          <div v-if="exact.duration" class="row">Duration: {{getTimeString(
            exact.duration)}}
          </div>
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
            <el-table-column v-if="tvShowsTableEditable" type="selection"
                             width="55">
            </el-table-column>
            <el-table-column prop="season" label="Season"
                             width="100"></el-table-column>
            <el-table-column prop="episode" label="Episode"
                             width="100"></el-table-column>
            <el-table-column label="Duration" width="150">
              <template scope="scope">
                {{getTimeString(scope.row.duration)}}
              </template>
            </el-table-column>
            <el-table-column label="File Size" width="150">
              <template scope="scope">
                {{byteToFitUnit(scope.row.size)}}
              </template>
            </el-table-column>
            <el-table-column label="Operation" style="min-width: 250px">
              <template scope="scope">
                <el-button size="small" type="primary"
                           @click="downloadFile(scope.row.fileURL)">
                  <i class="el-icon-upload2"></i>&nbsp;Download
                </el-button>
                <el-button size="small" type="danger"
                           @click="deleteItem(scope.row.season, scope.row.episode)">
                  <i class="el-icon-delete2"></i>&nbsp;Delete
                </el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-row>
            <el-col :span="12" style="text-align: left">
              <h3>Actors</h3>
            </el-col>
          </el-row>
          <el-row style="padding: 10px">
            <el-col :span="8" v-for="(item, $index) in exact.actors"
                    :key="item.id" :offset="0">
              <el-card :body-style="{padding: '0'}" style="width: 230px">
                <img :src="item.thumbURL" style="width: 230px"/>
                <div style="padding: 14px; margin-top: 10px">
                  <span>{{item.name}}</span>
                  <p style="color: #5e7382">{{item.role}}</p>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </template>

      </el-col>
    </el-row>

    <el-dialog title="Edit" :visible.sync="editDialogVisible" @close="editDialogClose">
      <el-form ref="editForm" :model="exact" label-width="80px">
        <el-form-item label="Title">
          <el-input v-model="exact.title"></el-input>
        </el-form-item>
        <!--<el-form-item v-if="type !== 'tv-show'" label="Duration">-->
          <!--<el-input v-model="hour"></el-input>-->
          <!--Hour&nbsp;&nbsp;-->
          <!--<el-input v-model="minute"></el-input>-->
          <!--Minute&nbsp;&nbsp;-->
          <!--<el-input v-model="second"></el-input>-->
          <!--Second-->
        <!--</el-form-item>-->
        <el-form-item v-if="type !== 'Photo'" label="Rating">
          <el-rate v-model="exact.rating" style="margin-top: 8px"
                   :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
        </el-form-item>
        <el-form-item v-if="type !== 'tv-show'" label="Size">
          <el-input v-model="size" style="width: 390px"></el-input>
          <el-select v-model="sizeUnit" style="width: 106px"
                     placeholder="Per...">
            <el-option label="GB" value="GB"></el-option>
            <el-option label="MB" value="MB"></el-option>
            <el-option label="KB" value="KB"></el-option>
            <el-option label="B" value="B"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="type === 'tv-show' ? 'Runtime' : 'Duration'">
          <!--<el-input v-model="form.runtime" style="width: 500px"></el-input>-->
          <el-input v-model="hour"
            style="width: 114px"></el-input>
          Hour
          &nbsp;&nbsp;
          <el-input v-model="minute"
            style="width: 114px"></el-input>
          Minute
          &nbsp;&nbsp;
          <el-input v-model="second"
            style="width: 114px"></el-input>
          Second
        </el-form-item>
        <el-form-item v-if="type === 'tv-show'" label="MPAA">
          <el-input v-model="exact.mpaa" style="width: 500px"></el-input>
        </el-form-item>
        <el-form-item v-if="type === 'tv-show'" label="Premiered">
          <el-input v-model="exact.premiered"
            style="width: 500px"></el-input>
        </el-form-item>
        <el-form-item v-if="type === 'tv-show'" label="Studio">
          <el-input v-model="exact.studio" style="width: 500px;"></el-input>
        </el-form-item>
        <el-form-item v-if="type === 'tv-show' || type === 'movie'"
                      label="Plot">
          <el-input v-model="exact.plot" type="textarea" :rows="5"
                    style="width: 500px"></el-input>
        </el-form-item>
        <el-form-item v-if="type === 'tv-show' || type === 'movie'"
                      label="Genre">
          <el-input v-model="genres" style="width: 500px"></el-input>
          <div class="el-upload__tip">Split by commas (,)</div>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="editSubmit">Confirm</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
        fullScreenLoading: false,
        baseURL: BaseURL,
        id: parseInt(this.$route.params.id),
        type: '',
        exact: {},
        tvShowsTableEditable: false,
        tableData: [],
        editDialogVisible: false,
        sizeUnit: ''
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
        return `${Math.floor(time / 3600)} hrs ${Math.floor(
          (time % 3600) / 60)} mins ${(time % 3600) % 60} secs`;
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

            this.getData();
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
        this.$axios.delete('/api/' + this.type + '/' + itemId).
          then(response => {
            if (response.data.isSuccessful) {
              this.$message({
                type: 'success',
                message: "Succeed"
              });
              this.$router.go(-1);
            }
          })
      },
      goBack() {
        // TODO Delay Loading Testing
        this.fullScreenLoading = true;
        setTimeout(() => {
          this.$router.go(-1)
          this.fullScreenLoading = false;
        }, 300);
      },
      toggleEditDialog () {
        this.editDialogVisible = true;
      },
      editSubmit () {
        window.console.log('edit submit start');
        this.$axios.put('/api/' + this.type + '/' + this.exact.id, this.exact).
          then(response => {
            window.console.log(response.data);
            if (response.data.isSuccessful) {
              this.$message({
                type: 'success',
                message: 'Succeeded'
              });
              this.$router.go(0);
            } else {
              this.$message.error('Error in editing media. Please try again.');
            }
          });
      },
      editDialogClose () {
        this.$router.go(0);
      },
      changeSizeUnit (newValue) {
        this.sizeUnit = newValue;
      }
    },
    computed: {
      displayTypeString () {
        switch (this.type) {
          case 'movie':
            return 'Movie';
          case 'tv-show':
            return 'TV Show';
          case 'music':
            return 'Music';
          case 'photo':
            return 'Photo';
          default:
            return '';
        }
      },
      hour: {
        get () {
          if (this.type === 'tv-show') {
            return Math.floor(this.exact.runtime / 3600);
          } else {
            return Math.floor(this.exact.duration / 3600);
          }
        },
        set (newValue) {
          let time = this.type === 'tv-show' ? this.exact.runtime : this.exact.duration;
          let tmp = time % 3600;
          time = newValue * 3600 + tmp;
        }
      },
      minute: {
        get () {
          if (this.type === 'tv-show') {
            return Math.floor((this.exact.runtime % 3600) / 60);
          } else {
            return Math.floor((this.exact.duration % 3600) / 60);
          }
        },
        set (newValue) {
          let time = this.type === 'tv-show' ? this.exact.runtime : this.exact.duration;
          let hour = Math.floor(time / 3600);
          let minute = newValue;
          let second = (time % 3600) % 60;
          time = hour * 3600 + minute * 60 + second;
        }
      },
      second: {
        get () {
          if (this.type === 'tv-show') {
            return (this.exact.runtime % 3600) % 60;
          } else {
            return (this.exact.duration % 3600) % 60;
          }
        },
        set (newValue) {
          let time = this.type === 'tv-show' ? this.exact.runtime : this.exact.duration;
          let hour = Math.floor(time / 3600);
          let minute = Math.floor((time % 3600) / 60);
          time = hour * 3600 + minute * 60 + newValue;
        }
      },
      size: {
        get () {
          switch (this.sizeUnit) {
            case 'GB':
              return this.exact.size / 1000 / 1000 / 1000;
            case 'MB':
              return this.exact.size / 1000 / 1000;
            case 'KB':
              return this.exact.size / 1000;
            default:
              return this.exact.size;
          }
        },
        set (newValue) {
          switch (this.sizeUnit) {
            case 'GB':
              this.exact.size = 1000 * 1000 * 1000 * newValue;
              break;
            case 'MB':
              this.exact.size = 1000 * 1000 * newValue;
              break;
            case 'KB':
              this.exact.size = 1000 * newValue;
              break;
            default:
              this.exact.size = newValue;
              break;
          }
        }
      },
      genres: {
        get () {
          let result = '';
          for (let i = 0; i < this.exact.genres.length; ++i) {
            if (i === this.exact.genres.length - 1) {
              result += this.exact.genres[i];
            } else {
              result += (this.exact.genres[i] + ', ');
            }
          }
          return result;
        },
        set (newValue) {
          this.exact.genres = newValue.split(',').map(item => item.trim());
        }
      }
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
