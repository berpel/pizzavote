function goto(target) {
  $this = $('[name='+target+']');
  $this.show();
  $('html,body').animate({
    scrollTop: $this.offset().top
  }, 1000);
}

$(function(){
  $('[data-target=share]').on('click', function() {
    $this = $(this);
    $.get('/generate', function(key) {
      $('#display-key').val('http://pza.io/'+key);
      //console.log($(this).data('target'));
      goto($this.data('target'));
    });
  });

  $('[data-target=vote]').on('click', function() {
    $this = $(this);
    goto($this.data('target'));
  });

  $('[data-target=results]').on('click', function() {
    $this = $(this);
    goto($this.data('target'));
  });
  
});