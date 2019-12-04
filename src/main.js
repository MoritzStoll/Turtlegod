// External libraries
document.write('<script type="text/javascript" src="../../lib/three.js-r109/build/three.js"></script>');
document.write('<script type="text/javascript" src="../../lib/three.js-r109/examples/js/controls/OrbitControls.js"></script>');
document.write('<script type="text/javascript" src="../../lib/three.js-r109/examples/js/libs/inflate.min.js"></script>');
//FBX Loader
document.write('<script type="text/javascript" src="../../lib/three.js-r109/examples/js/loaders/FBXLoader_r90.js"></script>');
//Obj Loader
document.write('<script type="text/javascript" src="../../lib/three.js-r109/examples/js/loaders/OBJLoader.js"></script>');
//MTL Loader
document.write('<script type="text/javascript" src="../../lib/three.js-r109/examples/js/loaders/MTLLoader.js"></script>');

document.write('<script type="text/javascript" src="../../lib/dat.gui-0.7.6/build/dat.gui.js"></script>');
document.write('<script type="text/javascript" src="../../lib/ThreeCSG-1/three-csg.js"></script>');
document.write('<script type="text/javascript" src="../../lib/cannon.js-0.6.2/build/cannon.js"></script>');
document.write('<script type="text/javascript" src="../../lib/cannon.js-0.6.2/tools/threejs/CannonDebugRenderer.js"></script>');

// Own modules
//document.write('<script type="text/javascript" src="src/objects/Radio.js"></script>');
document.write('<script type="text/javascript" src="src/objects/Floor.js"></script>');
document.write('<script type="text/javascript" src="src/objects/PillarFromFile.js"></script>');
//document.write('<script type="text/javascript" src="src/objects/BowlFromFile.js"></script>');
document.write('<script type="text/javascript" src="src/objects/SpaceshipFromFile.js"></script>');
document.write('<script type="text/javascript" src="src/objects/Lights.js"></script>');
document.write('<script type="text/javascript" src="src/animation/Animation.js"></script>');
document.write('<script type="text/javascript" src="src/animation/Tween.js"></script>');
document.write('<script type="text/javascript" src="src/physics/Physics.js"></script>');
document.write('<script type="text/javascript" src="src/sound/Soundscape.js"></script>');

// Event functions
document.write('<script type="text/javascript" src="src/eventfunctions/updateAspectRatio.js"></script>');
document.write('<script type="text/javascript" src="src/eventfunctions/calculateMousePosition.js"></script>');
document.write('<script type="text/javascript" src="src/eventfunctions/executeRaycast.js"></script>');
document.write('<script type="text/javascript" src="src/eventfunctions/executeKeyAction.js"></script>');
document.write('<script type="text/javascript" src="src/eventfunctions/setRadioSound.js"></script>');

const DEG_TO_RAD = Math.PI / 180;

function main() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    physics = new Physics();
    physics.initialize(0, -200, 0, 1 / 120, true);
    physicsVisualDebugger = new THREE.CannonDebugRenderer(scene, physics.getWorld());

    soundscape = new Soundscape();

    var axes = new THREE.AxesHelper(20);
    scene.add(axes);

    var lights = new Lights();
    scene.add(lights.createAmbientLight());
    var directionalLight = lights.createDirectionalLight(-30, 200, 100);
    scene.add(directionalLight);

    //Objects in Scene
    scene.add(new Floor(300,300, 10))

    //Pillar
    var pillar = new PillarFromFile();
    pillar.position.x = -35;
    pillar.position.y = 25;
    pillar.scale.set(0.01, 0.01, 0.01);
    scene.add(pillar)
    //physics.addBox(pillar, 10, 40, 50, 45, 0, 0, 0);
    //physics.addCylinder(pillar, 10, 25, 25, 50, 10, 0, 45, 0, -90 *DEG_TO_RAD, 0, 0);

    

    //Spaceship --> Animate Floating
    var spaceship = new SpaceshipFromFile();
    spaceship.position.x = -35;
    spaceship.position.y = 80;
    spaceship.scale.set(2,2,2);
    
    scene.add(spaceship);

    //Camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 200, 150);
    camera.lookAt(0, 83, 0);
    camera.add(soundscape.getAudioListener());

    var orbitControls = new THREE.OrbitControls(camera);
    orbitControls.target = new THREE.Vector3(0, 0, 0);
    orbitControls.update();

    var gui = new dat.GUI();
    gui.add(directionalLight.position, "x", -200, 200);
    gui.add(directionalLight.position, "y", -200, 200);
    gui.add(directionalLight.position, "z", -200, 200);
    gui.domElement.onmouseenter = function () {
        orbitControls.enabled = false;
    };
    gui.domElement.onmouseleave = function () {
        orbitControls.enabled = true;
    };

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.shadowMap.enabled = true;

    document.getElementById("3d_content").appendChild(renderer.domElement);

    var clock = new THREE.Clock();

    function mainLoop() {

        var delta = clock.getDelta();

        physics.update(delta);
        physicsVisualDebugger.update();

        TWEEN.update();

    

        renderer.render(scene, camera);
        requestAnimationFrame(mainLoop);
    }

    mainLoop();

    window.onresize = updateAspectRatio;
    window.onmousemove = calculateMousePosition;
    window.onclick = executeRaycast;
    window.onkeydown = keyDownAction;
    window.onkeyup = keyUpAction;


}

window.onload = main;