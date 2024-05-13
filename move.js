export function kingValidMoves(movesIds,id){
    var kingmovesids = [];
    var moves = [];
    var player = id[0];
    movesIds.forEach((move)=>{
        var flag = 0;
        if(document.getElementById(move).hasChildNodes()){
            var imgmv =  document.getElementById(move).childNodes[0];
            if (imgmv.id[0] != player) kingmovesids.push(move);
        };
        var diagonalIds = this.getAvailableMoves(player+'b-'+move);
        //bishop or queen
        for (let i = 0; i < diagonalIds.length; i++) {
            var td = document.getElementById(diagonalIds[i]);
            if (td.hasChildNodes()){
                var img = td.childNodes[0];
                if (img.id[0] != player){
                    if (img.id[1] == 'b' || img.id[1] == 'q') {
                        flag = 1;
                        break;
                    }
                }
            } 
        }
        //rook or queen
        if(flag != 1){
            var samelineIds = this.getAvailableMoves(player+'r-'+move);
            for (let i = 0; i < samelineIds.length; i++) {
                var td = document.getElementById(samelineIds[i]);
                if (td.hasChildNodes()){
                    var img = td.childNodes[0];
                    if (img.id[0] != player){
                        if (img.id[1] == 'r' || img.id[1] == 'q') {
                            flag = 1;
                            break;
                        }
                    }
                }    
            }
        }
        //knight
        if(flag != 1){
            var knightIds = this.getAvailableMoves(player+'n-'+move);
            for (let i = 0; i < knightIds.length; i++) {
                var td = document.getElementById(knightIds[i]);
                if (td.hasChildNodes()){
                    var img = td.childNodes[0];
                    if (img.id[0] != player){
                        if (img.id[1] == 'n') {
                            flag = 1;
                            break;
                        }
                    }
                }    
            }
        }
        //pawn
        if(flag != 1){
            var pawnIds = this.getpawnKillMoves(player+'p-'+move);
            for (let i = 0; i < pawnIds.length; i++) {
                var td = document.getElementById(pawnIds[i]);
                if (td.hasChildNodes()){
                    var img = td.childNodes[0];
                    if (img.id[0] != player){
                        if (img.id[1] == 'p') {
                            flag = 1;
                            break;
                        }
                    }
                }    
            }
        }
        //opponent king
        if(flag != 1){
            var kingIds = this.getkingmoves(player+'k-'+move);
            for (let i = 0; i < kingIds.length; i++) {
                var td = document.getElementById(kingIds[i]);
                if (td.hasChildNodes()){
                    var img = td.childNodes[0];
                    if (img.id[0] != player){
                        if (img.id[1] == 'k') {
                            flag = 1;
                            break;
                        }
                    }
                }    
            }
        }
        if (flag == 0)kingmovesids.push(move); 
    })
    kingmovesids.forEach((id)=>{
        var row_inds = "12345678";
        var col_inds = "abcdefgh";
        var currcol = row_inds.indexOf(id[1]);
        var currrow = col_inds.indexOf(id[0]);
        moves.push(10*currrow+currcol);
    })
   return moves; 
}