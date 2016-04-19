//Handle setting up the simulation
var departures =[];
var planesToStart = 1;
//create the scene
var scene = new THREE.Scene();
var geometry = new THREE.BoxGeometry(40,0.1, 20);
var image = new THREE.TextureLoader().load("airport.jpg");
var material = new THREE.MeshLambertMaterial({map : image});
var runway = new THREE.Mesh(geometry, material);

var object = new Objects();
object.loadB737();
var geometry2 = new THREE.BoxGeometry(40, 0.1, 10);
var image2 = new THREE.TextureLoader().load("asphalt.jpg");
var material2 = new THREE.MeshLambertMaterial({map : image2});
var terminalGround = new THREE.Mesh(geometry2, material2);
terminalGround.translateZ(15);

scene.add(runway);
scene.add(terminalGround);
var loader = new THREE.ColladaLoader();
var model = new THREE.Object3D();
var unusedAirplanes = [];
var mod = new THREE.Object3D();
/*loader.load('b737/model.dae', function(collada){
    model.add(collada.scene);
    model.scale.multiplyScalar(0.04);
    //model.translateY(.1);
    //model.translateX(-10);
    //model.translateZ(12);
    //scene.add(model);
    model.translateX(-.6);
    mod.add(model);
});
scene.add(mod);*/
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
var controlTower=new ControlTower();
var schedule = new Schedule(planesToStart, 96, controlTower);
schedule.printArrivals();


/*//Taxi to runway from  gate 7 
var curve = new THREE.SplineCurve3([
    new THREE.Vector3(11.3, .1, 12),
    new THREE.Vector3(11.3, .1, 7),
    new THREE.Vector3(11.3, .1, 8),
    new THREE.Vector3(11.6, .1, 8.8),
    new THREE.Vector3(12.4, .1, 9),
    new THREE.Vector3(13.8, .1, 9),
    new THREE.Vector3(15.4, .1, 9),
    new THREE.Vector3(17, .1, 9),
    new THREE.Vector3(18, .1, 9),
    new THREE.Vector3(18.8, .1, 8.2),
    new THREE.Vector3(19, .1, 7.2),
    new THREE.Vector3(19, .1, 0),
    new THREE.Vector3(19, .1, -4.5),
    new THREE.Vector3(18, .1, -5.3),
    new THREE.Vector3(14, .1, -5.3),
    new THREE.Vector3(7, .1, -5.3),
    new THREE.Vector3(0, .1, -5.3),
    new THREE.Vector3(-3.4, .1, -5.3),
    new THREE.Vector3(-4.4, .1, -6),
    new THREE.Vector3(-4.4, .1, -7),
    new THREE.Vector3(-4.4, .1, -8),
    new THREE.Vector3(-3.4, .1, -9),
    new THREE.Vector3(-2, .1, -9),
    new THREE.Vector3(3.5, .1, -9)
]);
   

var curveGeom = new THREE.Geometry();
curveGeom.vertices = curve.getPoints(1000);
var curveMaterial = new THREE.LineBasicMaterial({color : 0xff0000
						 //transparent: true,
						 //opacity: 0.0
						});
var splineObject = new THREE.Line(curveGeom, curveMaterial);
scene.add(splineObject);*/
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
var worldTime = -.25;
var up = new THREE.Vector3(0, 0, 1);
var axis = new THREE.Vector3();
function render(){
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    //TODO Place starting departure planes.
    if(worldTime==-0.25){
        for(var i = 0; i<schedule.departures.length; i++){
            var temp = new THREE.Object3D();
            temp = object.getB737();
            if(temp != null){
                var plane = schedule.getDeparture();
                plane.setObject(temp);
                plane.setUp(up);
                scene.add(temp);
                plane.departOnly();
                plane.update(0);
                departures.push(plane);
            }           
        }
        if(schedule.departures.length>0){
            worldTime = -.5;
        }
    }
    //TODO Place regular arrivals and departures
    if(worldTime>=0){
        for(var i = 0; i<departures.length; i++){
            departures[i].update(worldTime);
        }
    }    
    worldTime+=.25;
};
render();
