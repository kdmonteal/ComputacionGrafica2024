function vector() {
    // Obtener los Valores de los Inputs
    let ax = document.getElementById("puntoAX").value;
    let ay = document.getElementById("puntoAY").value;
    let az = document.getElementById("puntoAZ").value;

    let bx = document.getElementById("puntoBX").value;
    let by = document.getElementById("puntoBY").value;
    let bz = document.getElementById("puntoBZ").value;

    let vx = bx-ax,
        vy = by-ay,
        vz = bz-az;
    
    let vectorFinal = `(${vx},${vy},${vz})`;   
    document.getElementById("result").innerHTML = vectorFinal;
}