function Game(arenaId, width, height) {
    this.farmers = [];
    this.width = width;
    this.height = height;
    this.$arena = $(arenaId);
    this.$arena.css('width', width);
    this.$arena.css('height', height);

    var g = this;
    setInterval(function() {
        g.mainLoop();
    }, 50);
}

Game.prototype = {
    mainLoop : function(){
        
    }
}