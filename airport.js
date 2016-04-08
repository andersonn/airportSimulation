//Handle setting up the simulation

//create the scene
var scene = new THREE.Scene();
var geometry = new THREE.BoxGeometry(40,0.1, 20);
var image = new THREE.TextureLoader().load("airport.jpg");
var material = new THREE.MeshLambertMaterial({map : image});
var runway = new THREE.Mesh(geometry, material);

scene.add(runway);

var loader = new THREE.ColladaLoader();
var model = new THREE.Object3D();

loader.load('b737/model.dae', function(collada){
    model.add(collada.scene);
    model.scale.multiplyScalar(0.05);
    model.translateY(.1);
    model.translateX(2.4);
    model.translateZ(1);
    scene.add(model);
});


var schedule = new Schedule(5, 96);
//schedule.printArrivals();
//console.log("Departures");
//schedule.printDepartures();
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
function render(){
    requestAnimationFrame(render);
    renderer.render(scene, camera);
};
render();
