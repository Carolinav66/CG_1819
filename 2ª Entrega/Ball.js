class Ball extends GraphicEntity {
    constructor(x, y, z) {
        'use strict';

        super(x, y, z,
            new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true }),
            "table");

        this.addBall(x,y,z);
    }

    addBall(x,y,z){
        'use strict';
        var axis = new THREE.AxisHelper(1.5);
        var geometry = new THREE.SphereGeometry(Math.sqrt(4500)/20, 15, 15);
        var mesh = new THREE.Mesh(geometry, this.material);
        mesh.position.set(x, y, z);
        this.add(mesh);
        this.add(axis);
    }
}
