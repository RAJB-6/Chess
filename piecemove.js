getAvailableMoves(id) {

    var row_inds = "87654321";
    var col_inds = "abcdefgh";
    var player = id[0];
    var currposId = id.substring(3); 
    var currrow = row_inds.indexOf(currposId[1]);
    var currcol = col_inds.indexOf(currposId[0]);
    var currpos = 10*currcol+currrow;
    var temp = 0;
    var moves = []; 
    switch (id[1]){

        case 'p':
            if (id[0] == 'w'){
                temp = currpos+1;
                if (Islegal(temp)) moves.push(temp);
                if (id[4]=='2'){
                    temp = currpos+2
                    if (Islegal(temp)) moves.push(temp)};
            }
            else{
                temp = currpos-1;
                if (Islegal(temp)) moves.push(temp);
                if (id[4]=='7'){
                    temp = currpos-2;
                    if (Islegal(temp)) moves.push(temp);}
            }
            break;

        case 'n':
            temp = currpos+21;
            if (Islegal(temp)) moves.push(temp);
            temp = currpos+20-1;
            if (Islegal(temp)) moves.push(temp);
            temp = currpos-20+1;
            if (Islegal(temp)) moves.push(temp);
            temp = currpos-21;
            if (Islegal(temp)) moves.push(temp);
            temp = currpos+12;
            if (Islegal(temp)) moves.push(temp);
            temp = currpos-10+2;
            if (Islegal(temp)) moves.push(temp);
            temp = currpos+10-2;
            if (Islegal(temp)) moves.push(temp);
            temp = currpos+12;
            if (Islegal(temp)) moves.push(temp);
            //moves.push([2, 1], [2, -1], [-2, 1], [-2, -1]);
            //moves.push([1, 2], [-1, 2], [1, -2], [-1, -2]);
            break;
        case 'q':

        case 'b':
            //right-up diagonal
            for (var i=1 ; i < 8 ; i++){
                temp = currpos+i*10+i;
                if (Islegal(temp)){
                    moves.push(temp);
                    if(IsAnotherpiece(temp)) break;
                }
            }
            //left-up diagonal
            for (var i=1 ; i < 8 ; i++){
                temp = currpos-(i*10)+i;
                if (Islegal(temp)){
                    moves.push(temp);
                    if(IsAnotherpiece(temp)) break;
                }
            }
            //right-down diagonal
            for (var i=1 ; i < 8 ; i++){
                temp = currpos+i*10-i;
                if (Islegal(temp)){
                    moves.push(temp);
                    if(IsAnotherpiece(temp)) break;
                }
            }
            //left-down diagonal
            for (var i=1 ; i < 8 ; i++){
                temp = currpos-(i*10+i);
                if (Islegal(temp)){
                    moves.push(temp);
                    if(IsAnotherpiece(temp)) break;
                }
            }

            //moves.push([i, i], [-i, i], [i, -i], [-i, -i]);
            if (id[1] == 'b')
            break;

        case 'r':
            //up
            for (var i=1 ; i < 8 ; i++){
                temp = currpos+i;
                if (Islegal(temp)){
                    moves.push(temp);
                    if(IsAnotherpiece(temp)) break;
                }
            }
            //down
            for (var i=1 ; i < 8 ; i++){
                temp = currpos-i;
                if (Islegal(temp)){
                    moves.push(temp);
                    if(IsAnotherpiece(temp)) break;
                }
            }
            //right
            for (var i=1 ; i < 8 ; i++){
                temp = currpos+i*10;
                if (Islegal(temp)){
                    moves.push(temp);
                    if(IsAnotherpiece(temp)) break;
                }
            }
            //left
            for (var i=1 ; i < 8 ; i++){
                temp = currpos-(i*10);
                if (Islegal(temp)){
                    moves.push(temp);
                    if(IsAnotherpiece(temp)) break;
                }
            }
            //moves.push([0, i], [0, -i], [i, 0], [-i, 0]);
            break;
        
        
        case 'k':
            temp = currpos+1;
                if (Islegal(temp)) moves.push(temp);
            temp = currpos-1;
                if (Islegal(temp)) moves.push(temp);
            temp = currpos+10;
                if (Islegal(temp)) moves.push(temp);
            temp = currpos-10;
                if (Islegal(temp)) moves.push(temp);
            temp = currpos+11;
                if (Islegal(temp)) moves.push(temp);
            temp = currpos-11;
                if (Islegal(temp)) moves.push(temp);
            temp = currpos+10-1;
                if (Islegal(temp)) moves.push(temp);
            temp = currpos-10+1;
                if (Islegal(temp)) moves.push(temp);
            break;

        default:
            console.log("No such Piece");
    
        }
    return moves;
}


