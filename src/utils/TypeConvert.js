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
  },
  byteToFitUnit (byte) {
    let gib = byte / (1000 * 1000 * 1000);
    if (gib > 1) {
      return `${gib} GB`;
    }
    let mib = byte / (1000 * 1000);
    if (mib > 1) {
      return `${mib} MB`;
    }
    let kb = byte / 1000;
    if (kb > 1) {
      return `${kb} KB`;
    }
    return `${byte} B`;
  },
  durationToHMS (duration) {
    if (isNaN(Number(duration))) {
      return '';
    }
    let num = Number(duration);
    let hour = Math.floor(num / 3600);
    let minute = Math.floor((num % 3600) / 60);
    let second = (num % 3600) % 60;
    return `${hour}:${minute}:${second}`;
  }
}
