/*Var Global*/
var _idbasedatos_ = "";
var _idnivel_ = "1";
var _idempresa_ = "";
var _idmacroproyecto_ = "";
var _idproyecto_ = "";
localStorage.setItem("empresa", "");
localStorage.setItem("documentos", "");
localStorage.setItem("espacios", "");
localStorage.setItem("locativas", "");
localStorage.setItem("proyectos", "");
localStorage.setItem("solicitudes", "");
localStorage.setItem("inmuebles", "");
localStorage.setItem("locativos", "");
localStorage.setItem("macro_proyectos", "");
var urlWS = "https://www.colsubsidio.com/vivienda/proyectos/snco-vivienda-posventa/endpoints/";
var urlEmpresa = urlWS + "ConsultaBDEmpresa.php";
var urlDocumentos = urlWS + "ConsultaBDDocumentos.php?_idbasedatos_=_paramidbasedatos_";
var urlSolicitudes = urlWS + "ConsultaBDSolicitudes.php?_idbasedatos_=_paramidbasedatos_";
var urlLocativas = urlWS + "ConsultaBDLocativas.php?_idbasedatos_=_paramidbasedatos_&_idnivel_=_paramidnivel_";
var urlMacroProyectos = urlWS + "ObtenerMacroProyectos.php?_idbasedatos_=_paramidbasedatos_&_idempresa_=_paramidempresa_";
var urlMacroProyectosV2 = urlWS + "ObtenerMacroProyectosV2.php";
//var urlProyectosOriginal = urlWS + "ConsultaBDProyectos.php?_idbasedatos_=_paramidbasedatos_&_idempresa_=_paramidempresa_&_idmacroproyecto_=_paramidmacroproyecto_"
var urlProyectos = urlWS + "ConsultaBDProyectos.php?_idbasedatos_=_paramidbasedatos_&_idempresa_=_paramidempresa_&_idmacroproyecto_=";
//var urlEspaciosOriginal = urlWS + "ConsultaBDEspacios.php?_idbasedatos_=_paramidbasedatos_&_idempresa_=_paramidempresa_&_idproyecto_=_idparamproyecto_";
var urlEspacios = urlWS + "ConsultaBDEspacios.php?_idbasedatos_=_paramidbasedatos_&_idempresa_=_paramidempresa_&_idproyecto_=";
//var urlInmueblesOriginal = urlWS + "ObtenerInmuebles.php?_idbasedatos_=_paramidbasedatos_&_idempresa_=_paramidempresa_&_idproyecto_=_idparamproyecto_&_idmacroproyecto_=_paramidmacroproyecto_";
var urlInmuebles = urlWS + "ObtenerInmuebles.php?_idbasedatos_=_paramidbasedatos_&_idempresa_=_paramidempresa_&_idproyecto_=";
var urlLocativos = urlWS + "ObtenerLocativos.php";
var tokenSecu = "asdfqw3rwe";


/*Var Global*/
var macroproyectos = document.getElementById('macroproyectos');

const putInitialOption = (arr, idInput, input) => {
  let options = document.querySelectorAll(`#${idInput} option`);
  if (options.length > 0) {
    options.forEach(o => o.remove());
  }
  let opt = document.createElement('option');
  opt.value = "";
  opt.innerHTML = "Selecciona una opción";
  input.appendChild(opt);
}

const putInitialOptionMacroProjects = (arr, idInput, input) => {
  let options = document.querySelectorAll(`#${idInput} option`);
  if (options.length > 0) {
    options.forEach(o => o.remove());
  }
  let opt = document.createElement('option');
  opt.classList.add("not_value");
  opt.value = "";
  opt.innerHTML = "Selecciona una opción";
  input.appendChild(opt);
  // let optFirst = document.createElement('option');
  // optFirst.value = "colsubsidio";
  // optFirst.innerHTML = "Colsubsidio";
  // input.appendChild(optFirst);
}

const cargarOpciones = (list, value, name) => {
  let opt = document.createElement('option');
  opt.value = value;
  opt.innerHTML = name;
  list.appendChild(opt);
}

initRun();

function initRun() {

  window.addEventListener("load", function () {
    funcWS(1)
    // loadDocuments();
  });

}


function funcWS(funParam) {
  document.getElementById("loader-container").style.display = "block";
  var a = document.location.href; a = a.substring(a.indexOf("?") + 1).split("\x26");
  for (var b = 0, c = {}; b < a.length; b++)a[b] = a[b].split("\x3d"), c[a[b][0]] = decodeURIComponent(a[b][1]); a = c; sessionStorage.setItem("utm_id", a.utm_id); sessionStorage.setItem("utm_term", a.utm_term); sessionStorage.setItem("utm_content", a.utm_content); sessionStorage.setItem("utm_campaign", a.utm_campaign); sessionStorage.setItem("utm_medium", a.utm_medium); sessionStorage.setItem("utm_source", a.utm_source)

  if (funParam == 1) {
    getWS(urlEmpresa, tokenSecu, "empresa", 2);
  }
  if (funParam == 2) {
    let empresaT = JSON.parse(localStorage.getItem("empresa"))
    _idbasedatos_ = empresaT.obtenerEmpresa[0].empresa.base
    _idempresa_ = empresaT.obtenerEmpresa[0].empresa.id
    urlDocumentos = urlDocumentos.replace("_paramidbasedatos_", _idbasedatos_)
    getWS(urlDocumentos, tokenSecu, "documentos", 3);
  }
  if (funParam == 3) {
    urlSolicitudes = urlSolicitudes.replace("_paramidbasedatos_", _idbasedatos_)
    getWS(urlSolicitudes, tokenSecu, "solicitudes", 4);
  }
  if (funParam == 4) {
    urlLocativas = urlLocativas.replace("_paramidbasedatos_", _idbasedatos_)
    urlLocativas = urlLocativas.replace("_paramidnivel_", _idnivel_)
    getWS(urlLocativas, tokenSecu, "locativas", 5);
  }
  if (funParam == 5) {

    //Asigna los macro proeyctos nuevos del json
    GetDatav2(urlMacroProyectosV2);

    urlMacroProyectos = urlMacroProyectos.replace("_paramidbasedatos_", _idbasedatos_)
    urlMacroProyectos = urlMacroProyectos.replace("_paramidempresa_", _idempresa_)
    getWS(urlMacroProyectos, tokenSecu, "macro_proyectos", 6);
  }
  if (funParam == 6) {
    document.getElementById("loader-container").style.display = "none";
    console.log("load datos basicos terminado")
  }
}

