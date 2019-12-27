//needs to be global
arcadeState = {
    isFlying: false,
    up: false,
    down: false,
    left: false,
    right: false
}

class ArcadeAutomat extends THREE.Group {
    constructor() {
        super();
        this.animations = new Array();
        this.addParts();
        
        

    }
    addParts() {
        this.korpusCreator();
        this.displayCreator();
        this.controllerCreator();
        this.seitenTeilCreator();

    }
    controllerCreator() {
        var leftControls = new THREE.Group();
        var blendeGeometry = new THREE.BoxGeometry(15, 3, 20);
        var blendeMaterial = new THREE.MeshLambertMaterial({
            color: 0x383838
    
        });
        var blendeMesh = new THREE.Mesh(blendeGeometry, blendeMaterial);
        blendeMesh.castShadow = true;
        leftControls.position.set(20, 20, 8);
        leftControls.add(blendeMesh);
        

        var buttons = new THREE.Group();
        
        var buttonMaterial = new THREE.MeshLambertMaterial({
            color: 0xE05353
        });
        //Button Up
        var buttonUpGeometry = new THREE.CylinderGeometry(2, 2, 3, 10, 1, false);
        var buttonUpMesh = new THREE.Mesh(buttonUpGeometry, buttonMaterial);
        leftControls.add(buttonUpMesh);
        buttonUpMesh.position.set(-4, 3, 0);
        buttonUpMesh.castShadow = true;
        buttonUpMesh.name = "Up";
        //ButtonDown
        var buttonDownGeometry = new THREE.CylinderGeometry(2, 2, 3, 10, 1, false);
        var buttonDownMesh = new THREE.Mesh(buttonDownGeometry, buttonMaterial);
        leftControls.add(buttonDownMesh);
        buttonDownMesh.position.set(4, 3, 0);
        buttonDownMesh.castShadow = true;
        buttonDownMesh.name = "Down";
        //buttonLeft
        var buttonLeftGeometry = new THREE.CylinderGeometry(2, 2, 3, 10, 1, false);
        var buttonLeftMesh = new THREE.Mesh(buttonLeftGeometry, buttonMaterial);
        buttons.add(buttonLeftMesh);
        buttonLeftMesh.position.set(0, 3, 4);
        buttonLeftMesh.castShadow = true;
        buttonLeftMesh.name = "Left";
        //buttonRight
        var buttonRightGeometry = new THREE.CylinderGeometry(2, 2, 3, 10, 1, false);
        var buttonRightMesh = new THREE.Mesh(buttonRightGeometry, buttonMaterial);
        buttons.add(buttonRightMesh);
        buttonRightMesh.position.set(0, 3, -4);
        buttonRightMesh.castShadow = true;
        buttonRightMesh.name = "Right"
        
        //ADD Tweens to buttons
        var speed = 400;
        var buttonUpTweens = {
            up: true,
            UpTween: new TWEEN.Tween(buttonUpMesh.position).to(new THREE.Vector3(buttonUpMesh.position.x,
                buttonUpMesh.position.y, buttonUpMesh.position.z), speed).easing(TWEEN.Easing.Quadratic.Out),
            DownTween: new TWEEN.Tween(buttonUpMesh.position).to(new THREE.Vector3(buttonUpMesh.position.x,
                    buttonUpMesh.position.y-1.2, buttonUpMesh.position.z), speed).easing(TWEEN.Easing.Quadratic.Out)
        }
        buttonUpMesh.userData = buttonUpTweens;

        var buttonDownTweens = {
            up: true,
            UpTween: new TWEEN.Tween(buttonDownMesh.position).to(new THREE.Vector3(buttonDownMesh.position.x,
                buttonDownMesh.position.y, buttonDownMesh.position.z), speed).easing(TWEEN.Easing.Quadratic.Out),
            DownTween: new TWEEN.Tween(buttonDownMesh.position).to(new THREE.Vector3(buttonDownMesh.position.x,
                    buttonDownMesh.position.y-1.2, buttonDownMesh.position.z), speed).easing(TWEEN.Easing.Quadratic.Out)
        }
        buttonDownMesh.userData = buttonDownTweens;
        
        var buttonLeftTweens = {
            up: true,
            UpTween: new TWEEN.Tween(buttonLeftMesh.position).to(new THREE.Vector3(buttonLeftMesh.position.x,
                buttonLeftMesh.position.y, buttonLeftMesh.position.z), speed).easing(TWEEN.Easing.Quadratic.Out),
            DownTween: new TWEEN.Tween(buttonLeftMesh.position).to(new THREE.Vector3(buttonLeftMesh.position.x,
                    buttonLeftMesh.position.y-1.2, buttonLeftMesh.position.z), speed).easing(TWEEN.Easing.Quadratic.Out)
        }
        buttonLeftMesh.userData = buttonLeftTweens;
        
        var buttonRightTweens = {
            up: true,
            UpTween: new TWEEN.Tween(buttonRightMesh.position).to(new THREE.Vector3(buttonRightMesh.position.x,
                buttonRightMesh.position.y, buttonRightMesh.position.z), speed).easing(TWEEN.Easing.Quadratic.Out),
            DownTween: new TWEEN.Tween(buttonRightMesh.position).to(new THREE.Vector3(buttonRightMesh.position.x,
                    buttonRightMesh.position.y-1.2, buttonRightMesh.position.z), speed).easing(TWEEN.Easing.Quadratic.Out)
        }
        buttonRightMesh.userData = buttonRightTweens;
        

        
        //HandleWrapper
        var handleWrapper = new THREE.Group();
        var handle = new THREE.Object3D();
        var handleMaterial = new THREE.MeshLambertMaterial({
            color: 0x383838            
        });
        var handleGeometry = new THREE.CylinderGeometry(1.5,1.5,20,10,1,false);



        var handleMesh = new THREE.Mesh(handleGeometry, handleMaterial);
        handleMesh.name = "Handle";
        handleMesh.position.y = -10;
        handleMesh.castShadow = true;
        //handleWrapper.position.set(20, 20, -15);
        handleWrapper.position.set(0, 20, 0);
        handle.position.set(20,10,-15);
        handleWrapper.add(handleMesh);
        handle.rotation.z = -20*DEG_TO_RAD;
        //Kugel
        var sphereGeometry = new THREE.SphereGeometry(3, 16, 16);
        var sphereMesh = new THREE.Mesh(sphereGeometry, buttonMaterial);
        sphereMesh.position.y = 0;
        handleWrapper.add(sphereMesh);
        sphereMesh.castShadow = true;
        sphereMesh.name = "HandleBall";
        handle.add(handleWrapper);

        var handleTweens = {
            up: false,
            UpTween: new TWEEN.Tween(handle.rotation).to(new THREE.Vector3(handle.rotation.x,
                handle.rotation.y, 20*DEG_TO_RAD), speed).easing(TWEEN.Easing.Quadratic.Out),
            DownTween: new TWEEN.Tween(handle.rotation).to(new THREE.Vector3(handle.rotation.x,
                    handle.rotation.y, -20*DEG_TO_RAD), speed).easing(TWEEN.Easing.Quadratic.Out)
        }
        handleMesh.userData = handleTweens;
        sphereMesh.userData = handleTweens;

        //Volume
        var volumeMaterial = new THREE.MeshLambertMaterial({
            color: 0xA1A1A1
        });

        var volumeGeometry = new THREE.CylinderGeometry(3.5, 3.5, 3, 16, 1, false);
        var volumeMesh = new THREE.Mesh(volumeGeometry, volumeMaterial);
        leftControls.add(volumeMesh);
        volumeMesh.position.z = -15;
        volumeMesh.castShadow = true;
        volumeMesh.name = "Volume";

        //Animation Right
        var volumeAnimation = new Animation(volumeMesh, AnimationType.TRANSLATION, AnimationAxis.Y);
        volumeAnimation.setAmount(-0.7);
        volumeAnimation.setSpeed(2);
        volumeMesh.userData = volumeAnimation;
        this.animations.push(volumeAnimation);




        leftControls.add(buttons);
        this.add(handle);
        this.add(leftControls);


    }

