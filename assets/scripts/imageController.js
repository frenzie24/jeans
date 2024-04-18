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
        /* for (let i = 0; i < 6; i++) {
             let imageEl = $(`#imageResult${i}`); 
             $(`#imageResult${i}`).attr('src', hits[i].vectorURL);
         }
 */
        populateImageElements(hits);
        debugger;
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

function populateImageElements(vectors) {
    let featured = $(`#imageResult${0}`);
    featured.attr('src', vectors[0].vectorURL);

    let iamgeContainer = $("#imageContainer");
    iamgeContainer.empty();
    iamgeContainer.addClass(`flex flex-row flex-nowrap mx-4 my-4 overflow-auto`)
    const classString = `mr-2 h-auto min-w-20 w-1/5 max-w-96 rounded-lg`;// `flex flex-row flex-nowrap mx-4 my-4 overflow-auto`;
    const imageString = `imageResults`;
    const cardSting = `${imageString}Card`;

    let vectorCards = [];
    for (let i = 1; i < vectors.length; i++) {
        let card = generateElement("div", { id: `${cardSting}${i}` })
        let data = {
            class: classString,
            src: vectors[i].vectorURL,
            id: `${imageString}${i}`,
            alt: vectors[i].tags
        }

        card.append(generateElement('img', data));

        vectorCards.push(card);
        //card.parent().append(card);
    }

    iamgeContainer.append(vectorCards);
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