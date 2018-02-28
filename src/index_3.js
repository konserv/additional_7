module.exports = function solveSudoku(matrix) {


function checkMatrix(matrix) {
    var hideRowMatrix=[];
    var numbersRow=[];
    for (var x = 0; x < matrix.length; x++) {
        hideRowMatrix=[]
        numbersRow=[];
        for (var y = 0; y < matrix[x].length; y++) {
            if (matrix[x][y]===0){
                var elements=[1,2,3,4,5,6,7,8,9];
                elements = RCChecker(matrix[x],elements);
                var column =[];
                for (var n =0; n<matrix.length;n++) {
                    column.push(matrix[n][y]);
                }
                elements = RCChecker(column,elements);
                elements = checkNear(elements,x,y);
                //elements = hideAlonesInLittleBoxes(x, y, elements);
                if (elements.length==1) {
                    matrix[x][y]=elements[0];
                    for (var t=0; t<hideRowMatrix.length; t++) {
                        for (var r=0 ; r<hideRowMatrix[t].length; r++) {
                            if (elements[0]==hideRowMatrix[t][r]) {hideRowMatrix[t].splice(r,1);}
                        }
                    }
                    
                } else {
                    hideRowMatrix.push(elements);
                    numbersRow.push(y);
                }
            }
            
        }
        checkHideR(hideRowMatrix, x, numbersRow);
    }
   
}

//for row and col
function RCChecker(rowOrCol,el) {
    for (var i =0; i < rowOrCol.length; i++) {
        for (var j = 0; j < el.length; j++) {
            if (rowOrCol[i]==el[j]) {
                el.splice(j,1);
            }
       }
        
    }
    return(el);
}
//for little boxes
function checkNear(el,numberOfString,numberOfCol) {
    var p=0;
    var str1,str2=10;
    var col1,col2=10;
    while (numberOfString>2) {
        numberOfString=numberOfString-3;
        p++;
    }
    if (numberOfString===0) {
        str1=1+p*3;
        str2=2+p*3;
    }
    if (numberOfString==1) {
        str1=0+p*3;
        str2=2+p*3;
    }
    if (numberOfString==2) {
        str1=0+p*3;
        str2=1+p*3;
    }
    p=0;
     while (numberOfCol>2) {
        numberOfCol=numberOfCol-3;
        p++;
    }
    if (numberOfCol===0) {
        col1=1+p*3;
        col2=2+p*3;
    }
    if (numberOfCol==1) {
        col1=0+p*3;
        col2=2+p*3;
    }
    if (numberOfCol==2) {
        col1=0+p*3;
        col2=1+p*3;
    }
    
    p=0
    for (var i = 0; i < el.length; i++) {  


        if (el[i]==matrix[str1][col1]){el.splice(i,1); i--;}
        if (el[i]==matrix[str1][col2]){el.splice(i,1); i--;}
        if (el[i]==matrix[str2][col1]){el.splice(i,1); i--;}
        if (el[i]==matrix[str2][col2]){el.splice(i,1); i--;}
    }
       
  return(el);  

}
//for hide alones in rows
function checkHideR(RowMatrix, X, numR) {
var hide=0;
    for (var t=0; t<RowMatrix.length; t++) {
        for (var r=0; r<RowMatrix[t].length; r++) {
            hide=0;
            for (var f=0; f<RowMatrix.length; f++) {
                for (var g=0; g<RowMatrix[f].length; g++) {
                    if (RowMatrix[t][r]==RowMatrix[f][g]) {
                        hide++;
                    }
                }
            }
            if (hide==1 && RowMatrix.length>1) {
                matrix[X][numR[t]]=RowMatrix[t][r];
                
            }
        }
    }
}
//hide alones in little boxes
function hideAlonesInLittleBoxes(X, Y, els) {
    var p=0;
    var strs=[];
    var cols=[];
    strs.push(X);
    var hideMatrix=[]
    while (X>2) {
        X=X-3;
        p++;
    }
    if (X===0) {
        strs.push(1+p*3);
        strs.push(2+p*3);
        
    }
    if (X==1) {
        strs.push(0+p*3);
        strs.push(2+p*3);
    }
    if (X==2) {
        strs.push(0+p*3);
        strs.push(1+p*3);
    }
    p=0;
    cols.push(Y);
    while (Y>2) {
        Y=Y-3;
        p++;
    }
    
    if (Y===0) {
        cols.push(1+p*3);
        cols.push(2+p*3);
    }
    if (Y==1) {
        cols.push(0+p*3);
        cols.push(2+p*3);
    }
    if (Y==2) {
        cols.push(0+p*3);
        cols.push(1+p*3);
    }
    var hEls=[];
    for (var x5=0; x5<strs.length; x5++) {
        for (var y5=0; y5<cols.lenth; y5++) {
            if (matrix[strs[x5]][cols[y5]]===0 && strs[x5]!=X && cols[y5]!=Y) {
                hEls=[];
                hEls = RCChecker(matrix[strs[x5]],hEls);
                var hColumn =[];
                for (var n2 =0; n2<matrix.length;n2++) {
                    hColumn.push(matrix[n2][cols[y5]]);
                }
                hEls = RCChecker(hColumn,hEls);
                hEls = checkNear(hEls,strs[x5],cols[y5]);
                for (var i2=0; i2<els.length; i2++) {
                    for (var j2=0; j2<hEls.length; j2++) {
                        if (els[i2]==hEls[j2]) {
                            els.splice(i2,1);
                            i2--;
                        }
                    }
                }
            }
        }
    }
    return(els);
}

function checker(){
    var oldZeros=100;
    var newZeros=0;
    while (oldZeros!==newZeros) {
        oldZeros=newZeros
        checkMatrix(matrix);
        trans();
        checkMatrix(matrix);
        trans();
        newZeros=0;
        for (var x = 0; x < matrix.length; x++) {
            for (var y = 0; y < matrix[x].length; y++) {
                if (matrix[x][y]===0){
                    newZeros++;
                }
            }
        }
    }
}
   
function trans() {
    var hMatrix=0;
    for (var i= 0; i<matrix.length;i++) {
        for (var j=i; j<matrix[i].length; j++) {
            hMatrix=matrix[i][j];
            matrix[i][j]=matrix[j][i];
            
            matrix[j][i]=hMatrix;
        }
    }
   
}   
checker();
var rightMatrix=[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];

for (var key=0; key<matrix.length; key++) {
    for (var key2=0 ;key2<matrix[key].length; key2++) {
        rightMatrix[key][key2]=matrix[key][key2];
    }
}

for (var x1 = 0; x1 < matrix.length; x1++) {
        for (var y1 = 0; y1 < matrix[x1].length; y1++) {
            if (matrix[x1][y1]===0){
                var elements1=[1,2,3,4,5,6,7,8,9];
                elements1 = RCChecker(matrix[x1],elements1);
                var column1 =[];
                for (var n1 =0; n1<matrix.length;n1++) {
                    column1.push(matrix[n1][y1]);
                }
                elements1 = RCChecker(column1,elements1);
                elements1 = checkNear(elements1,x1,y1);
                
                for (var m=0; m<elements1.length;m++) {
                    matrix[x1][y1]=elements1[m];
                    checker();
                    for (var x2 = 0; x2 < matrix.length; x2++) {
                        for (var y2 = 0; y2 < matrix[x2].length; y2++) {                          
                                if (matrix[x2][y2]===0){
                                    matrix=[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
                                    for (var key1=0; key1<rightMatrix.length; key1++) {
                                        for (var key3=0; key3<rightMatrix[key1].length; key3++) {
                                            matrix[key1][key3]=rightMatrix[key1][key3];
                                        }
                                    }
                                } 
                            
                        }
                    }
                }
                   
             }
        }
}
   return(matrix);
}