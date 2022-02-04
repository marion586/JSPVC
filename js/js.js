var labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

var ligneLabels = [];
var colonneLabels = [];
var ligneLabelsAvantSuppression = [];
var colonneLabelAsvantSuppression = [];

var divTableau = null;
var tableau = null;
var tableauRegret = null;
var matriceInitiale = [];
var matriceAvantSuppression = [];
var matrice = [];
var indicesPossibleCheminParasite = [];
var sary = [];
var monCle = [];
var div;
var test = 0;
var etape = false;
var val = [];
var valb1 , valb2;
var Riniale;

// matrice = [[null, 766, 6, 5, 6, 76, 5],
// 		[64, null, 76, 6, 45, 677, 564],
// 		[6, 45, null, 46, 564, 57, 64],
// 		[657, 364, 53, null, 6457, 64, 5764],
// 		[7, 645, 7764, 75, null, 6475, 64],
// 		[75, 6457, 64, 57, 7, null, 6457],
// 		[6475, 6457, 64, 5764, 7564, 576, null]];

var indiceRegret = [];
var regrets = [];
var sommetsVisited = [];
var sommetsVisitedAvantSuppression = [];
var indiceRegretMax;
var revenir = false;

var n = 0;
var R = 0;
var b1 = 0;
var b2 = 0;
var parent;
var arbre = [];
var div1;

function ajouter() {
    var ligne;
    var cellule;
    var input;
div =0;
div1 = 0;

    if (divTableau == null) {
        divTableau = document.getElementById('divTableau');
        tableau = document.createElement('table');
        tableau.id = 'tableau';
        ligne = document.createElement('tr');
        cellule = document.createElement('th');
        cellule.className = 'cellule';
        ligne.appendChild(cellule);
        tableau.appendChild(ligne);
        divTableau.appendChild(tableau);
    }

    ligne = document.createElement('tr');
    cellule = document.createElement('th');
    cellule.innerHTML = labels[n];
    cellule.className = 'cellule';
    ligneLabels.push(labels[n]);
    ligne.appendChild(cellule);

    for (var i = 0; i < n; i++) {
        cellule = document.createElement('td');
        cellule.className = 'cellule';
        input = document.createElement('input');
        input.className = 'inputTableau';
        cellule.appendChild(input);
        ligne.appendChild(cellule);
    }

    tableau.appendChild(ligne);

    for (var i = 0; i < tableau.childNodes.length; i++) {
        if (i == 0) {
            cellule = document.createElement('th');
            cellule.innerHTML = labels[n];
            colonneLabels.push(labels[n]);
        } else {
            cellule = document.createElement('td');
            cellule.className = 'cellule';
            if (i == tableau.childNodes.length - 1) {
                cellule.classList.add('mena');
            } else {
                input = document.createElement('input');
                input.className = 'inputTableau';
                cellule.appendChild(input);
            }
        }
        tableau.childNodes[i].appendChild(cellule);
    }

    n = n + 1;
}

function obtenirElementsDuTableau() {
    matrice = [];
    matriceInitiale = [];
    for (var i = 0; i < n; i++) {
        matrice.push([]);
        matriceInitiale.push([]);
    }
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            if (i == j) {
                matrice[i].push(null);
                matriceInitiale[i].push(null);
            } else {
                matrice[i].push(parseInt(tableau.childNodes[i + 1].childNodes[j + 1].childNodes[0].value));
                matriceInitiale[i].push(parseInt(tableau.childNodes[i + 1].childNodes[j + 1].childNodes[0].value));
            }
        }
    }
}

function miniCo() {
    changerTableau();
    var mins = [];
    var ligne = document.createElement('tr');
    var cellule = document.createElement('th');
    ligne.appendChild(cellule);
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            if (matrice[j][i] != null) {
                if (mins[i] == undefined) {
                    mins.push(matrice[j][i]);
                } else {
                    mins[i] = matrice[j][i];
                }
            }
        }
    }

    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            if (matrice[j][i] != null) {
                if (parseInt(matrice[j][i]) < parseInt(mins[i])) {
                    mins[i] = matrice[j][i];
                }
            }
        }
    }
    for (var i = 0; i < n; i++) {
        cellule = document.createElement('th');
        cellule.innerHTML = mins[i];
        ligne.appendChild(cellule);
    }
    ligne.id = 'miniCo';
    tableau.appendChild(ligne);

    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            if (matrice[j][i] != null) {
                matrice[j][i] -= mins[i];
            }
        }
    }
    if (!revenir) {
        R += somme(mins);
    }
    revenir = false;
    return mins;
}

