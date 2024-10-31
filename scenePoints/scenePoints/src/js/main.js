/* Author(a): Kelly Daniella Marin*/

// var, let, const ¿?
// Creación variables
var scene = null,
    camera = null,
    renderer = null,
    controls = null;

var modelLoad = null,
    light3 = null,
    light3Color = null,
    modelColor = null,
    stats = null,
    sound3d = null;

var pickup = null,
    myPickUps = [],
    points = 0;

var myPlayer = null,
    input = {left:0, right:0, up:0, down:0},
    rotSpeed = 0.05,
    speed = 0.5;

// Inicializar la scene
function startScene() {
    initScene();
    animate();
}

function initScene() {
    // Scene, Camera, Renderer 
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x94bdff);
    scene.fog = new THREE.Fog( 0xa0a0a0, 200, 1000 );

    camera = new THREE.PerspectiveCamera(
        75,                                      // Ángulo de visión (abajo o arriba)
        window.innerWidth / window.innerHeight,  // Relación de aspecto 16:9
        0.1,                                     // Mas cerca (no renderiza)
        1000);                                   // Mas lejos (no renderiza)

    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('app') });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const container = document.getElementById('container');

    stats = new Stats();
    container.appendChild(stats.domElement);

    // Controls
    // controls = new THREE.OrbitControls(camera, renderer.domElement);
    camera.position.set(-0.5, 15, 31);
    // controls.update();
    
    // Grid Helper
    const size = 500;
    const divisions = 50;

    const gridHelper = new THREE.GridHelper( size, divisions );
    scene.add(gridHelper);
    
    // Other Code
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    createLight(0xFF00FF,1);
    initGUI();
    initSound3D();
    createPlayer();
    createMultiplyPickUps(5);
}

function initSound3D() {
    sound3d = new Sound(["./src/songs/rain.mp3"],30,scene,{
        debug:false,
        position: {x:0,y:camera.position.y,z:0}
    });

    sound3d.play();
}

function createMultiplyPickUps(factorToCreate) {
    for (index = 0; index < factorToCreate; index++) {
        initCollectible(Math.floor(Math.random()*151));
    }
}

function initCollectible(posOfCreate) {

    const geometry = new THREE.BoxGeometry( 8, 8, 8 );

    // Create Texture
    var textureLoader = new THREE.TextureLoader();
    var texture = textureLoader.load("./src/img/uv_test_bw_1024.png");
    var material = new THREE.MeshBasicMaterial( {map: texture} );
    
    pickup = new THREE.Mesh( geometry, material );
    pickup.name = "modelToPick"+Math.floor(Math.random()*101);
    // pickup.id = "modelToPick"+Math.floor(Math.random()*101);
    pickup.position.y = camera.position.y;
    pickup.position.x = posOfCreate;
    pickup.position.z = posOfCreate;

    scene.add( pickup );
    myPickUps.push(pickup);

    // Collider Temporal
    // myPlayer.geometry.computeBoundingBox();
    // pickup.geometry.computeBoundingBox();
}

function collisionAnimate() {
   
    var originPoint = myPlayer.position.clone();

    for (var vertexIndex = 0; vertexIndex < myPlayer.geometry.vertices.length; vertexIndex++){  
    var localVertex = myPlayer.geometry.vertices[vertexIndex].clone();
    var globalVertex = localVertex.applyMatrix4( myPlayer.matrix );
    var directionVector = globalVertex.sub( myPlayer.position );
    
    var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
    var collisionResults = ray.intersectObjects( myPickUps );
        if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()){
        //         sendToAddAndSubs(collisionResults[0].object.name);
        //     }else{
        //     }
            console.log("take element: "+collisionResults[0].object.name);
            points++;
            collisionResults[0].object.visible = false;
            document.getElementById("points").innerHTML = points;
        }
    }
}

function createLight(color, intensidad) {
    light3 = new THREE.AmbientLight( color, intensidad); // soft white light
    scene.add( light3 );
}

