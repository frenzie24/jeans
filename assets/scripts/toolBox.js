
// strings we want to reuse for console logging
const logStrings = { storeErr: "Storage Error: " }


// chars we want to remove from strings for key generation
const badKeyChars = ['-', ':', '.', '\\', '[', ']', '{', '}'];
// generates a key based on js Date obj passed
function keyGenerator(date) {
    // creates a key string with unique characters everytime because it is based on time
    let key = date.toISOString();
    /*
        use a for each loop with an inline function declartion to remove 
        unwated characters from our key.

        here is the foreach displayed as a for loop

        for (let i = 0; i < badKeyChars.length; i++) {
            key = key.replaceAll(badChars[i], '');
        }
     */
    badKeyChars.forEach((char) => {
        key = key.replaceAll(char, ''); // "hello:world" => "helloworld"
    });

    return key;
}

// wrapper using jquery to set focus to passed element id
function focusElementbyId(id) {
    debugger;
    $(`#${id}`).trigger('focus');
}

// local storage wrapper to return the parsed stored data
// enclosed in a try catch incase we fail retrieval.
// if we fail, log the error and return null
function getItem(store) {
    try {
        let val = localStorage.getItem(store);
        return JSON.parse(val);
    } catch (error) {
        console.log(`${logStrings.storeErr}` + error);
        console.log(error);
        return null;
    }
}

// local storage wrapper to format and store data
function setItem(store, val) {
    
    //inline conditional to veryify wether val is a string or object, then formats and stores
    /*
        if (true) {
            //execute if true
        } else {
            //execute if false
        }

        inline conditionals consolidate if statments!

        varName = (conditional) ? [if true] trueCode() : [if false] falseCode());
        val (our variable) = typeof(val) === 'object' (our conditional) ? JSON.stringify(val) (val is an object!) : val (val is not an object);
    */
    val = typeof (val) === 'object' ? JSON.stringify(val) : val;
    localStorage.setItem(store, val);
}


// creates an element with tag and sets initial attributes to data
function generateElement(tag, data) {
    // uses jQuery object $ to create an element with passed tag and data
    // so it breaks down to $("<section>");, data);
    let element = $(`<${tag}>`, data);
    return element;
}
// creates an element with tag and sets its value to val, no attribute assignments
function generateSimpleElement(tag, val) {
    let element = $(`<${tag}>`);
    element.val(val);
    return element;
}

// creates an element with tag and sets its innerText to val, no attribute assignments
function generateSimpleTag(tag, val) {
    let element = $(`<${tag}>`);
    element.text(val);
    return element;
}