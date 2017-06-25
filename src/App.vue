<template>
  <div id="app">
    <!-- TODO Top Menu-->
    <!--<el-menu class="top-menu" mode="horizontal">-->
    <el-menu mode="horizontal" theme="dark">
      <div class="title">
          Media Vault
      </div>
    </el-menu>

    <!-- TODO Add Gutter -->
    <el-row :gutter="30">
      <!-- TODO Left Navigation -->
      <el-col :span="4">
        <el-menu class="side-menu" :router="true">
          <el-menu-item index="/"><i class="el-icon-menu"></i>Home
          </el-menu-item>
          <el-submenu index="/media-library">
            <template slot="title">
              <i class="el-icon-document"></i>Media Library
            </template>
            <!--<el-menu-item index="/media-library">All</el-menu-item>-->
            <el-menu-item index="/media-library/tv-shows">TV Shows</el-menu-item>
            <el-menu-item index="/media-library/movies">Movies</el-menu-item>
            <el-menu-item index="/media-library/music">Music</el-menu-item>
            <el-menu-item index="/media-library/photos">Photos</el-menu-item>
          </el-submenu>
          <el-menu-item index="/upload"><i class="el-icon-upload"></i>Upload
          </el-menu-item>
        </el-menu>
      </el-col>

      <!-- TODO Main Frame -->
      <el-col :span="20">
        <!-- TODO Top -->


        <!-- TODO Media Library Contents -->
        <div style="padding: 10px">
          <router-view></router-view>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        itemActiveIndex: '/'
      };
    },
    methods: {
      /**
       * Go to Entire Library when clicking on sub-menu.
       */
      goMediaLibrarySubmenu(index) {
        this.$router.push(index);
      }
    }
  };
</script>

<style scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    /*color: #2c3e50;*/
    /*margin-top: 60px;*/
  }

  .title {
    font-size: 24px;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 40px;
    color: #FAFAFA;
  }

  /*.top-menu {*/
    /*!*margin-bottom: 5px;*!*/
  /*}*/

  .side-menu {
    background-color: white;
  }
</style>
