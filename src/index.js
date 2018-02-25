module.exports = function solveSudoku(matrix) {

    var zeros = 0;
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix.length; j++) {
            if (matrix[i][j]===0) {zeros++;}
        }
    }
    //print(zeros);
    function checkMatrix (matrix) {    
        var oldZeros=0;
        var newZeros=0;
        while (zeros!==0) {
            oldZeros=zeros;
            for (var i = 0; i < matrix.length; i++) {
                for (var j = 0; j < matrix.length; j++) {
                    if (matrix[i][j]===0) {
                        var elements=[1,2,3,4,5,6,7,8,9];
                        elements=checkString(elements, matrix[i]);
                        
                        if (elements.length>1) {elements=checkCol(elements,j);}
                        
                        if (elements.length>1) {elements=checkNear(elements,i,j);}
                        if (elements.length==1) {
                            matrix[i][j]=elements[0];
                            zeros--;
                        }
                       
                    }
                }
            }
            
            newZeros=zeros; 
            if (oldZeros==newZeros) {return(matrix);}        
        }
    }
    // перебор строки
    function checkString(el,str) {
        for (var i=0; i<str.length;i++) {
            if (str[i]!==0) {
                for (var j=0; j<el.length;j++) {
                    if (str[i]==el[j]) {el.splice(j, 1);}
                }
            }
        }
        return(el);
    }
    // перебор столбца
    function checkCol (el, col) {
        for (var i=0; i<matrix.length;i++) {
            if (matrix[i][col]!==0) {
                for (var j=0; j<el.length;j++) {
                    if (matrix[i][col]==el[j]) {el.splice(j, 1);}
                }
            }
        }
        
        return(el);
    }
      //проверка смежных строк в тройке и малых квадратов
    function checkNear(el,numberOfString,numberOfCol) {
        var x=0;
        var str1,str2=10;
        var col1,col2=10;
        while (numberOfString>2) {
            numberOfString=numberOfString-3;
            x++;
        }
        if (numberOfString===0) {
            str1=1+x*3;
            str2=2+x*3;
        }
        if (numberOfString==1) {
            str1=0+x*3;
            str2=2+x*3;
        }
        if (numberOfString==2) {
            str1=0+x*3;
            str2=1+x*3;
        }
        x=0;
         while (numberOfCol>2) {
            numberOfCol=numberOfCol-3;
            x++;
        }
        if (numberOfCol===0) {
            col1=1+x*3;
            col2=2+x*3;
        }
        if (numberOfCol==1) {
            col1=0+x*3;
            col2=2+x*3;
        }
        if (numberOfCol==2) {
            col1=0+x*3;
            col2=1+x*3;
        }
        
        x=0;
        for (var i = 0; i < el.length; i++) {
            var y=checkString(el[i],matrix[str1]);
            if (y.length===0) {x++;}
            y=checkString(el[i],matrix[str2]);
            if (y.length===0) {x++;}
            y=checkCol(el[i],col1);
            if (y.length===0) {x++;}
            y=checkCol(el[i],col1);
            if (y.length===0) {x++;}
            if (x==4){
                el=el[i];
                return(el);
            }
            x=0;
            if (el[i]==matrix[str1][col1]){el.splice(i,1); i--;}
            if (el[i]==matrix[str1][col2]){el.splice(i,1); i--;}
            if (el[i]==matrix[str2][col1]){el.splice(i,1); i--;}
            if (el[i]==matrix[str2][col2]){el.splice(i,1); i--;}
        }
           
      return(el);  
    
    }
    matrix=checkMatrix(matrix);
    
    //print(zeros);
    if (zeros===0) {
        return(matrix);
    }
    
    var zMatrix=matrix;
    
    function randomCheck(matrix) {
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix.length; j++) {
                if (matrix[i][j]==0) {
                    var elements=[1,2,3,4,5,6,7,8,9];
                    elements=checkString(elements, matrix[i]);
                    
                    if (elements.length>1) {elements=checkCol(elements,j);}
                    
                    if (elements.length>1) {elements=checkNear(elements,i,j);}
                    for (var h=0; h<elements.length;h++) {
                        matrix=zMatrix;
                        matrix[i][j]=elements[h];
                        matrix=checkMatrix(matrix);
                        zeros = 0;
                        for (var q = 0; q < matrix.length; q++) {
                            for (var w = 0; w < matrix.length; w++) {
                                if (matrix[q][w]==0) {zeros++}
                            }
                        }
                        if (zeros==0) {
                            return(matrix)
                        } 
                        if (h==elements.length-1) {
                            matrix=zMatrix;
                        }
                    }
                   
                }
            }
        }
        return('error');
    }
    matrix=randomCheck(matrix);

    return(matrix);
    
}