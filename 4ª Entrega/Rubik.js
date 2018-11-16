class Rubik extends GraphicEntity{
    constructor(x,y,z){
        super(x,y,z,[],"Rubik")

        this.addRubik()
    }

    addRubik(){
        var geometry = new THREE.BoxGeometry(5,5,5,5,5);
        var loader = new THREE.TextureLoader();
        // var textures = new Array(6);
        var materials = new Array(6);
        var bumptexture = loader.load("Textures/BumpMap.png");
        for(var i = 0; i<6; i++){
            var texture = loader.load("Textures/Face"+(i+1).toString()+".png");
            console.log("Textures/Face"+(i+1).toString()+".png");
            materials[i] = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, map:texture, bumpMap:bumptexture});
        }
        console.log(materials);
        var cube = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        this.add(cube);
    }
}
