#include<bits/stdc++.h>
using namespace std;
int N,n;
vector< vector<int> > grid;
bool solved();
bool Incomplete();
void print_ans();

bool IsSafe( int row, int col, int num ){
	bool r = true, c = true, g = true;
	int rw = ( row / n ) * n;
	int cl = ( col / n ) * n;
	// Checking if the num is already present in the row or not
	for(int i = 0; i < N ; i++ ){
		if ( grid[row][i] == num ){
			r = false;
			return false;
		}
	}
	// Checking if the num is already present in the col or not
	for(int i = 0; i < N ; i++ ){
		if ( grid[i][col] == num ){
			c = false;
			return false;
		}
	}
	// Checking if the num is already present in the smaller grid or not
	for(int i = rw; i < ( rw + n ); i++ ){
		for(int j = cl; j < ( cl + n ); j++ ){
			if ( grid[i][j] == num ){
				g = false;
				return false;
				break;
			}
		}
	}
	
	if( g == true && r == true && c == true && grid[row][col] == 0 ){
		return true;
	}
	else{
		return false;
	}
}

// main algorithm to solve the puzzle
bool solved(){
	int row,col;
	// if grid is NOT Incomplete (Complete), return it to print the output
	if( !Incomplete() ){
		return true;
	}
	// Finding the next blank space
	for( int i=0; i< N; i++ ){
		for( int j = 0; j < N; j++ ){
			if( grid[i][j] == 0 ){
				row = i;
				col = j;
			}
		}
	}
	// Assign value at next free cell
	for( int num = 1 ; num <= N ; num++ ){
		if( IsSafe( row, col, num ) ){
			grid[row][col] = num;
			if( solved() ) return true;
			grid[row][col] = 0;
		}
	}
	return false;
}

// Check if any blank space is still remainning or not
bool Incomplete(){
	for( int i = 0 ; i < N ; i++ ){
		for( int j = 0 ; j < N ; j++ ){
			if( grid[i][j] == 0 ) return true;
		}
	}
	return false;
}

// After getting the solution, display it
void print_ans(){
	for( int i = 0 ; i < N ; i++ ){
		for( int j = 0 ; j < N ; j++ ){
			cout<<grid[i][j]<<" ";
		}
		cout<<"\n";
	}
}

int main(){
	cin>>N;
	// Checking if entered N is a perfect square or not
	if( sqrt(N) > (int)sqrt(N) ){
		cout<<"Sudoku Not Possible\n";return 0;
	}
	// n is the size of smaller square - grid
	n = (int)sqrt(N);
	grid.resize( N , vector<int> ( N , 0 ) );
		
	for( int i = 0 ; i < N ; i++ ){
		for( int j = 0 ; j < N ; j++ ){
			int el;cin>>el;
			grid[i][j] = el;
		}
	}
	if( solved() ){
		print_ans();
	}
	else cout<<"No Solution exists\n";
	return 0;
}