function miniLi() {
    changerTableau();
    var mins = [];
    var cellule = document.createElement('th');
    cellule.className = 'miniLi';
    tableau.childNodes[0].appendChild(cellule);
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            if (matrice[i][j] != null) {
                if (mins[i] == undefined) {
                    mins.push(matrice[i][j]);
                } else {
                    mins[i] = matrice[i][j];
                }
            }
        }
    }

    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            if (matrice[i][j] != null) {
                if (parseInt(matrice[i][j]) < parseInt(mins[i])) {
                    mins[i] = matrice[i][j];
                }
            }
        }
    }

    for (var i = 0; i < n; i++) {
        cellule = document.createElement('th');
        cellule.className = 'miniLi';
        cellule.innerHTML = mins[i];
        tableau.childNodes[i + 1].appendChild(cellule);
    }

    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            if (matrice[i][j] != null) {
                matrice[i][j] -= mins[i];
            }
        }
    }
    if (!revenir) {
        R += somme(mins);
    }
    return mins;
}

function changerTableau() {
    var ligne;
    var cellule;

    for (var i = tableau.childNodes.length - 1; i >= 0; i--) {
        tableau.childNodes[i].parentNode.removeChild(tableau.childNodes[i]);
    }

    ligne = document.createElement('tr');
    cellule = document.createElement('th');
    cellule.className = 'cellule';
    ligne.appendChild(cellule);
    tableau.appendChild(ligne);

    for (var i = 0; i < ligneLabels.length; i++) {
        ligne = document.createElement('tr');
        cellule = document.createElement('th');
        cellule.innerHTML = ligneLabels[i];
        cellule.className = 'cellule';
        ligne.appendChild(cellule);
        tableau.appendChild(ligne);
    }

    for (var i = 0; i < tableau.childNodes.length; i++) {
        for (var j = 0; j < colonneLabels.length; j++) {
            if (i == 0) {
                cellule = document.createElement('th');
                cellule.innerHTML = colonneLabels[j];
            } else {
                cellule = document.createElement('td');
                cellule.className = 'cellule';
                if (matrice[i - 1][j] == null) {
                    cellule.classList.add('mena');
                } else {
                    cellule.innerHTML = matrice[i - 1][j];
                }
            }
            tableau.childNodes[i].appendChild(cellule);
        }
    }
    if (tableauRegret != null) {
        divTableau.removeChild(tableauRegret);
        tableauRegret = null;
    }
}

function regret() {
    b2 = R;
    if (b1 != 0 && b1 < b2) {
        R = b1;
        b2 = R;
        revenir = true;
        n++;
        matriceAvantSuppression[indicesPossibleCheminParasite[0]][indicesPossibleCheminParasite[1]] = null;
        obtenirAncienMatrice();
        changerTableau();

    } else {
        
        console.log('b2 = ' + b2);
        tableauRegret = document.createElement('table');
        var ligne = document.createElement('tr');
        var cellule = document.createElement('th');
        cellule.className = 'cellule';
        ligne.appendChild(cellule);
        tableauRegret.appendChild(ligne);
        for (var i = 0; i < ligneLabels.length; i++) {
            ligne = document.createElement('tr');
            cellule = document.createElement('th');
            cellule.innerHTML = ligneLabels[i];
            cellule.className = 'cellule';
            ligne.appendChild(cellule);
            tableauRegret.appendChild(ligne);
        }
        for (var i = 0; i < tableauRegret.childNodes.length; i++) {
            for (var j = 0; j < colonneLabels.length; j++) {
                if (i == 0) {
                    cellule = document.createElement('th');
                    cellule.innerHTML = colonneLabels[j];
                } else {
                    cellule = document.createElement('td');
                }
                cellule.className = 'cellule';
                tableauRegret.childNodes[i].appendChild(cellule);
            }
        }
        for (var i = 0; i < matrice.length; i++) {
            for (var j = 0; j < matrice[0].length; j++) {
                if (matrice[i][j] == null) {
                    tableauRegret.childNodes[i + 1].childNodes[j + 1].classList.add('mena');
                }
                if (matrice[i][j] == 0) {
                    var s = sommeMinimunLigneColonne(i, j);
                    indiceRegret.push([i, j]); // [[3,4],[5,7],[8,4]]
                    regrets.push(s);
                    tableauRegret.childNodes[i + 1].childNodes[j + 1].innerHTML = s;
                }
            }
        }
        divTableau.appendChild(tableauRegret);
    }
}

