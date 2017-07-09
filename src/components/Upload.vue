<template>
  <div>
    <!--<h2>Upload</h2>-->
    <el-menu mode="horizontal" theme="dark" style="margin-top: 20px">
      <div class="mediaTitle">
        Upload
      </div>
    </el-menu>

    <el-tabs type="border-card" v-model="activeTab" @tab-click="tabChange">
      <el-tab-pane name="main">
        <span slot="label"><i class="el-icon-information"></i> Upload (general) Media File</span>

        <el-form ref="form" :rules="rules" :model="form" label-width="100px">
          <h3 style="margin-top: 5px">Upload Media File</h3>

          <el-form-item label="Title">
            <el-input v-model="form.title" style="width: 500px"></el-input>
          </el-form-item>
          <el-form-item label="Type">
            <el-select v-model="form.type" style="width: 500px"
                       placeholder="Movie / TV Shows / ...">
              <el-option label="Movie" value="Movies"></el-option>
              <el-option label="TV Show" value="TVShows"></el-option>
              <el-option label="Photo" value="Photos"></el-option>
              <el-option label="Music" value="Music"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="form.type !== 'Photos'" :label="form.type === 'TVShows' ? 'Runtime' : 'Duration'">
            <el-input v-model="durationHour"
                      style="width: 114px"></el-input>
            Hour
            &nbsp;&nbsp;
            <el-input v-model="durationMinute"
                      style="width: 114px"></el-input>
            Minute
            &nbsp;&nbsp;
            <el-input v-model="durationSecond"
                      style="width: 114px"></el-input>
            Second
          </el-form-item>
          <el-form-item v-if="form.type !== 'TVShows'" label="Size">
            <el-input v-model="rawSize" style="width: 390px"></el-input>
            <el-select v-model="calculateUnit" style="width: 106px"
                       placeholder="Per...">
              <el-option label="GB" value="GB"></el-option>
              <el-option label="MB" value="MB"></el-option>
              <el-option label="KB" value="KB"></el-option>
              <el-option label="B" value="B"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="form.type !== 'Photos'" label="Thumbnail">
            <div style="max-height: 700px">
              <el-upload
                class="upload-demo"
                ref="thumbnailUpload"
                list-type="picture-card"
                :show-file-list="false"
                :on-error="fileUploadError"
                :on-success="thumbnailUploadFinish"
                style="max-height: 700px"
                :action="baseURL + '/api/files/add'">
                <img v-if="form.thumbnailImageURL"
                     :src="baseURL + form.thumbnailImageURL"
                     style="height: 100%"/>
                <i v-else class="el-icon-plus"></i>
                <!--<div class="el-upload__text">Drag Files Here or <em>Click to Upload</em></div>-->
              </el-upload>
              <div class="el-upload__tip">Only in jpg / png format, &lt; 500kb
              </div>
            </div>
          </el-form-item>

          <template v-if="form.type === 'Movies' || form.type === 'TVShows'">
            <!--<el-form-item label="Duration" prop="duration">-->
            <!--<el-input v-model="form.duration" style="width: 500px"></el-input>-->
            <!--</el-form-item>-->
            <el-form-item label="Genre">
              <el-input v-model="rawGenres" style="width: 500px"></el-input>
              <div class="el-upload__tip">Split by commas (,)</div>
            </el-form-item>
            <el-form-item label="Plot">
              <el-input type="textarea" :rows="5" v-model="form.plot"
                        style="width: 500px"></el-input>
            </el-form-item>
          </template>

          <!--<template v-if="form.type === 'Music'">-->
            <!--<el-form-item label="Duration" prop="duration">-->
              <!--<el-input v-model="form.duration" style="width: 500px"></el-input>-->
            <!--</el-form-item>-->
          <!--</template>-->

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
                  ref="fileUpload"
                  :show-file-list="true"
                  :on-success="fileUploadFinish"
                  :on-error="fileUploadError"
                  :auto-upload="true"
                  :multiple="false"
                  :accept="MIMEType"
                  drag
                  :action="baseURL + '/api/files/add'">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">Drag Files Here or <em>Click to Upload</em>
                  </div>
                </el-upload>
              </div>
            </el-form-item>
          </template>

          <template v-if="form.type === 'TVShows'">
            <!--<el-form-item label="Runtime">-->
              <!--&lt;!&ndash;<el-input v-model="form.runtime" style="width: 500px"></el-input>&ndash;&gt;-->
              <!--<el-input v-model="runtime.hour"-->
                        <!--style="width: 114px"></el-input>-->
              <!--Hour-->
              <!--&nbsp;&nbsp;-->
              <!--<el-input v-model="runtime.minute"-->
                        <!--style="width: 114px"></el-input>-->
              <!--Minute-->
              <!--&nbsp;&nbsp;-->
              <!--<el-input v-model="runtime.second"-->
                        <!--style="width: 114px"></el-input>-->
              <!--Second-->
            <!--</el-form-item>-->
            <el-form-item label="MPAA">
              <el-input v-model="form.mpaa" style="width: 500px"></el-input>
            </el-form-item>
            <el-form-item label="Premiered">
              <el-input v-model="form.premiered"
                        style="width: 500px"></el-input>
            </el-form-item>
            <el-form-item label="Studio">
              <el-input v-model="form.studio" style="width: 500px;"></el-input>
            </el-form-item>
          </template>

          <template v-if="form.type === 'TVShows'">
            <h3>Episodes</h3>
            <h4 style="margin-left: 20px">
              The functionality is put in a separate tab. Please add episodes in the second tab.
            </h4>

            <h3>Actors</h3>
            <template v-for="(actor, $index) in form.actors">
              <div style="text-align: right; max-width: 650px; margin-bottom: 10px">
                <a @click="removeActor($index)"><i style="color: #8492a6"
                                                   class="el-icon-delete"></i></a>
              </div>
              <el-form-item label="Name">
                <el-input v-model="actor.name" style="width: 500px"></el-input>
              </el-form-item>
              <el-form-item label="Role">
                <el-input v-model="actor.role" style="width: 500px"></el-input>
              </el-form-item>
              <el-form-item label="ThumbnailURL">
                <el-input v-model="actor.thumbURL"
                          style="width: 500px"></el-input>
                <div class="el-upload__tip">
                  The Link to the Avatar of the Actor
                </div>
              </el-form-item>
            </template>
            <el-button type="text" size="large" @click="addActor">
              <i class="el-icon-plus"></i> Add Actor
            </el-button>
          </template>

          <el-form-item label="" style="margin-top: 30px">
            <el-button type="primary" @click="submit()">Confirm</el-button>
          </el-form-item>
        </el-form>

      </el-tab-pane>
      <el-tab-pane name="episodes">
        <span slot="label"><i class="el-icon-menu"></i> Upload Episode to a Existing TV Show</span>

        <div>
          <h3>Step 1: Choose TV Show to add Episodes</h3>
          <el-select v-model="activeTVShow" :disabled="tvShowChooseDisabled"
                     :placeholder="tvShowChoosePlaceholder" style="width: 700px"
                     @change="chooseTVShow">
            <el-option v-for="item in tvShows" :key="item.id"
                       :label="item.title" :value="item.id"></el-option>
          </el-select>
        </div>

        <div v-if="tvShowStep1Finished" style="margin-top: 60px">
          <h3>Step 2: Add Episodes</h3>

          <el-dialog title="Add Episode"
                     :visible.sync="addEpisodeDialogVisible">
            <el-form ref="tvEpisodeForm" :model="tvEpisodeForm"
                     label-width="80px">
              <el-form-item label="Title"
                            :rules="[{required: true, message: 'Title can\'t be empty', trigger: 'blur'}]">
                <el-input v-model="tvEpisodeForm.title"
                          style="width: 500px"></el-input>
              </el-form-item>
              <el-form-item label="Season"
                            :rules="[{required: true, message: 'Season can\'t be empty', trigger: 'blur'}]">
                <el-input v-model="tvEpisodeForm.season"
                          style="width: 500px"></el-input>
              </el-form-item>
              <el-form-item label="Episode"
                            :rules="[{required: true, message: 'Season can\'t be empty', trigger: 'blur'}]">
                <el-input v-model="tvEpisodeForm.episode"
                          style="width: 500px"></el-input>
              </el-form-item>
              <el-form-item label="Duration">
                <el-input v-model="tvEpisodeForm.hour"
                          style="width: 114px"></el-input>
                Hour
                &nbsp;&nbsp;
                <el-input v-model="tvEpisodeForm.minute"
                          style="width: 114px"></el-input>
                Minute
                &nbsp;&nbsp;
                <el-input v-model="tvEpisodeForm.second"
                          style="width: 114px"></el-input>
                Second
              </el-form-item>
              <el-form-item label="Thumbnail">
                <el-upload
                  class="upload-demo"
                  ref="episodeThumbnailUpload"
                  list-type="picture-card"
                  :show-file-list="false"
                  :on-error="fileUploadError"
                  :on-success="episodeThumbnailUploadFinish"
                  style="max-height: 700px; margin-left: 5px"
                  :action="baseURL + '/api/files/add'">
                  <img v-if="tvEpisodeForm.thumbnailURL"
                       :src="baseURL + tvEpisodeForm.thumbnailURL"
                       style="height: 100%"/>
                  <i v-else class="el-icon-plus"></i>
                  <!--<div class="el-upload__text">Drag Files Here or <em>Click to Upload</em></div>-->
                </el-upload>
              </el-form-item>
              <el-form-item label="File">
                <el-upload
                  drag
                  ref="episodeFileUpload"
                  :on-success="onEpisodeUploadFinish"
                  :on-error="fileUploadError"
                  :show-file-list="true"
                  style="max-width: 700px"
                  :action="baseURL + '/api/files/add'">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">Drag Files Here or <em>Click to Upload</em>
                  </div>
                  <div class="el-upload__tip" slot="tip">
                    Video Format, &lt; 1 GB
                  </div>
                </el-upload>
              </el-form-item>
              <el-form-item label="Size">
                <el-input v-model="tvEpisodeForm.rawSize"
                          style="width: 390px"></el-input>
                <el-select v-model="tvEpisodeForm.sizeUnit" style="width: 106px"
                           placeholder="Per...">
                  <el-option label="GB" value="GB"></el-option>
                  <el-option label="MB" value="MB"></el-option>
                  <el-option label="KB" value="KB"></el-option>
                  <el-option label="B" value="B"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Plot">
                <el-input type="textarea" :rows="5" v-model="tvEpisodeForm.plot"
                          style="width: 500px"></el-input>
              </el-form-item>
              <el-form-item label="Credits">
                <el-input v-model="tvEpisodeForm.credits"
                          style="width: 500px"></el-input>
              </el-form-item>
              <el-form-item label="Aired">
                <el-input v-model="tvEpisodeForm.aired"
                          style="width: 500px"></el-input>
              </el-form-item>
              <el-form-item label="Director">
                <el-input v-model="tvEpisodeForm.director"
                          style="width: 500px"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary"
                         @click="episodeSubmit">Confirm</el-button>
            </span>
          </el-dialog>

          <!--<el-form ref="tvEpisodesForm" :model="tvEpisodesForm" label-width="80px">-->
          <!--<div v-for="(item, $index) in tvEpisodesForm.tvEpisodes" style="border: 2px">-->
          <!--<el-row>-->
          <!--<el-col :span="24" style="text-align: right; width: 700px">-->
          <!--</el-col>-->
          <!--</el-row>-->
          <!--<el-form-item :prop="'tvEpisodes[' + $index + '].season'" label="Season" :rules="[-->
          <!--{required: true, message: 'Season should be specified'}-->
          <!--]">-->
          <!--<el-input v-model="item.season" style="width: 500px"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item :prop="'tvEpisodes[' + $index + '].episode'" label="Episode" :rules="[-->
          <!--{required: true, message: 'Episode should be specified'}-->
          <!--]">-->
          <!--<el-input v-model="item.episode" style="width: 500px"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="File">-->
          <!--<el-upload-->
          <!--drag-->
          <!--:on-success="item.onUploadFinish"-->
          <!--:on-error="fileUploadError"-->
          <!--:show-file-list="false"-->
          <!--:action="baseURL + '/api/files/add'">-->
          <!--<i class="el-icon-upload"></i>-->
          <!--<div class="el-upload__text">Drag Files Here or <em>Click to Upload</em></div>-->
          <!--<div class="el-upload__tip" slot="tip">Video Format, &lt; 1 GB</div>-->
          <!--</el-upload>-->
          <!--</el-form-item>-->
          <!--</div>-->
          <!--</el-form>-->

          <div v-for="item in finishedEpisodes">
            <b>{{item.title}}</b> Season {{item.season}} Episode {{item.episode}}
          </div>

          <el-button type="text" @click="addTVEpisode" style="margin-top: 30px">
            <i class="el-icon-plus"></i>&nbsp;&nbsp;Add Episode
          </el-button>
        </div>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
  import TypeConvert from '@/utils/TypeConvert';
  import BaseURL from '@/utils/BaseURL';

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
        baseURL: BaseURL,
        activeTab: 'main',
        tvShows: [],
        activeTVShow: {},
        addEpisodeDialogVisible: true,
        tvShowChooseDisabled: true,
        tvShowChoosePlaceholder: 'Fetching Data...',
        tvShowStep1Finished: false,
        finishedEpisodes: [],
        form: {
          title: '',
          type: '',
//          tvEpisodes: [],
          thumbnailImageURL: '',
          fileURL: '',
          size: 0,
          duration: '',
          plot: '',
          rating: 0,
          runtime: 0,
          premiered: '',
          studio: '',
          mpaa: '',
          actors: []
        },
        tvEpisodeForm: {
          title: '',
          season: 0,
          episode: 0,
          uploadFileURL: '',
          thumbnailURL: '',
          rawSize: 0,
          sizeUnit: '',
          plot: '',
          credits: '',
          hour: 0,
          minute: 0,
          second: 0,
          aired: '',
          director: ''
        },
        rawSize: 0,
        calculateUnit: '',
        rawGenres: '',
        durationSecond: 0,
        durationMinute: 0,
        durationHour: 0,
        rules: {
          title: [
            {
              validator: checkTitle,
              trigger: 'blur'
            }]
        },
        runtime: {
          hour: 0,
          minute: 0,
          second: 0
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
      },
      totalDuration () {
        return Number(this.durationHour) * 3600 +
          Number(this.durationMinute) * 60 + Number(this.durationSecond);
      }
    },
    methods: {
      addActor () {
        this.form.actors.push({
          name: '',
          role: '',
          thumbURL: ''
        })
      },
      tabChange () {
        window.console.log('tab change to ' + this.activeTab);
        if (this.activeTab === 'episodes') {
          this.getAllTVShows();
          this.finishedEpisodes = [];
        }
        return this.activeTab;
      },
      getAllTVShows () {
        this.$axios.get('/api/tv-show').then(response => {
          if (response.data.isSuccessful) {
            this.tvShows = response.data.data;
            this.tvShowChooseDisabled = false;
            this.tvShowChoosePlaceholder = 'TV Shows...'
          }
        })
      },
      chooseTVShow () {
        this.finishedEpisodes = [];
        this.tvShowStep1Finished = true;
      },
      thumbnailUploadFinish (res, file) {
        window.console.log(res);
        this.form.thumbnailImageURL = res.data.url;
      },
      episodeThumbnailUploadFinish (res) {
        window.console.log(res);
        this.tvEpisodeForm.thumbnailURL = res.data.url;
      },
      addTVEpisode () {
        this.addEpisodeDialogVisible = true;
      },
      removeActor (index) {
        this.form.actors.splice(index, 1);
      },
      fileUploadFinish (res, file) {
        if (res.isSuccessful) {
          this.form.fileURL = res.data.url;
        }
      },
      onEpisodeUploadFinish (res) {
        if (res.isSuccessful) {
          this.tvEpisodeForm.uploadFileURL = res.data.url;
        }
      },
      fileUploadError (error, file, fileList) {
        this.$message.error('File Not Acceptable or Server Error');
      },
      calculateTotalSize (size, unit) {
        switch (unit) {
          case 'MB':
            return Number(size) * 1000 * 1000;
          case 'KB':
            return Number(size) * 1000;
          case 'GB':
            return Number(size) * 1000 * 1000 * 1000;
          default:
            return Number(size);
        }
      },
      submit () {
        window.console.log('submit');
//        this.tvEpisodesForm.tvEpisodes.forEach(item => {
//          delete item.onUploadFinish;
//        });

//        this.$refs['form'].validate(valid => {
//          if (!valid) {
//            this.$message.error('Some of the fields are not finished');
//            window.console.log("validation failed");
//          } else {
        window.console.log("start networking");
        this.$axios.post(
          '/api/' + TypeConvert.legalTypeToURLType(this.form.type), {
            title: this.form.title,
            size: this.exactSize,
            thumbnailURL: this.form.thumbnailImageURL,
            fileURL: this.form.fileURL,
            rating: this.form.rating,
            genres: this.rawGenres.split(',').map(str => str.trim()),
            duration: this.totalDuration,
            mpaa: this.form.mpaa,
            studio: this.form.studio,
            runtime: this.totalDuration,
//            runtime: Number(this.runtime.hour * 3600 + this.runtime.minute * 60 + this.runtime.second),
            premiered: this.form.premiered,
            plot: this.form.plot,
            actors: this.form.actors
//                episodes: this.tvEpisodes.map(rawEpisode => {
//                  return {
//                    season: rawEpisode.season,
//                    episode: rawEpisode.episode,
//                    fileURL: rawEpisode.fileURL,
//                    thumbnailURL: rawEpisode.thumbnailURL,
//                    aired: rawEpisode.aired,
//                    size: calculateTotalSize(rawEpisode.rawSize,
//                      rawEpisode.sizeUnit),
//
//                  };
//                })
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
            this.$message.error(
              'Error in uploading. Please refresh the page and try again.');
          }
        });
      },
