# genes

styling color and image search.

## USER-STORY

- Users want assistance finding color themes and images to use on webpages.
- Users will be presented with a section on the left where they can search a color and be presented with color palettes based on that color. Users will get a result of 8 color schemes displayed based on their input.
- Users will be presented with a search bar on the right to then select an image.
- Results of the user's selection will populate on the right side of the page. 
- Users will be able to copy the image and color properties


## REQUIREMENTS

- Users need to be able to select a color theme from either a search bar or a color picker.
- Users need to be able to type search for an image and be displayed a selection of images to chose from.

- CODE GUIDELINES -
  all names to be listed in camelCase -->

all inputs will be listed as an id of two words of subjectInput such as colorInput or fontInput or imageInput

all variables will be listed in camelCase

variables for constant elements will be named in the format of subjectDetailEl, using an example of fontInputEl.


functions for saving information will be in savesubjectData.

functions for reading will be read subjectData.

functions for form information sent in will be in the format of subjectSubmit.

# Usage

- Home Page

![Homepage](./Screen%20Shot%202024-04-19%20at%203.09.39%20AM.png)

- Click the "instructions" button to display a model containing details on how to use the app. See image below.

![Instructions](./Screen%20Shot%202024-04-19%20at%203.10.04%20AM.png)

- To generate a color theme, start by typing the name of a color into the color search bar, or click the provided color block to select from a color picker. User input will generate themes based on selection.

- To generate an image, type into the search bar the type of image you want and click "search". Several images pertaining to that search will display.

![Searching](./Screen%20Shot%202024-04-19%20at%203.10.24%20AM.png)
- To see the list of creators for this application, click the "Creators" button on the right of the header.

# Credits

- Tailwinds CSS is used for our styling and wiremapping

-API used for colors results: https://www.thecolorapi.com/docs

-API used for vector image results: https://pixabay.com/api/docs/

- The following link was used to create modal functions for the "Creators" and "Instructions" buttons.
https://replit.com/@ProgrammingBasi/TailwindCSS-Modal#index.html

JSON colors array used for our text search results was provided by 
https://gist.github.com/jennyknuth/e2d9ee930303d5a5fe8862c6e31819c5

- Link to our repository
https://github.com/frenzie24/genes

- deployment link
https://frenzie24.github.io/genes