function getWS(urlParam, tokenSecuParam, varLocalParam, funParam) {
  const doc = document.getElementById('tipo_doc');
  const macroproyectos = document.getElementById('macroproyectos');
  const solicitante = document.getElementById('solicitante');
  const tipo_solicitud = document.getElementById('tipo_solicitud');
  let xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      // console.log("que hay",this.responseText);
      localStorage.setItem(varLocalParam, this.responseText);
      funcWS(funParam)
      //Docs
      let documents = JSON.parse(localStorage.getItem("documentos"));
      if (documents && documents.obtenerDocumentos.length > 0) {
        putInitialOption(documents.obtenerDocumentos, doc.id, doc);
        for (const document of documents.obtenerDocumentos) {
          cargarOpciones(doc, document.codigo, document.descripcion);
        }
      }
      //Macroproyectos
      let macro_proyectos = JSON.parse(localStorage.getItem("macro_proyectos"));
      if (macro_proyectos && macro_proyectos.obtenerMacroProyectos.length > 0) {

        let macro_proyectos_v2 = JSON.parse(localStorage.getItem("macro_proyectos_v2"));

        putInitialOptionMacroProjects(macro_proyectos.obtenerMacroProyectos, macroproyectos.id, macroproyectos);

        for (const macroProyecto of macro_proyectos.obtenerMacroProyectos) {
          cargarOpciones(macroproyectos, macroProyecto.id, macroProyecto.nombre);
        }

        //Recorre los proyectos v2 del archivo proyectos_v2.json
        $.each(macro_proyectos_v2, function (i, val) {
          $('#macroproyectos').append(`<option data-macroproyectv2="true" value="` + i + `">` + val.name + `</option>`);
        });

        //Depues de 1s ordena las opciones del select
        setTimeout(function () {
          var options = $('#macroproyectos option:not(.not_value)');
          options.detach().sort(function (a, b) {
            var at = $(a).text();
            var bt = $(b).text();
            return (at > bt) ? 1 : ((at < bt) ? -1 : 0);
          });
          options.appendTo("#macroproyectos");
        }, 1000);


      }
      //Solicitantes
      let solicitudes = JSON.parse(localStorage.getItem("solicitudes"));
      if (solicitudes && solicitudes.obtenerSolicitudes.length > 0) {
        putInitialOption(solicitudes.obtenerSolicitudes, solicitante.id, solicitante);
        for (const solcitudesLocativas of solicitudes.obtenerSolicitudes) {
          if (solcitudesLocativas.codigo == 4) {
            cargarOpciones(solicitante, solcitudesLocativas.codigo, solcitudesLocativas.descripcion);
          }
        }
      }
      //Locativas
      let locativas = JSON.parse(localStorage.getItem("locativas"));
      if (locativas && locativas.obtenerLocativas.length > 0) {
        putInitialOption(locativas.obtenerLocativas, tipo_solicitud.id, tipo_solicitud);
        for (const locativa of locativas.obtenerLocativas[0].categorias) {
          cargarOpciones(tipo_solicitud, locativa.codigo, locativa.descripcion);
        }
      }

    }
  });
  xhr.open("GET", urlParam);
  xhr.setRequestHeader("token", tokenSecuParam);
  xhr.send();
}


