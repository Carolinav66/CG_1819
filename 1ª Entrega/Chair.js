class Chair extends GraphicEntity {
    constructor(x, y, z) {
        'use strict';

        super();

        this.material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;

        this.name = "chair";
        this.decelerating = false;
        this.acceleration = 0;
        this.velocity = 0;
        this.angle = 0;
        this.actualAngle = 0;

        this.upper = new THREE.Group();
        this.upperDirection = new THREE.Vector3(0, 0, 1);
        this.addChairSeat(0, 0, 0);
        this.addChairBack(0, 10, 10);
        this.add(this.upper);

        this.addChairLeg(0, -10, 0);
        this.addChairFoot1(0, -20, 7);
        this.addChairFoot1(0, -20, -7);
        this.addChairFoot2(7, -20, 0);
        this.addChairFoot2(-7, -20, 0);

        this.wheels = new THREE.Group();
        this.wheelsDirection = new THREE.Vector3(0, 0, 1);
        this.wheelsYAngle = 0;
        this.wheelsZAngle = 0;
        this.addWheel(0, -22, 15);
        this.addWheel(0, -22, -15);
        this.addWheel(15, -22, 0);
        this.addWheel(-15, -22, 0);
        this.add(this.wheels);

    }

    recalcAngle(angle) {
        angle += Math.PI * 2;
        angle %= Math.PI * 2;
        return angle;
    }

    changeSpeed(clock) {
        'use strict';

        var diff = this.recalcAngle(this.wheelsYAngle - this.actualAngle);

        if (3/2 * Math.PI <= diff && diff < 2 * Math.PI || 1/2 * Math.PI <= diff && diff < Math.PI) {
            var increment = 1/100 * Math.PI;
        } else {
            var increment = -1/100 * Math.PI;
        }

        if (this.velocity != 0 && Math.abs(this.actualAngle - this.wheelsYAngle) % Math.PI >= 1/50 * Math.PI) { //this.velocity != 0 &&
            this.wheelsYAngle += increment;
            //if(this.wheelsYAngle < 0) this.wheelsYAngle += Math.PI * 2
            //this.wheelsYAngle %= Math.PI * 2;
            this.wheelsYAngle = this.recalcAngle(this.wheelsYAngle);
            for (var i = 0; i < this.wheels.children.length; i++) {
                this.wheels.children[i].rotation.y+=increment;
            }
        }

        if (this.velocity != 0) {
            for (var i = 0; i < this.wheels.children.length; i++) {
                this.wheels.children[i].rotation.z+=(this.velocity*Math.PI/500);
            }
        }

        var delta = clock.getDelta();
        var v_0 = this.velocity;
        this.velocity += this.acceleration * delta;
        if (this.decelerating && Math.abs(this.velocity) <= 0.5) {
            this.acceleration = 0;
            this.velocity = 0;
        }
        var x = v_0 * delta - 0.5 * this.acceleration * delta * delta;
        this.translateOnAxis(this.upperDirection, -x);
    }

    rotateChair() {
        'use strict';

        this.upperDirection.z = Math.cos(this.actualAngle);
        this.upperDirection.x = Math.sin(this.actualAngle);
        this.upper.rotateY(this.angle);
        this.actualAngle += this.angle;
        //if(this.actualAngle < 0) this.actualAngle += Math.PI * 2
        //this.actualAngle %= Math.PI * 2;
        this.actualAngle = this.recalcAngle(this.actualAngle);
    }

    addChairSeat(x, y, z) {
        'use strict';

        var geometry = new THREE.CubeGeometry(20, 2, 20);
        var mesh = new THREE.Mesh(geometry, this.material);
        mesh.position.set(x, y, z);
        this.upper.add(mesh);
    }

    addChairBack(x, y, z) {
        'use strict';

        var geometry = new THREE.CubeGeometry(20, 20, 2);
        var mesh = new THREE.Mesh(geometry, this.material);
        mesh.position.set(x, y, z);
        this.upper.add(mesh);
    }

    addChairLeg(x, y, z) {
        'use strict';

        var geometry = new THREE.CubeGeometry(2, 20, 2);
        var mesh = new THREE.Mesh(geometry, this.material);
        mesh.position.set(x, y, z);
        this.add(mesh);
    }

    addChairFoot1(x, y, z) {
      'use strict';

      var geometry = new THREE.CubeGeometry(2, 2, 15);
      var mesh = new THREE.Mesh(geometry, this.material);
      mesh.position.set(x, y, z);
      this.add(mesh);
    }

    addChairFoot2(x, y, z) {
      'use strict';

      var geometry = new THREE.CubeGeometry(15, 2, 2);
      var mesh = new THREE.Mesh(geometry, this.material);
      mesh.position.set(x, y, z);
      this.add(mesh);
    }

    addWheel(x, y, z) {
      'use strict';

      var geometry = new THREE.TorusGeometry(2, 1, 10, 10);
      var mesh = new THREE.Mesh(geometry, this.material);
      mesh.position.set(x, y, z);
      mesh.rotateY(1.5 * Math.PI);
      mesh.add(new THREE.AxisHelper(10))
      this.wheels.add(mesh);
    }
}
