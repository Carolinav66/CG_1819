class GraphicEntity extends THREE.Object3D {
    constructor(x, y, z, material, name) {
        super();

        this.position.x = x;
        this.position.y = y;
        this.position.z = z;

        this.material = material;
        this.name = name;
    }

    updatePosition(dx, dy, dz){
        this.position.x += dx;
        this.position.y += dy;
        this.position.z += dz;
    }

    updatePosition(vector, delta){
        vector.divideScalar(vector.length());
        console.log(vector.length())
        this.position.x += vector.x * delta;
        this.position.y += vector.y * delta;
        this.position.z += vector.z * delta;
    }
}
