//Divs
const firstNameDiv = document.getElementById('firstName');
const secondNameDiv = document.getElementById('secondName');
const firstLastNameDiv = document.getElementById('firstLastName');
const secondLastNameDiv = document.getElementById('secondLastName');
const documentTypeDiv = document.getElementById('documentType');
const idNumberDiv = document.getElementById('idNumber');
const mobileNumberDiv = document.getElementById('mobileNumber');
const phoneNumberDiv = document.getElementById('phoneNumber');
const emailDiv = document.getElementById('email');
const checkDataDiv = document.getElementById('checkData');
const addressDiv = document.getElementById('address');
const macroProjectDiv = document.getElementById('macroProject');
const projectDiv = document.getElementById('project');
const propertiesDiv = document.getElementById('properties');
const applicantTypeDiv = document.getElementById('applicantType');
const apartmentDiv = document.getElementById('apartment');
const buildingDiv = document.getElementById('building');
const spaceDiv = document.getElementById('space');
const requestTypeDiv = document.getElementById('requestType');
const requestDescriptionDiv = document.getElementById('requestDescription');
const habeasDataCheckDiv = document.getElementById('habeasData');

//Inputs
const firstName = document.getElementById('1nombre');
const secondName = document.getElementById('2nombre');
const firstLastName = document.getElementById('apellido1');
const secondLastname = document.getElementById('apellido2');
const tipo_doc = document.getElementById('tipo_doc');
const num_docu = document.getElementById('num_docu');
const celular_per = document.getElementById('celular_per');
const tel_per = document.getElementById('tel_per');
const email_per = document.getElementById('email_per');
const habeas = document.getElementById('habeas');
const inmueble = document.getElementById('inmueble');
const macroproyectosId = document.getElementById('macroproyectos');
const proyecto = document.getElementById('proyecto');
const inmuebles = document.getElementById('inmuebles');
const solicitante = document.getElementById('solicitante');
const apartamento = document.getElementById('apartamento');
const torre = document.getElementById('torre');
const espacio = document.getElementById('espacio');
const solicitud_desc = document.getElementById('solicitud-desc');

const submitBtn = document.getElementById('send-button');

//Validaciones 

const validateFirstName = (firstName, err) => {
  removeChild(firstNameDiv, 'requiredName');
  removeChild(firstNameDiv, 'invalidName');
  if (firstName.value === "") {
    if (err) {
      err.push('requiredName');
    }
    createErrorMessage('Campo requerido', firstNameDiv, 'requiredName');
    //firstName.focus();
  }

  if (!cadenaValida(firstName.value)) {
    if (err) {
      err.push('invalidName');
    }
    createErrorMessage('No digites ningún caracter especial o tildes', firstNameDiv, 'invalidName');
  }
}

const validateSecondName = (secondName, err) => {
  removeChild(secondNameDiv, 'invalidSecondName');
  if (!cadenaValida(secondName.value)) {
    if (err) {
      err.push('invalidSecondName');
    }
    createErrorMessage('No digites ningún caracter especial o tildes', secondNameDiv, 'invalidSecondName');
  }
}

const validateFirstLastName = (firstLastName, err) => {
  removeChild(firstLastNameDiv, 'requiredLastName');
  removeChild(firstLastNameDiv, 'invalidLastName');
  if (firstLastName.value === "") {
    if (err) {
      err.push('requiredLastName');
    }
    createErrorMessage('Campo requerido', firstLastNameDiv, 'requiredLastName');
  }

  if (!cadenaValida(firstLastName.value)) {
    if (err) {
      err.push('invalidLastName');
    }
    createErrorMessage('No digites ningún caracter especial o tildes', firstNameDiv, 'invalidLastName');
  }
}

const validateSecondLastName = (secondLastname, err) => {
  removeChild(secondLastNameDiv, 'invalidSecondLastName');
  if (!cadenaValida(secondLastname.value)) {
    if (err) {
      err.push('invalidSecondLastName');
    }
    createErrorMessage('No digites ningún caracter especial o tildes', secondLastNameDiv, 'invalidSecondLastName');
  }
}
const validateEmail = (email, err) => {
  removeChild(emailDiv, 'requiredEmail');
  removeChild(emailDiv, 'invalidEmail');

  if (email.value === "") {
    if (err) {
      err.push('requiredEmail');
    }
    createErrorMessage('Campo requerido', emailDiv, 'requiredEmail');
  } else {
    if (!emailValido(email.value)) {
      if (err) {
        err.push('invalidEmail');
      }
      createErrorMessage('Por favor, escribe un correo electrónico válido', emailDiv, 'invalidEmail');
    }
  }
}

