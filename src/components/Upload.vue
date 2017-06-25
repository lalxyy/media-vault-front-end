<template>
  <div>
    <h2>Upload</h2>
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
      <el-form-item label="Thumbnail">
        <el-upload
          class="upload-demo"
          list-type="picture-card"
          :show-file-list="false"
          action="/api/files/add">
          <i class="el-icon-plus"></i>
          <!--<div class="el-upload__text">Drag Files Here or <em>Click to Upload</em></div>-->
          <!--<div class="el-upload__tip" slot="tip">Only in jpg / png format, &lt; 500kb</div>-->
        </el-upload>
      </el-form-item>
      <template v-if="form.type !== 'TVShows'">
        <el-form-item label="Year" prop="year">
          <el-input v-model="form.year" style="width: 500px"></el-input>
        </el-form-item>
        <!--<template v-if="form.type === 'Music' || form.type === 'Movies'">-->
          <!--<el-form-item label="Duration">-->
            <!---->
          <!--</el-form-item>-->
        <!--</template>-->
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
              action="http://localhost:8080/api/files/add">
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
        form: {
          title: '',
          type: '',
          tvEpisodes: [],
          year: ''
        },
        rules: {
          title: [{
            validator: checkTitle,
            trigger: 'blur'
          }],
          year: [{
            validator: checkYear,
            trigger: 'blur'
          }]
        }
      };
    },
    methods: {
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
  /**/
</style>