const changeProjects = (input) => {

  $('#torre').empty();
  $('#apartamento').empty();
  document.getElementById('inmueble').value = '';

  const proyectos = document.getElementById('proyecto');
  const inmueble = document.getElementById('inmueble');
  let empresaT = JSON.parse(localStorage.getItem("empresa"))
  _idbasedatos_ = empresaT.obtenerEmpresa[0].empresa.base
  _idempresa_ = empresaT.obtenerEmpresa[0].empresa.id

  const fluid2 = input.options[input.selectedIndex].getAttribute('data-macroproyectv2');

  let idMacroProject = input.options[input.selectedIndex].value
  urlProyectos = urlProyectos.replace("_paramidbasedatos_", _idbasedatos_)
  urlProyectos = urlProyectos.replace("_paramidempresa_", _idempresa_)
  putInitialOption([], inmueble.id, inmueble);
  document.getElementById("loader-container").style.display = "block";

  if (idMacroProject == 'colsubsidio') {
    GetData('https://www.colsubsidio.com/vivienda/proyectos/snco-vivienda-posventa/json/colsubsidio_projects.json', 'projects', proyectos, 'col');
  } else {

    let tipoDocReplace = document.getElementById('tipo_doc');
    let valueTipoDocRep = tipoDocReplace.value;

    // Carnet Diplomatica == NO TIENE
    // Cédula de ciudadanía == CC
    // Cédula de extranjería == CE
    // NIT == NIT
    // NUIP == NIUP
    // Pasaporte == PA
    // Permiso Especial De Permanencia == PE
    // permiso proteccion temporal == PT
    // Registro Civil == RC
    // RUT == NO TIENE
    // Tarjeta De Identidad == TI

    if (fluid2 != null) {

      document.getElementById("divOrderFields2").style.display = "block";

      $('#tipo_doc').empty();
      $('#tipo_doc').append(`
        <option value="">Elige tu tipo de documento</option>
        <option value="Carnet Diplomatica">Carné diplomático</option>
        <option value="Cédula de ciudadanía">Cédula de ciudadanía</option>
        <option value="Cédula de extranjería">Cédula de extranjería</option>
        <option value="NIT">Número Identificación Tributaria</option>
        <option value="NUIP">Número Único de Identificación Personal</option>
        <option value="Pasaporte">Pasaporte</option>
        <option value="Permiso Especial De Permanencia">Permiso Especial de Permanencia</option>
        <option value="permiso proteccion temporal">Permiso Protección Temporal</option>
        <option value="Registro Civil">Registro civil</option>
        <option value="RUT">RUT</option>
        <option value="Tarjeta De Identidad">Tarjeta de identidad</option>
      `);

      let selectedOptionValue = '';

      if (valueTipoDocRep == 'CC') {
        selectedOptionValue = 'Cédula de ciudadanía';
      } else if (valueTipoDocRep == 'CE') {
        selectedOptionValue = 'Cédula de extranjería';
      } else if (valueTipoDocRep == 'NIT') {
        selectedOptionValue = 'NIT';
      } else if (valueTipoDocRep == 'NIUP') {
        selectedOptionValue = 'NIUP';
      } else if (valueTipoDocRep == 'PA') {
        selectedOptionValue = 'Pasaporte';
      } else if (valueTipoDocRep == 'PE') {
        selectedOptionValue = 'Permiso Especial De Permanencia';
      } else if (valueTipoDocRep == 'PT') {
        selectedOptionValue = 'permiso proteccion temporal';
      } else if (valueTipoDocRep == 'RC') {
        selectedOptionValue = 'Registro Civil';
      } else if (valueTipoDocRep == 'TI') {
        selectedOptionValue = 'Tarjeta De Identidad';
      } else if (valueTipoDocRep == 'Cédula de ciudadanía') {
        selectedOptionValue = 'CC';
      } else if (valueTipoDocRep == 'Cédula de extranjería') {
        selectedOptionValue = 'CE';
      } else if (valueTipoDocRep == 'Pasaporte') {
        selectedOptionValue = 'PA';
      } else if (valueTipoDocRep == 'Permiso Especial De Permanencia') {
        selectedOptionValue = 'PE';
      } else if (valueTipoDocRep == 'permiso proteccion temporal') {
        selectedOptionValue = 'PT';
      } else if (valueTipoDocRep == 'Registro Civil') {
        selectedOptionValue = 'RC';
      } else if (valueTipoDocRep == 'Tarjeta De Identidad') {
        selectedOptionValue = 'TI';
      }

      setTimeout(function () {
        $('#tipo_doc').val(selectedOptionValue).trigger('change');
      }, 2000);


      document.getElementById("tipo_form_postventa").value = "1";
      document.getElementById("habeasCk").value = "Sí";

      let macro_proyectos_v2 = JSON.parse(localStorage.getItem("macro_proyectos_v2"));
      $.each(macro_proyectos_v2, function (i, val) {
        if (i == idMacroProject) {
          $('#proyecto').empty();
          $('#proyecto').append(`<option value="">Selecciona una opción</option>`);
          $.each(val.proyectos, function (ipr, valProyectos) {
            $('#proyecto').append(`<option data-macroproyectv2="true" value="` + ipr + `">` + valProyectos.name + `</option>`);
          });

          document.getElementById("loader-container").style.display = "none";
        }
      });

    } else {

      document.getElementById("divOrderFields2").style.display = "none";
      $('#tipo_doc').empty();

      //Docs
      let documents = JSON.parse(localStorage.getItem("documentos"));
      if (documents && documents.obtenerDocumentos.length > 0) {
        for (const document of documents.obtenerDocumentos) {
          cargarOpciones(tipoDocReplace, document.codigo, document.descripcion);
        }
      }

      document.getElementById("tipo_form_postventa").value = "0";
      document.getElementById("habeasCk").value = "1";

      let selectedOptionValue2 = '';

      if (valueTipoDocRep == 'Cédula de ciudadanía') {
        selectedOptionValue2 = 'CC';
      } else if (valueTipoDocRep == 'Cédula de extranjería') {
        selectedOptionValue2 = 'CE';
      } else if (valueTipoDocRep == 'NIT') {
        selectedOptionValue2 = 'NIT';
      } else if (valueTipoDocRep == 'NIUP') {
        selectedOptionValue2 = 'NIUP';
      } else if (valueTipoDocRep == 'Pasaporte') {
        selectedOptionValue2 = 'PA';
      } else if (valueTipoDocRep == 'Permiso Especial De Permanencia') {
        selectedOptionValue2 = 'PE';
      } else if (valueTipoDocRep == 'permiso proteccion temporal') {
        selectedOptionValue2 = 'PT';
      } else if (valueTipoDocRep == 'Registro Civil') {
        selectedOptionValue2 = 'RC';
      } else if (valueTipoDocRep == 'Tarjeta De Identidad') {
        selectedOptionValue2 = 'TI';
      } else if (valueTipoDocRep == 'CC') {
        selectedOptionValue2 = 'Cédula de ciudadanía';
      } else if (valueTipoDocRep == 'CE') {
        selectedOptionValue2 = 'Cédula de extranjería';
      } else if (valueTipoDocRep == 'PA') {
        selectedOptionValue2 = 'Pasaporte';
      } else if (valueTipoDocRep == 'PE') {
        selectedOptionValue2 = 'Permiso Especial De Permanencia';
      } else if (valueTipoDocRep == 'PT') {
        selectedOptionValue2 = 'permiso proteccion temporal';
      } else if (valueTipoDocRep == 'RC') {
        selectedOptionValue2 = 'Registro Civil';
      } else if (valueTipoDocRep == 'TI') {
        selectedOptionValue2 = 'Tarjeta De Identidad';
      }

      setTimeout(function () {
        $('#tipo_doc').val(selectedOptionValue2).trigger('change');
      }, 2000);

      GetData(`${urlProyectos}${idMacroProject}`, 'projects', proyectos);
    }

  }

}



