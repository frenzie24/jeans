


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

function getColorByHex(colorData) {
    let qs = `https://www.thecolorapi.com/id?hex=${colorData}&format=json`
    fetch(qs).then(result => result.json()).then(result => {
        setItem('currentColor', result);
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

function getSchemeByHex(colorData) {
    fetch(ps).then(result => result.json()).then(result => {
        setItem('currentScheme', result.colors);
        debugger;
        // may need to set up async and set a variable instead of return
        // return result
    });
}

// takes string entered in search bar and makes it into a format that can be compared to saved list of names
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
    getColorByHex(colour);
}


// returns a obj with color data (hex/rgb/name/families) based on passed string
function findColorDataByName(name) {
    // removes all white space
    name = name.replaceAll(" ", "");
    name = name.toUpperCase();

    let colorData = colors.find((element) => element.name == name);
    // this needs to be expanded to have rbg formatted for passing to qs

    getColorByHex(colorData.hex.slice(1));
    getSchemeByHex(colorData.hex.slice(1));

}

// colorPickerClicked
function onColorPickerClick(ev) {
    // this is when the color picker element is fist clicked
}

// when color picker closes and value changes, parse value to workable string and run a test
function onColorPickerChange(ev) {
    let colorHash = ev.target.value;
    colorHash = colorHash.slice(1);
    getColorByHex(colorHash);
}

function onColorPickerInput(ev) {
    // this is when a color value is input
}

function onColorSearch(ev) {
    ev.preventDefault();
    let colorInput = $("#colorSearch");
    debugger;
    findColorDataByName(colorInput.val());
}

// document ready 
$(() => {
    let colorInput = $("#colorSearch")
    let colorSelect = $("#colorSelect")
    
    //add click listener to imageSearchBtn
  
    colorSelect.on('click', onColorPickerClick);
    colorSelect.on('change', onColorPickerChange);
    colorSelect.on('input', onColorPickerInput);
    
    colorInput.on("keydown", function (e) {
        if (e.keyCode == 13) {
            onColorSearch(e)
        }
    });
});