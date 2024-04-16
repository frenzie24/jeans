/*
    fetch(arg).then(response => response.json()).then(result => {
        //do work
    })
*/

function runTest(keyword) {
    let imgQueryURL = `https://pixabay.com/api/?key=43404962-ba2a24215101c788c299fa20a&q=yellow+flowers&image_type=photo`;
    fetch(imgQueryURL).then(response => response.json()).then(result => {
        console.log(result);
        let hits = result.hits;
        hits.forEach(hit => {
            console.log(hit);
        });
        debugger;
        //do work
    })
}