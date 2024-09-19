// Creation of basic elements
var scene = null,
    camera = null,
    renderer = null,
    controls = null;

const size = 20,
    division = 20;

function startScene() {
    // Scene, Camera, Renderer
    scene  = new THREE.Scene();
    scene.background = new THREE.Color('#0A20C6');
    camera = new THREE.PerspectiveCamera( 75,  // Angulo de Vision (Abajo o Arriba)
                                        window.innerWidth / window.innerHeight, // Relación Aspecto (16:9)
                                        0.1, // Mas Cerca (no renderiza)
                                        1000); // Mas lejos
    renderer = new THREE.WebGLRenderer({canvas: document.getElementById("app")});
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // Orbit Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement); 
    camera.position.set(0,0,0);
    controls.update();

    // Grid Helper
    const gridHelper = new THREE.GridHelper( size, division );
    scene.add( gridHelper );

    // Create A Box 
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0xfffff } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 5;
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
	renderer.render( scene, camera );
}

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}