//        });

      episodeSubmit () {
        this.$axios.post('/api/tv-show/' + this.activeTVShow + '/episode', {
          title: this.tvEpisodeForm.title,
          season: Number(this.tvEpisodeForm.season),
          episode: Number(this.tvEpisodeForm.episode),
          duration: Number(this.tvEpisodeForm.hour) * 3600 +
          Number(this.tvEpisodeForm.minute) * 60 +
          Number(this.tvEpisodeForm.second),
          aired: this.tvEpisodeForm.aired,
          fileURL: this.tvEpisodeForm.uploadFileURL,
          thumbnailURL: this.tvEpisodeForm.thumbnailURL,
          size: this.calculateTotalSize(this.tvEpisodeForm.rawSize,
            this.tvEpisodeForm.sizeUnit),
          director: this.tvEpisodeForm.director,
          plot: this.tvEpisodeForm.plot,
          credits: this.tvEpisodeForm.credits
        }).then(response => {
          if (response.data.isSuccessful) {
            let title = this.tvEpisodeForm.title;
            let season = this.tvEpisodeForm.season;
            let episode = this.tvEpisodeForm.episode;
            this.finishedEpisodes.push({title, season, episode});
            this.$message({
              type: 'success',
              message: 'Added Episode'
            });
            this.addEpisodeDialogVisible = false;

            this.tvEpisodeForm.title = '';
            this.tvEpisodeForm.season = 0;
            this.tvEpisodeForm.episode = 0;
            this.tvEpisodeForm.uploadFileURL = '';
            this.tvEpisodeForm.thumbnailURL = '';
            this.tvEpisodeForm.rawSize = 0;
            this.tvEpisodeForm.sizeUnit = '';
            this.tvEpisodeForm.plot = '';
            this.tvEpisodeForm.credits = '';
            this.tvEpisodeForm.hour = 0;
            this.tvEpisodeForm.minute = 0;
            this.tvEpisodeForm.second = 0;
            this.tvEpisodeForm.aired = '';
            this.tvEpisodeForm.director = '';
            this.$refs.episodeThumbnailUpload.clearFiles();
            this.$refs.episodeFileUpload.clearFiles();
          } else {
            window.console.log(response);
          }
        })
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
