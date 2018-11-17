class Board extends GraphicEntity{
    constructor(x,y,z){
        super(x,y,z,[],"Board")

        this.addBoard()
    }

    addBoard(){
        var geometry = new THREE.BoxGeometry(40,1,40,20,20);
        var loader = new THREE.TextureLoader()
        var materials = new Array(6);
        for(var i = 0; i<6; i++){
            if (i==2){
                var texture = loader.load("Textures/Board.png");
                var bumptexture = loader.load("Textures/BoardBumpMap2.png");
                materials[i] = new THREE.MeshPhongMaterial({ color: 0xffffff, specular:0x010101, map:texture, bumpMap:bumptexture});
            } else {
                var texture = loader.load("Textures/BoardSide.png");
                var bumptexture = loader.load("Textures/BoardSideBump.png");
                materials[i] = new THREE.MeshPhongMaterial({ color: 0xffffff, specular:0x010101, map:texture, bumpMap:bumptexture});
            }
        }
        this.boardMesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        this.add(this.boardMesh);
    }
}
