class Ball extends GraphicEntity{
    constructor(x,y,z){
        super(x,y,z,[],"Ball")

        this.addBall()
        this.ballState = new BallStateStopped(this,0,0);
    }

    setState(state){
        this.ballState=state;
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

    startBall(){
        this.ballState.startBall();
        console.log("ball is started");
    }

    stopBall(){
        this.ballState.stopBall();
        console.log("ball is stopped")
    }

    updateBall(delta){
        this.ballState.moveBall(delta);
    }
}
