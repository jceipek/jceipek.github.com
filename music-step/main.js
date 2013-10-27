window.onload=function() {
  var playing = false
    , penalties = 0
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
      penalties = 0;
      document.getElementById('js-penalties').innerHTML = penalties;
      this.onclick = stop_game;
      this.innerHTML = "Stop";
      playing = true;

      console.log("Start Clicked");
      var can_move = false;
      window.ondevicemotion = function(event) {  
          var total = Math.pow(event.acceleration.x, 2) + Math.pow(event.acceleration.y, 2) + Math.pow(event.acceleration.z, 2);
          if (total > 1 && !can_move) {
              document.body.classList.add("bad");
              penalties += 1;
              document.getElementById('js-penalties').innerHTML = penalties;
              sound.play('brrp');
              console.log("Brrp");
          }
          else {
              document.body.classList.remove("bad");
          }
      }

      function start_moving() {
          setTimeout(function(){
              sound.play('beat');
              console.log("Beat");
              if (playing) {
                setTimeout(stop_moving, 900);
                clear_bg();
              }
          }, 500);
          can_move = true;
          document.body.classList.add("good");
      }

      function stop_moving() {
          can_move = false;
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

