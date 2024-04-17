const pk = "43404962-ba2a24215101c788c299fa20a";

// checks if keywords is an array and parses it into a query string 
function parseKeywords(keywords) {

    let keyword = "";
    // tries to concate keword from elements in passed keywords array
    // if keywords is not an array we move on
    try {
        keyword.forEach(key => {
            keyword += "+" + key; // currently outputs +yellow+red
        })

        keyword = keyword.slice(1);
    } catch (err) {
        keyword = keywords;
        console.log('error: keyword is not an array, passing single key val');
        console.log(err);
    }

    return keyword;
}

//returns an array of objects containing vector image data
//only returns image data ending in .svg for vector images
function getVectorsByKeywords(keywords) {

    // declare an empty string to concate our keywords into
    let keyword = parseKeywords(keywords);

    // string for type arg
    let imgType = 'vector';
    // query string for legibility
    let imgQueryURL = `https://pixabay.com/api/?key=${pk}&q=${keyword}&image_type=${imgType}`
    fetch(imgQueryURL).then(response => response.json()).then(result => {
        // fetches imQueryURL then parses response to json then we do work on the result
        console.log(result);
        // hits are the img obj data we need
        let hits = result.hits;
        //discard vector hits that are .ai
        hits.forEach(hit => {
            if (hit.vectorURL && '.svg' != hit.vectorURL.slice(-4)) {
                console.log('hit about to be removed');
                console.log(hit);
                hits.splice(hits.indexOf(hit), 1);

            }
            console.log(hit);
        });
        return hits;
        /* hit OBJ: */
        /* 
         let hit = hits[0];
        example of hit data
        let hitObj = {
            imageSize: hit.imageSize, // what units are these???
            imageHeight: hit.imageHeight,
            imageWidth: hit.imageWidth,
            tags: hit.tags,
            type: hit.type,
            user: hit.user,
            userImageURL: hit.user,
            user_id: hit.user_id,
            imageURL: hit.imageURL,
            largeImageURL: hit.largeImageURL,
            id: hit.id,
            id_hash: hit.id_hash,
            webformatHeight: hit.webformatHeight,
            webformatWidth: hit.webformatWidth,
            pageURL: hit.pageURL,
            previewURL: hit.previewURL,
            previewHeight: hit.previewHeight,
            previewWidth: hit.previewWidth,
            fullHDURL: hit.fullHDURL,
            vectorURL: hit.vectorURL
        }
        */
        // test for the first element in the hit array
        //  $("#testImg").attr('src', hits[0].vectorURL);

    })
}


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

function getColorbyHex(colorData) {
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

function getSchemeByHex(colorData) {
    fetch(ps).then(result => result.json()).then(result => {
        debugger;
        // may need to set up async and set a variable instead of return
        return result
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
    getColorbyHex(findColorDataByName(colorInput.val()));
}

function onImageSearch(event) {
    event.preventDefault();
    debugger;
    let keywords = event.target.value;
    let vectors = getVectorsByKeywords(keywords);
    console.log(vectors);
    debugger;
}

function onImageSearchClick(event) {
    // returns vectors based on string in the image search input
    event.preventDefault();
    return getVectorsByKeywords($("#imageSearch").val());
}

// document ready 
$(() => {
    let colorInput = $("#colorSearch")
    let imageSearch = $("#imageSearch");
    imageSearch.on("keydown", function (e) {
        if (e.keyCode == 13) {
            onImageSearch(e);
        }
    });
    //add click listener to imageSearchBtn
    $('#imageSearchBtn').on('click', onImageSearchClick);
    /*colorInput.on('click', onColorPickerClick);
    colorInput.on('change', onColorPickerChange);
    colorInput.on('input', onColorPickerInput);
    */
    colorInput.on("keydown", function (e) {
        if (e.keyCode == 13) {
            onColorSearch(e)
        }
    });
});