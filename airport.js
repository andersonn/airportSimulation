//Handle setting up the simulation

//create the scene
var scene = new THREE.Scene();
/*$.get("http://www.flightview.com/airport/STL-St._Louis-MO/arrivals").done(function(data){
	console.log(data);
});
*/
$.ajax({
            url: "http://www.flightview.com/airport/STL-St._Louis-MO/arrivals",
	    type: "GET",
            crossDomain: true,
            //data: JSON.stringify(somejson),
            dataType: "json",
            success: function (response) {
                var resp = JSON.parse(response)
		console.log(resp);
                alert(resp.status);
            },
            error: function (xhr, status) {
                alert("error");
            }
        });
var geometry = new THREE.BoxGeometry(20,0.1, 2);
var image = new THREE.TextureLoader().load("RunwayLarge.jpg");
var material = new THREE.MeshLambertMaterial({map : image});
var runway = new THREE.Mesh(geometry, material);

scene.add(runway);



//lighting
scene.add(new THREE.AmbientLight(0xffffff));
var light1 = new THREE.DirectionalLight(0xaaaaaa);
scene.add(light1);

//renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0xffffff);
//camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

camera.position.z = 3;
var controls = new THREE.OrbitControls(camera, renderer.domElement);
//update the airplanes
function render(){
    requestAnimationFrame(render);
    renderer.render(scene, camera);
};
render();
