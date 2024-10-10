function createUI() {
    var gui = new dat.GUI();

    var param = {
        a: "Ronin",
        b: "#FF00FF",
        c: 1
    };

    var g = gui.addFolder('Geometria');
    var player = g.add(param, 'a', ["Mujer", "Hombre", "Luigi", "Mario", "Ronin"]).name("Modelos 3D");

    player.onChange(function(myPlayer) {
        console.log(myPlayer);
        //loadObjMtl();
    });

    var l = gui.addFolder('Luces');
    var colorLight = l.addColor(param, 'b').name("Color de Luz");
    var intensityLight = l.add(param, 'c').min(0).max(1).step(0.1).name("Intensidad");

    colorLight.onChange(function(colorGet) {
        console.log(colorGet);
        light.color.setHex(Number(colorGet.toString().replace('#','0x')));
    });

    intensityLight.onChange(function(intensityGet) {
        light.intensity = intensityGet;
    });
}

function loadObjMtl() {
    // general Path, nameObj, nameMTL
    var generalPath = "./src/models/obj/myPlayer/";
    var fileObj = "ronin-1.obj";
    var fileMtl = "ronin-1.mtl";

    var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setTexturePath(generalPath);
        mtlLoader.setPath(generalPath);
        mtlLoader.load(fileMtl, function(materials) {
            materials.preload();

            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.setPath(generalPath);
            objLoader.load(fileObj, function(object) {
                scene.add(object);
                object.scale.set(0.2,0.2,0.2);
                object.position.set(-1.2,0,-4);

            });
        });
}