/* INIT */

const setListSpaces = (idProjectSet) => {
  const espacio = document.getElementById('espacio');
  let empresaT = JSON.parse(localStorage.getItem("empresa"))
  _idbasedatos_ = empresaT.obtenerEmpresa[0].empresa.base
  _idempresa_ = empresaT.obtenerEmpresa[0].empresa.id

  let idProject = idProjectSet
  urlEspacios = urlEspacios.replace("_paramidbasedatos_", _idbasedatos_)
  urlEspacios = urlEspacios.replace("_paramidempresa_", _idempresa_)
  document.getElementById("loader-container").style.display = "block";
  GetData(`${urlEspacios}${idProject}`, 'spaces', espacio);
}

const changeOptionApatamentsV2 = (input) => {
  let valueApto = input.options[input.selectedIndex].value;
  document.getElementById('inmueble').value = valueApto;
}

const changeOptionApataments = (input) => {
  const datamacroprov2 = input.options[input.selectedIndex].getAttribute('data-macroproyectv2');
  if (datamacroprov2) {
    let macro_proyectos_v2 = JSON.parse(localStorage.getItem("macro_proyectos_v2"));
    const idMacroProjecto = document.getElementById('macroproyectos').value;
    const proyecto = document.getElementById('proyecto').value;
    let idTorre = input.options[input.selectedIndex].value;

    setValueInmuebleFlujoSinCinco();

    $.each(macro_proyectos_v2, function (i, val) {
      if (i == idMacroProjecto) {
        $.each(val.proyectos, function (ipr, valProyectos) {
          if (valProyectos.name == proyecto) {
            $.each(valProyectos.torres, function (itorr, valTorres) {
              if (itorr == idTorre) {
                $('#apartamento').empty();
                $('#apartamento').append(`<option value="">Selecciona una opción</option>`);

                $.each(valTorres.apartamentos, function (iapto, valApto) {
                  $.each(valApto, function (iaptoInt, valAptoInt) {
                    $('#apartamento').append(`<option data-macroproyectv2="true" value="` + valAptoInt + `">` + valAptoInt + `</option>`);
                  });
                });
              }
            });
          }
        });
      }
    });
  }
}

const setValueInmuebleFlujoSinCinco = () => {
  const macroproyectos = document.getElementById('macroproyectos').value;
  const torre = document.getElementById('torre').value;
  const apartamento = document.getElementById('apartamento').value;
  let stringValue = '';

  if (macroproyectos != '') {
    stringValue += macroproyectos;
  }
  if (torre != '') {
    stringValue += '_' + torre;
  }
  if (apartamento != '') {
    stringValue += '_' + apartamento;
  }

  document.getElementById('inmueble').value = stringValue;

}

const changeOptionValueInmueble = () => {
  setValueInmuebleFlujoSinCinco();
}

