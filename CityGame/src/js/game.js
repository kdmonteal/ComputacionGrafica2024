function createUI() {
    var gui = new dat.GUI();

    var param = {
        a: "Ronin",
        b: "#FF00FF",
        c: 1
    };

    var g = gui.addFolder('Geometria');
        g.add(param, 'a', ["Mujer", "Hombre", "Luigi", "Mario", "Ronin"]).name("Modelos 3D");

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

