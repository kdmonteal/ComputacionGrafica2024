var scene = null;
var camera = null;
var renderer = null;
var controls = null;
var createdObjects = [];  // Arreglo para almacenar los objetos creados
var light = null;
var cube1 = null;
var cube2 = null;

function startScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x8fe1f5);
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("app") });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Orbit controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 5, -10);
    controls.update();

    // Light
    createLight("ambient");
    createLight("spot");

    // Plano Floor 
    const floor = new THREE.TextureLoader().load('../src/img/City/Ciudad.jpg');
    const geometry = new THREE.PlaneGeometry(15, 15);
    const material = new THREE.MeshBasicMaterial({ color: 0xf8f9fa, side: THREE.DoubleSide, map: floor, transparent: true });
    plane = new THREE.Mesh(geometry, material); // Asegúrate de asignar el plano a la variable global
    plane.rotation.x = Math.PI / 2; // Rotación de 90 grados en el eje X para alinearlo con el eje Y
    
    scene.add(plane);

    createCity();
    loadObjMtl();
    
    createUI();
    animate(); // Llama a la función de animación  
}

function createLight(lightType) {


    switch (lightType) {
        case "ambient":
            light = new THREE.AmbientLight(0xf2f2d4, 0.5); // soft white light
            break;
        case "directional":
            light = new THREE.DirectionalLight(0xffffff, 3);
            const directionalHelper = new THREE.DirectionalLightHelper(light, 3);
            scene.add(directionalHelper);
            break;
        case "point":
            light = new THREE.PointLight(0xffffff, 7, 100);
            light.position.set(13, 13, 13);
            const pointHelper = new THREE.PointLightHelper(light, 1);
            scene.add(pointHelper);
            break;
        case "spot":
            light = new THREE.SpotLight(0xffffff);
            light.position.set(100, 1000, 100);
            const spotHelper = new THREE.SpotLightHelper(light);
            scene.add(spotHelper);
            break;
        default:
    }

    scene.add(light);
}

