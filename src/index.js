module.exports = function solveSudoku(matrix) {
  // your solution
  var isMatch=[];
  for (let i = 0; i < 9; i++) {
    isMatch[i]=[];
    for (let j = 0; j < 9; j++) {
      isMatch[i][j]=[];
      
    }
  }



  function checkRow(i){
    let mySet = new Set();
    let count=0; 
      for (let j = 0; j < matrix.length; j++) {
          if(matrix[i][j]!=0){
          mySet.add(matrix[i][j]);
          count++;
          }
      }
      if(mySet.size==count){
          return true;
      }
    return false;  
  }

  function checkColumn(j){
    let mySet = new Set();
    let count=0; 
      for (let i = 0; i < matrix.length; i++) {
          if(matrix[i][j]!=0){
          mySet.add(matrix[i][j]);
          count++;
          }
      }
      if(mySet.size==count){
          return true;
      }
    return false;  
  }

  function checkBox(k,l){
    let mySet = new Set();
    let count=0; 
      for (let i = k*3; i < k*3+3; i++) {
          for (let j = l*3; j < l*3+3; j++) {
            if(matrix[i][j]!=0){
                mySet.add(matrix[i][j]);
                count++;
                }   
          }
      }
      if(mySet.size==count){
          return true;
      }
    return false;  
  }


  function check(){
    for (let i = 0; i < 9; ++i) {
            if (!checkRow(i)) {
                return false;
            }
    }
    for (let i = 0; i < 9; ++i) {
           if (!checkColumn(i)) {
                return false;
            }
    }
    for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 3; ++j) {
            if (!checkBox(i,j)) {
                return false;
            }
        }
    }
    return true;
  }
function findNextZero(i,j){
    for (let col = j; col < matrix.length; col++) {
        if(matrix[i][col]==0){
            return [i,col];
        }
    }
    for (let row = i+1; row < matrix.length; row++) {
        for (let col = 0; col < matrix.length; col++) {
            if(matrix[row][col]==0){
                return [row,col];
            }
            
        }
        
    }
}

function match(){
    let tmp_zero=findNextZero(0,0);
    while (tmp_zero!=undefined) {
      let yourSet = new Set();
      for (let i = 0; i < 9; i++) {
        if(matrix[i][tmp_zero[1]]!=0){
        yourSet.add(matrix[i][tmp_zero[1]]);
        }
      }
      for (let i = 0; i < 9; i++) {
        if(matrix[tmp_zero[0]][i]!=0){
          yourSet.add(matrix[tmp_zero[0]][i]);
          }
        
      }
      let squareX=Math.floor(tmp_zero[0]/3);
      let squareY=Math.floor(tmp_zero[1]/3);
      for (let i = squareX*3; i < squareX*3+3; i++) {
        for (let j = squareY*3; j < squareY*3+3; j++) {
          if(matrix[i][j]!=0){
            yourSet.add(matrix[i][j]);
            }
          
        }
        
      }
      for (let i = 1; i < 10; i++) {
        if(!yourSet.has(i)){
          isMatch[tmp_zero[0]][tmp_zero[1]].push(i);
        }
        
      }
      tmp_zero=findNextZero(tmp_zero[0],tmp_zero[1]+1);
    }
} 


function fillCell(row,col){
  let arr_next=[];
  for (let i of isMatch[row][col]) {
      matrix[row][col]=i;
      if(check()){
          arr_next = findNextZero(row,col);
          if(arr_next==undefined){
              return true;
          }
          if(fillCell(arr_next[0],arr_next[1])==true){
              return true;
          }
          
          
      }
      
  }
  matrix[row][col]=0;
  return false;
}




function solve(){
    match();
    return fillCell(findNextZero(0,0)[0],findNextZero(0,0)[1]);
    
}

solve();
  return matrix;
}
