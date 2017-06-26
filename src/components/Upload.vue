<template>
  <div>
    <!--<h2>Upload</h2>-->
    <el-menu mode="horizontal" theme="dark" style="margin-top: 20px">
      <div class="mediaTitle">
        Upload
      </div>
    </el-menu>


    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-information"></i> Upload (general) Media File</span>

        <el-form ref="form" :rules="rules" :model="form" label-width="80px">
          <el-form-item label="Title" prop="title">
            <el-input v-model="form.title" style="width: 500px"></el-input>
          </el-form-item>
          <el-form-item label="Type">
            <el-select v-model="form.type" style="width: 500px" placeholder="Movie / TV Shows / ...">
              <el-option label="Movie" value="Movies"></el-option>
              <el-option label="TV Show" value="TVShows"></el-option>
              <el-option label="Photo" value="Photos"></el-option>
              <el-option label="Music" value="Music"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="form.type !== 'TVShows'" label="Size">
            <el-input v-model="rawSize" style="width: 390px"></el-input>
            <el-select v-model="calculateUnit" style="width: 106px" placeholder="Per...">
              <el-option label="GB" value="GB"></el-option>
              <el-option label="MB" value="MB"></el-option>
              <el-option label="KB" value="KB"></el-option>
              <el-option label="B" value="B"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Thumbnail">
            <div style="max-height: 700px">
              <el-upload
                class="upload-demo"
                list-type="picture-card"
                :show-file-list="false"
                :on-error="fileUploadError"
                :on-success="thumbnailUploadFinish"
                style="max-height: 700px"
                :action="baseURL + '/api/files/add'">
                <img v-if="form.thumbnailImageURL" :src="form.thumbnailImageURL" style="height: 100%"/>
                <i v-else class="el-icon-plus"></i>
                <!--<div class="el-upload__text">Drag Files Here or <em>Click to Upload</em></div>-->
              </el-upload>
              <div class="el-upload__tip">Only in jpg / png format, &lt; 500kb</div>
            </div>
          </el-form-item>

          <template v-if="form.type === 'Movies'">
            <el-form-item label="Duration" prop="duration">
              <el-input v-model="form.duration" style="width: 500px"></el-input>
            </el-form-item>
            <el-form-item label="Genre">
              <el-input v-model="rawGenres" style="width: 500px"></el-input>
              <div class="el-upload__tip">Split by commas (,)</div>
            </el-form-item>
            <el-form-item label="Plot">
              <el-input type="textarea" :rows="5" v-model="form.plot" style="width: 500px"></el-input>
            </el-form-item>
          </template>

          <template v-if="form.type === 'Music'">
            <el-form-item label="Duration" prop="duration">
              <el-input v-model="form.duration" style="width: 500px"></el-input>
            </el-form-item>
          </template>

          <template v-if="form.type !== 'Photos'">
            <el-form-item label="Rating" prop="rating">
              <!--<el-input v-model="form.rating" style="width: 500px"></el-input>-->
              <el-rate
                v-model="form.rating"
                style="margin-top: 8px"
                :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
              </el-rate>
            </el-form-item>
          </template>

          <template v-if="form.type !== 'TVShows'">
            <el-form-item label="File">
              <div style="max-width: 500px">
                <el-upload
                  class="upload-demo"
                  list-type="text"
                  :show-file-list="true"
                  :on-success="fileUploadFinish"
                  :on-error="fileUploadError"
                  :auto-upload="true"
                  :multiple="false"
                  :accept="MIMEType"
                  drag
                  :action="baseURL + '/api/files/add'">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">Drag Files Here or <em>Click to Upload</em></div>
                </el-upload>
              </div>
            </el-form-item>
          </template>

          <template v-if="form.type === 'TVShows'">
            <h3>Episodes</h3>
            <div v-for="(item, $index) in form.tvEpisodes" style="border: 2px">
              <el-row>
                <el-col :span="24" style="text-align: right; width: 700px">
                  <a @click="removeTVEpisode(item)"><i style="color: #8492a6" class="el-icon-delete"></i></a>
                </el-col>
              </el-row>
              <el-form-item :prop="'tvEpisodes[' + $index + '].season'" label="Season" :rules="[
                {required: true, message: 'Season should be specified'}
              ]">
                <el-input v-model="item.season" style="width: 500px"></el-input>
              </el-form-item>
              <el-form-item :prop="'tvEpisodes[' + $index + '].episode'" label="Episode" :rules="[
              {required: true, message: 'Episode should be specified'}
          ]">
                <el-input v-model="item.episode" style="width: 500px"></el-input>
              </el-form-item>
              <el-form-item label="File">
                <el-upload
                  drag
                  :on-success="item.onUploadFinish"
                  :on-error="fileUploadError"
                  :show-file-list="false"
                  :action="baseURL + '/api/files/add'">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">Drag Files Here or <em>Click to Upload</em></div>
                  <div class="el-upload__tip" slot="tip">Video Format, &lt; 100 GB</div>
                </el-upload>
              </el-form-item>
            </div>
            <el-button type="text" @click="addTVEpisode">
              <i class="el-icon-plus"></i>&nbsp;&nbsp;Add Episode
            </el-button>
          </template>

          <el-form-item label="" style="margin-top: 30px">
            <el-button type="primary" @click="submit()">Confirm</el-button>
          </el-form-item>
        </el-form>

      </el-tab-pane>
      <span slot="label"><i class="el-icon-menu"></i> Upload Episode to a Existing TV Show</span>

    </el-tabs>
  </div>