// Animación de la escena
function animate() {

    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Eliminar todas las geometrías creadas
function deleteGeometry() {
    for (let i = 0; i < createdObjects.length; i++) {
        scene.remove(createdObjects[i]);  // Eliminar cada objeto de la escena
    }
    createdObjects = [];  // Vaciar el arreglo después de eliminar los objetos
}

function createCity() {
    // Casa 1
    const textureHouse1 = new THREE.TextureLoader().load('../src/img/City/Edificio Delgado Azul.png'); // Cargar la textura
    const textureHouse11 = new THREE.TextureLoader().load('../src/img/City/Edificio Delgado Azul Trasero.png'); // Cargar la textura

    const geometryHouse1 = new THREE.BoxGeometry(2, 5, 2);

    // Crear materiales, usando la textura solo en la cara frontal
    const materialsHouse1 = [
        new THREE.MeshPhongMaterial({ color: 0x43e0e0 }), // cara derecha
        new THREE.MeshPhongMaterial({ color: 0x43e0e0 }), // cara izquierda
        new THREE.MeshPhongMaterial({ color: 0x43e0e0 }), // cara superior
        new THREE.MeshPhongMaterial({ color: 0x43e0e0 }), // cara inferior
        new THREE.MeshPhongMaterial({ map: textureHouse11 }), // cara frontal con textura
        new THREE.MeshPhongMaterial({ map: textureHouse1 })  // cara trasera
    ];

    // Crear el cubo con los materiales
    const cube1 = new THREE.Mesh(geometryHouse1, materialsHouse1);

    // Configurar la posición
    cube1.position.set(2.1, 2.5, 3); // x, y, z

    // Agregar el cubo a la escena
    scene.add(cube1);


    // Casa 2
    const textureHouse2 = new THREE.TextureLoader().load('../src/img/City/Edificio Delgado Rojo2.png'); // Cargar la textura

    const geometryHouse2 = new THREE.BoxGeometry(2.5, 5, 2);

    // Crear materiales, usando la textura solo en la cara frontal
    const materialsHouse2 = [
        new THREE.MeshPhongMaterial({ color: 0xed4849 }), // cara derecha
        new THREE.MeshPhongMaterial({ color: 0xed4849 }), // cara izquierda
        new THREE.MeshPhongMaterial({ color: 0xed4849 }), // cara superior
        new THREE.MeshPhongMaterial({ color: 0xed4849 }), // cara inferior
        new THREE.MeshPhongMaterial({ color: 0xed4849 }), // cara frontal con textura
        new THREE.MeshPhongMaterial({ map: textureHouse2 })  // cara trasera
    ];

    // Crear el cubo con los materiales
    const cube2 = new THREE.Mesh(geometryHouse2, materialsHouse2);

    // Configurar la posición y escala
    cube2.position.set(-3.8, 2, 6.7); // x, y, z
    cube2.scale.set(0.8, 0.8, 0.8);

    // Agregar el cubo a la escena
    scene.add(cube2);



    // Casa 3
    const textureHouse3 = new THREE.TextureLoader().load('../src/img/City/Edificio Delgado Verde.png'); // Cargar la textura

    const geometryHouse3 = new THREE.BoxGeometry(2.5, 5, 2);

    // Crear materiales, usando la textura solo en la cara frontal
    const materialsHouse3 = [
        new THREE.MeshPhongMaterial({ color: 0x4dce97 }), // cara derecha
        new THREE.MeshPhongMaterial({ color: 0x4dce97 }), // cara izquierda
        new THREE.MeshPhongMaterial({ color: 0x4dce97 }), // cara superior
        new THREE.MeshPhongMaterial({ color: 0x4dce97 }), // cara inferior
        new THREE.MeshPhongMaterial({ color: 0x4dce97 }), // cara frontal con textura
        new THREE.MeshPhongMaterial({ map: textureHouse3 })  // cara trasera
    ];

    // Crear el cubo con los materiales
    const cube3 = new THREE.Mesh(geometryHouse3, materialsHouse3);

    // Configurar la posición y escala
    cube3.position.set(-6.4, 2, 6.7); // x, y, z
    cube3.scale.set(0.8, 0.8, 0.8);

    // Agregar el cubo a la escena
    scene.add(cube3);


    // Casa 4
    const textureHouse4 = new THREE.TextureLoader().load('../src/img/City/Edificio Delgado Rojo.png'); // Cargar la textura

    const geometryHouse4 = new THREE.BoxGeometry(2, 5, 2);

    // Crear materiales, usando la textura solo en la cara frontal
    const materialsHouse4 = [
        new THREE.MeshPhongMaterial({ map: textureHouse4 }), // cara derecha
        new THREE.MeshPhongMaterial({ color: 0xf8696a }), // cara izquierda
        new THREE.MeshPhongMaterial({ color: 0xf8696a }), // cara superior
        new THREE.MeshPhongMaterial({ color: 0xf8696a }), // cara inferior
        new THREE.MeshPhongMaterial({ color: 0xf8696a }), // cara frontal con textura
        new THREE.MeshPhongMaterial({ color: 0xf8696a })  // cara trasera
    ];

    // Crear el cubo con los materiales
    const cube4 = new THREE.Mesh(geometryHouse4, materialsHouse4);

    // Configurar la posición y escala
    cube4.position.set(-6.9, 1.5, -3.3); // x, y, z
    cube4.scale.set(0.6, 0.6, 0.6);

    // Agregar el cubo a la escena
    scene.add(cube4);


    // Casa 5
    const texture5 = new THREE.TextureLoader().load('../src/img/City/Edificio Ancho Azul.png'); // Cargar la textura

    const geometryHouse5 = new THREE.BoxGeometry(2, 5, 5);

    // Crear materiales, usando la textura solo en la cara frontal
    const materialsHouse5 = [
        new THREE.MeshPhongMaterial({ map: texture5 }), // cara derecha
        new THREE.MeshPhongMaterial({ color: 0x88cbe1 }), // cara izquierda
        new THREE.MeshPhongMaterial({ color: 0x88cbe1 }), // cara superior
        new THREE.MeshPhongMaterial({ color: 0x88cbe1 }), // cara inferior
        new THREE.MeshPhongMaterial({ color: 0x88cbe1 }), // cara frontal con textura
        new THREE.MeshPhongMaterial({ color: 0x88cbe1 })  // cara trasera
    ];

    // Crear el cubo con los materiales
    const cube5 = new THREE.Mesh(geometryHouse5, materialsHouse5);

    // Configurar la posición y escala
    cube5.position.set(-6.9, 1.5, -6); // x, y, z
    cube5.scale.set(0.6, 0.6, 0.6);

    // Agregar el cubo a la escena
    scene.add(cube5);

    // Casa 6
    const texture6 = new THREE.TextureLoader().load('../src/img/City/Edificio Delgado Naranja.png'); // Cargar la textura

    const geometryHouse6 = new THREE.BoxGeometry(2, 5, 2);

    // Crear materiales, usando la textura solo en la cara frontal
    const materialsHouse6 = [
        new THREE.MeshPhongMaterial({ color: 0xf27d4f }), // cara derecha
        new THREE.MeshPhongMaterial({ map: texture6 }), // cara izquierda
        new THREE.MeshPhongMaterial({ color: 0xf27d4f }), // cara superior
        new THREE.MeshPhongMaterial({ color: 0xf27d4f }), // cara inferior
        new THREE.MeshPhongMaterial({ color: 0xf27d4f }), // cara frontal con textura
        new THREE.MeshPhongMaterial({ color: 0xf27d4f })  // cara trasera
    ];

    // Crear el cubo con los materiales
    const cube6 = new THREE.Mesh(geometryHouse6, materialsHouse6);

    // Configurar la posición y escala
    cube6.position.set(6.7, 2, 0.6); // x, y, z
    cube6.scale.set(0.8, 0.8, 0.8);

    // Agregar el cubo a la escena
    scene.add(cube6);
    //Casa 7
    // Carga la textura
    const texture7 = new THREE.TextureLoader().load('../src/img/City/Edificio Ancho Verde.png');

    // Crea la geometría del cubo
    const geometryHouse7 = new THREE.BoxGeometry(2, 5, 5);

    // Crea materiales, usando la textura solo en la cara frontal
    const materials = [
        new THREE.MeshPhongMaterial({ color: 0x6be4b4 }), // cara derecha
        new THREE.MeshPhongMaterial({ map: texture7 }), // cara izquierda
        new THREE.MeshPhongMaterial({ color: 0x6be4b4 }), // cara superior
        new THREE.MeshPhongMaterial({ color: 0x6be4b4 }), // cara inferior
        new THREE.MeshPhongMaterial({ color: 0x6be4b4 }), // cara frontal con textura
        new THREE.MeshPhongMaterial({ color: 0x6be4b4 })  // cara trasera
    ];

    // Crea el cubo con los materiales
    const cube7 = new THREE.Mesh(geometryHouse7, materials);

    // Configura la posición y escala
    cube7.position.set(6.7, 2, -2.3); // x, y, z
    cube7.scale.set(0.8, 0.8, 0.8);

    // Agrega el cubo a la escena
    scene.add(cube7);


    // Casa 8
    const textureHouse8 = new THREE.TextureLoader().load('../src/img/City/Edificio Delgado Amarillo.png'); // Cargar la textura

    const geometryHouse8 = new THREE.BoxGeometry(2, 5, 2);

    // Crear materiales, usando la textura solo en la cara frontal
    const materialsHouse8 = [
        new THREE.MeshPhongMaterial({ color: 0xd3d04d }), // cara derecha
        new THREE.MeshPhongMaterial({ map: textureHouse8 }), // cara izquierda
        new THREE.MeshPhongMaterial({ color: 0xd3d04d }), // cara superior
        new THREE.MeshPhongMaterial({ color: 0xd3d04d }), // cara inferior
        new THREE.MeshPhongMaterial({ color: 0xd3d04d }), // cara frontal con textura
        new THREE.MeshPhongMaterial({ color: 0xd3d04d })  // cara trasera
    ];

    // Crear el cubo con los materiales
    const cube8 = new THREE.Mesh(geometryHouse8, materialsHouse8);

    // Configurar la posición
    cube8.position.set(6.5, 2.5, 6.4); // x, y, z

    // Agregar el cubo a la escena
    scene.add(cube8);


    // Casa 9
    const textureHouse9 = new THREE.TextureLoader().load('../src/img/City/Edificio Delgado Naranja2.png'); // Cargar la textura

    const geometryHouse9 = new THREE.BoxGeometry(2.5, 6, 2);

    // Crear materiales, usando la textura solo en la cara frontal
    const materialsHouse9 = [
        new THREE.MeshPhongMaterial({ color: 0xe46538 }), // cara derecha
        new THREE.MeshPhongMaterial({ color: 0xe46538 }), // cara izquierda
        new THREE.MeshPhongMaterial({ color: 0xe46538 }), // cara superior
        new THREE.MeshPhongMaterial({ color: 0xe46538 }), // cara inferior
        new THREE.MeshPhongMaterial({ map: textureHouse9 }), // cara frontal con textura
        new THREE.MeshPhongMaterial({ map: textureHouse9 })  // cara trasera
    ];

    // Crear el cubo con los materiales
    const cube9 = new THREE.Mesh(geometryHouse9, materialsHouse9);

    // Configurar la posición
    cube9.position.set(-6.2, 3, 1.6); // x, y, z

    // Agregar el cubo a la escena
    scene.add(cube9);



    // Casa 10  0x8FBCD4
    const textureHouse10 = new THREE.TextureLoader().load('../src/img/City/Edificio ReDelgado.png'); // Cargar la textura

    const geometryHouse10 = new THREE.BoxGeometry(2, 5, 0.9);

    // Crear materiales, usando la textura solo en la cara frontal
    const materialsHouse10 = [
        new THREE.MeshPhongMaterial({ color: 0x6bb5c8 }), // cara derecha
        new THREE.MeshPhongMaterial({ map: textureHouse10 }), // cara izquierda
        new THREE.MeshPhongMaterial({ color: 0x6bb5c8 }), // cara superior
        new THREE.MeshPhongMaterial({ color: 0x6bb5c8 }), // cara inferior
        new THREE.MeshPhongMaterial({ color: 0x6bb5c8 }), // cara frontal con textura
        new THREE.MeshPhongMaterial({ color: 0x6bb5c8 })  // cara trasera
    ];

    // Crear el cubo con los materiales
    const cube10 = new THREE.Mesh(geometryHouse10, materialsHouse10);

    // Configurar la posición
    cube10.position.set(6.5, 2.5, 4.9); // x, y, z

    // Agregar el cubo a la escena
    scene.add(cube10);

    // Casa 111
    const texture11 = new THREE.TextureLoader().load('../src/img/City/Edificio Delgado Naranja2.png'); // Cargar la textura

    const geometryHouse11 = new THREE.BoxGeometry(2.5, 6, 2);

    // Crear materiales, usando la textura solo en la cara frontal
    const materialsHouse11 = [
        new THREE.MeshPhongMaterial({ color: 0xe46538 }), // cara derecha
        new THREE.MeshPhongMaterial({ color: 0xe46538 }), // cara izquierda
        new THREE.MeshPhongMaterial({ color: 0xe46538 }), // cara superior
        new THREE.MeshPhongMaterial({ color: 0xe46538 }), // cara inferior
        new THREE.MeshPhongMaterial({ map: texture11 }), // cara frontal con textura
        new THREE.MeshPhongMaterial({ map: texture11 })  // cara trasera
    ];

    // Crear el cubo con los materiales
    const cube11 = new THREE.Mesh(geometryHouse11, materialsHouse11);

    // Configurar la posición
    cube11.position.set(-3.6, 3, 1.6); // x, y, z

    // Agregar el cubo a la escena
    scene.add(cube11);




    {//Arbusto 1
        const geometryq = new THREE.SphereGeometry(0.35, 32, 16);
        const materialq = new THREE.MeshLambertMaterial({ color: 0x0dbb0b });
        const sphere = new THREE.Mesh(geometryq, materialq);
        sphere.position.set(2.3, 0.1, 5);
        scene.add(sphere);

        const geometryq2 = new THREE.SphereGeometry(0.35, 32, 16);
        const materialq2 = new THREE.MeshLambertMaterial({ color: 0x0dbb0b });
        const sphere2 = new THREE.Mesh(geometryq2, materialq2);
        sphere2.position.set(2, 0.1, 4.7);
        scene.add(sphere2);

        const geometryq3 = new THREE.SphereGeometry(0.35, 32, 16);
        const materialq3 = new THREE.MeshLambertMaterial({ color: 0x0dbb0b });
        const sphere3 = new THREE.Mesh(geometryq3, materialq3);
        sphere3.position.set(2.5, 0.1, 4.7);
        scene.add(sphere3);
    }

    {//Arbusto 2
        const geometryq = new THREE.SphereGeometry(0.35, 32, 16);
        const materialq = new THREE.MeshLambertMaterial({ color: 0x0dbb0b });
        const sphere = new THREE.Mesh(geometryq, materialq);
        sphere.position.set(1, 0.1, 4.8);
        scene.add(sphere);

        const geometryq2 = new THREE.SphereGeometry(0.35, 32, 16);
        const materialq2 = new THREE.MeshLambertMaterial({ color: 0x0dbb0b });
        const sphere2 = new THREE.Mesh(geometryq2, materialq2);
        sphere2.position.set(0.7, 0.1, 4.6);
        scene.add(sphere2);

        const geometryq3 = new THREE.SphereGeometry(0.35, 32, 16);
        const materialq3 = new THREE.MeshLambertMaterial({ color: 0x0dbb0b });
        const sphere3 = new THREE.Mesh(geometryq3, materialq3);
        sphere3.position.set(1, 0.1, 4.7);
        scene.add(sphere3);
    }

    {//Arbusto 3
        const geometryq = new THREE.SphereGeometry(0.35, 32, 16);
        const materialq = new THREE.MeshLambertMaterial({ color: 0x0dbb0b });
        const sphere = new THREE.Mesh(geometryq, materialq);
        sphere.position.set(0.5, 0.1, 3.45);
        scene.add(sphere);

        const geometryq2 = new THREE.SphereGeometry(0.35, 32, 16);
        const materialq2 = new THREE.MeshLambertMaterial({ color: 0x0dbb0b });
        const sphere2 = new THREE.Mesh(geometryq2, materialq2);
        sphere2.position.set(0.47, 0.1, 3.39);
        scene.add(sphere2);
    }

    {//Arbusto 4 
        const geometryq = new THREE.SphereGeometry(0.35, 32, 16);
        const materialq = new THREE.MeshLambertMaterial({ color: 0x0dbb0b });
        const sphere = new THREE.Mesh(geometryq, materialq);
        sphere.position.set(-3, 0.1, -3.35);
        scene.add(sphere);

        const geometryq2 = new THREE.SphereGeometry(0.35, 32, 16);
        const materialq2 = new THREE.MeshLambertMaterial({ color: 0x0dbb0b });
        const sphere2 = new THREE.Mesh(geometryq2, materialq2);
        sphere2.position.set(-2.9, 0.08, -3.17);
        scene.add(sphere2);

        const geometryq3 = new THREE.SphereGeometry(0.35, 32, 16);
        const materialq3 = new THREE.MeshLambertMaterial({ color: 0x0dbb0b });
        const sphere3 = new THREE.Mesh(geometryq3, materialq3);
        sphere3.position.set(-3, 0.1, -3.12);
        scene.add(sphere3);
    }

    {//Arbusto 5
        const geometryq = new THREE.SphereGeometry(0.35, 32, 16);
        const materialq = new THREE.MeshLambertMaterial({ color: 0x0dbb0b });
        const sphere = new THREE.Mesh(geometryq, materialq);
        sphere.position.set(-2.9, 0.1, -4.5);
        scene.add(sphere);

        const geometryq2 = new THREE.SphereGeometry(0.35, 32, 16);
        const materialq2 = new THREE.MeshLambertMaterial({ color: 0x0dbb0b });
        const sphere2 = new THREE.Mesh(geometryq2, materialq2);
        sphere2.position.set(-2.8, 0.1, -4.9);
        scene.add(sphere2);

        const geometryq3 = new THREE.SphereGeometry(0.35, 32, 16);
        const materialq3 = new THREE.MeshLambertMaterial({ color: 0x0dbb0b });
        const sphere3 = new THREE.Mesh(geometryq3, materialq3);
        sphere3.position.set(-2.4, 0.1, -4.9);
        scene.add(sphere3);
    }
    {//Arbusto 6
        const geometryq = new THREE.SphereGeometry(0.35, 32, 16);
        const materialq = new THREE.MeshLambertMaterial({ color: 0x0dbb0b });
        const sphere = new THREE.Mesh(geometryq, materialq);
        sphere.position.set(-0.5, 0.1, -4.9);
        scene.add(sphere);

        const geometryq2 = new THREE.SphereGeometry(0.35, 32, 16);
        const materialq2 = new THREE.MeshLambertMaterial({ color: 0x0dbb0b });
        const sphere2 = new THREE.Mesh(geometryq2, materialq2);
        sphere2.position.set(-0.2, 0.1, -5);
        scene.add(sphere2);

        const geometryq3 = new THREE.SphereGeometry(0.35, 32, 16);
        const materialq3 = new THREE.MeshLambertMaterial({ color: 0x0dbb0b });
        const sphere3 = new THREE.Mesh(geometryq3, materialq3);
        sphere3.position.set(-1, 0.1, -5);
        scene.add(sphere3);
    }
    {//Arbusto 7
        const geometryq = new THREE.SphereGeometry(0.35, 32, 16);
        const materialq = new THREE.MeshLambertMaterial({ color: 0x0dbb0b });
        const sphere = new THREE.Mesh(geometryq, materialq);
        sphere.position.set(1, 0.1, -1);
        scene.add(sphere);

        const geometryq2 = new THREE.SphereGeometry(0.35, 32, 16);
        const materialq2 = new THREE.MeshLambertMaterial({ color: 0x0dbb0b });
        const sphere2 = new THREE.Mesh(geometryq2, materialq2);
        sphere2.position.set(1.4, 0.1, -0.8);
        scene.add(sphere2);

        const geometryq3 = new THREE.SphereGeometry(0.35, 32, 16);
        const materialq3 = new THREE.MeshLambertMaterial({ color: 0x0dbb0b });
        const sphere3 = new THREE.Mesh(geometryq3, materialq3);
        sphere3.position.set(1.45, 0.1, -1.2);
        scene.add(sphere3);
    }
    {//Arbusto 8
        const geometryq = new THREE.SphereGeometry(0.35, 32, 16);
        const materialq = new THREE.MeshLambertMaterial({ color: 0x0dbb0b });
        const sphere = new THREE.Mesh(geometryq, materialq);
        sphere.position.set(4, 0.1, -1);
        scene.add(sphere);

        const geometryq2 = new THREE.SphereGeometry(0.35, 32, 16);
        const materialq2 = new THREE.MeshLambertMaterial({ color: 0x0dbb0b });
        const sphere2 = new THREE.Mesh(geometryq2, materialq2);
        sphere2.position.set(4.5, 0.1, -1);
        scene.add(sphere2);

        const geometryq3 = new THREE.SphereGeometry(0.35, 32, 16);
        const materialq3 = new THREE.MeshLambertMaterial({ color: 0x0dbb0b });
        const sphere3 = new THREE.Mesh(geometryq3, materialq3);
        sphere3.position.set(4.4, 0.08, -1.2);
        scene.add(sphere3);
    }
    {//Arbusto 8
        const geometryq = new THREE.SphereGeometry(0.35, 32, 16);
        const materialq = new THREE.MeshLambertMaterial({ color: 0x0dbb0b });
        const sphere = new THREE.Mesh(geometryq, materialq);
        sphere.position.set(3, 0.1, -1);
        scene.add(sphere);

        const geometryq2 = new THREE.SphereGeometry(0.35, 32, 16);
        const materialq2 = new THREE.MeshLambertMaterial({ color: 0x0dbb0b });
        const sphere2 = new THREE.Mesh(geometryq2, materialq2);
        sphere2.position.set(2.7, 0.1, -1.3);
        scene.add(sphere2);

    }
    {//Fuente
        const geometry = new THREE.CylinderGeometry(1, 1.2, 0.2, 32);
        const material = new THREE.MeshStandardMaterial({ color: 0x6fc1d4 });
        const cylinder = new THREE.Mesh(geometry, material);
        cylinder.position.set(1.5, 0.1, -5.8);
        scene.add(cylinder);

        const geometry1 = new THREE.CylinderGeometry(1.1, 1.2, 0.1, 32);
        const material1 = new THREE.MeshToonMaterial({ color: 0x384143 });
        const cylinder1 = new THREE.Mesh(geometry1, material1);
        cylinder1.position.set(1.5, 0.1, -5.8);
        scene.add(cylinder1);


    }
    // Crear geometría del cuerpo del carro
    const carBodyGeometry = new THREE.BoxGeometry(4, 1, 2);
    const carBodyMaterial = new THREE.MeshPhysicalMaterial({ color: 0xff0000 });
    const carBody = new THREE.Mesh(carBodyGeometry, carBodyMaterial);
    carBody.position.y = 0.2;
    carBody.position.z = 0.3;
    carBody.position.x = 2; // Elevar la carrocería un poco sobre el suelo
    scene.add(carBody);
    carBody.scale.set(0.2, 0.2, 0.2);

    // Crear geometría de la cabina del carro
    const carCabinGeometry = new THREE.BoxGeometry(2, 1, 1.5);
    const carCabinMaterial = new THREE.MeshPhysicalMaterial({ color: 0xff0000 });
    const carCabin = new THREE.Mesh(carCabinGeometry, carCabinMaterial);
    carCabin.position.set(0, 0.4, 0); // Posicionar la cabina sobre la carrocería
    scene.add(carCabin);
    carCabin.position.x = 2;
    carCabin.position.z = 0.3;
    carCabin.scale.set(0.2, 0.2, 0.2);

    // Cargar la textura de la imagen para las caras de las ruedas
    const textureLoader = new THREE.TextureLoader();
    const wheelTexture = textureLoader.load('../src/img/City/Rueda.png');

    // Crear geometría de la rueda
    const wheelGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 32);

    // Material para las caras de la rueda (con textura)
    const wheelSideMaterial = new THREE.MeshBasicMaterial({ map: wheelTexture });

    // Material para el borde de la rueda (sin textura, solo color)
    const wheelEdgeMaterial = new THREE.MeshBasicMaterial({ color: 0X1b1b1b });

    // Materiales aplicados a las diferentes caras de la rueda
    const wheelMaterials = [wheelEdgeMaterial, wheelSideMaterial, wheelSideMaterial];

    // Crear las ruedas delanteras y traseras con los materiales correctos
    const createWheel = (x, y, z) => {
        const wheel = new THREE.Mesh(wheelGeometry, wheelMaterials);
        wheel.rotation.x = Math.PI / 2;
        wheel.position.set(x, y, z);
        wheel.scale.set(0.2, 0.2, 0.2);
        scene.add(wheel);
    };

    // Posicionar las ruedas
    createWheel(1.8, 0.1, 0.5);  // Rueda delantera izquierda
    createWheel(1.8, 0.1, 0.1);  // Rueda delantera derecha
    createWheel(2.19, 0.1, 0.5); // Rueda trasera izquierda
    createWheel(2.19, 0.1, 0.1); // Rueda trasera derecha


    {//Avion
        const scale = 0.5;
        const rotation = Math.PI / 2;
        const materialPlain = new THREE.MeshStandardMaterial({ color: 0xeeeeee });


        // Fuselaje del avión (caja simple)
        const fuselageGeometry = new THREE.BoxGeometry(6 * scale, 1 * scale, 1 * scale);
        const fuselage = new THREE.Mesh(fuselageGeometry, materialPlain);
        fuselage.position.set(-4, 5, -4)
        fuselage.rotation.y = rotation
        scene.add(fuselage);

        // Alas del avión (cajas planas)
        const wingGeometry = new THREE.BoxGeometry(1 * scale, 0.1 * scale, 4 * scale);
        const wingMaterial = new THREE.MeshStandardMaterial({ color: 0xeeeeee });


        // Ala izquierda trasera
        const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
        leftWing.position.set(-4, 5, -5);  // A la izquierda del fuselaje
        leftWing.rotation.y = rotation
        scene.add(leftWing);


        // Ala derecha delantera
        const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
        rightWing.position.set(-4, 5, -3.5);  // A la derecha del fuselaje
        rightWing.rotation.y = rotation;
        scene.add(rightWing);

        // Cola del avión (caja amarilla)
        const tailGeometry = new THREE.BoxGeometry(0.5 * scale, 1 * scale, 0.5 * scale);
        const tailMaterial = new THREE.MeshStandardMaterial({ color: 0x02455e });
        const tail = new THREE.Mesh(tailGeometry, tailMaterial);
        tail.position.set(-4, 5.3, -5.5);  // Posicionar en la parte trasera del fuselaje
        scene.add(tail);

        // Detalle adicional: Cabina del avión (caja Blanca)
        const cabinGeometry = new THREE.BoxGeometry(1 * scale, 0.5 * scale, 0.5 * scale);
        const cabinMaterial = new THREE.MeshStandardMaterial({ color: 0x02455e });
        const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
        cabin.position.set(-4, 5.2, -2.5);  // Colocar en la parte frontal
        cabin.rotation.y = rotation;
        scene.add(cabin);
    }



    //Estatua

    // Material para porcelana
    const materialToilet = new THREE.MeshStandardMaterial({ color: 0xeeeeee });

    // Parte del tazón del sanitario
    const tazon = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 2, 32), materialToilet);
    tazon.position.set(-2, 0, -6.5);
    scene.add(tazon);

    // Parte de la tapa (cilindro delgado)
    const tapa = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 0.2, 32), materialToilet);
    tapa.position.set(-2, 1.1, -6.5);
    scene.add(tapa);

    // Parte del tanque del sanitario (cubos)
    const tanque = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1, 0.6), materialToilet);
    tanque.position.set(-2, 1.8, -7, 4);
    scene.add(tanque);

}