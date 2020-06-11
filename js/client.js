$(document).ready(function() {
    /* Selects Chicken */
    $('ul.chicken-selection li').click(function() {
        $('.chicken-selection li').removeClass('selected');
        $(this).addClass('selected');
        selectedChicken = $(this).data('chicken');
    });

    /* Sets Name and Starts Game */
    $("#join").click(function() {
        var prompt = $("#prompt")[0];
        window.sessionStorage.setItem('name', $("#chicken-name").val());
        prompt.style.display = "none";
    })
})