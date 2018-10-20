class Field extends GraphicEntity {
    constructor(x, y, z) {
        'use strict';

        super(x, y, z,
            new THREE.MeshBasicMaterial({ color: 0xc56836 /*0xff09e5*/, wireframe: false }),
            "table");

        this.wallX = 30;
        this.wallZ = 15;

        this.addFieldFloor(0, 0, 0);
        this.addFieldSideWall(30, Math.sqrt(4500)/20, 0);
        this.addFieldSideWall(-30, Math.sqrt(4500)/20, 0);
        this.addFieldFrontWall(0, Math.sqrt(4500)/20, 15);
        this.addFieldFrontWall(0, Math.sqrt(4500)/20, -15);
    }

    checkCollisionsX(ball) {
        if (ball.position.x + ball.radius >= this.wallX || ball.position.x - ball.radius <= -this.wallX) {
            return -1;
        } else {
            return 1;
        }
    }

    checkCollisionsZ(ball) {
        if (ball.position.z + ball.radius >= this.wallZ || ball.position.z - ball.radius <= -this.wallZ) {
            return -1;
        } else {
            return 1;
        }
    }

    addFieldFloor(x, y, z) {
        'use strict';

        var geometry = new THREE.BoxGeometry(60, 30, 0);
        var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xff09e5, wireframe: false }));
        mesh.rotation.x += Math.PI/2
        mesh.position.set(x, y, z);
        this.add(mesh);
    }

    addFieldSideWall(x, y, z) {
        'use strict';

        var geometry = new THREE.BoxGeometry(30, Math.sqrt(4500)/10, 0);
        var mesh = new THREE.Mesh(geometry, this.material);
        mesh.position.set(x, y, z);
        mesh.rotation.y += Math.PI/2
        this.add(mesh);
    }
    addFieldFrontWall(x, y, z) {
        'use strict';

        var geometry = new THREE.BoxGeometry(60, Math.sqrt(4500)/10, 0);
        var mesh = new THREE.Mesh(geometry, this.material);
        mesh.position.set(x, y, z);
        this.add(mesh);
    }

}
