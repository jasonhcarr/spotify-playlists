var fieldsSongList = "items(added_at,track(name,external_urls(spotify),album(name,external_urls(spotify),images),artists(name, external_urls(spotify))))";


//VARIABLE DECLARATIONS
// var client_id = '4e84e49e334f411e95add4fad7edf9e7'; // Your client id
// var accessToken = APP.loginSpotify.accessToken;
// var profileResponse = APP.loginSpotify.data;
var APP = APP || {};
//CONSTRUCTORS
APP.Constructors = {
    ListSongs: function(songObject) {
        this.params = {
          dateAdded: songObject.tracks.items.added_at,
          songName: songObject.tracks.items.track.name,
          songLink: songObject.tracks.items.track.external_urls.spotify,
          imageAlbum: songObject.tracks.items.track.album.images[2].url,
          albumTitle: songObject.tracks.items.track.album.name,
          albumLink: songObject.tracks.items.track.album.external_urls.spotify,
          artistName: songObject.tracks.items.track.artists.name,
          artistLink: songObject.tracks.items.track.artists.external_urls.spotify
        };

        this.createSongList = function() {
          var source = $('#template').html();
          var template = Handlebars.compile(source);
          var context = {
            dateAdded: this.params.dateAdded,
            songName: this.params.songName,
            songLink: this.params.songLink,
            imageAlbum: this.params.imageAlbum,
            albumTitle: this.params.albumTitle,
            albumLink: this.params.albumLink,
            artistName: this.params.artistName,
            artistLink: this.params.artistLink
          };
          var html = template(context);
        };
        this.createElements();
    },

    ListPlaylists: function(playlistObject) {
      this.params = {
        imagePlaylist: playlistObject.items.images[1].url,
        playlistName: playlistObject.items.name,
        totalSongs: playlistObject.items.tracks.total,
        playlistId: playlistObject.items.id
      };

      this.createPlaylists = function() {
        var source = $('#template').html();
        var template = Handlebars.compile(source);
        var context = {
          imagePlaylist: this.params.imagePlaylist,
          playlistName: this.params.playlistName,
          totalSongs: this.params.totalSongs,
          playlistId: this.params.playlistId
        };
        var html = tmeplate(context);

        //where to append these
      };

      this.createAside = function() {
        var source = $('#aside-template').html();
        var template = Handlebars.compile(source);
        var context = {
          playlistName: this.params.playlistName,
          playlistId: this.params.playlistId
        };
        var html = tmeplate(context);

        //where to append these
      };
      this.createPlaylists();
      this.createAside();
    }
};


//FUNCTIONS
//a function to format "added_at" into usable dateAdded

//a function to convert "duration_ms" into minutes and seconds


//CALLS
APP.Calls = {
        songListCall: function(playlistId) {
            $.ajax({
                url: 'https://api.spotify.com/v1/users/' + APP.loginSpotify.userID + '/playlists/' + playlistId + '/tracks?fields=' + fieldsSongList + '&limit=50',
                headers: {
                    'Authorization': 'Bearer ' + APP.loginSpotify.accessToken
                },
                success: function(response) {
                    console.log(response);
                    for (var index = 0; index < array.length; index++) {
                      new APP.Constructors.ListSongs(response[index]);
                    }
                }
            });
        },

        playlistsCall: function(playlistId) {
            $.ajax({
                url: 'https://api.spotify.com/v1/me/playlists',
                headers: {
                    'Authorization': 'Bearer ' + APP.loginSpotify.accessToken
                },
                success: function(response) {
                    console.log(response);
                    for (var index = 0; index < array.length; index++) {
                      new APP.Constructors.ListPlaylists(response[index]);
                    }
                }
            });
        }
    };


//EVENT DELEGATORS
//clicking on a playlist block opens a list of songs in that playlist
$(main-container).on('click', 'playlist-container', function(event) {
    var playlistId = this.id.value;
    APP.Calls.playlistCall(playlistId);
});

//clicking on a line item in the aside opens a list of songs in that playlist
$(main-container).on('click', 'aside-item', function(event) {
    var playlistId = this.id.value;
    APP.Calls.playlistCall(playlistId);
});
