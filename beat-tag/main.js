window.onload=function() {
  var playing = false
    , sound = new Howl({
        urls: ['sounds.m4a', 'sounds.ogg', 'sounds.wav'],
        sprite: {
          beat: [0, 453],
          brrp: [453, 917]
        }
      });

  function clear_bg () {
    document.body.classList.remove("good");
    document.body.classList.remove("bad");
  }

  function start_game () {
      this.onclick = stop_game;
      this.innerHTML = "Stop";
      playing = true;

      console.log("Start Clicked");
      var can_move = false;
      var penalty_added = false;
      window.ondevicemotion = function(event) {
          var total = Math.pow(event.acceleration.x, 2) + Math.pow(event.acceleration.y, 2) + Math.pow(event.acceleration.z, 2);
          if (total > 1 && !can_move) {
              if (!penalty_added) {
                document.body.classList.add("bad");
                penalty_added = true;
                sound.play('brrp');
              };
          }
      }

      function start_moving() {
          if (penalty_added) {
            setTimeout(enable_movement, 3000);
          }
          else {
            enable_movement();
          }
      }

      function enable_movement() {
        can_move = true;
        penalty_added = false;
        document.body.classList.remove("bad");
        document.body.classList.add("good");

        setTimeout(function(){
            sound.play('beat');
            if (playing) {
              setTimeout(stop_moving, 1900);
            }
        }, 700);
      }

      function stop_moving() {
          can_move = false;
          clear_bg();
          document.body.classList.remove("good");
          if (playing) {
            setTimeout(start_moving, 400);
          } else {
            clear_bg();
          }
      }

      start_moving();
  };

  function stop_game () {
    playing = false;
    this.onclick = start_game;
    this.innerHTML = "Start";
    console.log("Stop Clicked");
    window.ondevicemotion = null;
    clear_bg();
  };

  document.getElementById('js-start-button').onclick = start_game;
}