    displayCreator() {
        //ReflectionMap
        var path = "../../lib/three.js-r109/examples/textures/cube/MilkyWay/";
        var images = [path + "dark-s_px.jpg", path + "dark-s_nx.jpg", path + "dark-s_py.jpg", path + "dark-s_ny.jpg", path + "dark-s_pz.jpg", path + "dark-s_nz.jpg"];
        var cubeTexture = new THREE.CubeTextureLoader().load(images);
        cubeTexture.mapping = THREE.CubeReflectionMapping;
        var displayMaterial = new THREE.MeshLambertMaterial({
            color: 0x555555
        });
        displayMaterial.envMap = cubeTexture;
        displayMaterial.combine = THREE.MixOperation;
        displayMaterial.reflectivity = 0.5;
        var displayGeometry = new THREE.BoxGeometry(20, 3, 35)
        var displayMesh = new THREE.Mesh(displayGeometry, displayMaterial);

        displayMesh.rotation.z = -68.2 * DEG_TO_RAD;
        //displayMesh.rotation.y = -90 * DEG_TO_RAD;

        displayMesh.position.set(5, 33, 0);
        displayMesh.castShadow = true;


        this.add(displayMesh);
    }
    
    seitenTeilCreator() {
        var topGeometry = new THREE.BoxGeometry(35, 10, 39);
        
        var sideMaterial = new THREE.MeshLambertMaterial({
            color: 0x103540
        });
        var topMesh = new THREE.Mesh(topGeometry, sideMaterial);
        topMesh.position.set(-15,50,0);
        this.add(topMesh);
        var sideleftShape = new THREE.Shape();
        sideleftShape.moveTo(-35, -45);
        sideleftShape.lineTo(-35, 50);
        sideleftShape.lineTo(0, 50);
        sideleftShape.lineTo(15, 25);
        sideleftShape.lineTo(35, 25);
        sideleftShape.lineTo(35, -45);
        sideleftShape.lineTo(-35, -45);
        var extrudeSettings = {
            steps: 1,
            depth: 4,
            bevelEnabled: false
        };
        var sideleftGeometry = new THREE.ExtrudeGeometry(sideleftShape, extrudeSettings);

        var sideleftMesh = new THREE.Mesh(sideleftGeometry, sideMaterial);
        sideleftMesh.position.z = 19.5;
        sideleftMesh.castShadow = true;

        var siderightShape = new THREE.Shape();
        siderightShape.moveTo(-35, -45);
        siderightShape.lineTo(-35, 50);
        siderightShape.lineTo(0, 50);
        siderightShape.lineTo(15, 25);
        siderightShape.lineTo(35, 25);
        siderightShape.lineTo(35, -45);
        siderightShape.lineTo(-35, -45);
        var extrudeSettings = {
            steps: 1,
            depth: 4,
            bevelEnabled: false
        };
        var siderightGeometry = new THREE.ExtrudeGeometry(siderightShape, extrudeSettings);

        var siderightMesh = new THREE.Mesh(siderightGeometry, sideMaterial);
        siderightMesh.position.z = -23.5;
        siderightMesh.castShadow = true;
        this.add(sideleftMesh);
        this.add(siderightMesh);
        
    }
    korpusCreator() {
        //Korpus
        var korpusShape = new THREE.Shape();
        korpusShape.moveTo(-30, -45);
        korpusShape.lineTo(-30, 45);
        korpusShape.lineTo(0, 45);
        korpusShape.lineTo(10, 20);
        korpusShape.lineTo(30, 20);
        korpusShape.lineTo(30, -45);
        korpusShape.lineTo(-30, -45);
        var extrudeSettings = {
            steps: 1,
            depth: 40,
            bevelEnabled: false
        };
        var korpusGeometry = new THREE.ExtrudeGeometry(korpusShape, extrudeSettings);
        var korpusMaterial = new THREE.MeshLambertMaterial({
            color: 0x369C9C
        });
        var korpusMesh = new THREE.Mesh(korpusGeometry, korpusMaterial);
        korpusMesh.position.z = -20;

        //Constructed Solid Geometry - Schlitz
        var holeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
        var holeGeometry = new THREE.BoxGeometry(15,20,4);
        var holeMesh = new THREE.Mesh(holeGeometry, holeMaterial);
        holeMesh.position.set(20, 20, -15);

        var subtractKorpusMesh = threecsg.subtract(korpusMesh, holeMesh, korpusMaterial);
        subtractKorpusMesh.castShadow = true;

        this.add(subtractKorpusMesh);

    }




}