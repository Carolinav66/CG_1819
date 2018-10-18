class Field extends GraphicEntity {
    constructor(x, y, z) {
        'use strict';

        super(x, y, z,
            new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true }),
            "table");

        this.addFieldFloor(0, 0, 0);
        this.addFieldSideWall(30, Math.sqrt(4500)/20, 0);
        this.addFieldSideWall(-30, Math.sqrt(4500)/20, 0);
        this.addFieldFrontWall(0, Math.sqrt(4500)/20, 15);
        this.addFieldFrontWall(0, Math.sqrt(4500)/20, -15);
    }

    addFieldFloor(x, y, z) {
        'use strict';

        var geometry = new THREE.PlaneGeometry(60, 30);
        var mesh = new THREE.Mesh(geometry, this.material);
        mesh.rotation.x += Math.PI/2
        mesh.position.set(x, y, z);
        this.add(mesh);
    }

    addFieldSideWall(x, y, z) {
        'use strict';

        var geometry = new THREE.PlaneGeometry(30, Math.sqrt(4500)/10);
        var mesh = new THREE.Mesh(geometry, this.material);
        mesh.position.set(x, y, z);
        mesh.rotation.y += Math.PI/2
        this.add(mesh);
    }
    addFieldFrontWall(x, y, z) {
        'use strict';

        var geometry = new THREE.PlaneGeometry(60, Math.sqrt(4500)/10);
        var mesh = new THREE.Mesh(geometry, this.material);
        mesh.position.set(x, y, z);
        this.add(mesh);
    }

}
