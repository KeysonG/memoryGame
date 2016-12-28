function GameCtor(cardnumber){
	this.numOfCards = cardnumber;
	this.pattern="";
	this.cards = [];
	this.cardsimg = ["blue", "red", "black" , "purple" , "purple" , "yellow" , "red" , "black", "green", "blue" , "yellow", "green"];
	this.secondClick = false;
	this.bgnum = [];
	this.randomArray=[];


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
		document.self = this;

			// this.secondClick=false;
			for(var i =0; i<this.cards.length; i++){
				this.cards[i].addEventListener("click", this.showCard);
			}

	},
	showCard: function(e){
			document.self.firstCard = e.target;
			e.target.style.background = e.target.bg;
			for(var i =0; i<document.self.cards.length; i++){
				document.self.cards[i].removeEventListener("click", document.self.showCard);
				document.self.cards[i].addEventListener("click", document.self.showSecondCard);
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
			var turnback = setTimeout(function(){document.self.secondCard.style.background = "url(img/texture.jpg)"; document.self.firstCard.style.background = "url(img/texture.jpg)"}, 500);

			for(var i=0; i<document.self.cards.length;i++){
				document.self.cards[i].addEventListener("click", document.self.showCard);
				document.self.cards[i].removeEventListener("click", document.self.showSecondCard);
			}
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
      				console.log(r123);
      				  document.self.cards[i].style.transform = 'scale(0.5)';

      				document.self.cards[i].style.transform = 'translateX('+r123+')';
      				document.self.cards[i].style.transform = 'translateY('+r123+')';
      				document.self.cards[i].style.transform = 'rotate('+randomNumber+ 'deg)';

  				}
  				
    		}			
    	},500)
		
			
		}


};

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
