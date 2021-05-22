var N = 0;
var n = 0;
var grid = new Array(N);
var solve_btn;
var callit = true;
var restart_btn = document.getElementById('restart_btn');
restart_btn.onclick = ()=>{
    location.reload();
}
window.onload = ()=>{
    var submit = document.getElementById('create_grid');
    submit.onclick = ()=>{
        if( callit == true ){
            callit = false;
            N = document.getElementById('choosegrid').value;
            n = Math.floor( Math.sqrt(N) );
            CreateFrame(N);
        }
    }
}

function CreateFrame(N){
    for( var i = 0; i < N; i++ ){
        var row = new Array(N);
        for( var j = 0; j < N ; j++ ){
            var temp = document.createElement('input');
            temp.value = 0;
            temp.size = 2;
            temp.style.color = "red";
            temp.style.backgroundColor = 'rgba(40,227,156,0.2)';
            temp.style.width = '50px';
            temp.style.height = '50px';
            temp.style.fontWeight = '700' ;
            temp.style.fontSize = '25px';
            temp.style.textAlignLast = 'center';
            temp.max = N;
            temp.min = 0;
            row[j] = temp;
            row[j].style.textAlignLast = 'center';
        }
        grid[i] = row;
    }
block = document.getElementById('my_div');

    for( let i = 0; i < N; i++ ){
        for( let j = 0; j < N; j++ ){
            block.appendChild(grid[i][j]);
        }
        block.appendChild(document.createElement('br'));
    }
    block.appendChild(document.createElement('br'));
    solve_btn = document.createElement('button');
    solve_btn.innerHTML = 'SOLVE';
    solve_btn.style.fontSize = '20px';
    solve_btn.style.backgroundColor = 'lawngreen';
    block.appendChild(solve_btn);
    solve_btn.onclick = ()=>{
        confirm ("Are you sure to submit?") ;
        var x;
        x = solved(grid);
        if( x == false ){
            alert( "No solution exists!" );
        }
    }
}

function point(a,b){
    return grid[a][b];
}

function solved( arr ){
    var row = -1;
    var col = -1;
    var flag = true;
    for( var i = 0; i < N; i++ ){
        for( var j = 0; j < N; j++ ){
            if( point(i,j).value == 0 ){
                row = i;
                col = j;
                flag = false;
                break;
            }
        }
        if( flag == false ){
            break;
        }
    }
    if( flag == true ){
        printans( arr );
        return true;
    }
    for( var num = 1; num <= N; num++ ){
        var f = IsSafe( arr, row, col, num );
        if( f == true ){
            point(row,col).value = num;
            point(row,col).style.color = "blue";
            if( solved( arr ) == true ){
                return true;
            }
            else{
                point(row,col).value = 0;
            }
        }
    }
    return false;
}

function IsSafe( arr, row, col, num ){
    var r = true;
    var c = true;
    var g = true;
    var rw = Math.floor(row / n ) * n;
    var cl = Math.floor(col / n ) * n;
    for( var i = 0; i < N; i++ ){
        if( point(row,i).value == num ){
            r = false;
            return false;
        }
    }
    for( var i = 0; i < N; i++ ){
        if( point(i,col).value == num ){
            c = false;
            return false;
        }
    }
    for( var i = rw; i < ( rw + n ); i++ ){
        for( var j = cl; j < ( cl + n ); j++ ){
            if( point(i,j).value == num ){
                g = false;
                return false;
            }
        }
    }
    if( g == true && r == true && c == true && point(row,col).value == 0 ){
        return true;
    }
    return false;
}
function printans( arr ){
    var ans = "";
    for( var i = 0; i < N; i++ ){
        for( var j = 0; j < N; j++ ){
            ans += point(i,j).value;
            ans += "\t";
        }
        ans += "\n";
    }
    console.log(ans);
}