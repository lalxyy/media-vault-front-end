<template>
  <div class="hello" style="padding: 10px">
    <!--<h1>{{ msg }}</h1>-->

    <template>
      <el-tabs v-model="activeName">
        <el-tab-pane label="Home" name="first">
          <h3>
            For Searching: Click the second tab.
          </h3>
          <h3>
            For Browsing the whole media library: See the left navigation menu.
          </h3>
        </el-tab-pane>
        <el-tab-pane label="Searching" name="second">
          <!--<i class="el-icon-plus"></i>-->
          <span slot="label"><i class="el-icon-search"></i>  Searching (all media files)</span>


          <el-row>
            <el-col :span="24">
              <el-input v-model="input"
                        placeholder="Search for the Entire Library..."></el-input>
            </el-col>
          </el-row>
          <el-row style="margin-top: 20px">
            <el-col :span="24">
              <el-table :data="filteredTableData" stripe style="width: 100%">
                <el-table-column prop="title" label="Title"
                                 width="300"></el-table-column>
                <el-table-column prop="type" label="Type"
                                 width="200"></el-table-column>
                <el-table-column label="Operations">
                  <template scope="scope">
                    <!--<template-->
                    <!--v-if="scope.row.type !== 'Music' && scope.row.type !== 'Photos'">-->
                    <el-button size="small" type="primary"
                               @click="openDetails(scope.row.id, scope.row.type)"
                               v-loading.fullscreen.lock="fullScreenLoading">
                      Details
                    </el-button>
                    <!--</template>-->
                    <!--<template v-if="scope.row.type === 'Movies'">-->
                    <!--<el-button size="small" type="primary"-->
                    <!--@click="openFullScreen(), downloadFile(scope.row.fileURL)"-->
                    <!--v-loading.fullscreen.lock="fullScreenLoading">-->
                    <!--<i class="el-icon-upload2"></i> Download-->
                    <!--</el-button>-->
                    <!--</template>-->
                    <!-- Uses `v-else-if` to show TV shows -->
                    <template v-if="scope.row.type === 'TVShows'">
                      <!--<el-button size="small" type="primary">-->
                      <!--Details-->
                      <!--</el-button>-->
                      <!--<el-button size="small" type="primary" @click="downloadFile(exact.fileURL)">-->
                      <!--<i class="el-icon-upload2"></i> Download-->
                      <!--</el-button>-->
                    </template>
                    <!-- Shows Music-->
                    <template v-if="scope.row.type === 'Music'">
                      <!--<el-button size="small" type="primary"-->
                      <!--@click="openFullScreen(), downloadFile(scope.row.fileURL)"-->
                      <!--v-loading.fullscreen.lock="fullScreenLoading">-->
                      <!--<i class="el-icon-upload2"></i> Download-->
                      <!--</el-button>-->
                    </template>
                    <!-- Shows Photos-->
                    <template v-if="scope.row.type === 'Photos'">
                      <el-button :plain="true" type="info" size="small"
                                 @click="openFullScreen()"
                                 v-loading.fullscreen.lock="fullScreenLoading">
                        Preview
                      </el-button>
                    </template>
                    <!--<el-button size="small" type="danger"-->
                    <!--@click="deleteItem(scope.row.id)">-->
                    <!--<i class="el-icon-delete2"></i> Delete-->
                    <!--</el-button>-->
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>

        </el-tab-pane>
      </el-tabs>
    </template>
    <!--<h2>Essential Links</h2>-->
    <!--<ul>-->
    <!--<li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>-->
    <!--<li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>-->
    <!--<li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>-->
    <!--<li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>-->
    <!--<br>-->
    <!--<li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>-->
    <!--</ul>-->
    <!--<h2>Ecosystem</h2>-->
    <!--<ul>-->
    <!--<li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>-->
    <!--<li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>-->
    <!--<li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>-->
    <!--<li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>-->
    <!--</ul>-->
  </div>
</template>

<script>
  import TypeConvert from '@/utils/TypeConvert';

  export default {
    name: 'hello',
    beforeMount () {
      this.$axios.get("/api/entire-library").then(response => {
        if (response.data.isSuccessful) {
          this.entireData = response.data.data;
        }
      })
    },
    data () {
      return {
        msg: 'Welcome to Your Media Vault',
        entireData: [],
        input: '',
        fullScreenLoading: false,
        activeName: 'second'
      }
    },
    methods: {
      openDetails(id, type) {
        // TODO Delay Loading Testing
        this.fullScreenLoading = true;
        setTimeout(() => {
//          this.$router.push({name: 'MediaDetails', params: {id: id}})
//          $router.push({name: convertRouteType(scope.row.type), params: {id: scope.row.id}})
          this.$router.push({name: convertRouteType(type), params: {id: id}})

          this.fullScreenLoading = false;
        }, 500);

      },

      searchForData (text) {
        let result = [];
        this.entireData.forEach(media => {
          if (media.title.includes(text)) {
            result.push(media);
          }
        });
        return result;
      },
      openFullScreen () {
        this.fullScreenLoading = true;
        setTimeout(() => {
          this.fullScreenLoading = false;
        }, 800);
      },
      convertRouteType (legalType) {
        return TypeConvert.legalTypeToRouteDetailType(legalType);
      }
    },
    computed: {
      filteredTableData () {
        return this.entireData.filter(data => {
          if (this.input === '') {
            return true;
          } else {
            return data.title.toLowerCase().includes(this.input.toLowerCase());
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
