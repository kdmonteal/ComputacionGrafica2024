function vector() {
    // Obtener los Valores de los Inputs
    let ax = document.getElementById("puntoAX").value;
    let ay = document.getElementById("puntoAY").value;
    let az = document.getElementById("puntoAZ").value;

    let bx = document.getElementById("puntoBX").value;
    let by = document.getElementById("puntoBY").value;
    let bz = document.getElementById("puntoBZ").value;

    alert("("+ax+","+ay+","+az+")");
    alert("("+bx+","+by+","+bz+")");

}