const validateTpDoc = (TpDoc, numDoc, err) => {
  let numDocLength = numDoc.value.length - 1;
  switch (TpDoc) {
    case 'CD':
      //Carné diplomático
      removeChild(idNumberDiv, 'invalidLengthCD');
      if (numDoc.value.length > 15) {
        err.push('invalidLengthCD');
        createErrorMessage('Debe tener máximo 11 caracteres', idNumberDiv, 'invalidLengthCD');
      }
      validaSeries(numDoc.value, numDocLength, err, idNumberDiv, 'No se permite un mismo número repetido varias veces', 'repeatedString');
      break
    case 'CC':
      //Cédula
      removeChild(idNumberDiv, 'invalidCedula');
      removeChild(idNumberDiv, 'invalidLengthCedula');
      if (!numeroValido(numDoc.value)) {
        err.push('invalidCedula');
        createErrorMessage('Debe ser un número', idNumberDiv, 'invalidCedula');
      }
      if (numDoc.value.length < 3 || numDoc.value.length > 11) {
        err.push('invalidLengthCedula');
        createErrorMessage('Debe tener mínimo 3 números y máximo 11', idNumberDiv, 'invalidLengthCedula');
      }
      let numDocString = numDoc.value.toString();
      validaSeries(numDocString, numDocLength, err, idNumberDiv, 'No se permite un mismo número repetido varias veces', 'repeatedString');
      break
    case 'CE':
      //Cédula Extranjeria
      removeChild(idNumberDiv, 'invalidCedulaEx');
      removeChild(idNumberDiv, 'invalidLengthCedulaEx');
      if (!numeroValido(numDoc.value)) {
        err.push('invalidCedulaEx');
        createErrorMessage('Debe ser un número', idNumberDiv, 'invalidCedulaEx');
      }
      if (numDoc.value.length !== 7) {
        err.push('invalidLengthCedulaEx');
        createErrorMessage('Debe ser igual a 7 números', idNumberDiv, 'invalidLengthCedulaEx');
      }
      let numCeString = numDoc.value.toString();
      validaSeries(numCeString, numDocLength, err, idNumberDiv, 'No se permite un mismo número repetido varias veces', 'repeatedString');
      break
    case 'NIT':
      //Número de identificación tributaria
      removeChild(idNumberDiv, 'invalidNit');
      removeChild(idNumberDiv, 'invalidLengthNit');
      if (!numeroValido(numDoc.value)) {
        err.push('invalidNit');
        createErrorMessage('Debe ser un número', idNumberDiv, 'invalidNit');
      }
      if (numDoc.value.length !== 10) {
        err.push('invalidLengthNit');
        createErrorMessage('Debe ser tener 10 números', idNumberDiv, 'invalidLengthNit');
      }
      let numNitString = numDoc.value.toString();
      validaSeries(numNitString, numDocLength, err, idNumberDiv, 'No se permite un mismo número repetido varias veces', 'repeatedString');
      break
    case 'NUIP':
      //Número de único de identificación personal
      removeChild(idNumberDiv, 'invalidNuip');
      removeChild(idNumberDiv, 'invalidLengthNuip');
      if (!numeroValido(numDoc.value)) {
        err.push('invalidNuip');
        createErrorMessage('Debe ser un número', idNumberDiv, 'invalidNuip');
      }
      if (numDoc.value.length !== 10) {
        err.push('invalidLengthNuip');
        createErrorMessage('Debe ser tener 10 números', idNumberDiv, 'invalidLengthNuip');
      }
      let numNuipString = numDoc.value.toString();
      validaSeries(numNuipString, numDocLength, err, idNumberDiv, 'No se permite un mismo número repetido varias veces', 'repeatedString');
      break
    case 'PA':
      //Pasaporte
      removeChild(idNumberDiv, 'invalidLengthPs');
      if (numDoc.value.length < 3 || numDoc.value.length > 17) {
        err.push('invalidLengthPs');
        createErrorMessage('Debe tener mínimo 3 caracteres y máximo 17', idNumberDiv, 'invalidLengthPs');
      }
      validaSeries(numDoc.value, numDocLength, err, idNumberDiv, 'No se permite un mismo número repetido varias veces', 'repeatedString');
      break
    case 'PEP':
      //Permiso especial de permanencia
      removeChild(idNumberDiv, 'invalidPep');
      removeChild(idNumberDiv, 'invalidLengthPep');
      if (!numeroValido(numDoc.value)) {
        err.push('invalidPep');
        createErrorMessage('Debe ser un número', idNumberDiv, 'invalidPep');
      }
      if (numDoc.value.length < 14 || numDoc.value.length > 15) {
        err.push('invalidLengthPep');
        createErrorMessage('Debe ser tener mínimo 14 números, máximo 15', idNumberDiv, 'invalidLengthPep');
      }
      let numPepString = numDoc.value.toString();
      validaSeries(numPepString, numDocLength, err, idNumberDiv, 'No se permite un mismo número repetido varias veces', 'repeatedString');
      break
    case 'PPT':
      //Permiso protección temporal
      removeChild(idNumberDiv, 'invalidPep');
      removeChild(idNumberDiv, 'invalidLengthPep');
      if (!numeroValido(numDoc.value)) {
        err.push('invalidPep');
        createErrorMessage('Debe ser un número', idNumberDiv, 'invalidPep');
      }
      if (numDoc.value.length < 7 || numDoc.value.length > 15) {
        err.push('invalidLengthPep');
        createErrorMessage('Debe ser tener mínimo 7 números, máximo 15', idNumberDiv, 'invalidLengthPep');
      }
      let numPptString = numDoc.value.toString();
      validaSeries(numPptString, numDocLength, err, idNumberDiv, 'No se permite un mismo número repetido varias veces', 'repeatedString');
      break
    case 'RC':
      //Registro civil
      removeChild(idNumberDiv, 'invalidLengthRc');
      if (numDoc.value.length < 10 || numDoc.value.length > 11) {
        err.push('invalidLengthRc');
        createErrorMessage('Debe tener mínimo 3 caracteres y máximo 17', idNumberDiv, 'invalidLengthRc');
      }
      validaSeries(numDoc.value, numDocLength, err, idNumberDiv, 'No se permite un mismo número repetido varias veces', 'repeatedString');
      break
    case 'RUT':

      break
    case 'TI':
      //Tarjet de identidad
      removeChild(idNumberDiv, 'invalidTi');
      removeChild(idNumberDiv, 'invalidLengthTi');
      if (!numeroValido(numDoc.value)) {
        err.push('invalidTi');
        createErrorMessage('Debe ser un número', idNumberDiv, 'invalidTi');
      }
      if (numDoc.value.length < 10 || numDoc.value.length > 11) {
        err.push('invalidLengthTi');
        createErrorMessage('Debe ser tener mínimo 10 números, máximo 11', idNumberDiv, 'invalidLengthTi');
      }
      let numTiString = numDoc.value.toString();
      validaSeries(numTiString, numDocLength, err, idNumberDiv, 'No se permite un mismo número repetido varias veces', 'repeatedString');
      break
  }
}

