class Game {
    constructor() {
        'use strict';

        this.clock = new THREE.Clock();
        this.clock.start();

        this.aspect = [window.innerWidth, window.innerHeight];
        this.ratio = window.innerWidth / window.innerHeight;

        this.camaraPos = [0, 75, 0];
        this.changeCamara = false;
        this.toggleWireframe = false;

        this.numberOfBalls = 10;
        this.balls = [];
        this.field;

    }

    placeBalls() {
        'use strict';

        var radius = Math.sqrt(4500) / 20;
        var collision = true;

        var x; //= Math.random() * (60 - 2 * radius) - 30 + radius;
        var y; //= radius;
        var z; //= Math.random() * (30 - 2 * radius) - 15 + radius;

        for(var i = 0; i < this.numberOfBalls; i++) {
            x = Math.random() * (60 - 2 * radius) - 30 + radius;
            y = radius;
            z = Math.random() * (30 - 2 * radius) - 15 + radius;
            this.balls[i] = new Ball(x, y, z, radius, i);
            console.log("creating " + this.balls[i])
        }
        while(collision == true) {
            collision = this.checkCollisions(this.substituteBall.bind(this))
        }

        for(var i = 0; i < this.numberOfBalls; i++){
            this.scene.add(this.balls[i])
        }
    }

    checkCollisions(func) {
        var collision = false
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
            this.balls[i].updatePosition(this.balls[i].velocity, disp);
        }
        if(-1 == z) {
            var disp = -(this.balls[i].radius - ( this.field.wallZ - Math.abs(this.balls[i].position.z) ));
            this.balls[i].updatePosition(this.balls[i].velocity, disp);
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

        var x = -(2 * this.balls[i].radius - this.balls[i].ballDistance(this.balls[j])) / 2;

        this.balls[i].updatePosition(this.balls[i].velocity, x);
        this.balls[j].updatePosition(this.balls[j].velocity, x);

        /* if(this.balls[i].ballDistance(this.balls[j]) < 2 * this.balls[i].radius) {
            var x = -(2 * this.balls[i].radius - this.balls[i].ballDistance(this.balls[j])) / 2;

            this.balls[i].updatePosition(this.balls[i].velocity, x);
            this.balls[j].updatePosition(this.balls[j].velocity, x);
        } */

        var v1 = this.balls[i].velocity;
        var v2 = this.balls[j].velocity;

        this.balls[i].velocity = v2;
        this.balls[j].velocity = v1;


        /*var c1 = [this.balls[i].position.x, this.balls[i].position.y, this.balls[i].position.z];
        var c2 = [this.balls[j].position.x, this.balls[j].position.y, this.balls[j].position.z];

        var m1 = 1;
        var m2 = 1;

        var dist = this.pointDistance(c1, c2);
        var vDiff = v2.distanceTo(v1);

        var cNorm = Math.sqrt(dist[0]**2, dist[1]**2, dist[2]**2);
        var interProd = dist[0] * vDiff.x + dist[1] * vDiff.y + dist[2] * vDiff.z;

        var scalar = ( (2 * m2) / (m1 + m2) ) * ( interProd / cNorm**2 );
        var aux = [dist[0] * scalar, dist[1] * scalar, dist[2] * scalar];

        var new_v1 = new THREE.Vector3( v1.x - aux[0],  v1.y - aux[1], v1.z - aux[2]);*/

        
    }

    pointDistance(a, b) {
        return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
    }

    createScene() {
        'use strict';

        this.scene = new THREE.Scene();

        this.field = new Field(0, 0, 0);
        this.scene.add(this.field);
        //var ball = new Ball(0,Math.sqrt(4500)/40,0);
        //this.scene.add(ball);
        this.placeBalls();
        var axis = new THREE.AxisHelper(5);
        this.scene.add(axis);

    }
    createCamera() {
        'use strict';

        var aspectConstant = 50;

        this.camera = new THREE.PerspectiveCamera(45, 
                                                  1.4,
                                                  1,
                                                  1000);
        this.camera.position.x = this.camaraPos[0];
        this.camera.position.y = this.camaraPos[1];
        this.camera.position.z = this.camaraPos[2];

        this.camera.lookAt(this.scene.position);

    }

    changeCameraPosition() {
        this.camera.position.x = this.camaraPos[0];
        this.camera.position.y = this.camaraPos[1];
        this.camera.position.z = this.camaraPos[2];

        this.camera.lookAt(this.scene.position);

    }

    onKeyDown(e) {
        'use strict';

        switch (e.keyCode) {
            case 65: //A
            case 97: //a
                break;

            case 49: //1
                break;

            case 50: //2
                break;

            case 51: //3
                break;

            case 37: //esquerda
                break;

            case 38: // cima
                break;

            case 39: // direita
                break;

            case 40: // baixo
                break;

            default:
                break;
        }
    }

    onKeyUp(e) {
        'use strict';

        switch (e.keyCode) {
            case 37: //esquerda
                break;

            case 38: // cima
            case 40: // baixo
                break;
            case 39: // direita
                break;

            default:
                break;
        }
    }

    onResize() {
        'use strict';

        this.renderer.setSize(window.innerWidth, window.innerHeight);

        //novo aspect
        var newRatio = window.innerWidth / window.innerHeight;
        var aspectConstant = 50;

        if (window.innerHeight > 0 && window.innerWidth > 0) {
            this.camera.left = -aspectConstant * newRatio;
            this.camera.right = aspectConstant * newRatio;
            this.camera.top = aspectConstant;
            this.camera.bottom = -aspectConstant;
            this.camera.updateProjectionMatrix();
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
        this.createCamera(); //50, 50, 50
        this.controls = new THREE.OrbitControls( this.camera );

        this.render();
        this.controls.update();
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
        window.addEventListener("resize", this.onResize.bind(this));
    }

    animate() {
        if (this.changeCamara) {
            this.changeCameraPosition();
            this.changeCamara = false;
            this.onResize();
        }

        if (this.toggleWireframe) {
            this.scene.traverse(function (node) {

                if (node instanceof THREE.Mesh) {
                    node.material.wireframe = !node.material.wireframe;
                }
            });
            this.toggleWireframe = false;
        }
        var delta = this.clock.getDelta();
        this.checkCollisions(this.collide.bind(this));
        for(var i = 0; i < this.numberOfBalls; i++) {
            this.scene.getObjectByName("ball" + i).updateBall(delta);
        }
        this.controls.update();
        this.render();
        requestAnimationFrame( this.animate.bind(this) );
    }
}