function marquerZero() {
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            if (matrice[i][j] == 0) {
                tableau.childNodes[i + 1].childNodes[j + 1].className += ' rouge';
            }
        }
    }
}


function somme(tab) {
    var s = 0;
    for (var i = 0; i < tab.length; i++) {
        s += tab[i];
    }
    return s;
}

function sommeMinimunLigneColonne(indiceLigne, indiceColonne) {
    var minLi;
    var minCo;
    for (var j = 0; j < matrice[indiceLigne].length; j++) {
        if (matrice[indiceLigne][j] != null && j != indiceColonne) {
            if (minLi == undefined) {
                minLi = matrice[indiceLigne][j];
            } else {
                if (matrice[indiceLigne][j] < minLi) {
                    minLi = matrice[indiceLigne][j];
                }
            }
        }
    }

    for (var i = 0; i < matrice.length; i++) {
        if (matrice[i][indiceColonne] != null && i != indiceLigne) {
            if (minCo == undefined) {
                minCo = matrice[i][indiceColonne];
            } else {
                if (matrice[i][indiceColonne] < minCo) {
                    minCo = matrice[i][indiceColonne];
                }
            }
        }
    }
    return minLi + minCo;
}

function supprimerLigneColonneChemin() {
    copierMatrice();
    indiceRegretMax = indiceMax(regrets);
    var indiceLigneASupprimer = indiceRegret[indiceRegretMax][0];
    var indiceColonneASupprimer = indiceRegret[indiceRegretMax][1];
    indicesPossibleCheminParasite = [];
    indicesPossibleCheminParasite.push(indiceLigneASupprimer);
    indicesPossibleCheminParasite.push(indiceColonneASupprimer);
    sommetsVisited.push([ligneLabels[indiceLigneASupprimer], colonneLabels[indiceColonneASupprimer]]);
    supprimerLigne(indiceLigneASupprimer);
    supprimerColonne(indiceColonneASupprimer);
    ligneLabels.splice(indiceLigneASupprimer, 1);
    colonneLabels.splice(indiceColonneASupprimer, 1);
    b1 = R + regrets[indiceRegretMax];
    console.log('b1 = ' + b1);
    n--;
    regrets = [];
    indiceRegret = [];
    bloquerCheminsParasite();
    changerTableau();
    val.push({B1 : b1 , B2 : b2 });

    //console.log("k=" ,k) ; console.log("vistide =" ,trierSommetsVisitedAvecLeDernier().length)
    if(etape)
    {
        for (var i = 0; i < trierSommetsVisitedAvecLeDernier().length; i++) {
        //console.log("mandeha")
            sary.push({ from: trierSommetsVisitedAvecLeDernier()[i][0], to: trierSommetsVisitedAvecLeDernier()[i][1] })
        }
     
      if(test==0){
            arbre = [{key : "R" , name : "R = " + Riniale}];
            parent1 = "R";
            parent2 = "R";
        }
        
        arbre.push({key : sary[test].to + sary[test].from  , parent : parent2, name : sary[test].to + sary[test].from }); //b1
        arbre.push({key : sary[test].from + sary[test].to ,  parent : parent1, name : sary[test].from + sary[test].to }); //b2
        

        parent1 = sary[test].from + sary[test].to;
        parent2 = sary[test].to + sary[test].from ;
        
        test++;
        
        
     
    arbreSchema()
   init2()
   //arbre()
   if(colonneLabels.length == 1) {
        for (var i = 0; i < trierSommetsVisitedAvecLeDernier().length; i++) {
        console.log("mandeha")
            sary.push({ from: ligneLabels[i], to: colonneLabels[i] })
        }
     
   init2()
   }
    }
    

}

function supprimerLigne(indiceLigne) {
    matrice.splice(indiceLigne, 1);
}

function supprimerColonne(indiceColonne) {
    for (var i = 0; i < matrice.length; i++) {
        matrice[i].splice(indiceColonne, 1);
    }
}

function indiceMax(t) { // t.length > 0
    var indMax = 0;
    for (var i = 0; i < t.length; i++) {
        if (t[i] > t[indMax]) {
            indMax = i;
        }
    }
    return indMax;
}

