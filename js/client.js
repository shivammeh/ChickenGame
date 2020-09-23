function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
      this.image = new Image();
      this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
      ctx = currentGame.context;
      if (type == "image") {
        ctx.drawImage(this.image,
          this.x,
          this.y,
          this.width, this.height);
      } else {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }
    }
    this.newPos = function() {
         this.x += this.speedX;
         this.y += this.speedY;        
    }
}

var currentGame = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        let myChicken = this.initializeGame();
        this.interval = setInterval(this.updateGameArea(myChicken), 20);
        
        window.addEventListener('keydown', function(event) {
            const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
        });
    },

    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    initializeGame : function() {
        var myChicken;
        switch(window.sessionStorage.getItem('chicken-type')){
            case "1":
                myChicken = new component(70, 60, "img/chicken/white-chicken.png", 10, 120, "image");
                break;
            case "2":
                myChicken = new component(70, 60, "img/chicken/red-chicken.png", 10, 120, "image");
                break;
            case "3":
                myChicken = new component(70, 60, "img/chicken/yellow-chicken.png", 10, 120, "image");
                break;
            default:
                myChicken = new component(70, 60, "img/chicken/white-chicken.png", 10, 120, "image");
        }
        return myChicken;
    },
      
      updateGameArea : function(myChicken) {
          currentGame.clear(); 
          document.onkeydown = checkKey(myChicken);     
          myChicken.newPos();
          myChicken.update();
    },
    
    checkKey : function(e, myChicken) {
        myChicken.speedX = 0;
        myChicken.speedY = 0;  
        e = e || window.event;
    
        if (e.keyCode == '38') {
            // up arrow
            myChicken.speedX = -1;
        }
        else if (e.keyCode == '40') {
            // down arrow
            myChicken.speedX = 1; 
        }
        else if (e.keyCode == '37') {
        // left arrow
            myChicken.speedY = -1; 
        }
        else if (e.keyCode == '39') {
        // right arrow
            myChicken.speedY = 1; 
        }
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
        window.sessionStorage.setItem('chicken-type', selectedChicken);
        prompt.style.display = "none";
        currentGame.start();
    })
})