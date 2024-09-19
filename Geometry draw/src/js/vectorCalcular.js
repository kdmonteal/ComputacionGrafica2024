function vector(){
    //alert("calculate")
    //obtener valores inputs

    //var es para variable global
    //let es para que exista solo en la funcion
    //const es para variable constante

    let ax = document.getElementById("PointAX").value;
    let ay = document.getElementById("PointAY").value;
    let az = document.getElementById("PointAZ").value;

    let bx = document.getElementById("PointBX").value;
    let by = document.getElementById("PointBY").value;
    let bz = document.getElementById("PointBZ").value;

    //alert("("+ax+","+ay+","+az+")");
    //alert("("+bx+","+by+","+bz+")");

    let vx = bx-ax,
        vy = by-ay,
        vz = bz-az;

    //alert("( "+ vx + ", " + vy + ", " + vz +" )");

    let vectorFinal = `(${vx},${vy},${vz})`;

    document.getElementById("result").innerHTML = vectorFinal;

    //alert(vectorFinal);
    
}

function sumar(){

    let ax = document.getElementById("VectorUX").value;
    let ay = document.getElementById("VectorUY").value;
    let az = document.getElementById("VectorUZ").value;

    let bx = document.getElementById("VectorVX").value;
    let by = document.getElementById("VectorVY").value;
    let bz = document.getElementById("VectorVZ").value;

    
    let vx = parseInt(bx) + parseInt(ax),
        vy = parseInt(by) + parseInt(ay),
        vz = parseInt(bz) + parseInt(az);

    
    let vectorFinal = `(${vx},${vy},${vz})`;

    document.getElementById("resultadoSuma").innerHTML = vectorFinal;

    
}

function producto(){

    let ax = document.getElementById("PVectorUX").value;
    let ay = document.getElementById("PVectorUY").value;
    let az = document.getElementById("PVectorUZ").value;

    let bx = document.getElementById("PVectorVX").value;
    let by = document.getElementById("PVectorVY").value;
    let bz = document.getElementById("PVectorVZ").value;

    
    let vx = parseInt(bx) * parseInt(ax),
        vy = parseInt(by) * parseInt(ay),
        vz = parseInt(bz) * parseInt(az);

        //alert("( "+ vx + ", " + vy + ", " + vz +" )");
    
    let vectorFinal = vx + vy + vz;

    //alert(vectorFinal);

    

    document.getElementById("resultadoProducto").innerHTML = vectorFinal;

    
}

function magnitud(){

    
    let x = document.getElementById("VectorWX").value;
    let y = document.getElementById("VectorWY").value;
    let z = document.getElementById("VectorWZ").value;

    let wx = parseInt(x) + 0,
        wy = parseInt(y) + 0,
        wz = parseInt(z) + 0;

        
    
    let w = Math.sqrt(wx*wx + wy*wy + wz*wz);

    
    
    let magnitudVector = "|W| = " + w;

    document.getElementById("resultadoMagnitud").innerHTML = magnitudVector;

    
}

