var currentGame = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
}

$(document).ready(function() {
    /* Selects Chicken */
    $('ul.chicken-selection li').click(function() {
        $('.chicken-selection li').removeClass('selected');
        $(this).addClass('selected');
        selectedChicken = $(this).data('chicken');
    });

    /* Sets Name and Chicken Type and Starts Game */
    $("#join").click(function() {
        var prompt = $("#prompt")[0];
        window.sessionStorage.setItem('name', $("#chicken-name").val());
        window.sessionStorage.setItem('chicken-type',selectedChicken);
        prompt.style.display = "none";
        currentGame.start();
    })
})