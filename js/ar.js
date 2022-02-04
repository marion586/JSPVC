function calculeArbre(val , P , somm ) {
    for (var i = 0; i < somm ; i++) {
          
        
        arbre.push({key : sary[test].from  + sary[test].to   , parent : P, name : sary[test].to + sary[test].from +" = " + val[test].B1 ,source :"B1.png" }); //b1
        arbre.push({key : sary[test].from + sary[test].to ,  parent : P, name : sary[test].from + sary[test].to + " = " + val[test].B2 ,source :"B2.png"  }); //b2
        
        valb1 = val[test].B1;
        valb2 = val[test].B2;
        if(!isNaN(valb1) && !isNaN(valb2)){

            if(valb1 > valb2 /*|| makingD == true*/){
            console.log("lasa b1 be");
            P = sary[test].from + sary[test].to;
            /*makingD = false;*/
            test++;
             }
            
            else  /*(valb1 < valb2 || makingG == true)*/
             {
                console.log("lasa b2 be");
                P = sary[test].to + sary[test].from ;
               /* makingG = false;*/
                test++;
            }
            /*else  {
                console.log("lasa1 ==");
                var sommG = somm;
                var sommD = somm;
                var Pdroite = sary[test].from + sary[test].to 
                var Pgauche = sary[test].to + sary[test].from
                makingD = true;
                calculeArbre(val , Pdroite , sommD );
                makingG = true;
                calculeArbre(val , Pgauche , sommG);
                    }*/
        }
        else
            {
            console.log("lasa3");
                if(!isNaN(valb1)){

                    P = sary[test].to + sary[test].from ;
                    //test++;
                }
                else
                        {
                            P = sary[test].from + sary[test].to; 
                            //test ++;
                        }
                       
            }
        
        
    }