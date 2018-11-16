class Board extends GraphicEntity{
    constructor(x,y,z){
        super(x,y,z,[],"Board")

        this.addBoard()
    }

    addBoard(){
        var geometry = new THREE.BoxGeometry(40,40,0.1,20,20);
        var loader = new THREE.TextureLoader()
        var textures = new Array(6);
        for(var i = 0; i<6; i++){
            texture[i] = loader.load("Textures/Face"+(i+1).toString()+".png")
        }
    }
}
