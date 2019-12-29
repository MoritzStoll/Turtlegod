class Lights {

    constructor() {

    }

    createAmbientLight() {
        var ambientLight = new THREE.AmbientLight(0xffffff);
        ambientLight.intensity = 0.4;
        return ambientLight;
    }

    createSpotLight(posX, posY, posZ) {
        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(posX, posY, posZ);
        spotLight.intensity = 0.4;
        spotLight.target = scene;
        spotLight.angle = 60 * DEG_TO_RAD;
        spotLight.penumbra = 1;
        spotLight.castShadow = true;
        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;
        //spotLight.shadow.camera.aspect = 1;
        //spotLight.shadow.camera.near = 10;
        //spotLight.shadow.camera.far = 40;
        //scene.add(new THREE.CameraHelper(spotLight.shadow.camera));
        return spotLight;
    }

    createDirectionalLight(posX, posY, posZ) {
        var directionaLight = new THREE.DirectionalLight(0xffffff);
        directionaLight.position.set(posX, posY, posZ);
        directionaLight.lookAt(scene.position);
        directionaLight.intensity = 0.7;
        directionaLight.castShadow = true;
        directionaLight.shadow.radius = 2;
        directionaLight.shadow.mapSize.width = 2024;
        directionaLight.shadow.mapSize.height = 2024;
        directionaLight.shadow.camera.top = 200;
        directionaLight.shadow.camera.bottom = -200;
        directionaLight.shadow.camera.left = -200;
        directionaLight.shadow.camera.right = 200;
        //scene.add(new THREE.CameraHelper(directionaLight.shadow.camera));
        return directionaLight;
    }
}