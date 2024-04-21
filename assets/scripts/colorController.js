



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

// handles when a swatch is clicked
function onSwatchClick(ev) {
   
    ev.preventDefault();
    let color = ev.target.classList[2];
    color = color.slice(4);
    color = color.replaceAll("]", "");
    $("#colorSelect").val(color);

    $("#colorSearch").val(color);
    debugger;
    //get swatch [0] hex pass to get SchemeByHex with for loop for the schemes

}

// creates a container based on pased objs containing relevant attributes and data [ {attr: {}, data: {}} ]
function createContainer(containerObj, contentObj, footerObj) {

    let ch = footerObj ? 'h-5/6' : "h-full";
    // calls the toolBox.js function to craete an element with tag type, html attributes, and relevant data to attach to the dom/jquery object
    let _container = generateElement("div",
        containerObj.attr,
        containerObj.data);

    // calls the toolBox.js function to craete an element with tag type, html attributes, and relevant data to attach to the dom/jquery object
    // then assigns an handler to its' click event and attaches it to the _container 
    let _content = generateElement("div", contentObj.attr, contentObj.data);//.css({ backgroundColor: `#${hex}` }).on('click', onSwatchClick);
    _content.on('click', onSwatchClick);

    _container.append(_content);
    // footerObj is an overload argument [not every container is going to need a footer]
    // if footerObj was not passed we return the container, otherwise create and append the footer and return the container
    if (footerObj) {

        let _footer = generateElement("footer",
            footerObj.attr,
            footerObj.data);
        _footer.text(footerObj.data);
        _container.append(_footer)
    }
    return _container;

}

// creates a container for a single row and row children with passed attr, data, and children.
// children[] contains child attribute and data objects 
// returns container and children
function createRowContainer(attr, data, children) {

    let row = generateElement('div', attr, data);
    let rowEls = [];
    const length = children.length;
    for (let i = 0; i < length; i++) {
        let container = createContainer(children[i].containerObj, children[i].contentObj, children[i].footerObj)

        rowEls.push(container);
    }

    row.append(rowEls);
    return row;
}

// Creates swatch attribute and data objects and returns the resulting array of
/*
     
*/
function generateSwathRowData(mode, colors) {
    let rowObjs = [];
    const length = colors.length;
    //  length = length > 6 ? 6 : length;
    for (let i = 0; i < length; i++) {
        const swatchContainerAttr = {
            id: `${mode}Color${i}`,

            class: `w-1/${length} h-16 flex flex-row flex-wrap items-start`,
        }
        const swatchAttr = {
            class: `w-full h-9 bg-[${colors[i].hex.value}]`,
            // style: { backgroundColor: `${colors[i].hex.value}` }
        }
        let footer = {
            attr: { class: "w-full h-7 bg-white text-black text-base text-center" },
            data: `${colors[i].hex.value}`
        }

        rowObjs.push({
            containerObj: {
                attr: swatchContainerAttr,
                data: ""
            },
            contentObj: {
                attr: swatchAttr,
                data: colors[i]
            },
            footerObj: footer
        }
        );
    }
    return rowObjs;

    // let swatc
}

async function getSchemeByHex(hex, type) {
    let ps = `https://www.thecolorapi.com/scheme?hex=${hex}&format=json&mode=${type}`;
    fetch(ps).then(result => result.json()).then(result => {
        let rowAttr = {
            id: result.mode,
            class: "flex flex-row w-full",
        }
        // let row = generateElement('div', rowAttr, result);
        let rowBabies = [];
        const length = result.colors.length;
        //  length = length > 6 ? 6 : length;
        rowBabies = generateSwathRowData(result.mode, result.colors);


        if (rowBabies.length > 0) {
            row = createRowContainer(rowAttr, result, rowBabies);
            // row = //createRowContainer({ attr: rowAttr, result }, rowBabies)
        }

        // row.append(rowBabies);

        $("#swatchContainer").append(row);
        // setItem('currentScheme', result);

        // may need to set up async and set a variable instead of return
        // return result
    })
}

function testGenerics() {

    $('#swatchContainer').empty();
    let scheme = getItem('currentScheme');
    let attr = {
        id: scheme.mode,
        class: "flex flex-row w-full",
    }
    let rowChildnre = generateSwathRowData(scheme.mode, scheme.colors);
    let row = createRowContainer(attr, scheme, rowChildnre);
    $("#swatchContainer").append(row);
}

// takes string entered in search bar and makes it into a format that can be compared to saved list of names


function renderSchemes(colorData) {
    localStorage.setItem('scheme', colorData);
    debugger;
    $('#swatchContainer').empty();
    schemes.forEach(type => {
        console.log(colorData)
        getSchemeByHex(colorData, type);
    })

}


// returns a obj with color data (hex/rgb/name/families) based on passed string
function findColorDataByName(name) {
    // removes all white space
    name = name.replaceAll(" ", "");
    name = name.toUpperCase();

    let colorData = colors.find((element) => element.name == name);
    // this needs to be expanded to have rbg formatted for passing to qs
    return colorData;
    //getColorByHex(colorData.hex.slice(1));
    //gets all the schemes yo


}

// colorPickerClicked
function onColorPickerClick(ev) {
    // this is when the color picker element is fist clicked
}

// when color picker closes and value changes, parse value to workable string and run a test
function onColorPickerChange(ev) {
    let colorHash = ev.target.value;
    // colorHash = colorHash.slice(1);
   // renderSchemes(colorHash.slice(1));
    //  getColorByHex(colorHash);
}

function onColorPickerInput(ev) {
    let colorHash = ev.target.value;
    $('#colorSearch').val(colorHash);
    colorHash = colorHash.slice(1);
    // getColorByHex(colorHash);
    // this is when a color value is input
}

function onColorSearch(ev) {
    ev.preventDefault();
    let colorInput = $("#colorSearch");
    let colorString = colorInput.val();
    if(colorInput.val().indexOf('#')==-1) {
        colorString = findColorDataByName(colorString).hex;
    }
    
    $("#colorSelect").val(colorString);
    colorString = colorString.replaceAll('#',"");
    renderSchemes(colorString);
   
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
    colorSearchBtn.on('click', onColorSearch)

    colorSelect.on('click', onColorPickerClick);
    colorSelect.on('change', onColorPickerChange);
    colorSelect.on('input', onColorPickerInput);

    colorInput.on("keydown", function (e) {
        debugger;
        if (e.keyCode == 13) {
            onColorSearch(e)
        }
    });

    let lastScheme = localStorage.getItem('scheme');
    debugger;
    renderSchemes(lastScheme ? lastScheme : findColorDataByName('red').hex.slice(1));

});