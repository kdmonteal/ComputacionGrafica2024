var scene = null,
    camera = null,
    renderer = null,
    controls = null,
    myLight = null,
    cube1 = null,
    cube2 = null;
 
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
    camera.position.set(0, 5, 10);
    controls.update();

    //orbit helper
    const gridHelper = new THREE.GridHelper( size, division );
    scene.add( gridHelper );
 
    camera.position.z = 5;

    // Luz - Light
    // Ambient Light
    createLight("ambient");
    createLight("SpotLight");


    const texture = new THREE.TextureLoader().load('../src/img/facesImage/uv_test_bw_1024.png');
    // Caja con Material (Tablero de Ajedrez)
    const geometryBox1 = new THREE.BoxGeometry( 1, 1, 1 ); 
    const materialBox1 = new THREE.MeshBasicMaterial( {color: 0xffffff,
                                                        map: texture,
                                                        side: THREE.DoubleSide

    } ); 
    cube1 = new THREE.Mesh( geometryBox1, materialBox1 );
    
    cube1.position.x = -2;
    cube1.position.y = 2;
    scene.add( cube1 );

    var materialCube = [new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/facesImage/face1.jpg'), side: THREE.DoubleSide}),
                        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/facesImage/face2.png'), side: THREE.DoubleSide}),
                        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/facesImage/face3.jpg'), side: THREE.DoubleSide}),
                        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/facesImage/face4.jpg'), side: THREE.DoubleSide}),
                        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/facesImage/face5.png'), side: THREE.DoubleSide}),
                        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/facesImage/face6.jpg'), side: THREE.DoubleSide})
    ];

    // Caja con Material (Por cara)
    const geometryBox2 = new THREE.BoxGeometry( 1, 1, 1 ); 
    cube2 = new THREE.Mesh( geometryBox2, materialCube ); 
    cube2.position.x = 2;
    cube2.position.y = 2;

    scene.add( cube2 );

    const texture2 = new THREE.TextureLoader().load('../src/img/facesImage/water.png');
    const geometry = new THREE.PlaneGeometry( 30, 20 );
    const material = new THREE.MeshBasicMaterial( {map:texture2, 
                                                    side: THREE.DoubleSide, 
                                                    color: 0xffffff, // White color, ensuring no color multiplication
                                                    transparent: true} );
    const plane = new THREE.Mesh( geometry, material );
    scene.add( plane );

    plane.position.z = 5;

    animate();
}

function createLight(typeLight) {
  switch(typeLight) {
    case "ambient":
      myLight = new THREE.AmbientLight( 0xffffff,5 ); // soft white light
      scene.add( myLight );
      break;
    case "directionalLight":
      myLight = new THREE.DirectionalLight( 0xffffff, 1 );
      scene.add( myLight );
      break;
    case "pointLight":
      myLight = new THREE.PointLight( 0xff0000, 1, 100 );
      myLight.position.set( 50, 50, 50 );
      scene.add( myLight );
      break;
    case "SpotLight":
      myLight = new THREE.SpotLight( 0xffffff );
      myLight.position.set( 10, 10, 100 );
      scene.add( myLight );
      break;
  }
}
 
function animate() {
    requestAnimationFrame(animate);

    cube1.rotation.y += 0.01;
    cube2.rotation.y += 0.01;

    controls.update;
    renderer.render( scene, camera );
}

// Resize by Screen Size
window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function objectSelection() {
    document.getElementById("boxParameters1").style.display = "block";
    document.getElementById("boxParameters2").style.display = "block";
    document.getElementById("boxParameters3").style.display = "block";
}

function createGeometry(geometryDraw) {
    // Box, Torus, Cone
    var geometryFigure = null;

    switch(geometryDraw) {
        case 'Box':
          // code block
          geometryFigure = new THREE.BoxGeometry( document.getElementById("boxX").value, document.getElementById("boxY").value, document.getElementById("boxZ").value );
          break;
        case 'Torus':
          // code block
            geometryFigure = new THREE.TorusGeometry( 10, 1, 16, 100 ); 
          break;
        case 'Cone':
          // code block
            geometryFigure = new THREE.ConeGeometry( 5, 10, 32 );
          break;
    }
    var randomColor = +('0x' + Math.floor(Math.random()*16777215).toString(16));
    
    // Basic
    const materialBasic = new THREE.MeshBasicMaterial( { color: randomColor,
                                                          transparent: true,
                                                          opacity: 1,
                                                          wireframe: true,
                                                          wireframeLineWidth: 6 } );
    // Standard
    const materialStandard = new THREE.MeshStandardMaterial( { color: randomColor,
                                                    transparent: false,
                                                    opacity: 0.5,
                                                    wireframe: false,
                                                    roughness: 0.5,
                                                    metalness: 1 } );
    // MeshNormal Material
    const materialMeshNormal = new THREE.MeshNormalMaterial( { color: randomColor,
                                                                transparent: false,
                                                                opacity: 0.5,
                                                                wireframe: false } );
    // MeshLambertMaterial
    const MeshLambertMaterial = new THREE.MeshLambertMaterial( { color: randomColor,
                                                                  emissive: 0xff0000,
                                                                  emissiveIntensity: 1
    } );
                                                          

    const objectDraw = new THREE.Mesh( geometryFigure, MeshLambertMaterial );
    scene.add( objectDraw );
    objectDraw.position.y = 1;
}