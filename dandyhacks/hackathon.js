$(document).ready(function ()
{
  $('tr').addClass('colorless');
  $('.filters > a').click(function(event){
      event.preventDefault();

      var isAll = $(event.target).hasClass('f-all');

      $('.filters > a').removeClass('selected');
      $('tr').removeClass('shrink');
      $('tr').removeClass('highlight');

      if (!isAll) {
        $('tr').addClass('shrink');
        $('tr').removeClass('colorless');
        var filter = $(event.target).attr('class');
        $('tr.'+filter).removeClass('shrink');
        $('tr.'+filter).removeClass('colorless');
        $('tr.'+filter).addClass('highlight');
      }
      else {
        $('tr').addClass('colorless');
      }

      $(event.target).addClass('selected');
  });
})

function filter(event)
{
  event.preventDefault();
}