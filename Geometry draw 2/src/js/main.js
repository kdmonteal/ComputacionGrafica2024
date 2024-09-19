var scene = null,
    camera = null,
    renderer = null,
    controls = null;
 
const size = 20,
    division = 20;
 
function startScene() {
    // Scene, Camera, Renderer
    scene  = new THREE.Scene();
    scene.background = new THREE.Color(0xFFFFFF);
    camera = new THREE.PerspectiveCamera( 75,  // Angulo de Vision (Abajo o Arriba)
                                        window.innerWidth / window.innerHeight, // Relación Aspecto (16:9)
                                        0.1, // Mas Cerca (no renderiza)
                                        1000); // Mas lejos
    renderer = new THREE.WebGLRenderer({canvas: document.getElementById("app")});
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
 
    //orbit controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 0, 0);
    controls.update();

    //orbit helper
    const gridHelper = new THREE.GridHelper( size, division );
    scene.add( gridHelper );
 
    camera.position.z = 5;
    animate();
}
 
function animate() {
    requestAnimationFrame(animate);
    controls.update
    renderer.render( scene, camera );
}

// Resize by Screen Size
window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}
 
function createGeometry(geometryDraw) {
    // Box, Torus, Cone
    var geometryFigure = null;

    switch(geometryDraw) {
        case 'Box':
          // code block
            geometryFigure = new THREE.BoxGeometry( 1, 1, 1 );
          break;
        case 'Torus':
          // code block
            geometryFigure = new THREE.TorusGeometry( 10, 1, 16, 100 ); 
          break;
        case 'Cone':
          // code block
            geometryFigure = new THREE.ConeGeometry( 5, 20, 32 );
          break;
    }

    const material = new THREE.MeshBasicMaterial( { color: "#c39d12" } );
    const objectDraw = new THREE.Mesh( geometryFigure, material );
    scene.add( objectDraw );
}