</template>

<script>
  import TypeConvert from '@/utils/TypeConvert';

  export default {
    data () {
      // Form Validator
      let checkTitle = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("Title can't be empty"));
        }
      };
      let checkYear = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("Year can't be empty"));
        }
      }

      return {
        baseURL: 'http://localhost:8080',
        form: {
          title: '',
          type: '',
          tvEpisodes: [],
          thumbnailImageURL: '',
          fileURL: '',
          size: 0,
          duration: '',
          plot: '',
          rating: 0
        },
        rawSize: 0,
        calculateUnit: '',
        rawGenres: '',
        rules: {
          title: [{
            validator: checkTitle,
            trigger: 'blur'
          }]
        }
      };
    },
    computed: {
      /**
       * @return {string}
       */
      MIMEType () {
        switch (this.form.type) {
          case 'Movies':
            return 'video/*';
          case 'Photos':
            return 'image/*';
          case 'Music':
            return 'audio/*';
          case 'TVShow':
            return 'video/*';
          default:
            return '';
        }
      },
      exactSize () {
        switch (this.calculateUnit) {
          case 'MB':
            return Number(this.rawSize) * 1000 * 1000;
          case 'KB':
            return Number(this.rawSize) * 1000;
          case 'GB':
            return Number(this.rawSize) * 1000 * 1000 * 1000;
          default:
            return Number(this.rawSize);
        }
      }
    },
    methods: {
      thumbnailUploadFinish (res, file) {
        window.console.log(res);
        this.form.thumbnailImageURL = this.baseURL + res.data.url;
      },
      addTVEpisode () {
        this.form.tvEpisodes.push({
          season: 0,
          episode: 0,
          uploadFileURL: '',
          onUploadFinish: (res, file, fileList) => {
            window.console.log(res);
            this.uploadFileURL = res.data.url;
          }
        })
      },
      removeTVEpisode (item) {
        let index = this.form.tvEpisodes.indexOf(item);
        if (index > -1) {
          this.form.tvEpisodes.splice(index, 1);
        }
      },
      fileUploadFinish (res, file) {
        if (res.isSuccessful) {
          this.form.fileURL = res.data.url;
        }
      },
      fileUploadError (error, file, fileList) {
        this.$message.error('File Not Acceptable or Server Error');
      },
      submit () {
        window.console.log('submit');
        this.form.tvEpisodes.forEach(item => {
          delete item.onUploadFinish;
        });

        this.$refs['form'].validate(valid => {
          if (!valid) {
            this.$message.error('Some of the fields are not finished');
            window.console.log("validation failed");
          } else {
            window.console.log("start networking");
            this.$axios.post('/api/' + TypeConvert.legalTypeToURLType(this.form.type), {
              title: this.form.title,
              size: this.exactSize,
              thumbnailURL: this.form.thumbnailURL,
              formURL: this.form.fileURL,
              rating: this.form.rating,
              genre: this.rawGenres.split(','),
            }).then(response => {
              if (response.data.isSuccessful) {
                this.$message({
                  message: 'Succeeded',
                  type: 'success'
                });
//                window.setTimeout(() => {
//                  this.$router.push({name: 'Home'});
//                }, 100);
              } else {
                this.$message.error('Error in uploading. Please refresh the page and try again.');
              }
            });
          }
        });
      }
    }
  }
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
