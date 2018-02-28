module.exports = function solveSudoku(matrix) {
var nullArray=[];
var positions=[]; 
var elements=[1,2,3,4,5,6,7,8,9];
var str1, str2, col1, col2, hx, hy, mnx, mny=0;  
var trashMatrix=[[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[]]];
function check() {    
    for (var x=0; x<matrix.length; x++) {
        nullArray=[];
        positions=[];
        for (var y=0; y<matrix[x].length; y++) {
            if (matrix[x][y]==0) {
                elements=[1,2,3,4,5,6,7,8,9];
                hx=x;
                hy=y;
                mnx=0;
                mny=0;
                while (hx>2) {
                    hx=hx-3;
                    mnx++;
                }
                while (hy>2) {
                    hy=hy-3;
                    mny++;
                }
                if (hx==0) {
                    str1=1+mnx*3;
                    str2=2+mnx*3;
                }
                if (hx==1) {
                    str1=0+mnx*3;
                    str2=2+mnx*3;
                }
                if (hx==2) {
                    str1=1+mnx*3;
                    str2=0+mnx*3;
                } 
                if (hy==0) {
                    col1=1+mny*3;
                    col2=2+mny*3;
                }
                if (hy==1) {
                    col1=0+mny*3;
                    col2=2+mny*3;
                }                
                if (hy==2) {
                    col1=1+mny*3;
                    col2=0+mny*3;
                }
                for (var b=0; b<elements.length; b++) {
                    if (elements[b]==matrix[str1][col1]) {elements.splice(b,1); b=0;}
                    if (elements[b]==matrix[str1][col2]) {elements.splice(b,1); b=0;}
                    if (elements[b]==matrix[str2][col1]) {elements.splice(b,1); b=0;}
                    if (elements[b]==matrix[str2][col2]) {elements.splice(b,1); b=0;}
                }
                for (var k=0; k<elements.length; k++) {
                    for (var i=0; i<matrix[x].length; i++) {
                        if (elements[k]==matrix[x][i]) {
                            elements.splice(k,1);
                            k--;
                        }
                    }   
                    for (var j=0; j<matrix.length; j++) {
                        if (elements[k]==matrix[j][y]) {
                            elements.splice(k,1);
                            k--;
                        }
                    } 
                }
                nullArray.push(elements);
                positions.push(y);
                trashMatrix[x][y]=[];
                trashMatrix[x].splice(y, 1, elements)
            }
        }
                                                                                                                                                                                                                     
        for (var i=0; i<nullArray.length; i++) {
            if (nullArray[i].length==1){
                matrix[x][positions[i]]=nullArray[i][0];
                var elt=nullArray[i][0];
                nullArray.splice(i,1);
                positions.splice(i,1);
                for (var n=0; n<nullArray.length; n++) {
                    for (var m=0; m<nullArray[n].length; m++) {
                        if (elt==nullArray[n][m]) {
                            nullArray[n].splice(m,1);
                          
                        }
                    }
                }
                i==0;
            }
        }
        var sumEl=0;
        for (var i=0; i<nullArray.length; i++) {
            for (var j=0; j<nullArray[i].length; j++) {
                sumEl=0;
                for (var n=0; n<nullArray.length; n++) {
                    for (var m=0; m<nullArray[n].length; m++) {
                        if (nullArray[i][j]==nullArray[n][m]){
                            sumEl++;
                        }
                    }
                }
                if (sumEl==1) {
                    matrix[x][positions[i]]=nullArray[i][j];
                }
            }
        }
    }
}
function checker(){
    var oldZeros=100;
    var newZeros=0;
    while (oldZeros!==newZeros) {
        oldZeros=newZeros
        check();
        trans();
        check();
        trans();
        check();
        trans();
        check();
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
    var hTrashMatrix=[];
    for (var i= 0; i<matrix.length;i++) {
        for (var j=i; j<matrix[i].length; j++) {
            hMatrix=matrix[i][j];
            hTrashMatrix=[];
            hTrashMatrix.splice(0,1,trashMatrix[i][j]);
            matrix[i][j]=matrix[j][i];
            trashMatrix[i].splice(j,1,trashMatrix[j][i]);
            matrix[j][i]=hMatrix;
            trashMatrix[j].splice(i,1,hTrashMatrix[0]);
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

for (var i=0; i<matrix.length; i++) {
    for (var j=0; j<matrix[i].length; j++) {
        if (matrix[i][j]!==0) {
            trashMatrix[i][j]=[];
        }
        if (trashMatrix[i][j].length>0) {
            //print(trashMatrix[i][j]);
        }
    }
}

function trashChecker(){
    for (var c=0; c<trashMatrix.length; c++) {
        for (var d =0; d<trashMatrix[c].length; d++) {
            for (var e=0; e<trashMatrix[c][d].length; e++) {
                matrix[c][d]=trashMatrix[c][d][e];
                checker()
                var zeros1=0;
                for (var x1=0; x1<matrix.length; x1++) {
                    for (var y1=0; y1<matrix[x1].length; y1++) {
                        if (matrix[x1][y1]==0) {
                            zeros1++;
                        }
                    }
                }
                if (zeros1==0) {
                    return(matrix);
                } else {
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
var zeros1=0;
for (var x1=0; x1<matrix.length; x1++) {
    for (var y1=0; y1<matrix[x1].length; y1++) {
        if (matrix[x1][y1]==0) {
            zeros1++;
        }
    }
}
if (zeros1==0) {
    return(matrix);
}
matrix=trashChecker();


return(matrix);
}