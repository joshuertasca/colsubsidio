$(document).on('click', '.tag_ga_event_contacto', function (e) {
  e.stopImmediatePropagation();

  var labelText = $(this).parents('.item').find('h3').text();

  var event = 'ga_event_contacto';
  var category = 'Seccion Necesitas Ayuda';
  var action = 'Clic-link';
  var label = labelText;
  var UES = 'Vivienda';

  tag(event, category, action, label, UES);

});


$(document).on('click', '.tag_ga_event_redes', function (e) {
  e.stopImmediatePropagation();

  var labelText = $(this).find('span').text();

  var event = 'ga_event_redes';
  var category = 'Footer';
  var action = 'Clic-Redes';
  var label = labelText;
  var UES = 'Vivienda';

  tag(event, category, action, label, UES);

});


$(document).on('click', '.tag_ga_event_servicios', function (e) {
  e.stopImmediatePropagation();

  var labelText = $(this).find('h2').text();

  var event = 'ga_event_servicios';
  var category = 'Home';
  var action = 'Cards Servicios';
  var label = labelText;
  var UES = 'Vivienda';
  var evento = 'Feria Virtual de Vivienda';

  tag2(event, category, action, label, UES, evento);

});

$(document).on('click', '.tag_ga_event_bannerviv', function (e) {
  e.stopImmediatePropagation();

  var labelText = $(this).find('h2').text();

  var event = 'ga_event';
  var category = 'Home';
  var action = 'Clic-Slider';
  var label = labelText;
  var UES = 'Vivienda';


  tag2(event, category, action, label, UES);

});

$(document).on('click', '.tag_ga_event_videollam', function (e) {
  e.stopImmediatePropagation();

  var labelText = $('.title-sect').text();

  var event = 'ga_event_videollam';
  var category = 'Proyecto';
  var action = 'Clic-VideoLlamada';
  var label = labelText;
  var UES = 'Vivienda';

  tag(event, category, action, label, UES);

});


function tag(event, category, action, label, UES) {
  dataLayer.push({
    'event': event,
    'category': category,
    'action': action,
    'label': label,
    'UES': UES
  });
}

function tag2(event, category, action, label, UES, evento) {
  dataLayer.push({
    'event': event,
    'category': category,
    'action': action,
    'label': label,
    'UES': UES,
    'evento': evento
  });
}