const changeOptionProjects = (input) => {

  const datamacroprov2 = input.options[input.selectedIndex].getAttribute('data-macroproyectv2');

  document.getElementById("loader-container").style.display = "block";

  console.log(datamacroprov2);

  if (datamacroprov2) {
    $('#divOrderFields2').empty();
    $('#divOrderFields2').append(`
      <div id="divapartment">
        <div class="form-group" id="apartment">
          <label for="apartamento">Apartamento (*)</label>
          <select required="" onchange="changeOptionValueInmueble(this)" id="apartamento" name="apartamento" class="form-control"></select>
          <div class="valid-feedback"></div>
          <div class="invalid-feedback aler_invalid2">El campo Apartamento es obligatorio</div>
        </div>
      </div>
    `);
    $('#divOrderFields1').empty();
    $('#divOrderFields1').append(`
      <div id="divbuilding">
        <div class="form-group" id="building">
          <label for="torre">Torre o interior (*)</label>
          <select required="" onchange="changeOptionApataments(this)" id="torre" name="torre" class="form-control"></select>
          <div class="valid-feedback"></div>
          <div class="invalid-feedback aler_invalid2">El campo Torre o interior es obligatorio</div>
        </div>
      </div>
    `);

    $('#space').empty();
    $('#space').append(`
      <label for="espacio">Espacio (*)</label>
      <input type="text" required="" maxlength="80" id="espacio" name="espacio" class="form-control"
        placeholder="Ej: Alcoba, cocina" />
      <div class="invalid-feedback">El campo espacio es obligatorio</div>
    `);

    setTimeout(function () {
      let macro_proyectos_v2 = JSON.parse(localStorage.getItem("macro_proyectos_v2"));
      const idMacroProjecto = document.getElementById('macroproyectos').value;
      const proyecto = document.getElementById('proyecto').value;
      setValueInmuebleFlujoSinCinco();
      $.each(macro_proyectos_v2, function (i, val) {
        if (i == idMacroProjecto) {
          $.each(val.proyectos, function (ipr, valProyectos) {
            if (valProyectos.name == proyecto) {
              $('#torre').empty();
              $('#torre').append(`<option value="">Selecciona una opción</option>`);
              $.each(valProyectos.torres, function (itorr, valTorres) {
                $('#torre').append(`<option data-macroproyectv2="true" value="` + itorr + `">` + itorr + `</option>`);
              });
            }
          });
        }
      });

      document.getElementById("loader-container").style.display = "none";

    }, 1000);

  } else {
    $('#divOrderFields2').empty();
    $('#divOrderFields2').append(`
      <div id="divbuilding">
        <div class="form-group" id="building">
          <label for="torre">Torre o interior (*)</label>
          <select onchange="changeOptionApataments(this)" id="torre" name="torre" class="form-control"></select>
          <div class="valid-feedback"></div>
          <div class="invalid-feedback aler_invalid2">El campo Torre o interior es obligatorio</div>
        </div>
      </div>
    `);
    $('#divOrderFields1').empty();
    $('#divOrderFields1').append(`
      <div id="divapartment">
        <div class="form-group" id="apartment">
          <label for="apartamento">Apartamento (*)</label>
          <select onchange="changeOptionApatamentsV2(this)" required="" id="apartamento" name="apartamento" class="form-control"></select>
          <div class="valid-feedback"></div>
          <div class="invalid-feedback aler_invalid2">El campo Apartamento es obligatorio</div>
        </div>
      </div>
    `);

    $('#space').empty();
    $('#space').append(`
      <label for="espacio">Espacio (*)</label>
      <select name="espacio" id="espacio" required="" class="form-control"></select>
      <div class="invalid-feedback">El campo espacio es obligatorio</div>
    `);

    setTimeout(function () {
      const apartamento = document.getElementById('apartamento');
      const macroproyectos = document.getElementById('macroproyectos');
      let empresaT = JSON.parse(localStorage.getItem("empresa"))
      _idbasedatos_ = empresaT.obtenerEmpresa[0].empresa.base
      _idempresa_ = empresaT.obtenerEmpresa[0].empresa.id
      let idMacroProject = macroproyectos.value
      let idProject = input.options[input.selectedIndex].value
      urlInmuebles = urlInmuebles.replace("_paramidbasedatos_", _idbasedatos_)
      urlInmuebles = urlInmuebles.replace("_paramidempresa_", _idempresa_)
      GetData(`${urlInmuebles}${idProject}&_idmacroproyecto_=${idMacroProject}`, 'property', apartamento);

      setListSpaces(idProject);

    }, 1000);
  }


}

// const getDataPoryectosV2 = () => {
//   fetch('assets/json/proyectos_v2.json').then(function (response) {
//     var contentType = response.headers.get("content-type");
//     if (contentType && contentType.indexOf("application/json") !== -1) {
//       return response.json().then(function (json) {
//         console.log(json);
//       });
//     } else {
//       console.log("Oops, we haven't got JSON!");
//     }
//   });
// }

const sortData = (key, data, order) => {
  const keys = key.split('.');
  const ascOrder = (a, b) => {
    let comparer_a, comparer_b;
    if (keys.length === 1) {
      comparer_a = a[keys[0]];
      comparer_b = b[keys[0]];
    }
    if (keys.length === 2) {
      comparer_a = a[keys[0]][keys[1]];
      comparer_b = b[keys[0]][keys[1]];
    }
    if (comparer_a < comparer_b) {
      return -1;
    }
    if (comparer_b < comparer_a) {
      return 1;
    }
    return 0;
  }
  const descOrder = (a, b) => {
    let comparer_a, comparer_b;
    if (keys.length === 1) {
      comparer_a = a[keys[0]];
      comparer_b = b[keys[0]];
    }
    if (keys.length === 2) {
      comparer_a = a[keys[0]][keys[1]];
      comparer_b = b[keys[0]][keys[1]];
    }
    if (comparer_a < comparer_b) {
      return 1;
    }
    if (comparer_b < comparer_a) {
      return -1;
    }
    return 0;
  }

  if (order === 'DESC') {
    return data.sort(descOrder);
  } else {
    return data.sort(ascOrder);;
  }
}

const GetDatav2 = (url) => {
  let myHeaders = new Headers();
  let tokenSecuParam = "asdfqw3rwe";
  myHeaders.append("token", tokenSecuParam);

  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch(url, requestOptions)
    .then(response => response.text())
    .then(result => {
      let res = result;
      localStorage.setItem("macro_proyectos_v2", res);
    })
    .catch(error => console.log('error', error));
}

/* END */

const getDataColsubsidio = () => {
  fetch('https://www.colsubsidio.com/vivienda/proyectos/snco-vivienda-posventa/json/colsubsidio_projects.json')
    .then(res => res.json)
    .then(datos => {
      putInitialOption(res.obtenerProyectos, idInput.id, idInput);
      for (const proyecto of res.obtenerProyectos) {
        cargarOpciones(idInput, proyecto.proyecto.id, proyecto.proyecto.nombre);
      }
      console.log(datos);
    })
}

const changeSpaces = (input) => {
  const espacio = document.getElementById('espacio');
  let empresaT = JSON.parse(localStorage.getItem("empresa"))
  _idbasedatos_ = empresaT.obtenerEmpresa[0].empresa.base
  _idempresa_ = empresaT.obtenerEmpresa[0].empresa.id

  let idProject = input.options[input.selectedIndex].value
  urlEspacios = urlEspacios.replace("_paramidbasedatos_", _idbasedatos_)
  urlEspacios = urlEspacios.replace("_paramidempresa_", _idempresa_)
  document.getElementById("loader-container").style.display = "block";
  GetData(`${urlEspacios}${idProject}`, 'spaces', espacio);
  changeProperty(input);
}

