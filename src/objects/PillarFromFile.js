PillarFromFile = function () {

    var pillar = new THREE.Group();

    var fbxloader = new THREE.FBXLoader();

    fbxloader.load('src/models/Pillar/kamenna_koule.fbx', function (object) {
        pillar.add(object);

        object.traverse(function (child) {
            if (child.isMesh) {
                child.material.side = THREE.DoubleSide;
                child.castShadow = true;
            }
        });
    });

    return pillar;
};