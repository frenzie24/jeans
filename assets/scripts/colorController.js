



// "https://www.thecolorapi.com/id?hex=0047AB&rgb=0,71,171&hsl=215,100%,34%&cmyk=100,58,0,33&format=json"

const rowClassString = ``;
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
    _content.on('dblclick', onSwatchDblClick);
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

    const rowHeaderClass = `border-t-1 order-solid min-w-full h-6 bg-[${attr.primary}] text-[${invertColor(attr.primary)}] max-[500px]:text-xs max-[500px]:font-bold text-base font-bold text-center`;

    let header = generateElement('div', { id: attr.id + "Header", class: rowHeaderClass });
    header.addClass('text-shadow: 1px 1px 2px pink');
    header.text(attr.id.toUpperCase());
    let rowEls = [];
    const length = children.length;
    for (let i = 0; i < length; i++) {
        let container = createContainer(children[i].containerObj, children[i].contentObj, children[i].footerObj)

        rowEls.push(container);
    }

    row.append(rowEls);
    row.prepend(header);

    return row;
}

// api call to retrevieve color by hex value passed
function getColorByHex(colorData) {
    let qs = `https://www.thecolorapi.com/id?hex=${colorData}&format=json`
    fetch(qs).then(result => result.json()).then(result => {
        setItem('currentColor', result);

    });

}

// renders color schemes 
// async function to get schemes by hex and mode from api
async function getSchemeByHex(hex, mode) {
    // allows schemes to be drawn based on # of useful entries in pallette
    let count = 5;
    if (mode == "quad") count = 4;
    if (mode == "triad") count = 3;

    let ps = `https://www.thecolorapi.com/scheme?hex=${hex}&format=json&mode=${mode}&count=${count}`;

    fetch(ps).then(result => result.json()).then(result => {
        let rowAttr = {
            id: result.mode,
            class: `flex flex-row flex-wrap w-full text-[#${hex}]`,
            primary: `#${hex}`
        }
        let rowBabies = [];
        const length = result.colors.length;
        rowBabies = generateSwatchRowData(result.mode, result.colors);


        if (rowBabies.length > 0) {
            row = createRowContainer(rowAttr, result, rowBabies);
        }

        $("#swatchContainer").append(row);



    }).catch(err => {
        if (err instanceof TypeError && err.message.includes('API key')) {
            console.error('Invalid API key:', err);
        } else {
            console.error('There was a problem with the Fetch operation:', err);
        }
    })
}


/* Creates [] of rowObj from passed mode and [] of colors, then returns the resulting []

{
    // rowObj
    {
        //containerObj
        attr: {},
        data: {},
    }, 
    {
        //contentObj
        attr: {},
        data: {},
    }, 
    {
        //footerObj
        attr: {},
        data: {},
    }
}

*/
function generateSwatchRowData(mode, colors) {
    let rowObjs = [];
    const length = colors.length;
    for (let i = 0; i < length; i++) {
        const hex = `${colors[i].hex.value}`;


        const swatchContainerAttr = {
            id: `${mode}Color${i}`,
            class: `${hoverAnimString} w-1/${length} h-14 flex flex-row flex-wrap items-start`,
        }
        const swatchAttr = {
            class: `w-full h-8 bg-[${hex}]`,
            // style: { backgroundColor: `${colors[i].hex.value}` }
        }
        let footer = {
            attr: { class: `w-full h-6 bg-gray-${(i % 2 + 1) * 100} mix-blend-normal text-black max-[500px]:text-xs max-[500px]:font-bold text-base font-bold text-center ` },
            data: `${hex}`
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
}

// takes string entered in search bar and makes it into a format that can be compared to saved list of names
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

}

function onColorPickerInput(ev) {
    let colorHash = ev.target.value;
    $('#colorSearch').val(colorHash);
    colorHash = colorHash.slice(1);

    // this is when a color value is input
}

function onColorSearch(ev) {
    ev.preventDefault();
    try {
        let colorInput = $("#colorSearch");
        let colorString = colorInput.val();
        if (colorInput.val().indexOf('#') == -1) {
            colorString = findColorDataByName(colorString).hex;
        }

        $("#colorSelect").val(colorString);
        colorString = colorString.replaceAll('#', "");
        renderSchemes(colorString);
    } catch (err) {
        $('#colorSearch').val('Try Again');
    }
}

// handles when a swatch is clicked
function onSwatchClick(ev) {

    ev.preventDefault();
    let color = ev.target.classList[2];
    color = color.slice(4);
    color = color.replaceAll("]", "");
    $("#colorSelect").val(color);

    $("#colorSearch").val(color);

    //get swatch [0] hex pass to get SchemeByHex with for loop for the schemes

}

// handles when a swatch is clicked
function onSwatchDblClick(ev) {

    ev.preventDefault();
    let color = $("#colorSearch").val().replaceAll("#", "");
    renderSchemes(color);

    debugger;
    //get swatch [0] hex pass to get SchemeByHex with for loop for the schemes

}

async function renderSchemes(colorData) {
    localStorage.setItem('scheme', colorData);
    debugger;
    let swatchContainer = $('#swatchContainer');
    swatchContainer.empty()

    schemes.forEach(type => {
        console.log(colorData)
        getSchemeByHex(colorData, type);

    });



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
    colorSelect.val(`#${lastScheme}`);
    colorInput.val(`#${lastScheme}`);
    renderSchemes(lastScheme ? lastScheme : findColorDataByName('red').hex.slice(1));

});