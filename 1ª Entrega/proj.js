var controls, camera, scene, renderer;

var geometry, material, mesh;

//COISAS
function createScene() {
    'use strict';

    scene = new THREE.Scene();

    scene.add(new THREE.AxisHelper(10));

    var table = new Table(0, 8, 0);
    scene.add(table.object);
    var lamp = new Lamp(40, -9.5, 0);
    scene.add(lamp.object);
    var chair = new Chair(0, 0, 20);
    scene.add(chair.object);
}

function createCamera() {
    'use strict';
    camera = new THREE.PerspectiveCamera(70,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
    camera.position.x = 50;
    camera.position.y = 50;
    camera.position.z = 50;
    camera.lookAt(scene.position);

}
/*
function onKey(cam){
  'use strict';
  cam = new THREE.PerspectiveCamera(70,
                                       window.innerWidth / window.innerHeight,
                                       1,
                                       1000);
  switch (cam.keyCode) {
  case 97: //1
  case 97: //1
      cam.position.set( 50, 50, 50);
      cam.lookAt(scene.position);
      render();
      break;
  }
}
*/

function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {
    case 65: //A
    case 97: //a
        scene.traverse(function (node) {

            if (node instanceof THREE.Mesh) {
                node.material.wireframe = !node.material.wireframe;
            }
        });
        break;
    }
}

function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }

}

function render() {
    'use strict';
    renderer.render(scene, camera);
}

function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();
    createCamera();
    controls = new THREE.OrbitControls(camera);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    //window.addEventListener("key", onKey);
}

function animate(){
    render();
	controls.update();
	requestAnimationFrame( animate );
}
