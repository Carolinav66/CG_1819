class PauseScreen extends GraphicEntity {
    constructor(x, y, z) {
        var loader = new THREE.TextureLoader();
        var texture = loader.load("Textures/Board.png");
        var material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture});                  
        super(x, y, z, [material], "PauseScreen");
        this.addScreen();
    }

    addScreen() {
        var geometry = new THREE.PlaneGeometry(40, 40, 20, 20);
        this.mesh = new THREE.Mesh(geometry, this.materials[0]);
        //this.boardMesh.rotation.x -= Math.PI/2;
        this.add(this.mesh);
    }

}