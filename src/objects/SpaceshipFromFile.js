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

    changeFlyMode(fly) {
        if (fly) {
            physics.getBody(this).mass = 0;
            physics.getBody(this).rotation = 0;
            
            
        } else {
            physics.getBody(this).mass = 10;
        }
    }
    move (isFlying = false, up = false, down = false, right = false, left = false) {
        var speed = 15;
        if (isFlying) {
            var body = physics.getBody(this);
            var velocity = new THREE.Vector3(0,0,0);
            if (body.position.y <= 80) {
                console.log("Push", body.position.y)
                body.velocity.set(0,speed,0);
                //body.rotation.set(0,0,0);
                body.quaternion.setFromAxisAngle(new CANNON.Vec3(0,0,0), 0);
                //body.position.y += 0.3;
            } else {
                body.velocity.set(0,0,0);
            }

            if (up && !down) {
                body.velocity.set(0,0,-speed)
                //body.position.z -= 0.3;
            } else if (down && !up){
                body.velocity.set(0,0,speed)

                
                //body.position.z += 0.3;
            }
    
            if (left && !right) {
                body.velocity.set(-speed,0,0)

                //body.position.x -= 0.3;
            } else if (right && !left) {
                body.velocity.set(speed,0,0)

//                body.position.x += 0.3;
            }

            //console.log("UP: " + up, "Down: " + down, "Left: " + left + "Right: " + right);
        } else {
            console.log("Landing")
            
        }

    }

};

