var currentGame = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.canvas.style = "background: url('./img/background/grass.png')"
        this.context = this.canvas.getContext("2d");
        this.canvas.fillStyle;
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        let myChicken = this.initializeGame();
        var arrayOfFarmers = new Array();
        currentGame.updateGameArea(myChicken, arrayOfFarmers);
        window.addEventListener('keydown', function(event) {
            currentGame.key = event.key; // "ArrowUp", or "ArrowDown"
            currentGame.updateGameArea(myChicken, arrayOfFarmers);
        });
        window.addEventListener('keyup', function(event) {
            currentGame.key = false;
            currentGame.updateGameArea(myChicken, arrayOfFarmers);
        });
        let numFarmers = 0;
        setInterval(() => {
            var newFarmer = new farmer(70, 60, "./img/farmers/farmer_small.png", 400, Math.floor(Math.random()*270), numFarmers);
            newFarmer.update();
            arrayOfFarmers.push(newFarmer);
            numFarmers = numFarmers + 1;
        }, 3000);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    initializeGame : function() {
        var myChicken;
        switch(window.sessionStorage.getItem('chicken-type')){
            case "1":
                myChicken = new chicken(70, 60, "./img/chicken/white-chicken.png", 10, 120);
                break;
            case "2":
                myChicken = new chicken(70, 60, "./img/chicken/red-chicken.png", 10, 120);
                break;
            case "3":
                myChicken = new chicken(70, 60, "./img/chicken/yellow-chicken.png", 10, 120);
                break;
            default:
                myChicken = new chicken(70, 60, "./img/chicken/white-chicken.png", 10, 120);
        }
        return myChicken;
    },
      
    updateGameArea : function(myChicken, arrayOfFarmers) {
        currentGame.clear();
        myChicken.speedX = 0;
        myChicken.speedY = 0;
        if (currentGame.key && currentGame.key == "ArrowUp") {myChicken.speedY = -3; }
        if (currentGame.key && currentGame.key == "ArrowDown") {myChicken.speedY = 3; }     
        myChicken.newPos();
        myChicken.update();
        arrayOfFarmers.forEach(farmer => {
            farmer.update();
        });
    }
}
function chicken(width, height, imgSrc, x, y) {
    this.image = new Image();
    this.image.src = imgSrc;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
      ctx = currentGame.context;
      ctx.drawImage(this.image,
          this.x,
          this.y,
          this.width, this.height);
    }
    this.newPos = function() {
         this.x += this.speedX;
         this.y += this.speedY;      
         this.checkEdges();  
    }
    this.checkEdges = function() {
        // checks if component hits the top edge of canvas
        if (this.y < 0) {
            this.y = 0;
            return;
        }
        // checks if component hits the bottom edge of canvas
        var bottomEdge = currentGame.canvas.height - this.height;
        if (this.y > bottomEdge) {
            this.y = bottomEdge;
            return;
        }
    }
}

function farmer(width, height, imgSrc, x, y, idOfFarmer) {
    this.farmerId = idOfFarmer;
    this.image = new Image();
    this.image.src = imgSrc;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
      ctx = currentGame.context;
      ctx.drawImage(this.image,
          this.x,
          this.y,
          this.width, this.height);
    }
    this.newPos = function() {
         this.x += this.speedX;
         this.y += this.speedY;      
         this.checkEdges();  
    }
    this.checkEdges = function() {
        // checks if component hits the top edge of canvas
        if (this.y < 0) {
            this.y = 0;
            return;
        }
        // checks if component hits the bottom edge of canvas
        var bottomEdge = currentGame.canvas.height - this.height;
        if (this.y > bottomEdge) {
            this.y = bottomEdge;
            return;
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