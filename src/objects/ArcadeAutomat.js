class ArcadeAutomat extends THREE.Group {
    constructor() {
        super();
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

        //Button Up
        var buttonMaterial = new THREE.MeshLambertMaterial({
            color: 0xE05353
        });
        var buttonUpGeometry = new THREE.CylinderGeometry(2, 2, 3, 10, 1, false);

        var buttonUpMesh = new THREE.Mesh(buttonUpGeometry, buttonMaterial);
        buttons.add(buttonUpMesh);
        buttonUpMesh.position.set(-4, 3, 0);
        buttonUpMesh.castShadow = true;

        //ButtonDown
    
        var buttonDownGeometry = new THREE.CylinderGeometry(2, 2, 3, 10, 1, false);

        var buttonDownMesh = new THREE.Mesh(buttonDownGeometry, buttonMaterial);
        buttons.add(buttonDownMesh);
        buttonDownMesh.position.set(4, 3, 0);
        buttonDownMesh.castShadow = true;
        //buttonLeft

        var buttonLeftGeometry = new THREE.CylinderGeometry(2, 2, 3, 10, 1, false);

        var buttonLeftMesh = new THREE.Mesh(buttonLeftGeometry, buttonMaterial);
        buttons.add(buttonLeftMesh);
        buttonLeftMesh.position.set(0, 3, 4);
        buttonLeftMesh.castShadow = true;
        //buttonRight
     
        var buttonRightGeometry = new THREE.CylinderGeometry(2, 2, 3, 10, 1, false);

        var buttonRightMesh = new THREE.Mesh(buttonRightGeometry, buttonMaterial);
        buttons.add(buttonRightMesh);
        buttonRightMesh.position.set(0, 3, -4);
        buttonRightMesh.castShadow = true;
        //HandleWrapper
        var handleWrapper = new THREE.Group();
        var handleMaterial = new THREE.MeshLambertMaterial({
            color: 0x383838            
        });
        var handleGeometry = new THREE.CylinderGeometry(1.5,1.5,20,10,1,false);
        var handleMesh = new THREE.Mesh(handleGeometry, handleMaterial);
        handleMesh.position.y = 0;
        handleMesh.castShadow = true;
        handleWrapper.position.set(20, 20, -15);
        handleWrapper.add(handleMesh);

        //Kugel
        var sphereGeometry = new THREE.SphereGeometry(3, 16, 16);
        var sphereMesh = new THREE.Mesh(sphereGeometry, buttonMaterial);
        sphereMesh.position.y = 10;
        handleWrapper.add(sphereMesh);
        sphereMesh.castShadow = true;


        //Volume
        var volumeMaterial = new THREE.MeshLambertMaterial({
            color: 0xA1A1A1
        });

        var volumeGeometry = new THREE.CylinderGeometry(3.5, 3.5, 3, 16, 1, false);
        var volumeMesh = new THREE.Mesh(volumeGeometry, volumeMaterial);
        leftControls.add(volumeMesh);
        volumeMesh.position.z = -15;
        volumeMesh.castShadow = true;

        leftControls.add(buttons);
        this.add(handleWrapper);
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