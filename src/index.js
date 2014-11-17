var THREE = require('threejs');
require('./OrbitControls')(THREE);

//////////////////////////////////////////////////////////////////////////////////
//		Init
//////////////////////////////////////////////////////////////////////////////////

// init renderer
var renderer = new THREE.WebGLRenderer({
	antialias: true
});
renderer.setClearColor(new THREE.Color('lightgrey'), 1)
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// array of functions for the rendering loop
var onRenderFcts= [];

// init scene and camera
var scene	= new THREE.Scene();
var camera	= new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);
camera.position.set(0, 60, -100);

var light = new THREE.PointLight(0xFFFFFF);
light.position.set(0, 30, 100);
scene.add(light);

light = new THREE.PointLight(0xFFFFFF);
light.position.set(20, 100, -200);
scene.add(light);


var controls = new THREE.OrbitControls(camera, renderer.domElement);




/*
var gui = new dat.GUI();
var folder1 = gui.addFolder('Position');
var cameraX = folder1.add( parameters, 'x' ).min(-200).max(200).step(1).listen();
var cameraY = folder1.add( parameters, 'y' ).min(0).max(100).step(1).listen();
var cameraZ = folder1.add( parameters, 'z' ).min(-200).max(200).step(1).listen();
folder1.open();

cameraX.onChange(function(value) {   camera.position.x = value;   });
cameraY.onChange(function(value) {   camera.position.y = value;   });
cameraZ.onChange(function(value) {   camera.position.z = value;   });
*/



//////////////////////////////////////////////////////////////////////////////////
//		add an object in the scene
//////////////////////////////////////////////////////////////////////////////////

// FLOOR
var floorTexture = new THREE.ImageUtils.loadTexture('images/checkerboard.jpg');
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set( 10, 10 );
var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
var floorGeometry = new THREE.PlaneBufferGeometry(1000, 1000, 10, 10);
var floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y = -0.5;
floor.rotation.x = Math.PI / 2;
scene.add(floor);


var buildingFactory = require('./buildingFactory')
	, buildings = new THREE.Object3D()
	, util = require('./util');

var rows = cols = 8;
for(x = 0; x < rows; x++) {
	for(y = 0; y < cols; y++) {
		var height = util.randomFloat(30, 40)
			, building = buildingFactory.createBlockyBuilding(10, height, 10);

		building.position.set((x*11)-20, height/2, -(y*11));
		buildings.add(building);
	}
}

scene.add(buildings);

//////////////////////////////////////////////////////////////////////////////////
//		render the whole thing on the page
//////////////////////////////////////////////////////////////////////////////////

// handle window resize
window.addEventListener('resize', function(){
	renderer.setSize( window.innerWidth, window.innerHeight )
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
}, false);

// render the scene
onRenderFcts.push(function(){
	renderer.render( scene, camera );
});

// run the rendering loop
var lastTimeMsec;

requestAnimationFrame(function animate(nowMsec){
	// keep looping
	requestAnimationFrame( animate );
	// measure time
	lastTimeMsec = lastTimeMsec || nowMsec-1000/60
	var deltaMsec = Math.min(200, nowMsec - lastTimeMsec)
	lastTimeMsec = nowMsec
	// call each update function
	onRenderFcts.forEach(function(onRenderFct){
		onRenderFct(deltaMsec/1000, nowMsec/1000)
	})

	controls.update();
})