const validateMobile = (cellphone, err) => {
  removeChild(mobileNumberDiv, 'mobileNotNumber');
  removeChild(mobileNumberDiv, 'incompleteNumber');
  removeChild(mobileNumberDiv, 'requiredMobile');
  if (cellphone.value !== '') {
    if (!numeroValido(cellphone.value)) {
      err.push('mobileNotNumber');
      createErrorMessage('Debe ser un número', mobileNumberDiv, 'mobileNotNumber');
    }

    let char1 = cellphone.value.charAt(0);
    let char2 = cellphone.value.charAt(1);
    let firstChars = `${char1}${char2}`
    if (firstChars !== 60) {
      err.push('incompleteNumber');
      createErrorMessage('Debe iniciar con el 60', mobileNumberDiv, 'incompleteNumber');
    }

    if (cellphone.value !== 10) {
      err.push('invalidMobileLength');
      createErrorMessage('Debe tener una longitud de 10 números', mobileNumberDiv, 'invalidMobileLength');
    }
  } else {
    if (err) {
      err.push('requiredMobile');
    }
    createErrorMessage('Campo requerido', mobileNumberDiv, 'requiredMobile');
  }
}

//Validacion submit
const validate = (e) => {
  const err = [];
  //Nombres
  validateFirstName(firstName, err);
  validateSecondName(secondName, err);

  //Apellidos
  validateFirstLastName(firstLastName, err);
  validateSecondLastName(secondLastname, err);

  //Email
  validateEmail(email_per, err);
  validateTpDoc(tipo_doc.value, num_docu, err);
  validateMobile(celular_per, err);

  if (err.length > 1) {
    e.preventDefault();
  }

  console.log(err);
}

//Validación en tiempo real

firstName.addEventListener('blur', (event) => {
  console.log('AQUI')
  validateFirstName(event.target);
});

secondName.addEventListener('blur', (event) => {
  validateSecondName(event.target);
});

firstLastName.addEventListener('blur', (event) => {
  validateFirstLastName(event.target);
});

secondLastname.addEventListener('blur', (event) => {
  validateSecondLastName(event.target);
});

secondLastname.addEventListener('blur', (event) => {
  validateSecondLastName(event.target);
});

celular_per.addEventListener('keyup', (event) => {
  let value = event.target.value;
  let num = value.replace(/[^0-9]/g, '');
  event.target.value = Number(num);
})

submitBtn.addEventListener('click', validate);

//Funciones generales

const emailValido = (email) => {
  return /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(email);
}

const cadenaValida = (cadena) => {
  return /^[a-zA-Z ]*$/.test(cadena);
}

const numeroValido = (number) => {
  return /^[0-9]+$/.test(number);
}

//Validar si un número se repite muchas veces
const validaSeries = (cadena, nrepeticion, err, div, msg, id) => {
  removeChild(div, id);
  let character = cadena.charAt(1);
  let newStr = cadena.slice(1)
  let repeticion = [];
  for (let i = 0; i < nrepeticion; i++) {
    repeticion.push(character);
  }
  let cadenaRepetida = repeticion.join('');
  if (newStr == cadenaRepetida) {
    err.push(id);
    createErrorMessage(msg, div, id);
  }
}

const createErrorMessage = (text, div, id) => {
  let span = document.createElement("span");
  span.setAttribute('id', id);
  span.innerText = '';
  span.innerText = text;
  span.className = 'text-danger';
  span.style = 'width:70%';
  div.appendChild(span);
}

const removeChild = (div, id) => {
  for (let i = 0; i < div.children.length; i++) {
    if (div.children[i].id == id) {
      div.removeChild(div.lastChild)
    }
  }
}