function bloquerCheminsParasite() {
    var sommetsVisitedTrieAvecLeDernier = trierSommetsVisitedAvecLeDernier();
    var indicesCheminParasites = [];
    indicesCheminParasites.push(indiceLigne(sommetsVisitedTrieAvecLeDernier[sommetsVisitedTrieAvecLeDernier.length - 1][1]));
    indicesCheminParasites.push(indiceColonne(sommetsVisitedTrieAvecLeDernier[0][0]));
    matrice[indicesCheminParasites[0]][indicesCheminParasites[1]] = null;
}


function indiceLigne(sommet) {
    var indice;
    for (var i = 0; i < ligneLabels.length; i++) {
        if (ligneLabels[i] == sommet) {
            indice = i;
        }
    }
    return indice;
}

function indiceColonne(sommet) {
    var indice;
    for (var i = 0; i < colonneLabels.length; i++) {
        if (colonneLabels[i] == sommet) {
            indice = i;
        }
    }
    return indice;
}

function trierSommetsVisitedAvecLeDernier() {
    var sommetsVisitedTemp = [];
    for (var i = 0; i < sommetsVisited.length; i++) {
        sommetsVisitedTemp.push([sommetsVisited[i][0], sommetsVisited[i][1]]);
    }
    var ind = sommetsVisitedTemp.length - 1;
    var sommetsVisitedTrie = [sommetsVisitedTemp[sommetsVisitedTemp.length - 1]];
    sommetsVisitedTemp.splice(ind, 1);
    var nampiditraGlob = true;
    while ((sommetsVisitedTemp.length > 0) && (nampiditraGlob == true)) {
        nampiditraGlob = false;
        var i = 0
        while (i < sommetsVisitedTemp.length) {
            var nampiditra = false;
            if (sommetsVisitedTemp[i][0] == sommetsVisitedTrie[sommetsVisitedTrie.length - 1][1]) {
                sommetsVisitedTrie.push(sommetsVisitedTemp[i]);
                nampiditra = true;
            } else if (sommetsVisitedTemp[i][1] == sommetsVisitedTrie[0][0]) {
                sommetsVisitedTrie.unshift(sommetsVisitedTemp[i]);
                nampiditra = true;
            }

            if (nampiditra) {
                nampiditraGlob = true;
                sommetsVisitedTemp.splice(i, 1);
            } else {
                i++;
            }
        }
    }
    return sommetsVisitedTrie;
}

function copierMatrice() {
    matriceAvantSuppression = [];
    ligneLabelsAvantSuppression = [];
    colonneLabelsAvantSuppression = [];
    sommetsVisitedAvantSuppression = [];

    for (var i = 0; i < matrice.length; i++) {
        matriceAvantSuppression.push([]);
        for (var j = 0; j < matrice[i].length; j++) {
            matriceAvantSuppression[i].push(matrice[i][j]);
        }
    }

    for (var i = 0; i < ligneLabels.length; i++) {
        ligneLabelsAvantSuppression.push(ligneLabels[i]);
    }

    for (var i = 0; i < colonneLabels.length; i++) {
        colonneLabelsAvantSuppression.push(colonneLabels[i]);
    }

    for (var i = 0; i < sommetsVisited.length; i++) {
        sommetsVisitedAvantSuppression.push([sommetsVisited[i][0], sommetsVisited[i][1]]);
    }
}

function obtenirAncienMatrice() {
    matrice = [];
    ligneLabels = [];
    colonneLabels = [];
    sommetsVisited = [];

    for (var i = 0; i < matriceAvantSuppression.length; i++) {
        matrice.push([]);
        for (var j = 0; j < matriceAvantSuppression[i].length; j++) {
            matrice[i].push(matriceAvantSuppression[i][j]);
        }
    }

    for (var i = 0; i < ligneLabelsAvantSuppression.length; i++) {
        ligneLabels.push(ligneLabelsAvantSuppression[i]);
    }

    for (var i = 0; i < colonneLabelsAvantSuppression.length; i++) {
        colonneLabels.push(colonneLabelsAvantSuppression[i]);
    }

    for (var i = 0; i < sommetsVisitedAvantSuppression.length; i++) {
        sommetsVisited.push([sommetsVisitedAvantSuppression[i][0], sommetsVisitedAvantSuppression[i][1]]);
    }
}

