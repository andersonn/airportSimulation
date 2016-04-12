//Handle setting up the simulation

//create the scene
var scene = new THREE.Scene();
var geometry = new THREE.BoxGeometry(40,0.1, 20);
var image = new THREE.TextureLoader().load("airport.jpg");
var material = new THREE.MeshLambertMaterial({map : image});
var runway = new THREE.Mesh(geometry, material);

var geometry2 = new THREE.BoxGeometry(40, 0.1, 10);
var image2 = new THREE.TextureLoader().load("asphalt.jpg");
var material2 = new THREE.MeshLambertMaterial({map : image2});
var terminalGround = new THREE.Mesh(geometry2, material2);
terminalGround.translateZ(15);

scene.add(runway);
scene.add(terminalGround);
var loader = new THREE.ColladaLoader();
var model = new THREE.Object3D();
var mod = new THREE.Object3D();
loader.load('b737/model.dae', function(collada){
    model.add(collada.scene);
    model.scale.multiplyScalar(0.04);
    //model.translateY(.1);
    //model.translateX(-10);
    //model.translateZ(12);
    //scene.add(model);
    model.translateX(-.6);
    mod.add(model);
});
scene.add(mod);
var terminal = new THREE.Object3D();
loader.load('terminal/model.dae', function(collada){
    terminal.add(collada.scene);
    terminal.scale.multiplyScalar(.045);
    terminal.translateY(.15)
    var mod = new THREE.Object3D();
    mod.add(terminal);
    mod.translateX(-10);
    mod.translateZ(20);
    scene.add(mod);
});
var schedule = new Schedule(5, 96);

//Taxi to gate 2
var curve = new THREE.SplineCurve3([
    new THREE.Vector3(-10, .1, 1.7),
    new THREE.Vector3(-5.45, .1, 1.7),
    new THREE.Vector3(-4.4,.1, .75),
    new THREE.Vector3(-4.4, .1, -1.6),
    new THREE.Vector3(-2.8, .1, -2.1),
    new THREE.Vector3(2.25, .1, -2.1),
    new THREE.Vector3(3.1, .1, -1),
    new THREE.Vector3(3.1, .1, 3),
    new THREE.Vector3(2.15, .1, 3.7),
    new THREE.Vector3(-1, .1, 3.7),
    new THREE.Vector3(-6.9, .1, 3.7),
    new THREE.Vector3(-7.9, .1, 5),
    new THREE.Vector3(-7.9, .1, 6),
    new THREE.Vector3(-7.9, .1, 12)
]);

var curveGeom = new THREE.Geometry();
curveGeom.vertices = curve.getPoints(1000);
var curveMaterial = new THREE.LineBasicMaterial({color : 0xff0000
						 //transparent: true,
						 //opacity: 0.0
						});
var splineObject = new THREE.Line(curveGeom, curveMaterial);
scene.add(splineObject);
//console.log(curve.getPointAt(0));
//lighting
scene.add(new THREE.AmbientLight(0xffffff));
var light1 = new THREE.DirectionalLight(0xaaaaaa);
scene.add(light1);

//renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0x3bb9ff);
//camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

camera.position.y = 30;
//camera.position.z = 3;
var controls = new THREE.OrbitControls(camera, renderer.domElement);
//update the airplanes
x=0;
var up = new THREE.Vector3(0, 0, 1);
var axis = new THREE.Vector3();
function render(){
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    if(x<1){
        mod.position.copy(curve.getPointAt(x));
	console.log(curve.getTangentAt(x));
	tangent = curve.getTangentAt(x).normalize();
	axis.crossVectors(up, tangent).normalize();
	radians = Math.acos(up.dot(tangent));
	mod.quaternion.setFromAxisAngle(axis, radians);
        //model.rotation.copy(curve.getTangentAt(x).applyAxisAngle(axis, angle));
    }
    x+=.01;
};
render();
