import Board from "./board.js";
var fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
var x = new Board(fen);
x.render();

var player = 'w';
var currPiece = '';
var availableMoves = [];
var highlightedMoves = [];
let imageAppended = false;
var pawnKillMoves = [];


function changePlayer(){
    updatefen(fen);
    if (player === 'w') player='b';
    else player='w';
};

function flipBoard(){
};

function updatefen(fen){
    updateBoardFen();
};

function updateBoardFen(){
    var board = document.getElementById("board").childNodes[0];
    var tr = board.childNodes;
    for (let i = 0; i < 8; i++) {
        const row = tr[i];
        for (let i = 0; i < 8; i++) {
            const cell = row[i]
        }
        //console.log(row);
    }
};

function selfmove_sound() {
    var moveaudio = document.getElementById("selfmove_sound");
    moveaudio.play();
};
function capture_Sound() {
    var captureaudio = document.getElementById("capture_sound");
    captureaudio.play();
};


document.getElementById("board").onclick = (e) => {
    var t = e.target;

    if(t.tagName.toLowerCase() == 'img' && t.id.length == 5){
        if(t.id[0] == player){
            currPiece = t;
            availableMoves = x.getAvailableMoves(t.id);
            if (highlightedMoves.length!=0)x.UndoHighlight(highlightedMoves);
            if (t.id[1]=='p') pawnKillMoves = x.getpawnKillMoves(t.id);
            if (t.id[1]=='p')
                highlightedMoves = x.showMovesOnBoard(availableMoves.concat(pawnKillMoves),player);
            else
                highlightedMoves = x.showMovesOnBoard(availableMoves,player);
            imageAppended = false;
           //console.log(availableMoves,currPiece);
        }
        else{
            x.UndoHighlight(highlightedMoves);
            if (currPiece.length != 0 && currPiece.id[1]=='p')availableMoves = pawnKillMoves;
            if (!imageAppended && availableMoves.includes(t.id.substring(3,5))) {
                let Image = document.createElement('img');
                Image.src = currPiece.src;
                Image.id = `${currPiece.id.substring(0,2)}-${t.id.substring(3,5)}`;
                Image.style.width = "100%";
                t.parentNode.replaceChild(Image, t);
                capture_Sound();
                currPiece.remove();
                imageAppended = true;
                changePlayer();
            }

           console.log('ffff')

        }
    }
    else if(t.tagName.toLowerCase() == 'td'){
        
        function handleClick(event) {
            var clickedElement = event.target;
            if (!imageAppended && availableMoves.includes(clickedElement.id)) {
                let Image = document.createElement('img');
                Image.src = currPiece.src;
                Image.id = `${currPiece.id.substring(0,2)}-${clickedElement.id}`;
                Image.style.width = "100%";
                clickedElement.appendChild(Image);
                selfmove_sound();
                currPiece.remove();
                x.UndoHighlight(highlightedMoves);
                imageAppended = true;
                changePlayer();
            }
          }
          document.addEventListener("click", handleClick);

    }
}
