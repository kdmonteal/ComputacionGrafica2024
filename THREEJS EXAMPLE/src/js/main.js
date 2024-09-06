/* Author: Jhoan Sebastian Ortiz Alvarez
   Date of creation: 23/08/2023
   Last Modification: 26/08/2023 
*/

//Creation elements
var scene = null,
    camera = null,
    renderer = null,
    controls = null,
    cube = null,
    torus = null,
    cone = null,
    shapesArray = [],
    light = null;

const size = 20,
      divisions = 20;

function startScene() {
    // Scene, Camera, Renderer
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x524E4E)
    camera = new THREE.PerspectiveCamera( 
        75,                                        //Angulo de visión(Abajo o arriba) 
        window.innerWidth / window.innerHeight,    //Relación de aspecto 16:9
        0.1,                                       //Mas cerca (no renderiza)
        1000 );                                    //Mas lejos ()

    renderer = new THREE.WebGLRenderer({canvas: document.getElementById('app')});
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    //Orbit controls
    controls = new THREE.OrbitControls(camera,renderer.domElement);
    camera.position.set(0,0,0);
    controls.update();

    camera.position.z = 20;

    //Grid Helper
    const gridHelper = new THREE.GridHelper( size, divisions);
    scene.add( gridHelper );

    //Axes Helper
    const axesHelper = new THREE.AxesHelper( 5 );
    scene.add( axesHelper );    

    createLight("ambient");
    createLight("pointLight");

    animate();
}

function createLight(typeLight) {
    
    switch (typeLight) {
        case "ambient":
            light = new THREE.AmbientLight( 0xFFFFFF ); // soft white light
            scene.add( light );
          break;
        case "pointLight":
            light = new THREE.PointLight( 0xFFFFFF, 1, 100 );
            light.position.set( 0, 10, 0 );
            scene.add( light );

            const sphereSize = 1;
            const pointLightHelper = new THREE.PointLightHelper( light, sphereSize );
            scene.add( pointLightHelper );
          break;
        case "spotLight":
            light = new THREE.SpotLight( 0xffffff );
            light.position.set( 10, 10, 10 );
            scene.add( light );

            const spotLightHelper = new THREE.SpotLightHelper( light );
            scene.add( spotLightHelper );
          break;
      }
}

function addShape(shapeType){
    var geometry, material, mesh;

    switch (shapeType) {
        case 'cube':
            const texture = new THREE.TextureLoader().load('../src/img/animals/face1.jpg');

            var materialCube = [new THREE.MeshBasicMaterial ({map:new THREE.TextureLoader().load('../src/img/animals/face1.jpg')}),
                                new THREE.MeshBasicMaterial ({map:new THREE.TextureLoader().load('../src/img/animals/face2.png')}),
                                new THREE.MeshBasicMaterial ({map:new THREE.TextureLoader().load('../src/img/animals/face3.jpg')}),
                                new THREE.MeshBasicMaterial ({map:new THREE.TextureLoader().load('../src/img/animals/face4.jpg')}),
                                new THREE.MeshBasicMaterial ({map:new THREE.TextureLoader().load('../src/img/animals/face5.png')}),
                                new THREE.MeshBasicMaterial ({map:new THREE.TextureLoader().load('../src/img/animals/face6.jpg')})];

            geometry = new THREE.BoxGeometry(5, 5, 5);
            material = new THREE.MeshBasicMaterial({ color: 0xffffff, 
                                                     transparent: true,
                                                     opacity: 1,
                                                     side: THREE.DoubleSide,
                                                     map:texture,
                                                     wireframe: false});
            mesh = new THREE.Mesh(geometry, materialCube);
            break;
        case 'torus':
            geometry = new THREE.TorusGeometry(0.5, 0.2, 16, 100);
            material = new THREE.MeshStandardMaterial({ color: 0xff0000, 
                                                        roughness: 0.5,
                                                        metalness:0.5 });
            mesh = new THREE.Mesh(geometry, material);
            break;
        case 'cone':
            geometry = new THREE.ConeGeometry(0.5, 1, 16);
            material = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe:true });
            mesh = new THREE.Mesh(geometry, material);
            break;
        default:
            return; 
    }

    const x = (Math.random() - 0.5) * size;
    const y = Math.random() * 5;
    const z = (Math.random() - 0.5) * size;

    mesh.position.set(x, y, z);
    scene.add(mesh);

    shapesArray.push(mesh);
}

function clearScene() {
    // Remove all shapes from the scene.
    scene.children.forEach(child => {
        if (child instanceof THREE.Mesh) {
            scene.remove(child);
        }
    });
}


function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);

    shapesArray.forEach(shape => {
        shape.rotation.x += 0.01;
        shape.rotation.y += 0.01;
    });
}

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();

renderer.setSize( window.innerWidth, window.innerHeight );

}