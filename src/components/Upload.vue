<template>
  <div>
    <h2>Upload</h2>
    <el-form ref="form" v-model="form" label-width="80px">
      <el-form-item label="Title">
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
      <template v-if="form.type !== 'TVShows'">
        <el-form-item label="Year">
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
        <div v-for="item in form.tvEpisodes" style="border: 2px">
          <el-row>
            <el-col :span="24" style="text-align: right; width: 700px">
              <i style="color: #8492a6" class="el-icon-delete"></i>
            </el-col>
          </el-row>
          <el-form-item label="Season">
            <el-input v-model="item.season" style="width: 500px"></el-input>
          </el-form-item>
          <el-form-item label="Episode">
            <el-input v-model="item.episode" style="width: 500px"></el-input>
          </el-form-item>
          <el-form-item label="File">
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">Drag Files Here or <em>Click to Upload</em></div>
              <div class="el-upload__tip" slot="tip">Only in jpg / png format, &lt; 500kb</div>
            </el-upload>
          </el-form-item>
        </div>
        <el-button type="text" @click="addTVEpisode">
          <i class="el-icon-plus"></i>&nbsp;&nbsp;Add Episode
        </el-button>
      </template>

      <el-row style="margin-top: 20px">
        <el-col :span="24">
          <el-button type="primary">Confirm</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import ElInput from '../../node_modules/element-ui/packages/input/src/input';
  export default {
    components: {ElInput},
    data () {
      return {
        form: {
          title: '',
          type: '',
          tvEpisodes: [],
          year: ''
        }
      };
    },
    methods: {
      addTVEpisode () {
        this.form.tvEpisodes.push({
          season: 0,
          episode: 0
        })
      }
    }
  }
</script>

<style>
  /**/
</style>
