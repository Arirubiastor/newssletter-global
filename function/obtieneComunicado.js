var jsonPlantilla = {
    "page1": "Aviso",
    "page2": "Noticia",
    "page3": "Pre-publicacion",
    "page4": "Post-publicacion"
};

function iniciaHtml() {
    var sPaginaURL = window.location.search.substring(1);
    var sURLVariables = sPaginaURL.split('&');
    var identityUsuario = null;
    var identityCliente = null;
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParametro = sURLVariables[i].split('=');
        identityCliente = (sParametro[0] == "idCliente" ? sParametro[1] : identityCliente);
        identityUsuario = (sParametro[0] == "idUsuario" ? sParametro[1] : identityUsuario);
    }
    obtieneComunicado(identityCliente, identityUsuario);
}

function obtieneComunicado(identityCliente, identityUsuario) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", `https://2tywuqfoxe.execute-api.us-west-2.amazonaws.com/api-comunicado/obtienecomunicado?cd_identityUsuario=${identityUsuario}&cd_identityCliente=${identityCliente}`, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var xmlDoc = JSON.parse(this.responseText);

            muestraOcultaPlantilla(xmlDoc.nb_plantilla);

            if (xmlDoc.nb_plantilla != undefined) {
                generarId();

                //document.getElementById("tituloNombre_" + xmlDoc.nb_plantilla).innerHTML = xmlDoc.tx_titulo + ", " + xmlDoc.nb_nombre;
                document.getElementById("identityGrupoComunicado").innerText = xmlDoc.cd_identityGrupoComunicado;
                document.getElementById("titulo_" + xmlDoc.nb_plantilla).innerHTML = xmlDoc.tx_titulo;
                document.getElementById("nombre_" + xmlDoc.nb_plantilla).innerHTML = xmlDoc.nb_nombre;
                document.getElementById("subTitulo_" + xmlDoc.nb_plantilla).innerHTML = xmlDoc.tx_subTitulo;
                document.getElementById("parrafoUno_" + xmlDoc.nb_plantilla).innerHTML = xmlDoc.tx_parrafoUno;
                document.getElementById("parrafoDos_" + xmlDoc.nb_plantilla).innerHTML = xmlDoc.tx_parrafoDos;
                document.getElementById("parrafoTres_" + xmlDoc.nb_plantilla).innerHTML = xmlDoc.tx_parrafoTres;
                document.getElementById("piePagina_" + xmlDoc.nb_plantilla).innerHTML = xmlDoc.tx_piePagina;
                document.getElementById("imagenUno_" + xmlDoc.nb_plantilla).innerHTML = xmlDoc.tx_imagenUno;
                //document.getElementById("imagenDos_" + xmlDoc.nb_plantilla).innerHTML = xmlDoc.tx_imagenDos;
            }

        }
    };
}

function muestraOcultaPlantilla(nb_plantilla) {
    for (var item in jsonPlantilla) {
        if (jsonPlantilla.hasOwnProperty(item)) {
            if (nb_plantilla === jsonPlantilla[item]) {
                document.getElementById(item).style.display = 'block';
            } else if (nb_plantilla === undefined) {
                document.getElementById('page404').style.display = 'block';
            }
        }
    }
}

function generarId() {
    //var tituloNombre = document.getElementsByName('tituloNombre');
    var titulo = document.getElementsByName('titulo');
    var nombre = document.getElementsByName('nombre');
    var subTitulo = document.getElementsByName('subTitulo');
    var parrafoUno = document.getElementsByName('parrafoUno');
    var parrafoDos = document.getElementsByName('parrafoDos');
    var parrafoTres = document.getElementsByName('parrafoTres');
    var piePagina = document.getElementsByName('piePagina');
    var imagenUno = document.getElementsByName('imagenUno');

    var button = document.getElementsByName('button');
    //var imagenDos = document.getElementsByName('imagenDos');

    //obtienePadre(tituloNombre);
    obtienePadre(titulo);
    obtienePadre(nombre);
    obtienePadre(subTitulo);
    obtienePadre(parrafoUno);
    obtienePadre(parrafoDos);
    obtienePadre(parrafoTres);
    obtienePadre(piePagina);
    obtienePadre(imagenUno);

    obtienePadre(button);
    //obtienePadre(imagenDos);
}

function obtienePadre(nodoHijo) {
    //console.log(nodoHijo);
    for (let index = 0; index < nodoHijo.length; index++) {
        var bandera = false;
        for (var item in jsonPlantilla) {
            if (bandera == true) {
                break;
            }
            if (jsonPlantilla.hasOwnProperty(item)) {
                var nu_padres = 1;
                var aux = 'nodoHijo[index].parentNode';
                for (var i = 0; i < nu_padres; i++) {
                    if (eval(aux + '.className') === item) {
                        nodoHijo[index].id = nodoHijo[index].id + "_" + jsonPlantilla[item];
                        //console.log("Result", nodoHijo[index]);
                        bandera = true;
                    } else if (eval(aux + '.className').includes("page")) {
                        break;
                    } else {
                        aux = aux + '.parentNode';
                        //console.log(item, aux);
                        nu_padres = nu_padres + 1;
                    }
                }
            }
        }
        //console.log("Result", nodoHijo[index]);
    }
}

function actualizaComunicado(identityGrupoComunicado, respuestacomunicado) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("PATCH", `https://2tywuqfoxe.execute-api.us-west-2.amazonaws.com/api-comunicado/actualizacomunicado?cd_identityGrupoComunicado=${identityGrupoComunicado}&tx_respuesta=${respuestacomunicado}`, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            location.reload();
        }
    };
}