const changeProperty = (input) => {
  const inmueble = document.getElementById('inmueble');
  const macroproyectos = document.getElementById('macroproyectos');
  let empresaT = JSON.parse(localStorage.getItem("empresa"))
  _idbasedatos_ = empresaT.obtenerEmpresa[0].empresa.base
  _idempresa_ = empresaT.obtenerEmpresa[0].empresa.id
  let idMacroProject = macroproyectos.options[input.selectedIndex].value
  let idProject = input.options[input.selectedIndex].value
  urlInmuebles = urlInmuebles.replace("_paramidbasedatos_", _idbasedatos_)
  urlInmuebles = urlInmuebles.replace("_paramidempresa_", _idempresa_)
  document.getElementById("loader-container").style.display = "block";
  GetData(`${urlInmuebles}${idProject}&_idmacroproyecto_=${idMacroProject}`, 'property', inmueble);
}

const GetData = (url, dataType, idInput, indicator) => {
  let myHeaders = new Headers();
  let tokenSecuParam = "asdfqw3rwe";
  myHeaders.append("token", tokenSecuParam);

  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch(url, requestOptions)
    .then(response => response.text())
    .then(result => {
      let res = JSON.parse(result);
      if (dataType == 'projects') {
        document.getElementById("loader-container").style.display = "none";
        if (indicator == "col") {
          putInitialOption(res, idInput.id, idInput);
          for (const proyecto of res) {
            cargarOpciones(idInput, proyecto.project_id, proyecto.project_name);
          }
        } else {
          putInitialOption(res.obtenerProyectos, idInput.id, idInput);
          for (const proyecto of res.obtenerProyectos) {
            cargarOpciones(idInput, proyecto.proyecto.id, proyecto.proyecto.nombre);
          }
        }

      }
      if (dataType == 'spaces') {
        document.getElementById("loader-container").style.display = "none";
        putInitialOption(res.obtenerEspacios, idInput.id, idInput);
        for (const espacio of res.obtenerEspacios) {
          cargarOpciones(idInput, espacio.codigo, espacio.descripcion);
        }
      }
      if (dataType == 'property') {
        document.getElementById("loader-container").style.display = "none";
        putInitialOption(res.obtenerInmuebles, idInput.id, idInput);
        for (const inmueble of res.obtenerInmuebles) {
          cargarOpciones(idInput, inmueble.id, inmueble.descripcion);
        }
      }
    })
    .catch(error => console.log('error', error));
}

const sendData = (data) => {

  let myHeaders = new Headers();
  myHeaders.append("Token", "asdfqw3rwe");
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify(data);

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch(urlLocativos, requestOptions)
    .then(response => response.text())
    .then(result => {
      document.getElementById("loader-container").style.display = "none";

    let swalTitle

    let swalText

    let buttonText



    swalTitle = "¡Gracias por registrar tus datos!"

    swalText = "Nos pondremos en contacto contigo muy pronto."

    buttonText = "Aceptar"



    swal({

      title: swalTitle,

      text: swalText,

      icon: "https://www.colsubsidio.com/hubfs/img/colsubsidio/vivienda/ico-exito-postventa.svg",

      closeOnClickOutside: true,

      buttons: {

        save: {

          text: buttonText,

          value: true,

        }

      },

    })
    })
    .catch(error => console.log('error', error));
}

