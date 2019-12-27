function setSpaceShipState() {
    //remove physical body
    if (arcadeState.isFlying) {
        //physics.removeBody(spaceship);
        console.log(physics.physicalBodies)
        console.log(physics.visualObjects);
    } else {
       //physics.addSphere(spaceship, 290, 35);
    }
}