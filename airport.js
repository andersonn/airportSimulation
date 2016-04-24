//Handle setting up the simulation
var  planes=[];
var planesToStart = 5;
var numberOfPlanes = 98;
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
var tower = new THREE.Object3D();
loader.load('control/model.dae', function(collada){
    tower.add(collada.scene);
    tower.scale.multiplyScalar(.2);
    tower.translateY(1.5);
    tower.translateX(-6.5);
    tower.translateZ(-4);
    scene.add(tower);
});
var controlTower=new ControlTower();
var schedule = new Schedule(planesToStart, numberOfPlanes, controlTower);
schedule.printDepartures();

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
var towerCamera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, .1, 2000);
var towerCameraObject = new THREE.Object3D();
towerCamera.position.x = 1;
towerCameraObject.add(towerCamera);
towerCameraObject.position.x = -6.5;
towerCameraObject.position.z = -4;
towerCameraObject.position.y = 3;
scene.add(towerCameraObject);
var controls = new THREE.OrbitControls(camera, renderer.domElement);
//update the airplanes
x=0;
var worldTime = -.25;
var up = new THREE.Vector3(0, 0, 1);
var axis = new THREE.Vector3();


//Airplanes that are done moving.
function removeFinished(){
   var i = 0;
   while(i < planes.length){ 
    if(planes[i].finished){
	var temp = planes[i].removeObject();
	object.addB737(temp);
	scene.remove(temp);
	planes.splice(i, 1);
	i = i -1;
    }
    i++;
  }
}
var towerCameraActive = false;

function keydown(event){
    switch (event.keyCode){
    
    case 49:
        towerCameraActive = true;
        break;
    case 50:
        towerCameraActive = false;
        break;
    case 39:
        //rotate right
        towerCameraObject.rotateY(-.2);
        break;
    case 38:
        //rotate up
        towerCamera.rotateX(.2);
        break;
    case 40:
        towerCamera.rotateX(-.2);
        //rotate down
        break;
    case 37:
        towerCameraObject.rotateY(.2);
        //rotate left
        break;
    }
}

window.addEventListener('keydown', keydown);
function render(){
    requestAnimationFrame(render);
    if(towerCameraActive)
        renderer.render(scene, towerCamera);
    else
        renderer.render(scene, camera);
    
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
                planes.push(plane);
            }           
        }
        if(schedule.departures.length>0){
            worldTime = -.5;
        }
    }
    //TODO Place regular arrivals and departures
    if(schedule.arrivals[0]!=undefined){
        if(controlTower.hasOpenGates()){
            if(worldTime >= schedule.arrivals[0].arrivalTime){
            var temp = new THREE.Object3D();
            temp = object.getB737();
                if(temp!=null){
                   var plane = schedule.getArrival();
                   plane.setObject(temp);
                   plane.setUp(up);
                   scene.add(temp);
                   planes.push(plane);
                }
            }
        }
    }
    if(worldTime>=0){
        for(var i = 0; i<planes.length; i++){
            var canMove = true;
            for(var j = i+1; j<planes.length; j++){
               var v = planes[i].getDirection();
                //console.log(v);
               if(v != null){
                var x = new THREE.Vector3();
                x.subVectors(planes[j].obj.position, planes[i].obj.position); 
                //console.log(x);
                var theta = v.angleTo(x);
                var threshHold = (v.length()*Math.cos(theta))/x.length();
                console.log(threshHold);
                if(threshHold>=1/8){
                    canMove = false;
                }
             }
            }
            if(canMove){
                planes[i].update(worldTime);
            }
        }
    }

    removeFinished();    
    worldTime+=.25;
};
render();
