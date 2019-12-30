function setSpaceShipState() {
    soundscape.getSounds()["src/sound/files/Music.mp3"].pause();
    //Change Fly Mode (Mass of Spaceship)
    
    if (arcadeState.isFlying) {
        spaceship.changeFlyMode(true);
        
    } else {
        spaceship.changeFlyMode(false);

    }

    var volume = 0.2;
    if (arcadeState.music) {
        if (arcadeState.volumeHigh) {
            volume = 1.0;
        } 
        soundscape.getSounds()["src/sound/files/Music.mp3"].setVolume(2.0);
        soundscape.getSounds()["src/sound/files/Music.mp3"].play();


    } else {

    }
}