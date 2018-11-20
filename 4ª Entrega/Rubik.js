class Rubik extends GraphicEntity {
    constructor(x, y, z) {
        super(x, y, z, [], "Rubik");

        this.cubeMeshes = new Array(6);
        this.addRubik();
        this.wireframe = false;
    }

    addRubik() {
        var geometries = new Array(6);
        for(var i = 0; i < 6; i++){
            geometries[i] = new THREE.PlaneGeometry(5, 5, 5, 5);
        }
        var loader = new THREE.TextureLoader();
        var materials = new Array(6);
        var bumptexture = loader.load("Textures/BumpMapNew.png");
        for(var i = 0; i < 6; i++){
            var texture = loader.load("Textures/Face"+(i+1).toString()+".png");
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            //console.log("Textures/Face"+(i+1).toString()+".png");
            materials[i] = new THREE.MeshPhongMaterial({ color:0xaaaaaa, map:texture, bumpMap:bumptexture});
            this.cubeMeshes[i] = new THREE.Mesh(geometries[i], materials[i]);
            this.cubeMeshes[i].phongMaterial = this.cubeMeshes[i].material;
            this.cubeMeshes[i].phongMaterial.name = "phong";
            this.cubeMeshes[i].basicMaterial = new THREE.MeshBasicMaterial({ color:0xaaaaaa, map:texture});
            this.cubeMeshes[i].basicMaterial.name = "basic";            
            this.add(this.cubeMeshes[i]);
        }
        this.cubeMeshes[0].position.x += 2.5;
        this.cubeMeshes[0].rotation.y += Math.PI/2;

        this.cubeMeshes[1].position.y += 2.5;
        this.cubeMeshes[1].rotation.x -= Math.PI/2;

        this.cubeMeshes[2].position.z += 2.5;

        this.cubeMeshes[3].position.x -= 2.5;
        this.cubeMeshes[3].rotation.y -= Math.PI/2;

        this.cubeMeshes[4].position.y -= 2.5;
        this.cubeMeshes[4].rotation.x += Math.PI/2;

        this.cubeMeshes[5].position.z -= 2.5;
        this.cubeMeshes[5].rotation.y += Math.PI;
    }

    toggleMaterials() {
        for(var i = 0; i < 6; i++) {
            if (this.cubeMeshes[i].material.name == "basic") {
                this.cubeMeshes[i].material = this.cubeMeshes[i].phongMaterial;
            } else if (this.cubeMeshes[i].material.name == "phong") {
                this.cubeMeshes[i].material = this.cubeMeshes[i].basicMaterial;
            }
        }
    }

    toggleWireframe() {
        this.wireframe = !this.wireframe;
        for(var i = 0; i < 6; i++) {
            //console.log(this.cubeMesh.material.materials[i].wireframe);
            this.cubeMeshes[i].material.wireframe = this.wireframe;
        }
    }
}