var vita = false;

function resultatFinal() {
    obtenirElementsDuTableau();
    while (n > 1) {
        
        miniLi();
        changerTableau();
        miniCo();
        
        changerTableau();
        if(Riniale == undefined)
            {
                Riniale = R;
            }
        regret();
        if (revenir) {
            miniLi();
            changerTableau();
            miniCo();
            changerTableau();
            regret();
        }
        supprimerLigneColonneChemin();
    }
    sommetsVisited.push([ligneLabels[0], colonneLabels[0]]);
    console.log(sommetsVisited);
    console.log(trierSommetsVisitedAvecLeDernier());
    traiterVal()
    vita = true;
    if (vita == true) {
        for (var i = 0; i < sommetsVisited.length; i++) {
            sary.push({ from: sommetsVisited[i][0], to: sommetsVisited[i][1] })
        }
        if(test==0){
            arbre = [{key : "R" , name : "R = " + Riniale}];
            parent = "R";
           
        }
    
    calculeArbre(val , parent)
    }

    arbreSchema()
    init();
}

function init() {
    var monCle1 = [];
    for (var i = 0; i < sary.length; i++) {
        monCle1.push({
            key: sommetsVisited[i][0],
        })
    }

    if (window.goSamples) goSamples(); // init for these samples -- you don't need to call this
    var $ = go.GraphObject.make;

    myDiagram =
        $(go.Diagram, "myDiagramDiv", // create a Diagram for the DIV HTML element
            {
                initialAutoScale: go.Diagram.Uniform,
                isTreePathToChildren: false, // links go from child to parent
                // layout: $(SpiralLayout) // defined in SpiralLayout.js
            });

    myDiagram.nodeTemplate =
        $(go.Node, go.Panel.Auto, { locationSpot: go.Spot.Center },
            $(go.Shape, { figure: "Circle", fill: "white" },
                new go.Binding("fill", "color")),
            $(go.TextBlock, { margin: 4 },
                new go.Binding("text", "key")));

    myDiagram.linkTemplate =
        $(go.Link, { curve: go.Link.Bezier, curviness: 10 },
            $(go.Shape),
            $(go.Shape, { toArrow: "Standard" }));

    var model = new go.TreeModel();
    model.nodeParentKeyProperty = "next";
    // myDiagram =
    //     $(go.Diagram, "myDiagramDiv", { // enable Ctrl-Z to undo and Ctrl-Y to redo
    //         "undoManager.isEnabled": true,
    //         layout: $(go.TreeLayout, // specify a Diagram.layout that arranges trees
    //             {
    //                 angle: 90,
    //                 layerSpacing: 35
    //             })
    //     });

    // myDiagram.nodeTemplate =
    //     $(go.Node, go.Panel.Auto, { locationSpot: go.Spot.Center },
    //         new go.Binding("location", "loc", go.Point.parse),
    //         $(go.Shape, { figure: "Circle", fill: "white" },
    //             new go.Binding("fill", "color")),
    //         $(go.TextBlock, { font: "bold 11pt sans-serif" },
    //             new go.Binding("text"))
    //     );

    // for (var i = 1; i <= sary.length; i++) {
    //     visitede.push({
    //         from: sary[i - 1][0],
    //         to: sary[i][1]
    //     })

    // }

    myDiagram.model = $(go.GraphLinksModel);
    myDiagram.model.nodeDataArray = monCle1;
    myDiagram.model.linkDataArray = sary;
    /* myDiagram.model.nodeDataArray = 
     [
        {key:"marion"},
        {key:"menye"},
        {key:"kererion"},
        {key:"crist"}
     ]*/


    myDiagram.layout = $(go.CircularLayout);

}


//suprimer amin click

