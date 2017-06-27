export default {
  // TVShows => tv-show
  legalTypeToURLType (type) {
    switch (type) {
      case 'TVShows':
        return 'tv-show';
      case 'Movies':
        return 'movie';
      case 'Photos':
        return 'photo';
      case 'Music':
        return 'music';
      default:
        return '';
    }
  },
  legalTypeToRouteDetailType (type) {
    switch (type) {
      case 'TVShows':
        return 'TVShowDetails';
      case 'Movies':
        return 'MovieDetails';
      case 'Photos':
        return 'PhotoDetails';
      case 'Music':
        return 'MusicDetails';
      default:
        return '';
    }
  }
}
