raycaster = new THREE.Raycaster();

function executeRaycast(event) {

    raycaster.setFromCamera(mousePosition, camera);

    var intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {

        var firstHit = intersects[0].object;

        if (firstHit.name === "Volume") {
            firstHit.userData.toggleEndPosition();
        } else if (firstHit.name === "Up" || firstHit.name === "Down" || firstHit.name === "Left" || firstHit.name === "Right") {
            console.log(firstHit.name);
            if (arcadeState.isFlying) {


                switch (firstHit.name) {
                    case "Up":
                        arcadeState.down = false;
                        arcadeState.up = true;
                        arcadeState.left = false;
                        arcadeState.right = false;
                     
                        break;

                    case "Down":
                        arcadeState.down = true;
                        arcadeState.up = false;
                        arcadeState.left = false;
                        arcadeState.right = false;
                        break;

                    case "Left":
                        arcadeState.down = false;
                        arcadeState.up = false;
                        arcadeState.left = true;
                        arcadeState.right = false;
                     
                        break;
                    case "Right":
                        arcadeState.down = false;
                        arcadeState.up = false;
                        arcadeState.left = false;
                        arcadeState.right = true;
                        break;
                }
            }

            firstHit.userData.DownTween.start();
            firstHit.userData.UpTween.stop();

            setTimeout(() => {
                firstHit.userData.UpTween.start();
                firstHit.userData.DownTween.stop();
            }, 400);


        } else if (firstHit.name === "Handle" || firstHit.name === "HandleBall") {
            if (firstHit.userData.up) {
                firstHit.userData.DownTween.start();
                firstHit.userData.UpTween.stop();
                firstHit.userData.up = !firstHit.userData.up;
                arcadeState.isFlying = !arcadeState.isFlying;
                console.log("Land");
                window.dispatchEvent(new Event("arcadeStateChanged"));

            } else {
                firstHit.userData.UpTween.start();
                firstHit.userData.DownTween.stop();
                firstHit.userData.up = !firstHit.userData.up;
                console.log("Lift off");
                arcadeState.isFlying = !arcadeState.isFlying;
                arcadeState.down = false;
                arcadeState.up = false;
                arcadeState.left = false;
                arcadeState.right = false;
                //window.spaceship.userData.toggleEndPosition();
                window.dispatchEvent(new Event("arcadeStateChanged"));
            }
        }



    }
}