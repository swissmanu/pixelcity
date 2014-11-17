var THREE = require('threejs')
	, util = require('./util');


function createBox(width, height, depth, material) {
	// Create the cube
	// Parameter 1: Width
	// Parameter 2: Height
	// Parameter 3: Depth
	var boxGeometry = new THREE.BoxGeometry(width, height, depth)

		// Create a mesh and insert the geometry and the material. Translate the whole mesh
		// by 1.5 on the x axis and by 4 on the z axis and add the mesh to the scene.
		, boxMesh = new THREE.Mesh(boxGeometry, material);

	return boxMesh;
}


function createBlockyBuilding(width, height, depth) {
	var midWidth = width/2
		, midDepth = depth/2

		, maxBoxWidth = 1
		, maxBoxDepth = 1

		, minHeight = 3
		, maxTiers = 1

		, group = new THREE.Object3D()
		, boxHeight = height;


	if(height > 40) {
		maxTiers = 15;
	} else if(height > 30) {
		maxTiers = 10;
	} else if(height > 20) {
		maxTiers = 5;
	} else if(height > 10) {
		maxTiers = 2;
	}

	while(true) {
		if(boxHeight < minHeight) { break; }

		var skip = false
			, boxWidth = (util.randomFloat(1, midWidth) % midWidth) + 1
			, boxDepth = (util.randomFloat(1, midDepth) % midDepth) + 1;

		if(boxWidth <= maxBoxWidth && boxDepth <= maxBoxWidth) {
			skip = true;
		}
		if(boxWidth == maxBoxWidth || boxDepth == maxBoxWidth) {
			skip = true;
		}

		if(!skip) {
			var floorTexture = new THREE.ImageUtils.loadTexture('images/windows.jpg');
			floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
			floorTexture.repeat.set( 0.5, 1 );
			var box = createBox(boxWidth, boxHeight, boxDepth, new THREE.MeshBasicMaterial( { map: floorTexture }));

			box.position.y = (boxHeight-height)/2;
			box.position.x = util.randomSign() * util.randomFloat(1, (boxWidth-width)/2);
			box.position.z = util.randomSign() * util.randomFloat(1, (boxDepth-depth)/2);
			group.add(box);

			boxHeight -= (util.randomFloat(1, height) % 10) + 1;
			maxBoxWidth = Math.max(maxBoxWidth, boxWidth);
			maxBoxDepth = Math.max(maxBoxDepth, boxDepth);
		}

		boxHeight--;
	}

	// Ground:
	var box = createBox(width, 0.5, depth, new THREE.MeshLambertMaterial({ color: 0x00CC00 }));
	box.position.y = (0.5-height)/2
	group.add(box);

	return group;

}

module.exports = {
	createBlockyBuilding: createBlockyBuilding
};

//module.exports = function(scene) {
	/*var box = createBox(1, 1, 1, new THREE.MeshNormalMaterial());
	box.position.set(0, 0, -1);
	box.rotateOnAxis(new THREE.Vector3(1, 1, 1).normalize(), 1);*/



	/*
	var box1 = {
			width: 15
			, height: 5
			, depth: 5
		}
		, box2 = {
			width: 8
			, height: 8
			, depth: 8
		};

	box

	var box = createBox(box1.width, box1.height, box1.depth, new THREE.MeshLambertMaterial({ color: 0xCC0000 }));
	//box.rotateOnAxis(new THREE.Vector3(0, 1.5, 1).normalize(), 1);
	box.position.set(0, (box1.height - box2.height)/2, 0);
	scene.add(box);

	box = createBox(box2.width, box2.height, box2.depth, new THREE.MeshLambertMaterial({ color: 0x0000CC }));
	//box.rotateOnAxis(new THREE.Vector3(0, 1.5, 1).normalize(), 1);
	scene.add(box);
	*/
//};