getAvailableMovesById(id){
    var movesId = [];
    var moves = getAvailableMoves(id);
    var row_inds = "87654321";
    var col_inds = "abcdefgh";
    for (var i=0;i<moves.length;i++){
        var r = moves[i]%10;
        var c = parseInt(moves[i]/10);
        movesId.push(col_inds[c]+row_inds[r]);
    }
    return movesId;
}

Islegal(move){
    if ((move%10) > -1 && (move%10) < 8 && (parseInt(move/10)) > -1 && (parseInt(move/10)) < 8)
        return true;
    else
        return false;
}

IsAnotherpiece(cell){
    var row_inds = "87654321";
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




    // getAvailableMovesById(id){ 
    //     var currpos = id.substring(3);
    //     var currrow = parseInt(currpos[1]);
    //     var currcol = currpos[0].charCodeAt(0);
    //     currpos = [currcol,currrow];
    //     var temp=[];
    //     var moves = this.getAvailableMoves(id);
    //     var movesId = [];
    //     for (var i=0;i<moves.length;i++){
    //         if((currpos[0]+moves[i][0])>96 && (currpos[0]+moves[i][0])<105)
    //             temp[0] = currpos[0]+moves[i][0];
    //         else continue;
            
    //         if((currpos[1]+moves[i][1])>0 && (currpos[1]+moves[i][1])<9)
    //             temp[1] = currpos[1]+moves[i][1];
    //         else continue;
    //         temp[0]=String.fromCharCode(temp[0]);
    //         temp[1]=String(temp[1]);
    //         var moveid = temp[0]+temp[1];
    //         movesId.push(moveid);
    //     }
    //     return movesId;
    // }
    
    // getAvailableMoves(id){
    //     var moves = [];
    //     switch (id[1]){

    //         case 'p':
    //             if (id[0] == 'w'){
    //                 moves.push([0,1]);
    //                 if (id[4]=='2'){moves.push([0,2])};
    //             }
    //             else{
    //                 moves.push([0,-1]);
    //                 if (id[4]=='7'){moves.push([0,-2])};
    //             }
    //             break;

    //         case 'n':
    //             moves.push([2, 1], [2, -1], [-2, 1], [-2, -1]);
    //             moves.push([1, 2], [-1, 2], [1, -2], [-1, -2]);
    //             break;
            
    //         case 'b':
    //             for (var i=1 ; i < 8 ; i++){
    //                 moves.push([i, i], [-i, i], [i, -i], [-i, -i]);
    //             }
    //             break;

    //         case 'r':
    //             for (var i=1 ; i < 8 ; i++){
    //                 moves.push([0, i], [0, -i], [i, 0], [-i, 0]);
    //             }
    //             break;
            
    //         case 'q':
    //             for (var i=1 ; i < 8 ; i++){
    //                 moves.push([i, i], [-i, i], [i, -i], [-i, -i]);
    //                 moves.push([0, i], [0, -i], [i, 0], [-i, 0]);
    //             }
    //             break;
            
    //         case 'k':
    //             for (var i=1 ; i < 2 ; i++){
    //                 moves.push([i, i], [-i, i], [i, -i], [-i, -i]);
    //                 moves.push([0, i], [0, -i], [i, 0], [-i, 0]);
    //             }
    //             break;

    //         default:
    //             console.log("No such Piece");
        
    //         }
    //     return moves;
    // }

    