const sendDataHubspot = (formData) => {
  document.getElementById("loader-container").style.display = "block";
  let utm_source = sessionStorage.getItem("utm_source");
  if (utm_source == null || utm_source == undefined || utm_source == 'undefined') {
    utm_source = '';
  }
  let utm_medium = sessionStorage.getItem("utm_medium");
  if (utm_medium == null || utm_medium == undefined || utm_medium == 'undefined') {
    utm_medium = '';
  }
  let utm_campaign = sessionStorage.getItem("utm_campaign");
  if (utm_campaign == null || utm_campaign == undefined || utm_campaign == 'undefined') {
    utm_campaign = '';
  }
  let utm_term = sessionStorage.getItem("utm_term");
  if (utm_term == null || utm_term == undefined || utm_term == 'undefined') {
    utm_term = '';
  }
  let utm_content = sessionStorage.getItem("utm_content");
  if (utm_content == null || utm_content == undefined || utm_content == 'undefined') {
    utm_content = '';
  }
  let utm_id = sessionStorage.getItem("utm_id");
  if (utm_id == null || utm_id == undefined || utm_id == 'undefined') {
    utm_id = '';
  }

  //Datos para analitica, no es necesario modificar
  let cookie = document.cookie.replace(/(?:(?:^|.*;\s*)hubspotutk\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  let hutk = cookie != '' ? `"hutk":"${cookie}",` : "";
  let page_url = window.location.href;
  page_url = page_url.replaceAll('|', '_');
  page_url = page_url.replaceAll('{{', '');
  page_url = page_url.replaceAll('}}', '');

  let page_title = document.title;

  //Id del formulario donde se van a registrar los datos
  var form_id = '3f504dcd-030b-4ad7-8770-ee89ec1d2037';
  var url = 'https://api.hsforms.com/submissions/v3/integration/submit/7212050/' + form_id;

  const queryJson = `{
      "submittedAt": "${Date.now()}",
      "fields":[
        {
          "objectTypeId": "0-1",
              "name": "firstname",
              "value": "${formData.name}"
            },
            {
          "objectTypeId": "0-1",
              "name": "segundo_nombre",
              "value": "${formData.segundo_nombre}"
            },
            {
          "objectTypeId": "0-1",
              "name": "lastname",
              "value": "${formData.firstLastName}"
            },
            {
          "objectTypeId": "0-1",
              "name": "segundo_apellido",
              "value": "${formData.segundo_apellido}"
            },            
            {
          "objectTypeId": "0-1",
              "name": "tipo_de_documento_de_identidad",
              "value": "${formData.typeIdText}"
            },
            {
          "objectTypeId": "0-1",
              "name": "numero_de_documento_de_identidad",
              "value": "${formData.numId}"
            },
            {
          "objectTypeId": "0-1",
              "name": "email",
              "value": "${formData.email}"
            },
            {
          "objectTypeId": "0-1",
              "name": "mobilephone",
              "value": "${formData.cellphone}"
            },
            {
          "objectTypeId": "0-1",
              "name": "phone",
              "value": "${formData.telephone}"
            },
            {
          "objectTypeId": "0-1",
              "name": "macroproyecto",
              "value": "${formData.macroprojectText}"
            },
            {
          "objectTypeId": "0-1",
              "name": "proyecto_vivienda",
              "value": "${formData.projectText}"
            },
            {
          "objectTypeId": "0-1",
              "name": "inmueble",
              "value": "${formData.propertyText}"
            },
            {
          "objectTypeId": "0-1",
              "name": "direccion_del_inmueble",
              "value": "${formData.address}"
            },
            {
          "objectTypeId": "0-1",
              "name": "apartamento",
              "value": "${formData.apartment}"
            },
            {
          "objectTypeId": "0-1",
              "name": "torre___interior",
              "value": "${formData.tower}"
            },
            {
          "objectTypeId": "0-1",
              "name": "tipo_de_solicitud_postventa",
              "value": "${formData.requestTypeText}"
            },
            {
          "objectTypeId": "0-1",
              "name": "tipo_de_solicitante",
              "value": "${formData.applicantTypeText}"
            },
            {
          "objectTypeId": "0-1",
              "name": "espacio",
              "value": "${formData.spaceText}"
            },
            {
          "objectTypeId": "0-1",
              "name": "cuadro_de_texto",
              "value": "${formData.requestDescription}"
            },
            {
          "objectTypeId": "0-1",
              "name": "utm_source",
              "value": "${utm_source}"
            },
            {
          "objectTypeId": "0-1",
              "name": "utm_medium",
              "value": "${utm_medium}"
            },
            {
          "objectTypeId": "0-1",
              "name": "utm_campaign",
              "value": "${utm_campaign}"
            },
            {
          "objectTypeId": "0-1",
              "name": "utm_id",
              "value": "${utm_id}"
            },
            {
          "objectTypeId": "0-1",
              "name": "utm_term",
              "value": "${utm_term}"
            },
            {
          "objectTypeId": "0-1",
              "name": "utm_content",
              "value": "${utm_content}"
            },                                     
            {
          "objectTypeId": "0-1",
              "name": "unidad_de_servicio_formulario",
              "value": "Vivienda"
            },
            {
          "objectTypeId": "0-1",
              "name": "linea_de_negocio",
              "value": "Comercial"
            },
            {
          "objectTypeId": "0-1",
              "name": "segmento_del_cliente",
              "value": "Individual"
            },
            {
          "objectTypeId": "0-1",
              "name": "subsegmento_del_cliente",
              "value": "Afiliado Vigente"
            },
            {
          "objectTypeId": "0-1",
              "name": "nombre_del_formulario",
              "value": "Vivienda Servicio Post Venta (Individual - Afiliado Vigente)"
            },
            {
          "objectTypeId": "0-1",
              "name": "rgpd",
              "value": "${formData.habeas}"
            }   
      ],
      "context": {
        ${hutk}
        "pageUri": "${page_url}",
        "pageName": "${page_title}"
      },
      "legalConsentOptions":{
        "consent":{
          "consentToProcess":${true},
          "text":"I agree to allow Example Company to store and process my personal data.",
          "communications":[
            {
              "value":true,
              "subscriptionTypeId":8580651,
              "text":"I agree to receive other communications from Colsubsidio."
            }
          ]
        }
      }
    }`;
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    keepalive: true,
    body: queryJson
  }).then(function (data) {
    return data.json();
  }).then(function (res) {
    document.getElementById("loader-container").style.display = "none";
    let swalTitle
    let swalText
    let buttonText

    swalTitle = "¡Gracias por registrar tus datos!"
    swalText = "Nos pondremos en contacto contigo muy pronto."
    buttonText = "Aceptar"

    swal({
      title: swalTitle,
      text: swalText,
      icon: "https://www.colsubsidio.com/hubfs/img/colsubsidio/vivienda/ico-exito-postventa.svg",
      closeOnClickOutside: true,
      buttons: {
        save: {
          text: buttonText,
          value: true,
        }
      },
    })
  });
}

function soloNumeros(e) {
  let num = e.value;
  number = "";

  num = num.replace('11111', '1');
  num = num.replace('22222', '2');
  num = num.replace('33333', '3');
  num = num.replace('44444', '4');
  num = num.replace('55555', '5');
  num = num.replace('66666', '6');
  num = num.replace('77777', '7');
  num = num.replace('88888', '8');
  num = num.replace('99999', '9');
  num = num.replace('00000', '0');

  num = num.replace(/[^0-9]/g, '')
  if (num != "" && num != null) {
    number = Number(num) + "";
  }
  e.value = number
}


