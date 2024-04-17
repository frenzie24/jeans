const pk = "43404962-ba2a24215101c788c299fa20a";

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

function getVectorsByKeywords(keywords) {

    // declare an empty string to concate our keywords into
    let keyword = parseKeywords(keywords);

// string for type arg
    let imgType = 'vector';
    // query string for legibility
    let imgQueryURL = `https://pixabay.com/api/?key=${APIKey}&q=${keyword}&image_type=${imgType}` //yellow+flowers&image_type=photo`;
    fetch(imgQueryURL).then(response => response.json()).then(result => {
        // fetches imQueryURL then parses response to json then we do work on the result
        console.log(result);
        // hits are the img obj data we need
        let hits = result.hits;
        //discard vector hits that are .ai
        hits.forEach(hit => {
            if(hit.vectorURL && '.svg' != hit.vectorURL.slice(-4)) {
                console.log('hit about to be removed');
                console.log(hit);
                hits.splice(hits.indexOf(hit), 1);
              
            }
            console.log(hit);
        });
       
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
        $("#testImg").attr('src', hits[0].vectorURL);
        debugger;
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