function animate() {
    requestAnimationFrame(animate);

    // required if controls.enableDamping or controls.autoRotate are set to true
    // controls.update();
    sound3d.update(camera);
    movementPlayer();
    renderer.render(scene, camera);
    stats.update();
    collisionAnimate();



    /*var box2 = myPlayer.geometry.boundingBox.clone();
    var box3 = pickup.geometry.boundingBox.clone();

    var collider = new THREEx.ColliderBox3(pickup, box3);
    var collider2 = new THREEx.ColliderBox3(myPlayer, box2);


    var colliderSystem  = new THREEx.ColliderSystem();
    colliderSystem.computeAndNotify(collider);

    var onCollideEnter  = collider.addEventListener('contactEnter', function(otherCollider){
        console.log('contactEnter with', otherCollider.id);
    })*/
}

function loadOBJ_MTL(generalPath, pathMTL, pathOBJ) {
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setTexturePath(generalPath);
    mtlLoader.setPath(generalPath);
    mtlLoader.load(pathMTL, function (materials) {

        materials.preload();

        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath(generalPath);
        objLoader.load(pathOBJ, function (object) {

            modelLoad = object;
            scene.add(object);
            object.scale.set(0.1, 0.1, 0.1);
            object.position.y = 0;
            object.position.x = 0;
        });
    });
}

