import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Movies from '@/components/media-library/Movies'
import TVShows from '@/components/media-library/TVShows'
import AllLibrary from '@/components/media-library/All'
import MediaLibrary from '@/components/MediaLibrary'
import Upload from '@/components/Upload'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/media-library',
      component: MediaLibrary,
      children: [
        {
          path: '',
          name: 'MediaLibrary',
          component: AllLibrary
        },
        {
          path: 'movies',
          name: 'Movies',
          component: Movies
        },
        {
          path: 'tv-shows',
          name: "TVShows",
          component: TVShows
        }
      ]
    },
    {
      path: '/upload',
      name: 'Upload',
      component: Upload
    }
  ]
})
