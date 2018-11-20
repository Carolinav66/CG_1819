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
        this.toggleMaterials = false;

        this.D_LIGHT_INTENSITY = 0.75;
        this.paused = false;
        this.restart = false;
    }

    createScene() {
        'use strict';

        this.scene = new THREE.Scene();

        // this.ambientLight = new THREE.AmbientLight(0xffffff,0.5);
        // this.scene.add(this.ambientLight);

        this.pointLight = new THREE.PointLight(0xeeeeff);
        this.pointLight.position.y = 10;
        var random = Math.random() * 2 * Math.PI;
        this.pointLight.position.x = 15 * Math.cos(random);
        this.pointLight.position.z = 10 * Math.sin(random);
        this.scene.add(new THREE.PointLightHelper(this.pointLight, 1));
        this.scene.add(this.pointLight);

        this.diretionalLight = new THREE.DirectionalLight(0xaa55ff, this.D_LIGHT_INTENSITY);
        this.scene.add(this.diretionalLight);
        this.diretionalLight.position.set(0.5, 1, 1);

        this.rubik = new Rubik(0, 3, 0);
        this.scene.add(this.rubik);
        this.ball = new Ball(10, 3, 0);
        this.scene.add(this.ball);

        this.board = new Board(0, 0.5, 0);
        this.scene.add(this.board);

        var axis = new THREE.AxisHelper(5);
        this.scene.add(axis);
    }

    createPauseScene() {
        this.pauseScene = new THREE.Scene();
        this.pauseScreen = new PauseScreen(0, 0, 0);
        this.pauseScene.add(this.pauseScreen);
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

    createCamera(scene, position) {
        'use strict';


        var camera = new THREE.PerspectiveCamera(20,
                                                  window.innerWidth / window.innerHeight,
                                                  1,
                                                  1000);
        camera.position.x = position[0];
        camera.position.y = position[1];
        camera.position.z = position[2];

        camera.lookAt(scene.position);

        return camera;
    }

    onKeyDownPaused(e) {
        'use strict';

        switch (e.keyCode) {
            case 83:  //S
            case 115: //s
                this.clock.start();
                this.paused = false;
                this.toggleEventListeners();
                break;

            case 82:  //R
            case 114: //r
                this.restart = true;
                this.clock.start();
                this.paused = false;
                this.toggleEventListeners();
                break;

            default:
                break;
        }
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
                this.diretionalLight.intensity = this.diretionalLight.intensity == this.D_LIGHT_INTENSITY ? 0 : this.D_LIGHT_INTENSITY;
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

            case 76:  //L
            case 108: //l
                this.toggleMaterials = true;
                break;

            case 83:  //S
            case 115: //s
                this.clock.stop();
                this.paused = true;
                this.toggleEventListeners();
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

        this.renderer.setSize(window.innerWidth, window.innerHeight);

        if (window.innerHeight > 0 && window.innerWidth > 0) {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
        }
    }

    render(scene, camera) {
        'use strict';

        this.renderer.render(scene, camera);
    }

    init() {
        'use strict';

        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.createScene();
        this.createPauseScene();

        this.camera = this.createCamera(this.scene, this.camaraPos);
        this.pauseScreenCamera = this.createCamera(this.pauseScene, [0, 0, 100]);

        this.controls = new THREE.OrbitControls( this.camera );

        this.onResize();
        this.render(this.scene, this.camera);
        this.controls.update();

        this.onKeyDownEventListenerFunc = this.onKeyDown.bind(this);
        this.onKeyDownPausedEventListenerFunc = this.onKeyDownPaused.bind(this);

        window.addEventListener("keydown", this.onKeyDownEventListenerFunc);
        //window.addEventListener("keyup",   this.onKeyUp.bind(this));
        window.addEventListener("resize",  this.onResize.bind(this));
    }

    toggleEventListeners() {
        if(this.paused) {
            console.log("oi");
            window.removeEventListener("keydown", this.onKeyDownEventListenerFunc);
            window.addEventListener("keydown", this.onKeyDownPausedEventListenerFunc);
        } else {
            console.log("hello");
            window.removeEventListener("keydown", this.onKeyDownPausedEventListenerFunc);
            window.addEventListener("keydown", this.onKeyDownEventListenerFunc);
        }
    }

    restartGame() {
        this.createScene();
        this.camera = this.createCamera(this.scene, this.camaraPos);
        this.controls = new THREE.OrbitControls( this.camera );
    }

    animate() {
        'use strict';

        if (this.clock.running) {
            var delta = this.clock.getDelta();
        } else {
            var delta = 0;
        }

        if (this.toggleMaterials) {
            this.ball.toggleMaterials();
            this.board.toggleMaterials();
            this.rubik.toggleMaterials();
            this.toggleMaterials = false;
        }

        this.ball.updateBall(delta);
        this.controls.update();

        if(this.restart) {
            this.restartGame();
            this.restart = false;
        }

        if (this.paused) {
            this.render(this.pauseScene, this.pauseScreenCamera);
            this.controls.enabled = false;
        } else {
            this.render(this.scene, this.camera);
            this.controls.enabled = true;
        }
        requestAnimationFrame( this.animate.bind(this) );
    }
}
