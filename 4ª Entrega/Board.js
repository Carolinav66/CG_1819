class Board extends GraphicEntity {
    constructor(x, y, z) {
        var loader = new THREE.TextureLoader();
        var texture = loader.load("Textures/Board.png");
        var bumptexture = loader.load("Textures/BoardBumpMap2.png");
        var phongMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, specular:0x111111, map: texture, bumpMap: bumptexture});
        phongMaterial.name = "phong";     
        var basicMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture, bumpMap: bumptexture});        
        basicMaterial.name = "basic";             
        super(x, y, z, [phongMaterial, basicMaterial], "Board");
        this.addBoard();
        this.wireframe = false;
    }

    addBoard() {
        var geometry = new THREE.PlaneGeometry(40, 40, 20, 20);
        this.boardMesh = new THREE.Mesh(geometry, this.materials[0]);
        this.boardMesh.rotation.x -= Math.PI/2;
        this.add(this.boardMesh);
    }

    toggleMaterials() {
        if (this.boardMesh.material.name == "basic") {
            this.boardMesh.material = this.materials[0];
        } else if (this.boardMesh.material.name == "phong") {
            this.boardMesh.material = this.materials[1];            
        }
    }

    toggleWireframe() {
        this.wireframe = !this.wireframe;
        for(var i = 0; i < 6; i++){
            //console.log(this.boardMesh.material.materials[i]);
            this.materials[0].wireframe = this.wireframe;
        }
    }

}
