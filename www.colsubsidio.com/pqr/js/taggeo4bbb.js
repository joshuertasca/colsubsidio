$(document).ready(function () {

  $(document).on('click', '.tag_ga_event_pqrsprinc', function (e) {
    e.stopImmediatePropagation();

    var event = 'ga_event_pqrsprinc';
    var category = 'PQRS';
    var action = $(this).parents('.box-pqr_one').find('h2').text();
    var label = $(this).text();
    var Seccion = 'Solicitudes, felicitaciones, reclamos y sugerencias';

    tag(event, category, action, label, Seccion);

  });

});

function tag(event_tag, category_tag, action_tag, label_tag, Seccion_tag) {
  dataLayer.push({
    'event': event_tag,
    'category': category_tag,
    'action': action_tag,
    'label': label_tag,
    'Seccion': Seccion_tag
  });
}

function tagFormulario(event_tag, category_tag, action_tag, label_tag, Seccion_tag, numero_documento_tag) {
  dataLayer.push({
    'event': event_tag,
    'category': category_tag,
    'action': action_tag,
    'label': label_tag,
    'Seccion': Seccion_tag,
    'identificacion': numero_documento_tag
  });
}