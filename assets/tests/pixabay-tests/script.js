/*
    fetch(arg).then(response => response.json()).then(result => {
        //do work
    })
*/
const APIKey = "43404962-ba2a24215101c788c299fa20a";
//keyword will be passed as an array or obj 
function runTest(keyword) {

    let keywords = ""; 
    keyword.forEach(key => {
        keywords += "+"+key;
    })
    //let imgQueryURL = `https://pixabay.com/api/?key=`;
    let imgQueryURL = `https://pixabay.com/api/?key=${APIKey}&q=yellow+flowers&image_type=photo`;
    fetch(imgQueryURL).then(response => response.json()).then(result => {
        console.log(result);
        let hits = result.hits;
        hits.forEach(hit => {
            console.log(hit);
        });
        let hit = hits[0];
        /* hit OBJ: */
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
        }
        console.log(hitObj)
        debugger;
        //do work
    })
}