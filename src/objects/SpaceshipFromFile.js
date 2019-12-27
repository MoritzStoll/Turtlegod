class SpaceshipFromFile extends THREE.Group {

    constructor() {
        super();
        this.animations = new Array();
        this.loadModel();
        this.oldDirection = new THREE.Vector3(0,0,1);
    }

    loadModel() {
        var fbxloader = new THREE.FBXLoader();
        var spaceship = new THREE.Group();
        fbxloader.load("src/models/spaceship/Death Star.FBX", function (model) {
            spaceship.add(model);

            model.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

        });

        this.add(spaceship);
    }

    /*rotate(direction) {

        var newDirection;
        var angle;
        if (direction == "Up") {
            newDirection = new THREE.Vector3(0,0,-1);
            angle = this.oldDirection.angleTo(newDirection);
        } else if (direction == "Down") {
            newDirection = new THREE.Vector3(0,0,1);
            angle = this.oldDirection.angleTo(newDirection);
        } else if (direction == "Left") {
            newDirection = new THREE.Vector3(-1,0,0);
            angle = this.oldDirection.angleTo(newDirection);
        } else if (direction == "Right") {
            newDirection = new THREE.Vector3(1,0,0);
            angle = this.oldDirection.angleTo(newDirection);
        }

        var spaceshipAnimation = new Animation(this, AnimationType.ROTATION, AnimationAxis.Y);
        spaceshipAnimation.setAmount(angle);
        spaceshipAnimation.setSpeed(5);

        this.animations.push(spaceshipAnimation);
        return spaceshipAnimation;        
    }*/

    move (isFlying = false, up = false, down = false, right = false, left = false) {
        if (isFlying) {
            //console.log("isFlying: " + isFlying)
            /*if (physics.getBody(this).position.y <= 80) {
                physics.getBody(this).position.y += 0.5;
                
            }*/
            if (this.position.y <= 80) {
                this.position.y += 0.5;
            }

            if (up && !down) {
                this.position.z -= 0.3;
            } else if (down && !up){
                this.position.z += 0.3;
            }
    
            if (left && !right) {
                this.position.x -= 0.3;
            } else if (right && !left) {
                this.position.x += 0.3;
            }

            //console.log("UP: " + up, "Down: " + down, "Left: " + left + "Right: " + right);
        } else {
            if (this.position.y >= 10) {
                this.position.y -= 0.5
            }
        }

    }

};

