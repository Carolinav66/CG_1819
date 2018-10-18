class GraphicEntity extends THREE.Object3D {
    constructor(x, y, z, material, name) {
        super();

        this.position.x = x;
        this.position.y = y;
        this.position.z = z;

        this.material = material;
        this.name = name;
    }
}