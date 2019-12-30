function setSpaceShipState() {
    soundscape.getSounds()["src/sound/files/Music.mp3"].pause();
    //Change Fly Mode (Mass of Spaceship)
    
    if (arcadeState.isFlying) {
        spaceship.changeFlyMode(true);
        
    } else {
        spaceship.changeFlyMode(false);

    }

    if (arcadeState.music) {

        soundscape.getSounds()["src/sound/files/Music.mp3"].setVolume(1.0);
        soundscape.getSounds()["src/sound/files/Music.mp3"].play();


    } else {

    }
}