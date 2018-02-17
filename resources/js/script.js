//JavaScript Source Data

//Create a variable of Alpha Characters
//var letters = /^[A-Za-z]/;

 
//Create an object to control each game
var hangmanRock = {
    validChars : /^[A-Za-z]/
    ,gamesWon : 0  
    ,gamesLost : 0                                                                           //Indicates the number of games won
    ,remainingGuesses : 0  
    ,previousGuesses : []                                                                   //Indicates number of attempts remaining in current game
    ,filmTitle : theRocksFilms[Math.floor(Math.random() * theRocksFilms.length)]
    ,charGuess : ''
    ,initializeGame(){
     
        var hangmanInput = document.getElementById("hangman-input");
        var hangmanGuesses = document.getElementById("hangman-guesses");
        var hangmanDescription = document.getElementById("hangman-description");
  
    
      // If a previous game exists,  clear the html of for the next game.
      if(!this.isBoardEmpty()){
        this.clearElement(hangmanInput);
        this.clearElement(hangmanGuesses);
        this.clearElement(hangmanDescription);
        this.remainingGuesses = 0;
        this.previousGuesses = [];
        this.filmTitle = theRocksFilms[Math.floor(Math.random() * theRocksFilms.length)];
      }

     

      document.getElementById("hangman-description").textContent = this.filmTitle.Description;             

      for(var i = 0; i < this.filmTitle.Title.length; i++){
        var letterSpan = document.createElement("span");
          if(this.isValidChar(this.filmTitle.Title[i]) ){
            this.createVisibleElement(letterSpan, i);
           }else{
           this.createNonVisibleElement(letterSpan, i);
        }
        hangmanInput.appendChild(letterSpan);
      }
      if((remainingGuesses = this.numberOfUnmatchedChars() * 2) > 20){
          this.remainingGuesses = 20;
      } 

      document.getElementById("remainingGuesses").textContent = remainingGuesses; 
      document.getElementById("btnPlayAgain").style.visibility = "hidden";
      document.getElementById("#error-messages").textContent = '';
      
    } // End Initialize Board
    
    ,isBoardEmpty(){
      var currentInput = document.getElementById("hangman-input").querySelectorAll("span").length;
      if(currentInput > 0){
       return false;
      }else {
       return true;
      }
    } // End check if any existing elements exist
    ,numberOfUnmatchedChars(){
      var currentUnmatched = document.getElementById("hangman-input").querySelectorAll("[data-matched=false]").length;
      return currentUnmatched;
    }//End check for unmatched Characters
    ,numberOfMatchedChars(){
      var currentUnmatched = document.getElementById("hangman-input").querySelectorAll("[data-matched=true]").length;
      return currentUnmatched;
    }// End check for matched Characters
    ,isValidChar(theChar){
      if(theChar.length === 1 && theChar.match(this.validChars) ){
        return true;
      }else{
         return false;
      }
    }// End check if valid character passed
    ,createVisibleElement(theElement, theIndex){
      //Add hightlight and underline
      theElement.setAttribute("class","hangman-highlight" );
      //Create an attribute to hold char, if it is matched will use as source of text
      theElement.setAttribute("data-char",this.filmTitle.Title[theIndex].toUpperCase() );
      //Set the attribute to false, if a match is found will return to true
      theElement.setAttribute("data-matched",false);
    }
    ,createNonVisibleElement(theElement, theIndex){
      //Add black background
      theElement.setAttribute("class","nonChar" );
    }
    ,clearElement(theElement){
      theElement.innerHTML = '';
    }
    ,processGuess(charGuess){
      //charGuess = 'z'.toUpperCase(); //Placeholder until input is built
      //First, check if a valid character was passed
      this.charGuess = charGuess;
      if(this.isValidChar(this.charGuess)){
        //push the value to unmatched guesses
        var hangmanIncorrectContainer = document.getElementById("hangman-guesses");
        var hangmanIncorrectElement = document.createElement("span");
        hangmanIncorrectElement.innerText = this.charGuess;
        hangmanIncorrectContainer.appendChild(hangmanIncorrectElement);
            
        //Check if the value exists 
        var numberOfMatches = document.getElementById("hangman-input").querySelectorAll("[data-char=" + this.charGuess + "]");
        if(numberOfMatches.length > 0 ){
          //Set the text value of all matching elements
          for(var i = 0; i < numberOfMatches.length; i++){
            numberOfMatches[i].textContent = this.charGuess;
            numberOfMatches[i].setAttribute("data-matched","true");
          }
        }else{
            remainingGuesses--;
            this.throwAnInsult("error-messages");
            document.getElementById("remainingGuesses").textContent = remainingGuesses;
          }
        }else{
        // Invalid Character, throw an insult
        this.throwAnInsult("error-messages");
      }

      if(this.didYouWin()){
        //Move the trailer image to the left column
        var iWon = document.getElementById("myWinnings");
        iWon.innerHTML += this.filmTitle.trailer;
        //Display the updated games won
        document.getElementById("theScore").innerText = this.gamesWon;
        //Display image on center of screen
        var showPoster = document.getElementById("hangman-description");
        showPoster.innerText='';
        showPoster.className = "imageContainer";
        var backgroundImage = './resources/images/' + this.filmTitle.image;
        showPoster.style.backgroundImage ="url('" + backgroundImage + "')";
        document.getElementById("btnPlayAgain").style.visibility = "visible";
        document.getElementById("playAgain").disabled=false;
        
      }

      if(this.didYouLose()){
        //Move the trailer image to the left column
        var iLost = document.getElementById("notMyWinnings");
        iLost.innerHTML += this.filmTitle.trailer;
        //Display the updated games lost
        document.getElementById("theOtherScore").innerText = this.gamesLost;
        //Display image on center of screen
        var showPoster = document.getElementById("hangman-description");
        showPoster.innerText='';
        showPoster.className = "imageContainer";
        // Need an index for the rocks portraits
        var rockIndex = Math.floor(Math.random() * theRockImages.length);

        var backgroundImage = './resources/images/' + theRockImages[rockIndex];
        showPoster.style.backgroundImage ="url('" + backgroundImage + "')";
        document.getElementById("btnPlayAgain").style.visibility = "visible";
        document.getElementById("playAgain").disabled=false;

        //Hit em with an insult
        showPoster.innerHTML = "<div id='anotherInsult'></div>";
        
        this.throwAnInsult("anotherInsult");

      }
    } // Process Guess

    ,didYouWin(){
     //If the number of unmatched is zero
     if (this.numberOfUnmatchedChars() === 0){
      this.gamesWon++;

 
        return true;
     }else{
        
       return false;
     }
    }

    ,didYouLose(){
      //If the number of unmatched is zero
      if(remainingGuesses === 0){
        this.gamesLost++;
        return true;
      }else{
        return false;
      }
    }
    ,captureInput(alphaChar){
      // Called when the event listener detects a keydown event
      // Convert input to an uppercase character
       var tempChar = alphaChar.toUpperCase();
       
      //If this character has not been tried before, push it onto the 
      // previousGuesses array and evaluate character 
      if(!this.guessedBefore(tempChar)){
        this.previousGuesses.push(tempChar);
        this.processGuess(tempChar); 
      }else{
       // this has been guessed before
       // take no action, but provide an insult
        this.throwAnInsult("error-messages");
      }
    } // End of Capture Input
    ,guessedBefore(theChar){
      //Tests if the input value has been used before
      if( this.previousGuesses.indexOf(theChar) === -1){
        return false;
      }else{
        return true;
      }
    } // End of Guessed Before
    
    ,throwAnInsult(targetElementID){
        var insultIndex = Math.floor(Math.random() * theRockInsults.length);
        var insultMessage = document.getElementById(targetElementID);
        insultMessage.textContent = theRockInsults[insultIndex];
    }

}

//Listen for keydown, capture the event key to process the 
//user guess
document.addEventListener("keydown",function(event){
    hangmanRock.captureInput(event.key);
  });

//Listen for the keyup event.  Allows us to remove the value
// from the textbox
document.addEventListener("keyup",function(event){
     
    document.getElementById("userGuess").value = '';
    
    
});

// If the user chooses to play again
// Some of these may be better off moved out of the event
document.getElementById("playAgain").addEventListener("click",function(){
    var removePoster = document.getElementById("hangman-description");
        //removePoster.classList.remove("imageContainer");
        removePoster.removeAttribute("class");
        removePoster.style.background = "none";
        hangmanRock.initializeGame();
        this.disabled=true;
        
});
 
hangmanRock.initializeGame();
 

//Adding elements to hangman-input
 



 