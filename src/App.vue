<template>
  <div id="app">
    <el-menu class="top-menu" mode="horizontal">
      <div class="title">Media Vault</div>
    </el-menu>
    <el-row>
      <el-col :span="4">
        <el-menu class="side-menu">
          <el-menu-item index="0"><i class="el-icon-menu"></i>Home</el-menu-item>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-document"></i>Media Library</template>
            <el-menu-item index="1-1">TV Shows</el-menu-item>
            <el-menu-item index="1-2">Movies</el-menu-item>
          </el-submenu>
          <el-menu-item index="2"><i class="el-icon-upload"></i>Upload</el-menu-item>
        </el-menu>
      </el-col>
      <el-col span="20">
        <div style="padding: 5px">
          <router-view></router-view>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import ElRow from 'element-ui/packages/row/src/row';
  import ElMenu from '../node_modules/element-ui/packages/menu/src/menu';
  import ElCol from 'element-ui/packages/col/src/col';
  import ElMenuItem from '../node_modules/element-ui/packages/menu/src/menu-item';
  export default {
    components: {
      ElMenuItem,
      ElCol,
      ElMenu,
      ElRow
    },
    name: 'app'
  }
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
  }

  .top-menu {
    /*margin-bottom: 5px;*/
  }

  .side-menu {
    background-color: white;
  }
</style>
