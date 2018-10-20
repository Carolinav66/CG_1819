class Field extends GraphicEntity {
    constructor(x, y, z) {
        'use strict';

        super(x, y, z,
            new THREE.MeshBasicMaterial({ color: 0xc56836 /*0xff09e5*/, wireframe: false }),
            "field");

        this.wallX = 30;
        this.wallZ = 15;

        this.addFieldFloor(0, 0, 0);
        this.addFieldSideWall(30, Math.sqrt(4500)/20, 0, "right");
        this.addFieldSideWall(-30, Math.sqrt(4500)/20, 0, "left");
        this.addFieldFrontWall(0, Math.sqrt(4500)/20, 15, "bottom");
        this.addFieldFrontWall(0, Math.sqrt(4500)/20, -15, "top");
    }

    checkCollisionsX(ball) {
        'use strict';

        if (ball.position.x + ball.radius >= this.wallX || ball.position.x - ball.radius <= -this.wallX) {
            return -1;
        } else {
            return 1;
        }
    }

    checkCollisionsZ(ball) {
        'use strict';

        if (ball.position.z + ball.radius >= this.wallZ || ball.position.z - ball.radius <= -this.wallZ) {
            return -1;
        } else {
            return 1;
        }
    }

    addFieldFloor(x, y, z, side) {
        'use strict';

        var geometry = new THREE.BoxGeometry(60, 30, 0);
        var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0x9f3305, wireframe: false }));
        mesh.rotation.x += Math.PI/2;
        this.add(mesh);
    }

    addFieldSideWall(x, y, z, side) {
        'use strict';

        var geometry = new THREE.BoxGeometry(32, Math.sqrt(4500)/10, 1);
        var mesh = new THREE.Mesh(geometry, this.material);
        if (side == "right"){
            mesh.position.set(x+0.5, y, z);
        } else if (side == "left"){
            mesh.position.set(x-0.5, y, z);
        }
        mesh.rotation.y += Math.PI/2;
        this.add(mesh);
    }
    addFieldFrontWall(x, y, z,side) {
        'use strict';

        var geometry = new THREE.BoxGeometry(62, Math.sqrt(4500)/10, 1);
        var mesh = new THREE.Mesh(geometry, this.material);
        if (side=="top"){
            mesh.position.set(x, y, z-0.5);
        } else if (side="bottom"){
            mesh.position.set(x, y, z+0.5);
        }
        this.add(mesh);
    }

}
