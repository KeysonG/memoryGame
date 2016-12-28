function GameCtor(){
	var self = this;
	this.numOfCards = 12;
	this.pattern="";
	this.cards = [];
	this.cardsimg = ["blue", "red", "black" , "purple" , "purple" , "blue" , "red" , "black", "green", "green" , "salmon", "salmon"];
	this.secondClick = false;


}



var tempProto ={
	generateCards: function(){
		console.log(self);
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

		// add bg
		for( var i =0; i<this.numOfCards; i++){
			this.cards[i].bg = this.cardsimg[i];
		}
	},
	clickCard: function(){
			// this.secondClick=false;
		for(var i =0; i<this.cards.length; i++){
			this.cards[i].addEventListener("click", this.showCard);
		}
	},
	showCard: function(e){
		this.firstCard = e.target;
		// if(!(this.secondClick)){
		// this.firstCard = e.target
		// console.log("first card is" ,this.firstCard);
		// };
		// if(this.secondClick){
		// this.secondCard = e.target;
		// console.log("second card is ", this.secondCard);
		// var turnback = setTimeout(function(){this.secondCard.style.background = "url(img/texture.jpg)"; this.firstCard.style.background = "url(img/texture.jpg)"}, 1000);
		// this.secondClick=false;
		// return;
		// }
		// this.secondClick = true;
		e.target.style.background = e.target.bg;
		e.target.removeEventListener("click", this.showCard);
		
		for(var i =0; i<this.cards.length; i++){
			this.cards[i].addEventListener("click", this.showSecondCard);
		}
		
	},
	showSecondCard: function(e){
		this.secondCard = e.target;
		if(this.firstCard === this.secondCard){
			console.log("same card");
		}
	}

};

GameCtor.prototype = tempProto;

var game = new GameCtor();
game.generateCards();
game.clickCard();

