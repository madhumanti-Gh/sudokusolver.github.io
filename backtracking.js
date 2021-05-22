var N = 4;
var n = 2;
var grid = [
    [0, 2, 0, 0],
    [0, 3, 0, 1],
    [2, 0, 0, 3],
    [0, 4, 0, 0]
];
solved(grid);

function solved( grid ){
    var row = -1;
    var col = -1;
    var flag = true;
    for( var i = 0; i < N; i++ ){
        for( var j = 0; j < N; j++ ){
            if( grid[i][j] == 0 ){
                row = i;
                col = j;
                flag = false;
            }
        }
    }

    if( flag == true ){
        printans( grid );
        return true;
    }

    for( var num = 1; num <= 4; num++ ){
        if( IsSafe( grid, row, col, num ) == true ){
            grid[row][col] = num;
            if( solved( grid ) == true ){
                return true;
            }
            grid[row][col] = 0;
        }
    }
    return false;
}

function IsSafe( grid, row, col, num ){
    var r = true;
    var c = true;
    var g = true;
    var rw = Math.floor(row / n ) * n;
    var cl = Math.floor(col / n ) * n;
    for( var i = 0; i < N; i++ ){
        if( grid[row][i] == num ){
            r = false;
            return false;
        }
    }
    for( var i = 0; i < N; i++ ){
        if( grid[i][col] == num ){
            c = false;
            return false;
        }
    }
    for( var i = rw; i < ( rw + n ); i++ ){
        for( var j = cl; j < ( cl + n ); j++ ){
            if( grid[i][j] == num ){
                g = false;
                return false;
            }
        }
    }
    if( g == true && r == true && c == true && grid[row][col] == 0 ){
        return true;
    }
    return false;
}

function printans( grid ){
    var ans = "";
    for( var i = 0; i < N; i++ ){
        for( var j = 0; j < N; j++ ){
            ans += grid[i][j];
            ans += "\t";
        }
        ans += "\n";
    }
    console.log(ans);
}