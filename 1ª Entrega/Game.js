class Game {
    constructor() {
        'use strict';

        this.clock = new THREE.Clock();
        this.clock.start();

        this.aspect = [window.innerWidth, window.innerHeight];
        this.ratio = window.innerWidth / window.innerHeight;
        this.height;
        this.width;
      }

    createScene() {
        'use strict';

        this.scene = new THREE.Scene();

        this.scene.add(new THREE.AxisHelper(10));

        var table = new Table(0, 5, 0);  //chao: -25
        this.scene.add(table);
        var lamp = new Lamp(40, 0, 0);   //chao: -25
        this.scene.add(lamp);
        var chair = new Chair(0, 0, 20); //chao: -25
        this.scene.add(chair);
    }

    createCamera(x, y, z) {
        'use strict';

        var frostum = 50;

        this.camera = new THREE.OrthographicCamera(-frostum * this.ratio, //frostum * aspect
                                                    frostum * this.ratio,
                                                    frostum,              //só frostum 
                                                   -frostum, 
                                                    1,
                                                    1000);
        /*
        this.camera = new THREE.OrthographicCamera(window.innerWidth / - 13,
                                                   window.innerWidth / 13,
                                                   window.innerHeight / 13,
                                                   window.innerHeight / - 13, 
                                                   1,
                                                   1000);*/
        this.camera.position.x = x;  
        this.camera.position.y = y;
        this.camera.position.z = z;

        this.camera.lookAt(this.scene.position);

    }

    changeCameraPosition(x, y, z) {
        this.camera.position.x = x;  
        this.camera.position.y = y;
        this.camera.position.z = z;

    }

    onKeyDown(e) {
        'use strict';

        switch (e.keyCode) {
            case 65: //A
            case 97: //a
                this.scene.traverse(function (node) {

                    if (node instanceof THREE.Mesh) {
                        node.material.wireframe = !node.material.wireframe;
                    }
                });
                break;

            case 49: //1
                this.changeCameraPosition(0, 75, 0);
                this.onResize();
                this.controls = new THREE.OrbitControls(this.camera);
                break;

            case 50: //2
                this.changeCameraPosition(75, 0, 0);
                this.onResize();
                this.controls = new THREE.OrbitControls(this.camera);
                break;

            case 51: //3
                this.changeCameraPosition(0, 0, 75);
                this.onResize();
                this.controls = new THREE.OrbitControls(this.camera);
                break;

            case 37: //esquerda
                this.scene.getObjectByName("chair").angle = 1/100 * Math.PI;
                break;

            case 38: // cima
                this.scene.getObjectByName("chair").acceleration = 5;
                this.scene.getObjectByName("chair").decelerating = false;
                break;

            case 39: // direita
                this.scene.getObjectByName("chair").angle = -1/100 * Math.PI;
                break;

            case 40: // baixo
                this.scene.getObjectByName("chair").acceleration = -5;
                this.scene.getObjectByName("chair").decelerating = false;
                break;

            default:
                break;
        }
    }

    onKeyUp(e) {
        'use strict';

        switch (e.keyCode) {
            case 37: //esquerda
                this.scene.getObjectByName("chair").angle = 0;
                break;

            case 38: // cima
            case 40: // baixo
                if(this.scene.getObjectByName("chair").velocity >= 0)
                    this.scene.getObjectByName("chair").acceleration = -5;
                else
                    this.scene.getObjectByName("chair").acceleration = 5;
                this.scene.getObjectByName("chair").decelerating = true;
                break;

            case 39: // direita
                this.scene.getObjectByName("chair").angle = 0;
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
        var frostum = 50;

        if (window.innerHeight > 0 && window.innerWidth > 0) {
            this.camera.left = -frostum * newRatio;
            this.camera.right = frostum * newRatio;
            this.camera.top = frostum;
            this.camera.bottom = -frostum;
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
        this.createCamera(50,50,50);

        this.controls = new THREE.OrbitControls(this.camera);
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
        window.addEventListener("resize", this.onResize.bind(this));
    }

    animate() {
        this.scene.getObjectByName("chair").changeSpeed(this.clock);
        this.scene.getObjectByName("chair").rotateChair();

        this.render();
        this.controls.update();
        requestAnimationFrame( this.animate.bind(this) );
    }
}
