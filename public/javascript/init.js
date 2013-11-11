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

  $('[data-target=results]').on('click', function(e) {
	  var mydata = $('#frm-vote').serialize();
	  console.log($('#urlId').val());
	  $this = $(this);
    store.set($('#urlId').val(), mydata);
	  $.ajax({ 
      url: '/',
      type: 'POST',
      cache: false, 
      data: mydata,
      success: function(data){
        //alert('Success!');
        showsection($this.data('target'));
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

  if ($('#frm-vote').length > 0) {
    data = store.get(location.pathname.split('/')[1]);
    toppings = data.split('&');
    for (i in toppings) {
      input = toppings[i].split('=')[0];
      value = toppings[i].split('=')[1];
      console.log(input);
      if (input == 'slices') {
        $("input[name=slices][value=" + value + "]").prop('checked', true);
      } else {
        $('#'+input+'-'+(value==1?'yes':'no')).prop('checked', true);
      }
    }

  }
  
});