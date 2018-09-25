var controls, camera, scene, renderer;

var geometry, material, mesh;
//MESA
function addTableLeg(obj, x, y, z) {
    'use strict';

    geometry = new THREE.CylinderGeometry(2, 2, 6);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y - 3, z);
    obj.add(mesh);
}

function addTableTop(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(60, 2, 20);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function createTable(x, y, z) {
    'use strict';

    var table = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

    addTableTop(table, 0, 0, 0);
    addTableLeg(table, -25, -1, -8);
    addTableLeg(table, -25, -1, 8);
    addTableLeg(table, 25, -1, 8);
    addTableLeg(table, 25, -1, -8);

    scene.add(table);

    table.position.x = x;
    table.position.y = y;
    table.position.z = z;
}

//CANDEEIRO
function addLampBottom(obj, x, y, z) {
  'use strict';

  geometry = new THREE.ConeGeometry(5, 10, 5);
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y -10, z);
  obj.add(mesh);
}

function addLampMiddle(obj, x, y, z){
  'use strict';
  geometry = new THREE.SphereGeometry(5, 5, 5);
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  obj.add(mesh);
}

function addLampTop(obj, x, y, z){
  'use strict';
  geometry = new THREE.CylinderGeometry(2, 2, 2);
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y + 5, z);
  obj.add(mesh);
}

function createLamp(x, y, z){
  'use strict';

  var lamp = new THREE.Object3D();

  material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

  addLampBottom(lamp, 0, 0, 0);
  addLampMiddle(lamp, 0, 0, 0);
  addLampTop(lamp, 0, 0, 0);

  scene.add(lamp);

  lamp.position.x = x;
  lamp.position.y = y;
  lamp.position.z = z;
}

//COISAS
function createScene() {
    'use strict';

    scene = new THREE.Scene();


    scene.add(new THREE.AxisHelper(10));

    createTable(0, 8, 0);
    createLamp(40, 0, 0);
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
        render();
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

    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
}

function animate() {

	requestAnimationFrame( animate );

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

	renderer.render( scene, camera );

}
