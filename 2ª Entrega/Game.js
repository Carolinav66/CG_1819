class Game {
    constructor() {
        'use strict';

        this.clock = new THREE.Clock();
        this.clock.start();

        this.orthoCameraAspectRatio = 16 / 9;
        this.orthoCameraWidth = 90; //65;
        this.orthoCameraHeight = this.orthoCameraWidth / this.orthoCameraAspectRatio;
        
        this.aspect = [window.innerWidth, window.innerHeight];
        this.ratio = window.innerWidth / window.innerHeight;

        this.camaraPos1 = [0, 75, 0];
        this.camaraPos2 = [50, 50, 50];
        this.changeCamara = false;
        this.cameraNumber = 1;
        
        this.toggleAxes = false;

        this.countUp = 0;

        this.numberOfBalls = 10;
        this.balls = [];
        this.field;

    }

    placeBalls() {
        'use strict';

        var radius = Math.sqrt(4500) / 20;
        var collision = true;

        var x;
        var y;
        var z;

        for(var i = 0; i < this.numberOfBalls; i++) {
            x = Math.random() * (60 - 2 * radius) - 30 + radius;
            y = radius;
            z = Math.random() * (30 - 2 * radius) - 15 + radius;
            this.balls[i] = new Ball(x, y, z, radius, i);
            console.log("creating " + this.balls[i]);
        }
        while(collision == true) {
            collision = this.checkCollisions(this.substituteBall.bind(this));
        }

        for(var i = 0; i < this.numberOfBalls; i++) {
            this.scene.add(this.balls[i]);
        }
    }

    checkCollisions(func) {
        'use strict'

        var collision = false;
        for(var i = 0; i < this.numberOfBalls; i++) {
            for(var j = 0; j < this.numberOfBalls; j++) {
                if(this.balls[i].ballColliding(this.balls[j])) {
                    if(i == j) {
                        continue;
                    }
                    collision = func(i, j);
                }
            }
            this.collisionWithWall(i, this.field.checkCollisionsX(this.balls[i]),
                                      this.field.checkCollisionsZ(this.balls[i]));
        }
        return collision;
    }

    collisionWithWall(i, x, z) {
        'use strict';

        if(-1 == x) {
            var disp = -(this.balls[i].radius - ( this.field.wallX - Math.abs(this.balls[i].position.x) ));
            if (this.balls[i].position.x > 0){
                this.balls[i].updatePosition(new THREE.Vector3(1,0,0), disp);
            } else {
                this.balls[i].updatePosition(new THREE.Vector3(1,0,0), -disp)
            }
        }
        if(-1 == z) {
            var disp = -(this.balls[i].radius - ( this.field.wallZ - Math.abs(this.balls[i].position.z) ));
            if (this.balls[i].position.z > 0){
                this.balls[i].updatePosition(new THREE.Vector3(0,0,1), disp);
            } else {
                this.balls[i].updatePosition(new THREE.Vector3(0,0,1), -disp)
            }
        }

        this.balls[i].velocity.x *= x;
        this.balls[i].velocity.z *= z;
    }

    substituteBall(i) {
        'use strict';

        var radius = this.balls[i].radius;
        var x = Math.random() * (60 - 2 * radius) - 30 + radius;
        var y = radius;
        var z = Math.random() * (30 - 2 * radius) - 15 + radius;

        this.balls[i] = new Ball(x, y, z, radius, i);

        return true;
    }

    collide(i, j) {
        'use strict';

        if (j < i) {
            return;
        }

        var x = (2 * this.balls[i].radius - this.balls[i].ballDistance(this.balls[j])) / 2 + 0.01;
        var bounceDirection = new THREE.Vector3(this.balls[j].position.x - this.balls[i].position.x,
                                                0,
                                                this.balls[j].position.z - this.balls[i].position.z)

        this.balls[i].updatePosition(bounceDirection, -x);
        this.balls[j].updatePosition(bounceDirection, x);

        var v2 = this.balls[j].velocity;
        var v1 = this.balls[i].velocity;

        this.balls[i].velocity = v2;
        this.balls[j].velocity = v1;

        var s2 = this.balls[j].speed;
        var s1 = this.balls[i].speed;

        this.balls[i].speed = s2;
        this.balls[j].speed = s1;

    }

    createScene() {
        'use strict';

        this.scene = new THREE.Scene();

        this.field = new Field(0, 0, 0);
        this.scene.add(this.field);
        this.placeBalls();
        //var axis = new THREE.AxisHelper(5);
        //this.scene.add(axis);

    }

    createCamera1() {
        'use strict';

        this.cameraNumber = 1;

        this.camera1 = new THREE.OrthographicCamera(-this.orthoCameraWidth / 2,
                                                    this.orthoCameraWidth / 2,
                                                    this.orthoCameraHeight / 2,
                                                    -this.orthoCameraHeight / 2,
                                                    1,
                                                    1000);
        this.camera1.position.x = this.camaraPos1[0];
        this.camera1.position.y = this.camaraPos1[1];
        this.camera1.position.z = this.camaraPos1[2];

        this.camera1.lookAt(this.scene.position);

    }

    createCamera2() {
        'use strict';

        this.cameraNumber = 2;

        this.camera2 = new THREE.PerspectiveCamera(45,
                                                  window.innerWidth / window.innerHeight,
                                                  1,
                                                  1000);
        this.camera2.position.x = this.camaraPos2[0];
        this.camera2.position.y = this.camaraPos2[1];
        this.camera2.position.z = this.camaraPos2[2];

        this.camera2.lookAt(this.scene.position);
    }

    createCamera3() {
        'use strict';

        this.cameraNumber = 3;

        this.camera3 = new THREE.PerspectiveCamera(45,
                                                  window.innerWidth / window.innerHeight,
                                                  1,
                                                  1000);
        this.camera3.position.x = this.balls[0].position.x - 10 * this.balls[0].velocity.x;
        this.camera3.position.y = this.balls[0].position.y + 10;
        this.camera3.position.z = this.balls[0].position.z - 10 * this.balls[0].velocity.z;

        this.camera3.lookAt(this.balls[0].position);
    }


    changeCamera() {
        'use strict';

        if(this.cameraNumber == 1){
          this.camera = this.camera1;
        }

        if(this.cameraNumber == 2){
          this.camera = this.camera2;
        }

        if(this.cameraNumber == 3){
          this.camera = this.camera3;
        }

        this.changeCamara = false;
    }

    onKeyDown(e) {
        'use strict';

        switch (e.keyCode) {
            case 69:  //E
            case 101: //e
                this.toggleAxes = true;
                break;

            case 49: //1
                this.cameraNumber = 1;
                this.changeCamara = true;
                break;

            case 50: //2
                this.cameraNumber = 2;
                this.changeCamara = true;
                break;

            case 51: //3
                this.cameraNumber = 3;
                this.changeCamara = true;
                break;

            default:
                break;
        }
    }


    onResize() {
        'use strict';

        if(this.cameraNumber == 1){
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            var windowRatio = window.innerWidth / window.innerHeight;

            if(windowRatio > this.orthoCameraAspectRatio) {
                this.camera.left = -this.orthoCameraHeight * windowRatio / 2;
                this.camera.right = this.orthoCameraHeight * windowRatio / 2;
                this.camera.top = this.orthoCameraHeight / 2;
                this.camera.bottom = -this.orthoCameraHeight / 2;
            } else {
                this.camera.left = -this.orthoCameraWidth / 2;
                this.camera.right = this.orthoCameraWidth / 2;
                this.camera.top = (this.orthoCameraWidth / windowRatio) / 2;
                this.camera.bottom = -(this.orthoCameraWidth / windowRatio) / 2;
            }
            this.camera.updateProjectionMatrix();
        }

        if(this.cameraNumber == 2 || this.cameraNumber == 3) {

            this.renderer.setSize(window.innerWidth, window.innerHeight);

            if (window.innerHeight > 0 && window.innerWidth > 0) {
                this.camera.aspect = window.innerWidth / window.innerHeight;
                this.camera.updateProjectionMatrix();
            }
        }
    }

    render() {
        'use strict';

        this.renderer.render(this.scene, this.camera);
    }

    init() {
        'use strict';

        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.createScene();
        this.createCamera1(); //50, 50, 50
        this.createCamera2();
        this.createCamera3();
        //this.controls = new THREE.OrbitControls( this.camera2 );

        this.camera = this.camera1;
        this.cameraNumber = 1;

        this.onResize();
        this.render();
        //this.controls.update();
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("resize", this.onResize.bind(this));
    }

    animate() {
        'use strict';

        if (this.changeCamara) {
            this.changeCamera();
            this.changeCamara = false;
            this.onResize();
        }

        
        if (this.toggleAxes) {
            for (var i = 0; i < this.balls.length; i++) {
                this.balls[i].toggleAxis();
            }
            this.toggleAxes = false;
        }
        var delta = this.clock.getDelta();
        var speedUp = false;
        this.countUp += delta;
        if (this.countUp > 2) {
            speedUp = true;
            this.countUp = 0;
        }
        
        for(var i = 0; i < this.numberOfBalls; i++) {
            this.scene.getObjectByName("ball" + i).updateBall(delta, speedUp);
        }
        this.checkCollisions(this.collide.bind(this));
        
        this.camera3.position.x = this.balls[0].position.x - 10 * this.balls[0].velocity.x;
        this.camera3.position.y = this.balls[0].position.y + 10;
        this.camera3.position.z = this.balls[0].position.z - 10 * this.balls[0].velocity.z;
        this.camera3.lookAt(this.balls[0].position);
        
        // this.controls.update();
        this.render();
        requestAnimationFrame( this.animate.bind(this) );
    }
}
