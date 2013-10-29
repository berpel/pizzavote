function showsection(target) {
  $this = $('[name='+target+']');
  $this.removeClass('hidden');
  $('html,body').animate({
    scrollTop: $this.offset().top
  }, 500);
}

$(function(){
  $('[data-target=share]').on('click', function() {
    $this = $(this);
    $.get('/generate', function(key) {
      $('#display-key').val('http://pza.io/'+key);
      $('#urlId').val(key);
      showsection($this.data('target'));
    });
  });

  $('[data-target=vote]').on('click', function() {
    $this = $(this);
    showsection($this.data('target'));
  });

  $('[data-target=post-results]').on('click', function(e) {
	  var mydata = $('#frm-vote').serialize();
	  console.log(mydata);
	  $this = $(this);
	  $.ajax({ 
          url: '/',
          type: 'POST',
          cache: false, 
          data: mydata,
          success: function(data){
            // alert('Success!');
          }, 
          error: function(jqXHR, textStatus, err){
              alert('text status '+textStatus+', err '+err);
          }
       });
	  e.preventDefault();
    });     
  
  $('[data-target=results]').on('click', function() {
    $this = $(this);
    showsection($this.data('target'));
  });
  
});