class Ball extends GraphicEntity {
    constructor(x, y, z) {
        super(x, y, z, [], "Ball");

        this.addBall();
        this.ballState = new BallStateStopped(this, 0, 0);
        this.wireframe = false;
    }

    setState(state) {
        this.ballState = state;
    }

    addBall() {
        var geometry = new THREE.SphereGeometry(2.5, 10, 10);
        var loader = new THREE.TextureLoader();
        // var textures = new Array(6);
        var texture = loader.load("Textures/Ball.png");
        this.materials[0] = new THREE.MeshPhongMaterial({ color: 0xaaaaaa, specular: 0x1a1a1a, map: texture, shininess:100});
        this.materials[0].name = "phong";
        this.materials[1] = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, map: texture});
        this.materials[1].name = "basic";
        this.ballMesh = new THREE.Mesh(geometry, this.materials[0]);
        this.add(this.ballMesh);
        this.add(new THREE.AxisHelper(5));
    }

    toggleMaterials() {
        if (this.ballMesh.material.name == "basic") {
            this.ballMesh.material = this.materials[0];
        } else if (this.ballMesh.material.name == "phong") {
            this.ballMesh.material = this.materials[1];            
        }
    }

    changeMovement() {
        this.ballState.changeMovement();
        console.log("ball is started");
    }

    updateBall(delta) {
        this.ballState.moveBall(delta);
    }

    toggleWireframe() {
        console.log(this.wireframe+" is thing");
        this.wireframe = !this.wireframe;
        this.ballMesh.material.wireframe = this.wireframe;
    }
}
