function createUI() {
    var gui = new dat.GUI();

    var param = {
        a: "OBJ",
        b: "#FF00FF",
        c: 1
    };

    var g = gui.addFolder('Geometria');
        g.add(param, 'a', ["Mujer", "Hombre", "Luigi", "Mario", "Ronin"]).name("Modelos 3D");

    var l = gui.addFolder('Luces');
        l.addColor(param, 'b').name("Color de Luz");
}

