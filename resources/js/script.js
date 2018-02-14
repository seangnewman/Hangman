//JavaScript Source Data

//Create a variable of Alpha Characters
//var letters = /^[A-Za-z]/;

 
//Create an object to control each game
var hangmanRock = {
    validChars : /^[A-Za-z]/
    ,filmTitle : theRocksFilms[Math.floor(Math.random() * theRocksFilms.length) + 1].Title
 
    ,initializeGame(){
         //Creates initial
        var hangmanInput = document.getElementById("hangman-input");
        for(var i = 0; i < this.filmTitle.length; i++){
            
            
            if(this.filmTitle[i].length === 1 && this.filmTitle[i].match(this.validChars) ){
                var letterSpan = document.createElement("input");
                //Add hightlight and underline
                letterSpan.setAttribute("class","hangman-highlight" );
                letterSpan.setAttribute("type","text" );
                //letterSpan.setAttribute("max-length","1" );
            }else{
                var letterSpan = document.createElement("span");
                //Add black background
                letterSpan.setAttribute("class","nonChar" );
            }
            letterSpan.setAttribute("id","movieChar"+i );
            
            hangmanInput.appendChild(letterSpan);
        }
    }
 
}
 
hangmanRock.initializeGame();

//Adding elements to hangman-input
 




 