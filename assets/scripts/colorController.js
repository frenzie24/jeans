



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

function getSchemeByHex(hex, type) {
    let ps = `https://www.thecolorapi.com/scheme?hex=0047AB${hex}&format=json&mode=${type}&count=6`;
    fetch(ps).then(result => result.json()).then(result => {
        setItem('currentScheme', result);
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
    getSchemeByHex(colorData.hex.slice(1), 'analogic');

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
    let colorHash = ev.target.value;
    colorHash = colorHash.slice(1);
   // getColorByHex(colorHash);
    // this is when a color value is input
}

function onColorSearch(ev) {
    ev.preventDefault();
    let colorInput = $("#colorSearch");
    
    findColorDataByName(colorInput.val());
}

function onColorSearchBtnClick(ev) {
    ev.preventDefault();
    let btn = $('#'+ev.target.id);
    let colorString = $('#colorSearch').val();
    if(colorString == '') {
        // if the input is empty cancel it 
        return;
    }
    findColorDataByName(colorString);
}

// document ready 
$(() => {
    //color search bar jquery obj
    let colorInput = $("#colorSearch")
    // color picker jquery obj
    let colorSelect = $("#colorSelect")
    
    //add click listener to imageSearchBtn
    let colorSearchBtn = $('#colorSearchBtn');

    // add click event to csbtn
    colorSearchBtn.on('click', onColorSearchBtnClick)

    colorSelect.on('click', onColorPickerClick);
    colorSelect.on('change', onColorPickerChange);
    colorSelect.on('input', onColorPickerInput);
    
    colorInput.on("keydown", function (e) {
        if (e.keyCode == 13) {
            onColorSearch(e)
        }
    });
});