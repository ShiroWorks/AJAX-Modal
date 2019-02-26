$(document).ready(function() {
  $.fn.modal = function(opt) {
    let settings, createModal, closeModal, body;
    settings = $.extend(
      {
        modal: 'jquery-modal',
        close: 'jquery-modal-close',
        closeText: '',
        shade: 'jquery-modal-shade'
      },
      opt
    );
    body = $('body');
    closeModal = function(modal, shade) {
      modal.remove();
      shade.remove();
    };

    createModal = function(data) {
      let shade, close, modal;
      shade = $('<div />', {
        class: settings.shade
      }).on('click', function() {
        closeModal(modal, shade);
      });

      close = $('<a />', {
        text: settings.closeText,
        class: settings.close,
        href: '#'
      }).on('click', function(e) {
        closeModal(modal, shade);
        e.preventDefault();
      });
      modal = $('<div />', {
        html: data,
        class: settings.modal
      }).append(close);

      body.prepend(shade, modal);
    };
    this.on('click', function(e) {
      let self = $(this);

      $.ajax({
        url: self.data('content'),
        type: 'get',
        cache: false
      }).done(function(data) {
        createModal(data);
      });
      e.preventDefault();
      // .error(function () {
      //   createModal('There was an error');
      // });
    });
  };
});
