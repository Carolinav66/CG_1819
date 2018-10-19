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

    }

    placeBalls() {
        'use strict';
        var balls = []
        console.log("colision");

        var radius = Math.sqrt(4500) / 20;
        var colision = true;

        var x; //= Math.random() * (60 - 2 * radius) - 30 + radius;
        var y; //= radius;
        var z; //= Math.random() * (30 - 2 * radius) - 15 + radius;

        for(var i = 0; i < 10; i++) {
            x = Math.random() * (60 - 2 * radius) - 30 + radius;
            y = radius;
            z = Math.random() * (30 - 2 * radius) - 15 + radius;
            balls[i] = new Ball(x, y, z, radius, i);
            console.log("creating " + balls[i])
        }
        while(colision == true) {
            colision = false;
            for(var i = 0; i < 10; i++) {
                for(var j = 0; j < 10; j++) {
                    if(balls[i].ballColiding(balls[j])) {
                        if(i == j){
                            continue;
                        }
                        x = Math.random() * (60 - 2 * radius) - 30 + radius;
                        y = radius;
                        console.log("colision");
                        z = Math.random() * (30 - 2 * radius) - 15 + radius;
                        balls[i] = new Ball(x, y, z, radius, i);
                        console.log("creating " + balls[i])
                        colision = true;
                    }
                }
            }
        }

        for(var i = 0; i < 10; i++){
            this.scene.add(balls[i])
        }
    }
    createScene() {
        'use strict';

        this.scene = new THREE.Scene();

        var field = new Field(0, 0, 0);
        this.scene.add(field);
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
        var delta = this.clock.getDelta()
        for(var i = 0; i < 10; i++) {
            this.scene.getObjectByName("ball" + i).updateBall(delta);
        }
        this.controls.update();
        this.render();
        requestAnimationFrame( this.animate.bind(this) );
    }
}
