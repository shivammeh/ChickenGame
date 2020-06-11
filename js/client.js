$(document).ready(function() {
    $('ul.chicken-selection li').click(function() {
        $('.chicken-selection li').removeClass('selected');
        $(this).addClass('selected');
        selectedChicken = $(this).data('chicken');
    });
    $("#join").click(function() {
        var prompt = $("#prompt")[0];
        prompt.style.display = "none";
    })
})