function soloLetras(e) {
  let textoV = ""
  textoV = e.value

  textoV = textoV.replace('AAA', 'AA');
  textoV = textoV.replace('BBB', 'BB');
  textoV = textoV.replace('CCC', 'CC');
  textoV = textoV.replace('DDD', 'DD');
  textoV = textoV.replace('EEE', 'EE');
  textoV = textoV.replace('FFF', 'FF');
  textoV = textoV.replace('GGG', 'GG');
  textoV = textoV.replace('HHH', 'HH');
  textoV = textoV.replace('III', 'II');
  textoV = textoV.replace('JJJ', 'JJ');
  textoV = textoV.replace('KKK', 'KK');
  textoV = textoV.replace('LLL', 'LL');
  textoV = textoV.replace('MMM', 'MM');
  textoV = textoV.replace('NNN', 'NN');
  textoV = textoV.replace('ÑÑÑ', 'ÑÑ');
  textoV = textoV.replace('OOO', 'OO');
  textoV = textoV.replace('PPP', 'PP');
  textoV = textoV.replace('QQQ', 'QQ');
  textoV = textoV.replace('RRR', 'RR');
  textoV = textoV.replace('SSS', 'SS');
  textoV = textoV.replace('TTT', 'TT');
  textoV = textoV.replace('UUU', 'UU');
  textoV = textoV.replace('VVV', 'VV');
  textoV = textoV.replace('WWW', 'WW');
  textoV = textoV.replace('XXX', 'XX');
  textoV = textoV.replace('YYY', 'YY');
  textoV = textoV.replace('ZZZ', 'ZZ');
  textoV = textoV.replace('aaa', 'aa');
  textoV = textoV.replace('bbb', 'bb');
  textoV = textoV.replace('ccc', 'cc');
  textoV = textoV.replace('ddd', 'dd');
  textoV = textoV.replace('eee', 'ee');
  textoV = textoV.replace('fff', 'ff');
  textoV = textoV.replace('ggg', 'gg');
  textoV = textoV.replace('hhh', 'hh');
  textoV = textoV.replace('iii', 'ii');
  textoV = textoV.replace('jjj', 'jj');
  textoV = textoV.replace('kkk', 'kk');
  textoV = textoV.replace('lll', 'll');
  textoV = textoV.replace('mmm', 'mm');
  textoV = textoV.replace('nnn', 'nn');
  textoV = textoV.replace('ñññ', 'ññ');
  textoV = textoV.replace('ooo', 'oo');
  textoV = textoV.replace('ppp', 'pp');
  textoV = textoV.replace('qqq', 'qq');
  textoV = textoV.replace('rrr', 'rr');
  textoV = textoV.replace('sss', 'ss');
  textoV = textoV.replace('ttt', 'tt');
  textoV = textoV.replace('uuu', 'uu');
  textoV = textoV.replace('vvv', 'vv');
  textoV = textoV.replace('www', 'ww');
  textoV = textoV.replace('xxx', 'xx');
  textoV = textoV.replace('yyy', 'yy');
  textoV = textoV.replace('zzz', 'zz');
  textoV = textoV.replace('PRUEBA', '');
  textoV = textoV.replace('prueba', '');
  textoV = textoV.replace('test', '');
  textoV = textoV.replace('TEST', '');
  textoV = textoV.replace('  ', ' ');
  textoV = textoV.replace(/[^ A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙÑñ]/g, '');
  e.value = textoV;
}

function validLetras(a, lengthMin, selectoMsg) {
  let valor = a.value;
  let idSelector = a.id;
  let cond_mail = false;
  let mail = '';
  campo = document.getElementById(idSelector);
  if (valor.length > 3 && valor.length <= 50) {
    mail = "true";
    campo.classList.remove("invalid");
    campo.className += " valid";
    document.querySelector("." + selectoMsg).style.display = "none";
    $('#send-button').removeClass('disabled');
    cond_mail = true;
  } else if (valor.length >= 1 && valor.length < 3) {
    mail = "true";
    campo.classList.remove("valid");
    campo.className += " invalid";
    document.querySelector("." + selectoMsg).style.display = "block";
    $('#send-button').addClass('disabled');
  } else {
    mail = "true";
    campo.classList.remove("invalid");
    campo.className += " valid";
    document.querySelector("." + selectoMsg).style.display = "none";
    $('#send-button').removeClass('disabled');
    cond_mail = true;
  }
}

function validatePhoneNumber(e, msg) {

  let num = e.value;
  number = "";

  num = num.replace('11111', '1');
  num = num.replace('22222', '2');
  num = num.replace('33333', '3');
  num = num.replace('44444', '4');
  num = num.replace('55555', '5');
  num = num.replace('66666', '6');
  num = num.replace('77777', '7');
  num = num.replace('88888', '8');
  num = num.replace('99999', '9');
  num = num.replace('00000', '0');

  num = num.replace(/[^0-9]/g, '')
  if (num != "" && num != null) {
    number = Number(num) + "";
  }
  // e.value = number

  let valor = number;
  let idSelector = e.id;
  campo = document.getElementById(idSelector);
  if (valor !== '') {
    let char1 = valor.charAt(0);
    let char2 = valor.charAt(1);
    let firstChars = `${char1}${char2}`;
    console.log(firstChars);
    if (firstChars !== '60') {
      campo.classList.add("invalid-input");
      $(msg).show();
      $('#send-button').addClass('disabled');
    } else {
      campo.classList.remove("invalid-input");
      campo.classList.add("valid-input");
      $(msg).hide();
      $('#send-button').removeClass('disabled');
    }
  } else {
    campo.classList.remove("invalid-input");
    campo.classList.add("valid-input");
    $(msg).hide();
    $('#send-button').removeClass('disabled');
  }

}