import Vue from 'vue'
import Router from 'vue-router'

// Home
import Home from '@/components/Home'
// Media Library Root
import MediaLibrary from '@/components/MediaLibrary'
// All Type of Media
import AllLibrary from '@/components/media-library/All'
// Each Type of Media
import Movies from '@/components/media-library/Movies'
import TVShows from '@/components/media-library/TVShows'
import Music from '@/components/media-library/Music'
import Photos from '@/components/media-library/Photos'
// import OtherVideos from '@/components/media-library/OtherVideos'
// import OtherAudios from '@/components/media-library/OtherAudios'
// Functional Pages
import Upload from '@/components/Upload'
import MediaDetails from '@/components/media-library/MediaDetails'

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
          path: 'movie',
          name: 'Movies',
          component: Movies
        },
        {
          path: 'tv-show',
          name: "TVShows",
          component: TVShows
        },
        {
          path: 'music',
          name: 'Music',
          component: Music
        },
        {
          path: 'photo',
          name: 'Photos',
          component: Photos
        },
        {
          path: 'movie/:id',
          name: 'MovieDetails',
          component: MediaDetails
        },
        {
          path: 'tv-show/:id',
          name: 'TVShowDetails',
          component: MediaDetails
        },
        {
          path: 'music/:id',
          name: 'MusicDetails',
          component: MediaDetails
        },
        {
          path: 'photo/:id',
          name: 'PhotoDetails',
          component: MediaDetails
        }
        // {
        //   path: ':id',
        //   name: 'MediaDetails',
        //   component: MediaDetails
        // }
      ]
    },
    {
      path: '/upload',
      name: 'Upload',
      component: Upload
    }
  ]
});
