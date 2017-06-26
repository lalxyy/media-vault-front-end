<template>
  <div id="app">
    <!-- TODO Top Menu-->
    <!--<el-menu class="top-menu" mode="horizontal">-->
    <el-menu mode="horizontal" theme="dark" style="border-radius: 5px">
      <!-- TODO Modifying -->
      <el-row :gutter="20">
        <el-col :span="20">
          <div class="title">
            Media Vault
          </div>
        </el-col>

        <!-- TODO For Offset -->
        <!--<el-col :span="16"></el-col>-->

        <!-- 6 + 2 + 16 = 24 ! -->
        <el-col :span="4">
        <!--<el-col :span="2" :offset="16">-->
          <!-- `:plain="true"` -->
          <!-- TODO 这里要改一下！ -->

          <el-button type="info" icon="search"
                     style="margin-top: 22px; float: right; margin-right: 30px"
                     @click="this.$router.push({
                     name: 'Home'
                     })"
          >Search
          </el-button>
        </el-col>
      </el-row>

    </el-menu>

    <!--<el-menu theme="dark" :default-active="1" class="el-menu-demo" mode="horizontal">-->
    <!--<el-row :gutter="20">-->

    <!--<el-col :span="4">-->
    <!--<div class="grid-content">-->
    <!--<div class="title">-->
    <!--Media Vault-->
    <!--</div>-->
    <!--</div>-->
    <!--</el-col>-->

    <!--&lt;!&ndash;<el-col :span="16">&ndash;&gt;-->
    <!--&lt;!&ndash;<div class="grid-content">&ndash;&gt;-->
    <!--&lt;!&ndash;<el-menu-item index="/media-library">测试1</el-menu-item>&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--&lt;!&ndash;</el-col>&ndash;&gt;-->

    <!--&lt;!&ndash;<el-col :span="4">&ndash;&gt;-->
    <!--&lt;!&ndash;<div class="grid-content">&ndash;&gt;-->
    <!--&lt;!&ndash;<el-button index="/" type="primary" icon="search">Searching</el-button>&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--&lt;!&ndash;</el-col>&ndash;&gt;-->

    <!--</el-row>-->
    <!--&lt;!&ndash;<el-menu-item index="1">处理中心</el-menu-item>&ndash;&gt;-->
    <!--&lt;!&ndash;<el-submenu index="2">&ndash;&gt;-->
    <!--&lt;!&ndash;<template slot="title">我的工作台</template>&ndash;&gt;-->
    <!--&lt;!&ndash;<el-menu-item index="2-1">选项1</el-menu-item>&ndash;&gt;-->
    <!--&lt;!&ndash;<el-menu-item index="2-2">选项2</el-menu-item>&ndash;&gt;-->
    <!--&lt;!&ndash;<el-menu-item index="2-3">选项3</el-menu-item>&ndash;&gt;-->
    <!--&lt;!&ndash;</el-submenu>&ndash;&gt;-->
    <!--&lt;!&ndash;<el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>&ndash;&gt;-->
    <!--</el-menu>-->

    <!-- TODO Add Gutter -->
    <el-row :gutter="20">
      <!-- TODO Left Navigation -->
      <el-col :span="5">
        <el-menu class="side-menu" :router="true" theme="dark" style="border-radius: 5px">
          <!--<el-menu class="side-menu" :router="true" theme="white">-->

          <!-- TODO 标签组1 -->
          <el-menu-item-group title="Home and Searching">
            <el-menu-item index="/"><i class="el-icon-menu"></i>Home
            </el-menu-item>
          </el-menu-item-group>

          <!-- TODO 标签组2 -->
          <el-menu-item-group title="Media Navigation">
            <el-submenu index="/media-library">
              <template slot="title">
                <i class="el-icon-document"></i>Media Library
              </template>
              <el-menu-item index="/media-library">Entire Media Library</el-menu-item>
              <el-menu-item index="/media-library/tv-show">TV Shows</el-menu-item>
              <el-menu-item index="/media-library/movie">Movies</el-menu-item>
              <el-menu-item index="/media-library/music">Music</el-menu-item>
              <el-menu-item index="/media-library/photo">Photos</el-menu-item>
            </el-submenu>
            <el-menu-item index="/upload"><i class="el-icon-upload"></i>Upload
            </el-menu-item>
          </el-menu-item-group>

        </el-menu>
      </el-col>

      <!-- TODO Main Frame -->
      <el-col :span="19">
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
  import ElRow from "element-ui/packages/row/src/row";
  export default {
    components: {ElRow},
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
    font-size: 30px;
    /*padding-top: 14px;*/
    padding-top: 18px;
    /*padding-bottom: 15px;*/
    padding-left: 40px;
    color: #FAFAFA;
  }

  /*.top-menu {*/
  /*!*margin-bottom: 5px;*!*/
  /*}*/

  .side-menu {
    /*background-color: white;*/
    margin-top: 30px;
  }

  .el-row {
    margin-bottom: 20px;
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

  /*.grid-content {*/
  /*border-radius: 4px;*/
  /*min-height: 16px;*/
  /*}*/

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
