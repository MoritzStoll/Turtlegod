SeagullFromFile = function () {

    var seagull = new THREE.Group();

    var fbxloader = new THREE.FBXLoader();



    fbxloader.load("src/models/Seagull/base.fbx", function (model) {
        seagull.add(model);
   
       
        model.traverse( function ( child ) {
            if ( child.isMesh ) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        
    });

    return seagull;
};