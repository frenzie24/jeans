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
        setItem('hits', hits);
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

$(() => {
    let imageSearch = $("#imageSearch");
    imageSearch.on("keydown", function (e) {
        if (e.keyCode == 13) {
            onImageSearch(e);
        }
    });
    
    $('#imageSearchBtn').on('click', onImageSearchClick);
 
});