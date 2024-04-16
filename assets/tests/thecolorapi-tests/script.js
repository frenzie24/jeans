// fetch(arg).then(response => response.json()).then(result => {
//     //do work

let ps = 'https://www.thecolorapi.com/scheme?hex=0047AB&rgb=0,71,171&hsl=215,100%,34%&cmyk=100,58,0,33&format=json&mode=analogic&count=6'
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
    let qs = `https://www.thecolorapi.com/id?hex=${colorData}&format=json`
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
    });
}

const stringToColour = (str) => {
    let hash = 0;
    str.split('').forEach(char => {
        hash = char.charCodeAt(0) + ((hash << 5) - hash)
    })
    let colour = '#'
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff
        colour += value.toString(16).padStart(2, '0')
    }
    runTest(colour);
}

function findColorHeXRBGByName(name) {
    name = name.replaceAll(" ", "");
    name = name.toUpperCase();

    let colorData = colors.find((element) => element.name == name);

    debugger;

    runTest(colorData.hex.slice(1));


}