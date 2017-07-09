export default [
  {
    id: 1,
    title: 'Silicon Valley',
    type: 'TVShows',
    thumbnailURL: '/static/thumbnails/tvshows/silicon-valley.jpg',
    episodes: [
      {
        season: 1,
        episode: 1,
        fileURL: '/static/files/movies/Video1.mp4',
        time: 1710, // seconds
        size: {
          size: 1.71,
          measure: 'GB'
        }
      },
      {
        season: 1,
        episode: 2,
        fileURL: '/static/files/movies/Video2.mp4',
        time: 1710,
        size: {
          size: 1.7,
          measure: 'GB'
        }
      },
      {
        season: 1,
        episode: 3,
        fileURL: '/static/files/movies/Video3.mp4',
        time: 1710,
        size: {
          size: 1.72,
          measure: 'GB'
        }
      },
      {
        season: 1,
        episode: 4,
        fileURL: '/static/files/movies/Video2.mp4',
        time: 1710,
        size: {
          size: 1.7,
          measure: 'GB'
        }
      },
      {
        season: 1,
        episode: 5,
        fileURL: '/static/files/movies/Video1.mp4',
        time: 1710,
        size: {
          size: 1.7,
          measure: 'GB'
        }
      },
      {
        season: 1,
        episode: 6,
        fileURL: '/static/files/movies/Video3.mp4',
        time: 1710,
        size: {
          size: 1.7,
          measure: 'GB'
        }
      },
      {
        season: 1,
        episode: 7,
        fileURL: '/static/files/movies/Video3.mp4',
        time: 1710,
        size: {
          size: 1.7,
          measure: 'GB'
        }
      },
      {
        season: 1,
        episode: 8,
        fileURL: '/static/files/movies/Video2.mp4',
        time: 1710,
        size: {
          size: 1.7,
          measure: 'GB'
        }
      },
    ]
  },
  {
    id: 2,
    title: 'The Big Bang Theory',
    type: 'TVShows',
    thumbnailURL: '/static/thumbnails/tvshows/the-big-bang-theory.jpg',
    episodes: [
      {
        season: 10,
        episode: 2,
        fileURL: '/static/files/movies/Video3.mp4',
        time: 1243,
        size: {
          size: 2.32,
          measure: 'GB'
        }
      },
      {
        season: 10,
        episode: 24,
        fileURL: '/static/files/movies/Video2.mp4',
        time: 1243,
        size: {
          size: 2.31,
          measure: 'GB'
        }
      },
      {
        season: 8,
        episode: 23,
        fileURL: '/static/files/movies/Video3.mp4',
        time: 1243,
        size: {
          size: 2.32,
          measure: 'GB'
        }
      }
    ]
  },
  {
    id: 3,
    title: 'Gone With the Wind',
    thumbnailURL: '/static/thumbnails/movies/gone-with-the-wind.jpg',
    type: 'Movies',
    year: '1975',
    fileURL: '/static/files/movies/Video3.mp4',
    time: 25700,
    size: {
      size: 6.87,
      measure: 'GB'
    }
  },
  {
    id: 4,
    title: 'A Clockwork Orange',
    thumbnailURL: '/static/thumbnails/movies/a-clockwork-orange.jpg',
    type: 'Movies',
    year: '1971',
    fileURL: '/static/files/movies/Video2.mp4',
    time: 14894,
    size: {
      size: 3.89,
      measure: 'GB'
    }
  },
  {
    id: 5,
    title: 'The Truman Show',
    thumbnailURL: '/static/thumbnails/movies/the-truman-show.jpg',
    type: 'Movies',
    year: '1995',
    fileURL: '/static/files/movies/Video1.mp4',
    time: 6180,
    size: {
      size: 6.11,
      measure: 'GB'
    }
  },

  // TODO Music
  {
    id: 101,
    title: 'Test Music Title',
    type: 'Music',
    year: '2008',
    fileURL: '/static/files/music/Music1.mp3',
    time: 2332, // duration
    size: {
      size: 10.23,
      measure: 'MB'
    }
  },

  // TODO Photos
  {
    id: 201,
    title: 'First Photo',
    type: 'Photos',
    year: '2010',
    fileURL: '/static/files/photos/Photo1.png',
    size: {
      size: 3.22,
      measure: 'MB'
    }
  }
];
