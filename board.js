class Board{

    constructor(fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"){
        this.fen = fen;
        var parts = this.fen.split(' ');
        this.board = parts[0].split('/');
        //this.Turntomove = parts[1];
        // this.castlingRights = parts[2];
        // this.enPassantSquare = parts[3];
        // this.halfMoveClock = parseInt(parts[4]);
        // this.fullMoveNumber = parseInt(parts[5]);

        this.row_inds = "87654321";
        this.col_inds = "abcdefgh";

        var table = document.createElement("table");
        var tbody = document.createElement("tbody");

        this.row_inds.split('').forEach((r, ri) => {
            var tr = document.createElement("tr");
            this.col_inds.split('').forEach((c, ci) => {
                var td = document.createElement("td");
                td.id = c+r;
                td.style.position = 'relative';
                td.style.width = td.style.height = "75px";
                td.style.backgroundColor = ((ci + ri) % 2 == 0 ? 'rgb(233, 237, 204)' : 'rgb(119, 149, 86)');
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        table.id = "board";
        table.style.textAlign = 'center';
        table.style.boxShadow = "2px 2px 10px black";
        document.body.appendChild(table);
    }

    render(){
        this.board.forEach((r, ri) => {
            var ci = 0;
            r.split('').forEach(c =>{
                if(isNaN(c)){
                    var imgname = (c === c.toLowerCase() ? 'b' : 'w') + c.toLowerCase();
                    var cellid = this.col_inds[ci] + this.row_inds[ri];
                    document.getElementById(cellid)
                    .innerHTML = `<img id="${imgname}-${cellid}" src="./images/${imgname}.svg" width="100%">`;
                    ci++;
                }
                else ci += parseInt(c);
            })
        });
    }

    //test

    getAvailableMoves(id) {

        var row_inds = "12345678";
        var col_inds = "abcdefgh";
        var currposId = id.substring(3); 
        var currcol = row_inds.indexOf(currposId[1]);
        var currrow = col_inds.indexOf(currposId[0]);
        var currpos = 10*currrow+currcol;
        var temp = 0;
        var moves = []; 
        var movesId = []
        switch (id[1]){
    
            case 'p':
                if (id[0] == 'w'){
                    temp = currpos+1;
                    if (this.Islegal(temp) && !this.IsAnotherpiece(temp)) moves.push(temp);
                    if (id[4]=='2'){
                        temp = currpos+2
                        if (this.Islegal(temp) && !this.IsAnotherpiece(temp)) moves.push(temp)};
                }
                else{
                    temp = currpos-1;
                    if (this.Islegal(temp) && !this.IsAnotherpiece(temp)) moves.push(temp);
                    if (id[4]=='7'){
                        temp = currpos-2;
                        if (this.Islegal(temp) && !this.IsAnotherpiece(temp)) moves.push(temp);}
                }
                break;
    
            case 'n':
                temp = currpos+21;
                if (this.Islegal(temp)) moves.push(temp);
                temp = currpos+20-1;
                if (this.Islegal(temp)) moves.push(temp);
                temp = currpos-20+1;
                if (this.Islegal(temp)) moves.push(temp);
                temp = currpos-21;
                if (this.Islegal(temp)) moves.push(temp);
                temp = currpos+12;
                if (this.Islegal(temp)) moves.push(temp);
                temp = currpos-10+2;
                if (this.Islegal(temp)) moves.push(temp);
                temp = currpos+10-2;
                if (this.Islegal(temp)) moves.push(temp);
                temp = currpos-12;
                if (this.Islegal(temp)) moves.push(temp);
                //moves.push([2, 1], [2, -1], [-2, 1], [-2, -1]);
                //moves.push([1, 2], [-1, 2], [1, -2], [-1, -2]);
                break;
            case 'q':
    
            case 'b':
                //right-up diagonal
                for (var i=1 ; i < 8 ; i++){
                    temp = currpos+i*10+i;
                    if (this.Islegal(temp)){
                        moves.push(temp);
                        if(this.IsAnotherpiece(temp)) break;
                    }else break;
                }
                //left-up diagonal
                for (var i=1 ; i < 8 ; i++){
                    temp = currpos-(i*10)+i;
                    if (this.Islegal(temp)){
                        moves.push(temp);
                        if(this.IsAnotherpiece(temp)) break;
                    }else break;
                }
                //right-down diagonal
                for (var i=1 ; i < 8 ; i++){
                    temp = currpos+i*10-i;
                    if (this.Islegal(temp)){
                        moves.push(temp);
                        if(this.IsAnotherpiece(temp)) break;
                    }else break;
                }
                //left-down diagonal
                for (var i=1 ; i < 8 ; i++){
                    temp = currpos-(i*10+i);
                    if (this.Islegal(temp)){
                        moves.push(temp);
                        if(this.IsAnotherpiece(temp)) break;
                    }else break;
                }
                //moves.push([i, i], [-i, i], [i, -i], [-i, -i]);
                if (id[1] == 'b')
                break;
    
            case 'r':
                //up
                for (var i=1 ; i < 8 ; i++){
                    temp = currpos+i;
                    if (this.Islegal(temp)){
                        moves.push(temp);
                        if(this.IsAnotherpiece(temp)) break;
                    }else break;
                }
                //down
                for (var i=1 ; i < 8 ; i++){
                    temp = currpos-i;
                    if (this.Islegal(temp)){
                        moves.push(temp);
                        if(this.IsAnotherpiece(temp)) break;
                    }else break;
                }
                //right
                for (var i=1 ; i < 8 ; i++){
                    temp = currpos+i*10;
                    if (this.Islegal(temp)){
                        moves.push(temp);
                        if(this.IsAnotherpiece(temp)) break;
                    }else break;
                }
                //left
                for (var i=1 ; i < 8 ; i++){
                    temp = currpos-(i*10);
                    if (this.Islegal(temp)){
                        moves.push(temp);
                        if(this.IsAnotherpiece(temp)) break;
                    }else break;
                }
                //moves.push([0, i], [0, -i], [i, 0], [-i, 0]);
                break;
            
            
            case 'k':
                //moves = this.getkingmoves(id);
                temp = currpos+1;
                    if (this.Islegal(temp)) moves.push(temp);
                temp = currpos-1;
                    if (this.Islegal(temp)) moves.push(temp);
                temp = currpos+10;
                    if (this.Islegal(temp)) moves.push(temp);
                temp = currpos-10;
                    if (this.Islegal(temp)) moves.push(temp);
                temp = currpos+11;
                    if (this.Islegal(temp)) moves.push(temp);
                temp = currpos-11;
                    if (this.Islegal(temp)) moves.push(temp);
                temp = currpos+10-1;
                    if (this.Islegal(temp)) moves.push(temp);
                temp = currpos-10+1;
                    if (this.Islegal(temp)) moves.push(temp);
                //moves=this.kingValidMoves(this.getAvailableMovesById(moves),id);
                break;
    
            default:
                console.log("No such Piece");
        
            }
        movesId = this.getAvailableMovesById(moves);
        return movesId;
    }
    
    getpawnKillMoves(id){
        var row_inds = "12345678";
        var col_inds = "abcdefgh";
        var currposId = id.substring(3); 
        var currcol = row_inds.indexOf(currposId[1]);
        var currrow = col_inds.indexOf(currposId[0]);
        var currpos = 10*currrow+currcol;
        var temp = 0;
        var moves = [];
        var movesId = [];
        var idtopush = ''; 
        if (id[0] == 'w'){
            temp = currpos+11;
            if (this.Islegal(temp)) moves.push(temp);
            temp = currpos-10+1;
            if (this.Islegal(temp)) moves.push(temp);   
        }
        else{
            temp = currpos-11;
            if (this.Islegal(temp)) moves.push(temp);
            temp = currpos+10-1;
            if (this.Islegal(temp)) moves.push(temp);
        }

        for (var i=0;i<moves.length;i++){
            var r = moves[i]%10;
            var c = parseInt(moves[i]/10);
            idtopush = col_inds[c]+row_inds[r];
            if (document.getElementById(idtopush).hasChildNodes())
            movesId.push(idtopush);
        }
        return movesId;
    }
    
    getkingmoves(id){
        var row_inds = "12345678";
        var col_inds = "abcdefgh";
        var currposId = id.substring(3); 
        var currcol = row_inds.indexOf(currposId[1]);
        var currrow = col_inds.indexOf(currposId[0]);
        var currpos = 10*currrow+currcol;
        var temp = 0;
        var moves = [];
        temp = currpos+1;
            if (this.Islegal(temp)) moves.push(temp);
        temp = currpos-1;
            if (this.Islegal(temp)) moves.push(temp);
        temp = currpos+10;
            if (this.Islegal(temp)) moves.push(temp);
        temp = currpos-10;
            if (this.Islegal(temp)) moves.push(temp);
        temp = currpos+11;
            if (this.Islegal(temp)) moves.push(temp);
        temp = currpos-11;
            if (this.Islegal(temp)) moves.push(temp);
        temp = currpos+10-1;
            if (this.Islegal(temp)) moves.push(temp);
        temp = currpos-10+1;
            if (this.Islegal(temp)) moves.push(temp);
        moves = this.getAvailableMovesById(moves);
        return moves; 
    }

    getAvailableMovesById(moves){
        var movesId = [];
        var row_inds = "12345678";
        var col_inds = "abcdefgh";
        for (var i=0;i<moves.length;i++){
            var r = moves[i]%10;
            var c = parseInt(moves[i]/10);
            movesId.push(col_inds[c]+row_inds[r]);
        }
        return movesId;
    }


    Islegal(move){
        if ((move%10) > -1 && (move%10) < 8 && (parseInt(move/10)) > -1 && (parseInt(move/10)) < 8 && move < 78)
            return true;
        else
            return false;
    }
    
    IsAnotherpiece(cell){
        var row_inds = "12345678";
        var col_inds = "abcdefgh";
        var cell_row = cell%10;
        var cell_col = parseInt(cell/10);
        var id = col_inds[cell_col]+row_inds[cell_row];
        if (document.getElementById(id).hasChildNodes()){
            var chnode=document.getElementById(id).childNodes[0];
            if (chnode.tagName.toLowerCase() === "img") {
                return true;
        }
        else return false;
        }
    }

    showMovesOnBoard(Moves,player){
        var highlightedMoves = [];
        Moves.forEach((el)=>{
            var td = document.getElementById(el);
            if (td.hasChildNodes()){
                var img = td.childNodes[0];
                if (img.id[0] != player){
                    var div = document.createElement("div");
                    div.className = 'circle';
                    td.appendChild(div);
                }
            }
            else{
                var div = document.createElement("div");
                div.className = 'dot';
                td.appendChild(div); 
            }
            highlightedMoves.push(el);
        });
        return highlightedMoves;
    }

    UndoHighlight(moves){
        while(moves.length!=0){
            var el = moves.pop();
            var divElement = document.getElementById(el).querySelector("div");
            if (divElement) {
                document.getElementById(el).removeChild(divElement);
            }
       }
    }

}


export default Board;