function init2(){
         etape = true

        for (var i = 0; i < colonneLabels.length; i++) {
        monCle.push({
            key: colonneLabels[i],
        })
    }
        

    if (window.goSamples) goSamples(); // init for these samples -- you don't need to call this
    var $ = go.GraphObject.make;
if (div == 0){
    myDiagram =
        $(go.Diagram, "myDiagramDiv", // create a Diagram for the DIV HTML element
            {
                initialAutoScale: go.Diagram.Uniform,
                isTreePathToChildren: false, // links go from child to parent
                // layout: $(SpiralLayout) // defined in SpiralLayout.js
            });

    myDiagram.nodeTemplate =
        $(go.Node, go.Panel.Auto, { locationSpot: go.Spot.Center },
            $(go.Shape, { figure: "Circle", fill: "white" },
                new go.Binding("fill", "color")),
            $(go.TextBlock, { margin: 4 },
                new go.Binding("text", "key")));

    

        var model = new go.TreeModel();
    model.nodeParentKeyProperty = "next";
    myDiagram.model = $(go.GraphLinksModel);
    myDiagram.model.nodeDataArray = monCle;

}
    
 else
 {
    var model = new go.TreeModel();
    model.nodeParentKeyProperty = "next";
    console.log("div =" , div)
    myDiagram.linkTemplate =
        $(go.Link, { curve: go.Link.Bezier, curviness: 10 },
            $(go.Shape),
            $(go.Shape, { toArrow: "Standard" }));
           /* myDiagram.model.linkDataArray = [];*/
            myDiagram.model.linkDataArray = sary;
 }
    

    myDiagram.layout = $(go.CircularLayout);
    div++;
    sary = [];
}



//---------------------------------
function arbreSchema() {
 if (window.goSamples) goSamples(); // init for these samples -- you don't need to call this
    var $ = go.GraphObject.make;
    
if (div1 == 0){
 

var myDiagram =
  $(go.Diagram, "myDiagramDiv2",
    {
      "undoManager.isEnabled": true,
      layout: $(go.TreeLayout,
                { angle: 90, layerSpacing: 35 })
    });

// the template we defined earlier
myDiagram.nodeTemplate =
  $(go.Node, "Horizontal",
    { background: "#44CCFF" },
    $(go.Picture,
      { margin: 10, width: 50, height: 50, background: "red" },
      new go.Binding("source")),
    $(go.TextBlock, "Default Text",
      { margin: 12, stroke: "white", font: "bold 16px sans-serif" },
      new go.Binding("text", "name"))
  );

// define a Link template that routes orthogonally, with no arrowhead
myDiagram.linkTemplate =
  $(go.Link,
    { routing: go.Link.Orthogonal, corner: 5 },
    $(go.Shape, // the link's path shape
      { strokeWidth: 3, stroke: "#555" }));
var model = $(go.TreeModel);
model.nodeDataArray = arbre
myDiagram.model = model;
}
else {
    var model = $(go.TreeModel);
    model.nodeParentKeyProperty = "next";
    model.nodeDataArray = arbre;
    
}

div1++;
}

function calculeArbre(val , P , Pb1= null , Pb2 = null) {
    for (var i = 0; i < trierSommetsVisitedAvecLeDernier().length -1; i++) {
          
        
        arbre.push({key : sary[test].to + sary[test].from  , parent : P, name : sary[test].from + sary[test].to +" = " + val[test].B1 ,source :"B1.png" }); //b1
        arbre.push({key : sary[test].from + sary[test].to ,  parent : P, name : sary[test].from + sary[test].to + " = " + val[test].B2 ,source :"B2.png"  }); //b2
        
        valb1 = val[test].B1;
        valb2 = val[test].B2;
        if(!isNaN(valb1) && !isNaN(valb1)){
            if(valb1 > valb2){
            console.log("lasa b1 be");
            P = sary[test].from + sary[test].to;
            test++;
             }
            
            else if (valb1 = valb2) {
                    P = sary[test].from + sary[test].to;
                    test++;
                    }
            else {
                console.log("lasa b2 be");
                P = sary[test].to + sary[test].from ;
                test++;
            }
        }
        else
            {
            console.log("lasa3");
                if(!isNaN(valb1)){

                    P = sary[test].to + sary[test].from ;
                    //test++;
                }
            else
                      P = sary[test].from + sary[test].to; 
                     // test ++; 
            }
        
        
    }
 arbre.push({key : ligneLabels[0] + colonneLabels [0]  , parent : P, name : ligneLabels[0] + colonneLabels [0] +" = " + val[test].B1 ,source :"B1.png" }); //b1
    arbre.push({key : ligneLabels[0] + colonneLabels [0] ,  parent : P, name : ligneLabels[0] + colonneLabels [0] + " = " + val[test].B2 ,source :"B2.png"  }); //b2
}
function traiterVal()
{
    for(var i = 0 ; i <val.length - 1; i++){
        val[i].B2 = val[i+1].B2;
    }
    val[val.length-1].B2 = R
    return val;
}