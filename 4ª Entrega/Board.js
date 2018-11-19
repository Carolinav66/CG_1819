class Board extends GraphicEntity {
    constructor(x, y, z) {
        var loader = new THREE.TextureLoader()
        var texture = loader.load("Textures/Board.png");
        var bumptexture = loader.load("Textures/BoardBumpMap2.png");
        var material = new THREE.MeshPhongMaterial({ color: 0xffffff, specular:0x111111, map:texture, bumpMap:bumptexture});
        super(x, y, z, [material], "Board");
        this.addBoard();
        this.wireframe = false;
    }

    addBoard(){
        var geometry = new THREE.PlaneGeometry(40,40,20,20);
        this.boardMesh = new THREE.Mesh(geometry, this.materials[0]);
        this.boardMesh.rotation.x-=Math.PI/2;
        this.add(this.boardMesh);
    }

    toggleWireframe(){
        this.wireframe = !this.wireframe;
        for(var i = 0; i<6; i++){
            //console.log(this.boardMesh.material.materials[i]);
            this.materials[0].wireframe=this.wireframe;
        }
    }

}