function loadGLTF() {
    // Instanciar un loader - Cargador de informacion
    var loader = new THREE.GLTFLoader();

    // Decodificar el Mesh autocontenido
    var dracoLoader = new THREE.DRACOLoader();
        dracoLoader.setDecoderPath("./src/modelos/other/");
        loader.setDRACOLoader( dracoLoader );

    // Load a glTF resource
    loader.load(
        // resource URL
        './src/modelos/other/duck.gltf',
        // called when the resource is loaded
        function ( gltf ) {
    
            modelLoad = gltf;
            scene.add( gltf.scene );
                gltf.animations; // Array<THREE.AnimationClip>
                gltf.scene;   // THREE.Scene
                gltf.scenes;  // Array<THREE.Scene>
                gltf.cameras; // Array<THREE.Camera>
                gltf.asset;   // Object
                gltf.scene.scale.set(10,10,10) // scale here
                gltf.scene.rotation.y = -(Math.PI / 2);
            },
            
            // called while loading is progressing
            function ( xhr ) {
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
            // called when loading has errors
            function ( error ) {
                console.log( 'An error happened' );
            }
        );
}

function loadFBX(animationToDo) {
    console.log("load animations "+animationToDo);

    //var loader = new THREE.FBXLoader();

     // Inicio de carga y carga asincrónica, no me preguntes, no lo sé, el parámetro en el cuerpo del método es
    //(url,onLoad,onProgress,onError)
    // Tan correspondiente
    // loader.load( './src/modelos/fbx/baseHumanModel.fbx', function ( object ) {
    //     console.log("load content");
    //     //Animación
        /*object.mixer = new THREE.AnimationMixer( object );
        mixers.push( object.mixer )；
        var action = object.mixer.clipAction( object.animations[ 0 ] );
        action.play();
        // Um, tal vez la textura, te equivocaste, por favor indícalo
        object.traverse( function ( child ) {

            if ( child.isMesh ) {

                child.castShadow = true;
                child.receiveShadow = true;

    //         }

    //     } );*/

    //     scene.add( object );

    // } );


}

function initGUI() {
    
    var gui = new dat.GUI();
    var param = {
        a: "None",     // Select the models to load
        b: true,       // ¿Wireframe?
        c: "#FF00FF",  // Color de la Luz
        d: 1,           // Slider de intensidad
        e: "None"
    };
    
    // parametros
    var modelLoadGUI = gui.add(param, "a", ["None", "OBJ Male", "OBJ Chica", "OBJ Mario", "OBJ Luigi", "GLTF Duck", "FBX"]).name("3D Model");
    var showMayaLoadGUI = gui.add(param, "b").name("Show Model");
    var colorGUI = gui.addColor(param, "c").name("Color Light");
    var colorIntesity = gui.add(param, "d").min(0).max(5).step(0.1).name("Intensity light");

    //var animation = gui.addFolder( 'Base Actions', "e" );
        
    var animation = gui.add(param, "e", ["None", "Idle", "Run"]).name("Animations FBX");


    // Load model by Selection
    modelLoadGUI.onChange(function (model) {
    scene.remove(modelLoad);
        switch (model) {
            case 'OBJ Male':
                var routeContent = './src/modelos/obj/male02/';
                var fileMTL = "male02.mtl";
                var fileOBJ = "male02.obj";
                loadOBJ_MTL(routeContent,fileMTL,fileOBJ);
            break;
        
            case 'OBJ Chica':
                var routeContent = './src/modelos/obj/female02/';
                var fileMTL = "female02.mtl";
                var fileOBJ = "female02.obj";
                loadOBJ_MTL(routeContent,fileMTL,fileOBJ);
            break;

            case 'OBJ Mario':
                var routeContent = './src/modelos/obj/MarioandLuigi/';
                var fileMTL = "mario_obj.mtl";
                var fileOBJ = "mario_obj.obj";
                loadOBJ_MTL(routeContent,fileMTL,fileOBJ);
            break;

            case 'OBJ Luigi':
                var routeContent = './src/modelos/obj/MarioandLuigi/';
                var fileMTL = "Luigi_obj.mtl";
                var fileOBJ = "Luigi_obj.obj";
                loadOBJ_MTL(routeContent,fileMTL,fileOBJ);
            break;

            case 'GLTF Duck':
                loadGLTF();
            break;
        }
    });

    // true/false
    showMayaLoadGUI.onChange(function(model) {
        modelLoad.visible = model;
    });

    // Color de la Luz
    colorGUI.onChange(function(model){

        scene.remove(light3);

        modelColor = +(model.replace("#","0x"));
        createLight(modelColor,1);

        colorIntesity.onChange(function (model) {
            scene.remove(light3);
            createLight(+(modelColor),model);
        });
    });


    animation.onChange(function (model) {
            loadFBX(model);
        });
}

function goToPlay() {
    alert("En este momento vamos a iniciar la partida");
    document.getElementById("menuPanel").style.display = "none";

    // Start General Sound
    document.getElementById("bckSound").play();
}

function createPlayer(){
    console.log("this is my principal player");

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    myPlayer = new THREE.Mesh( geometry, material );
    myPlayer.position.set(camera.position.x,camera.position.y,camera.position.z);
    
    scene.add( myPlayer );
}

function movementPlayer() {
    if(input.right == 1){ // Camara Rota
        camera.rotation.y -= rotSpeed;
        myPlayer.rotation.y -= rotSpeed;
    }else if(input.left == 1){ // Camara Rota
        camera.rotation.y += rotSpeed;
        myPlayer.rotation.y += rotSpeed;
    }else if(input.up == 1){ // Camara Avanza
        camera.position.z -= Math.cos(camera.rotation.y) * speed;
        camera.position.x -= Math.sin(camera.rotation.y) * speed;
        myPlayer.position.z -= Math.cos(camera.rotation.y) * speed;
        myPlayer.position.x -= Math.sin(camera.rotation.y) * speed;
    }else if(input.down == 1){ // Camara Avanza
        camera.position.z += Math.cos(camera.rotation.y) * speed;
        camera.position.x += Math.sin(camera.rotation.y) * speed;
        myPlayer.position.z += Math.cos(camera.rotation.y) * speed;
        myPlayer.position.x += Math.sin(camera.rotation.y) * speed;
    }
}

window.addEventListener('keydown',function (e) {
    switch (e.keyCode) {
        case 68: // Derecha
            input.right = 1;
            // console.log("derecha");
        break;
        case 65: // Izquierda
            input.left = 1;
            // console.log("izquierda");
        break;
        case 87: // Arriba
            input.up = 1;
            // console.log("arriba");
        break;
        case 83: // Abajo
            input.down = 1;
            // console.log("abajo");
        break;
    }
});

window.addEventListener('keyup',function (e) {
    switch (e.keyCode) {
        case 68: // Derecha
            input.right = 0;
        break;
        case 65: // Izquierda
            input.left = 0;
        break;
        case 87: // Arriba
            input.up = 0;
        break;
        case 83: // Abajo
            input.down = 0;
        break;
    }
});