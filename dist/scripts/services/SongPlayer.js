(function() {
     function SongPlayer(Fixtures) {
          var SongPlayer = {};
         
         
         var currentAlbum = Fixtures.getAlbum();
         
         /**
         *@function getSongIndex
         @desc gets the index of a song in the song array
         @param {Object} song
         */
         var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
            };
         
          SongPlayer.currentSong = null;
         
          /**
        * @desc Buzz object audio file
        * @type {Object}
        */
         var currentBuzzObject = null;
         
        /**
        *@function playSong
        * @desc plays the song
        @param {Object} song
        */
         
         var playSong = function(song) {
             currentBuzzObject.play();
             song.playing = true;
         };
         
          /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
         var setSong = function(song) {
            if (currentBuzzObject) {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        }
 
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
        });
 
            SongPlayer.currentSong = song;
        };
         
         SongPlayer.play = function(song) {
             song = song || SongPlayer.currentSong;
             if (SongPlayer.currentSong !== song) {
              setSong(song);
                playSong(song);
                 
            
        } else if (SongPlayer.currentSong === song) {
            if (currentBuzzObject.isPaused()) {
                playSong(song);
                
            }
        }
     };
         
         SongPlayer.pause = function(song) {
             song = song || SongPlayer.currentSong;
             currentBuzzObject.pause();
             song.playing = false;
         };
         
         /**
         * @function SongPlayer.previous
         *@desc gets the previous index of the song array
         *@param {object}
         */
         SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
             
             if (currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
                }
        };
         
         
         
          return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();