const pk = "43404962-ba2a24215101c788c299fa20a";

const hoverAnimString = `transition ease-in-out delay-150 hover:border-gray-300 hover:scale-110`
const classString = `flex flex-row flex-wrap justify-center items-center mr-2 h-auto min-w-20 w-1/5 max-w-96 rounded-lg`;// `flex flex-row flex-nowrap mx-4 my-4 overflow-auto`;
const imageString = `imageResult`;
const cardSting = `${imageString}Card`;

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
        // hits.forEach(hit => {
        //     if (hit.vectorURL && '.svg' != hit.vectorURL.slice(-4)) {
        //         console.log('hit about to be removed');
        //         console.log(hit);
        //         debugger;
        //         hits.splice(hits.indexOf(hit), 1);
        //         debugger;
        //     }

        hits = hits.filter(hit => hit.vectorURL && hit.type == 'vector/svg');
        console.log(hits);
        setItem('hits', hits);
        /* for (let i = 0; i < 6; i++) {
             let imageEl = $(`#imageResult${i}`); 
             $(`#imageResult${i}`).attr('src', hits[i].vectorURL);
         }
 */
        populateImageElements(hits);
        debugger;
    });

}
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

function handleImageCardClick(event) {

    let card = $('#' + event.target.parentElement.id);
    let cardData = card.data('vector-info');
    let featured = $("#imageResult0");

    let featuredData = featured.data('vector-info');
    let cardImg = $('#'+event.target.id);
    let oldFeaturedSrc = featured.attr('src');

    let featuredCard = $('#imageResultCard0');
    featured.attr('src', cardImg.attr('src'));
    featuredCard.data('vector-info', cardData);

    cardImg.attr('src', oldFeaturedSrc);
    card.data('vector-info', featuredData);

    
/*
    let newFeaturedCard = generateElement('div', { class: 'mx-4 mb-4', id: 'iamgeResultsCard0' });
    newFeaturedCard.data('vector-info', featuredData);
    newFeaturedCard.attr('data-vector-info', featuredData);
    newFeaturedCard.append(event.target);

    card = featuredCard;
    featuredCard = newFeaturedCard;*/
    debugger;
}

function populateImageElements(vectors) {
    let featured = $(`#imageResult0`);
    featured.attr('src', vectors[0].vectorURL);
    featured.data('vector-info', vectors[0]);
    let iamgeContainer = $("#imageContainer");
   // let imageContainerClass = iamgeContainer.attr('class');
    iamgeContainer.empty();
   // iamgeContainer = ;
   // $("#imageSection").append(generateElement('div', {id:'imageContainer', class: imageContainerClass}));
   iamgeContainer.addClass("flex flex-row flex-nowrap justify-center self-start bg-gray-100 rounded overflow-auto mb-4")


 iamgeContainer = $("#imageContainer");
    let vectorCards = [];
    for (let i = 1; i < vectors.length; i++) {
        let card = generateElement("div", { id: `${cardSting}${i}`, class: `${classString}`});
        card.on('click', handleImageCardClick)
        let attr = {
            class: `${hoverAnimString} ${classString}`,
            src: vectors[i].vectorURL,
            id: `${imageString}${i}`,
            alt: vectors[i].tags,
            
        }
        card.data('vector-info', vectors[i]);
        card.attr('data-vector-info', vectors[i]);
        //        card.attr('data-vectorInfo', JSON.stringify(vectors[i]))
        let image = generateElement('img', attr, vectors[i]);
        card.append(image);

        vectorCards.push(card);
        //card.parent().append(card);
    }

    iamgeContainer.append(vectorCards);
}

function onImageSearch(event) {
    event.preventDefault();
    debugger;
    let keywords = event.target.value;
    localStorage.setItem('keywords', keywords);
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
    let last = localStorage.getItem('keywords');
    
    getVectorsByKeywords(last ? last : 'cats');
    $('#imageSearchBtn').on('click', onImageSearchClick);


});