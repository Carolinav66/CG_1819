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

        this.camaraPos = [0, 50, 50];

    }

    createScene() {
        'use strict';

        this.scene = new THREE.Scene();

        // this.ambientLight = new THREE.AmbientLight(0xffffff,0.5);
        // this.scene.add(this.ambientLight);

        this.pointLight = new THREE.PointLight();
        this.pointLight.position.y = 10;
        var random = Math.random() * 2 * Math.PI;
        this.pointLight.position.x = 15 * Math.cos(random);
        this.pointLight.position.z = 10 * Math.sin(random);
        this.scene.add(new THREE.PointLightHelper(this.pointLight,1));
        this.scene.add(this.pointLight);

        this.diretionalLight = new THREE.DirectionalLight(0xffffff, 1);
        this.scene.add(this.diretionalLight);
        this.diretionalLight.position.set(0.5, 1, 1);

        this.rubik = new Rubik(0, 3, 0);
        this.scene.add(this.rubik);
        this.ball = new Ball(10, 3, 0);
        this.scene.add(this.ball);

        this.board = new Board(0, -0.05, 0);
        this.scene.add(this.board);

        var axis = new THREE.AxisHelper(5);
        this.scene.add(axis);

    }

    // createCamera() {
    //     'use strict';
    //
    //
    //     this.camera = new THREE.OrthographicCamera(-this.orthoCameraWidth / 2,
    //                                                 this.orthoCameraWidth / 2,
    //                                                 this.orthoCameraHeight / 2,
    //                                                 -this.orthoCameraHeight / 2,
    //                                                 1,
    //                                                 1000);
    //     this.camera.position.x = this.camaraPos[0];
    //     this.camera.position.y = this.camaraPos[1];
    //     this.camera.position.z = this.camaraPos[2];
    //
    //     this.camera.lookAt(this.scene.position);
    //
    // }

    createCamera() {
        'use strict';


        this.camera = new THREE.PerspectiveCamera(20,
                                                  window.innerWidth / window.innerHeight,
                                                  1,
                                                  1000);
        this.camera.position.x = this.camaraPos[0];
        this.camera.position.y = this.camaraPos[1];
        this.camera.position.z = this.camaraPos[2];

        this.camera.lookAt(this.scene.position);
    }


    onKeyDown(e) {
        'use strict';

        switch (e.keyCode) {
            case 66: //B
            case 98: //b
                this.ball.changeMovement();
                break;

            case 68:  //D
            case 100: //d
                this.diretionalLight.intensity = this.diretionalLight.intensity == 1 ? 0 : 1;
                break;

            case 80:  //P
            case 112: //p
                this.pointLight.intensity = this.pointLight.intensity == 1 ? 0 : 1;
                break;

            case 87:  //W
            case 119: //w
                this.ball.toggleWireframe();
                this.rubik.toggleWireframe();
                this.board.toggleWireframe();
                break;

            case 83:  //S
            case 115: //s
                break;

            case 49:  //1
                break;

            // case 50: //2
            //     this.cameraNumber = 2;
            //     this.changeCamara = true;
            //     break;

            default:
                break;
        }
    }
    onKeyUp(e) {
        'use strict';

        switch (e.keyCode) {
            case 65: //A
            case 97: //a
                break;

            case 68:  //D
            case 100: //d
                break;

            case 87:  //W
            case 119: //w
                break;

            case 83:  //S
            case 115: //s
                break;

            case 49: //1
                break;

            case 50: //2
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
                this.camera.left   =  -this.orthoCameraHeight * windowRatio / 2;
                this.camera.right  =   this.orthoCameraHeight * windowRatio / 2;
                this.camera.top    =   this.orthoCameraHeight / 2;
                this.camera.bottom =  -this.orthoCameraHeight / 2;
            } else {
                this.camera.left   =  -this.orthoCameraWidth / 2;
                this.camera.right  =   this.orthoCameraWidth / 2;
                this.camera.top    =  (this.orthoCameraWidth / windowRatio) / 2;
                this.camera.bottom = -(this.orthoCameraWidth / windowRatio) / 2;
            }
            this.camera.updateProjectionMatrix();
        }

        if(this.cameraNumber == 2 || this.cameraNumber == 3) {

            this.renderer.setSize(window.innerWidth, window.innerHeight);

            if (window.innerHeight > 0 && window.innerWidth > 0) {
                this.camera.aspect = window.innerWidth / window.innerHeight;
                this.camera.updateP
        this.ball.ballMesh.rotation.y=this.position;
        this.ball.ballMesh.rotation.x=this.position;rojectionMatrix();
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
        this.createCamera(); //50, 50, 50
        //this.createCamera2();
        this.controls = new THREE.OrbitControls( this.camera );


        this.onResize();
        this.render();
        this.controls.update();
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup",   this.onKeyUp.bind(this));
        window.addEventListener("resize",  this.onResize.bind(this));
    }

    animate() {
        'use strict';

        var delta = this.clock.getDelta();

        this.ball.updateBall(delta);
        this.controls.update();
        this.render();
        requestAnimationFrame( this.animate.bind(this) );
    }
}
