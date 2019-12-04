SpaceshipFromFile = function () {

    var spaceship = new THREE.Group();

    var fbxloader = new THREE.FBXLoader();



    fbxloader.load("src/models/spaceship/spaceship2.fbx", function (model) {
        spaceship.add(model);

        model.traverse( function ( child ) {
            if ( child.isMesh ) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        
    });

    return spaceship;
};