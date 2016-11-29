(function() {
     function SongPlayer($rootScope, Fixtures) {
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
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;
         
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
        * @function stopSong
        * @desc Stops the song
        * @param {Object} song
        */
        var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;
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
             
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
         });
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
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
                }
        };
         
         /**
         * @function SongPlayer.next
         *@desc gets the next index of the song array
         *@param {object}
         */
         
         SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
             
             var albumLength = (currentAlbum.songs.length - 1)
             
             if (currentSongIndex > albumLength) {
                stopSong(SongPlayer.currentSong)
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
                }
        };
         
         /**
         * @function setCurrentTime
         * @desc Set current time (in seconds) of currently playing song
         * @param {Number} time
         */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };

         
          return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();