class Ball extends GraphicEntity{
    constructor(x,y,z){
        super(x,y,z,[],"Ball")

        this.addBall()
    }

    addBall(){
        var geometry = new THREE.SphereGeometry(2.5,100,100);
        var loader = new THREE.TextureLoader();
        // var textures = new Array(6);
        var texture = loader.load("Textures/Ball.png");
        var material = new THREE.MeshPhongMaterial({ color: 0xaaaaaa, specular:0x0a0a0a, map:texture, shininess:100});
        this.ballMesh = new THREE.Mesh(geometry, material);
        this.add(this.ballMesh);
    }
}
