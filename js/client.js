$(document).ready(function() {
    $('ul.chicken-selection li').click(function() {
        $('.chicken-selection li').removeClass('selected');
        $(this).addClass('selected');
        selectedChicken = $(this).data('chicken');
    });
})


