function GameCtor(cardnumber){
	this.numOfCards = cardnumber;
	this.pattern="";
	this.cards = [];
	this.cardsimg = ["blue", "red", "black" , "purple" , "purple" , "yellow" , "red" , "black", "green", "blue" , "yellow", "green"];
	this.secondClick = false;
	this.bgnum = [];
	this.randomArray=[];
	this.score =0;
	this.scoreDOM = document.createElement("div");
	this.highsScore = 0;
	this.highScores = [];
	this.gamePaused = false;

}



var tempProto ={
	// create bg array
	createArray: function(){
		for(var i=1; i<(this.numOfCards/2)+1; i++){
			this.bgnum.push(i);
			this.bgnum.push(i);
		}
	},
	// shuffle array
	shuffle: function(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;

 	 // While there remain elements to shuffle...
 	 while (0 !== currentIndex) {

    	// Pick a remaining element...
    	randomIndex = Math.floor(Math.random() * currentIndex);
    	currentIndex -= 1;

    	// And swap it with the current element.
    	temporaryValue = array[currentIndex];
    	array[currentIndex] = array[randomIndex];
    	array[randomIndex] = temporaryValue;
    }

    this.randomArray= array;
},

generateCards: function(){
	document.self = this; //making this object a global variable so I can access it within my eventListeners

	for(var i =0; i<this.numOfCards/4; i++){
				// bootstrap row
				var cards = document.querySelector(".cards");
				var row = document.createElement("div");
				row.classList.add("row")
				cards.appendChild(row);

				for(var j =0; j<4; j++){
				// create card 
				var card = document.createElement("div");
				card.classList.add("col-md-3", "card");	
				// card.bg = this.cardsimg[i];
				row.appendChild(card);
				this.cards.push(card);
			}
		}
		for(var i=0; i<this.cards.length; i++){
			this.cards[i].style.backgroundImage = "url(img/texture.jpg)";

		}
		// add bg
		for( var i =0; i<this.numOfCards; i++){
			this.cards[i].bg = this.cardsimg[i];

			this.cards[i].bg = "url(img/" + this.randomArray[i]+ ".jpg)"
		}


	},
	clickCard: function(){		
			for(var i =0; i<this.cards.length; i++){
				this.cards[i].addEventListener("click", this.showCard);
			}
		
	},
	showCard: function(e){

		if(document.self.gamePaused === false){
			document.self.firstCard = e.target;
			e.target.style.background = e.target.bg;
			
			for(var i =0; i<document.self.cards.length; i++){
				document.self.cards[i].removeEventListener("click", document.self.showCard);
				document.self.cards[i].addEventListener("click", document.self.showSecondCard);
			}
		}
	},
	showSecondCard: function(e){
		document.self.secondCard = e.target;
		e.target.style.background = e.target.bg;

		// same card 
		if(document.self.firstCard === document.self.secondCard){
				console.log("same card");
		}
		//Match
		else if(document.self.firstCard.bg == document.self.secondCard.bg){
			

			for(var i=0; i<document.self.cards.length;i++){
				document.self.cards[i].addEventListener("click", document.self.showCard);
				document.self.cards[i].removeEventListener("click", document.self.showSecondCard);
			}
			//reset
			document.self.firstCard.removeEventListener("click", document.self.showCard);
			document.self.secondCard.removeEventListener("click", document.self.showCard);
			document.self.firstCard.removeEventListener("click", document.self.showSecondCard);
			document.self.secondCard.removeEventListener("click", document.self.showsecondCard);
			
			document.self.secondCard ="";
			document.self.firstCard ="";

		}
		

		// not the same
		else{
			document.self.gamePaused = true;
			var turnback = setTimeout(function(){document.self.secondCard.style.background = "url(img/texture.jpg)"; document.self.firstCard.style.background = "url(img/texture.jpg)"; 
				document.self.gamePaused = false;
		}, 500);

			for(var i=0; i<document.self.cards.length;i++){
				document.self.cards[i].addEventListener("click", document.self.showCard);
				document.self.cards[i].removeEventListener("click", document.self.showSecondCard);
			}
			document.self.score++;
			document.self.generateScoreDOM(); //updating dom score element

		}

		//check if finished
		var checkAfterTurnBack = setTimeout(function(){
				
			var finished =true;
			for(var i=0; i<document.self.cards.length; i++){
				if(document.self.cards[i].style.backgroundImage== "url(\"img/texture.jpg\")"){
						finished = false;
					}

			}
			if(finished){
				for(var i=0; i<document.self.cards.length; i++){
					var randomNumber = Math.floor(Math.random() * 800) + 1
					var r123 = randomNumber + "px";
					document.self.cards[i].style.transform = 'scale(0.5)';
					document.self.cards[i].style.transform = 'translateX('+r123+')';
					document.self.cards[i].style.transform = 'translateY('+r123+')';
					document.self.cards[i].style.transform = 'rotate('+randomNumber+ 'deg)';
				}
			if(localStorage.getItem("highscores") !== null) {
				document.self.highScores = JSON.parse(localStorage.highscores);
			}else{
					document.self.highScores = [];
				}
			alert("you won!!!!!!!! your score is " + document.self.score);
			document.self.highScore = document.self.score;
			document.self.highScores.push(document.self.highScore);
			localStorage.setItem("highscores", JSON.stringify(document.self.highScores));
			console.log(document.self.highScores);
			document.self.generateHighScoreDOM();
			
			} //end of if finished
		},500)
	}, //end of show second cardd function

	generateScoreDOM: function(){
		var scoreDOM = this.scoreDOM;
		scoreDOM.id = "highscoredom";
		scoreDOM.innerHTML = " Your score is <strong>" + this.score + "</strong> <br> Keep your score as low as possible <br>" 
		document.getElementsByClassName("container")[0].appendChild(scoreDOM);
	},
	generateHighScoreDOM: function(){
		var scoreDOM = this.scoreDOM;
		scoreDOM.innerHTML += "<strong>highscores</strong><br>" + document.self.highScores;
	}

}; //prototype end



GameCtor.prototype = tempProto;

function game(cardnumber){
	var game = new GameCtor(cardnumber);
	game.createArray();
	game.shuffle(game.bgnum);
	game.generateCards();
	game.clickCard();

}
var easy = 12;
var medium = 16;
var hard = 20;
game(easy);

var newGameBtn = document.getElementById("button");
newGameBtn.onclick = function(){window.location.reload()};