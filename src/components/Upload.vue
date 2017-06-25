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
            <el-select v-model="calculateUnit" style="width: 100px" placeholder="Per...">
              <el-option label="GB" value="GB"></el-option>
              <el-option label="MB" value="MB"></el-option>
              <el-option label="KB" value="KB"></el-option>
              <el-option label="B" value="B"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Thumbnail">
            <el-upload
              class="upload-demo"
              list-type="picture-card"
              :show-file-list="false"
              :on-success="thumbnailUploadFinish"
              :action="baseURL + '/api/files/add'">
              <img v-if="form.thumbnailImageURL" :src="form.thumbnailImageURL" style="width: 100%"/>
              <i v-else class="el-icon-plus"></i>
              <!--<div class="el-upload__text">Drag Files Here or <em>Click to Upload</em></div>-->
              <!--<div class="el-upload__tip" slot="tip">Only in jpg / png format, &lt; 500kb</div>-->
            </el-upload>
          </el-form-item>

          <template v-if="form.type === 'Movies'">
            <el-form-item label="Duration" prop="duration">
              <el-input v-model="form.duration" style="width: 500px"></el-input>
            </el-form-item>
            <el-form-item label="Genre">
              <el-input v-model="rawGenres" style="width: 500px"></el-input>
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
              <el-input v-model="form.rating" style="width: 500px"></el-input>
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
            <el-button type="primary" @click="submit">Confirm</el-button>
          </el-form-item>
        </el-form>

      </el-tab-pane>
      <span slot="label"><i class="el-icon-menu"></i> Upload Episode to a Existing TV Show</span>

      <!--TODO-->

    </el-tabs>
  </div>
</template>

<script>
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
          }
        })
      },
      removeTVEpisode (item) {
        let index = this.form.tvEpisodes.indexOf(item);
        if (index > -1) {
          this.form.tvEpisodes.splice(index, 1);
        }
      },
      submit () {
        this.form.tvEpisodes.forEach(item => {
          delete item.onUploadFinish;
        });

        this.$refs['form'].validate(valid => {
          if (!valid) {
            this.$message.error('Some of the fields are not finished');
          } else {
            this.$message({
              message: 'Succeeded',
              type: 'success'
            });

            window.setTimeout(() => {
              this.$router.push({name: 'Home'});
            }, 100);
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
