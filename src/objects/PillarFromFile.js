PillarFromFile = function () {

    var pillar = new THREE.Group();

/*
         var objLoader = new THREE.OBJLoader();

        objLoader.load( 'src/models/Pillar/SecondPillar/0aStonePillar01.obj', function ( object ) {

            pillar.add(object);
            console.log("Object: " + object);
            object.traverse(function (child) {
                if (child.isMesh) {
                    child.material.side = THREE.DoubleSide;
                    child.castShadow = true;
                }
            });
            renderer.render(scene, camera);

        }, onerror, ()=> {
            console.log("Error")
        });

 */

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