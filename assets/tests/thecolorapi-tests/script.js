// fetch(arg).then(response => response.json()).then(result => {
//     //do work

let ps = 'https://www.thecolorapi.com/scheme?hex=0047AB&rgb=0,71,171&hsl=215,100%,34%&cmyk=100,58,0,33&format=json&mode=analogic&count=6'
let qs = "https://www.thecolorapi.com/id?name=blue&format=json"
// "https://www.thecolorapi.com/id?hex=0047AB&rgb=0,71,171&hsl=215,100%,34%&cmyk=100,58,0,33&format=json"
/*
"https://www.thecolorapi.com/id
?hex=0047AB
&rgb=0,71,171
&hsl=215,100%,34%
&cmyk=100,58,0,33
&format=html"
*/
function runTest(colorData) { 
    fetch(qs).then(result => result.json()).then(result => {
        debugger;
    });

 }
 /*
'https://www.thecolorapi.com/scheme
?hex=0047AB
&rgb=0,71,171
&hsl=215,100%,34%
&cmyk=100,58,0,33
&format=json
&mode=analogic
&count=6'
 */

 function runSchemeTest(colorData) { 
    fetch(ps).then(result => result.json()).then(result => {
        debugger;
    });}
