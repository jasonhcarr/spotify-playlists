//VARIABLE DECLARATIONS
// var client_id = '4e84e49e334f411e95add4fad7edf9e7'; // Your client id
// var accessToken = APP.loginSpotify.accessToken;
// var profileResponse = APP.loginSpotify.data;
var APP = APP || {};
//CONSTRUCTORS

//FUNCTIONS

//CALLS
APP.Calls = {
        playlistCall: function(access_token) {
            $.ajax({
                url: 'https://api.spotify.com/v1/users/1221442507/playlists/3Eruo4sHfpSx7yIVU6HCih?market=ES',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function(response) {
                    console.log(response);
                    userProfilePlaceholder.innerHTML = userProfileTemplate(response);
                }
            });
        }
    };
    //EVENT DELEGATORS
