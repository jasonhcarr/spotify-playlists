var APP = APP || {};
APP.loginSpotify= {
  accessToken: null,
  userId: null,
  profilePic: null,
  spotifyURI: null
};

(function($, APP) {

  var stateKey = 'spotify_auth_state';



  /**
   * Obtains parameters from the hash of the URL
   * @return Object
   */
  function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  /**
   * Generates a random string containing numbers and letters
   * @param  {number} length The length of the string
   * @return {string} The generated string
   */
  function generateRandomString(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  var userProfileSource = document.getElementById('user-profile-template').innerHTML,
      userProfileTemplate = Handlebars.compile(userProfileSource),
      userProfilePlaceholder = document.getElementById('user-profile');

      oauthSource = document.getElementById('oauth-template').innerHTML,
      oauthTemplate = Handlebars.compile(oauthSource),
      oauthPlaceholder = document.getElementById('oauth');

  var params = getHashParams();

  var access_token = params.access_token,
      state = params.state,
      storedState = localStorage.getItem(stateKey);

  if (access_token && (state == null || state !== storedState)) {
    alert('There was an error during the authentication');
  } else {
    localStorage.removeItem(stateKey);
    if (access_token) {
      $.ajax({
          url: 'https://api.spotify.com/v1/me',
          headers: {
            'Authorization': 'Bearer ' + access_token
          },
          success: function(response) {
            APP.loginSpotify.userId = response.id;
            APP.loginSpotify.accessToken = access_token;
            APP.loginSpotify.profilePic = response.images[0].url;
            APP.loginSpotify.spotifyURI = response.external_urls.spotify;
            APP.Calls.allPlaylistsCall();
            userProfilePlaceholder.innerHTML = userProfileTemplate(response);

            $('#login').hide();
            $('#loggedin').show();
          }
      });
    } else {
        $('#login').show();
        $('#loggedin').hide();
    }

    document.getElementById('login-button').addEventListener('click', function() {

      var client_id = '4e84e49e334f411e95add4fad7edf9e7'; // Your client id
      var redirect_uri = 'https://jasonhcarr.github.io/spotify-playlists/index.html'; // Your redirect uri

      var state = generateRandomString(16);

      localStorage.setItem(stateKey, state);
      var scope = 'user-read-private user-read-email';

      var url = 'https://accounts.spotify.com/authorize';
      url += '?response_type=token';
      url += '&client_id=' + encodeURIComponent(client_id);
      url += '&scope=' + encodeURIComponent(scope);
      url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
      url += '&state=' + encodeURIComponent(state);

      window.location = url;
    }, false);
  }
})(jQuery, APP);
