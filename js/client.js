$(document).ready(function() {
    $('ul.chicken-selection li').click(function() {
        $('.tank-selection li').removeClass('selected');
        $(this).addClass('selected');
        selectedChicken = $(this).data('chicken');
    });
})