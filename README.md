# genes

styling color and image search.

## USER-STORY

- Users want assistance finding color themes and images to use on webpages.
- Users will be presented with a modal on the left where they can search a color and be presented with swatches based on that color. once they select a color family, a color theme will populate below. Users can select up to 4 themes to display.
- Users will be presented with a search bar on the right to then select an image.
- Results of the user's selection will populate in the maion body of the page. 12 pcitures will display, 4 columns of 3 images.
- Users will be able to copy the color properties
- The user will be able to select and save photos of their choosing to use on thier project.

## REQUIREMENTS

- Users need to be able to select a color theme from either a search bar or a color picker.
- Users need to be able to type search for an image and be displayed a selection of images to chose from.

- CODE GUIDELINES -
  all names to be listed in camelCase -->

all inputs will be listed as an id of two words of subjectInput such as colorInput or fontInput or imageInput

if cards are being used for the project, the container will be labeled as cardContainer. If there are multiple card containers,
each will be given an id of subjectContainer. In the event that the container for color result and color family suggestions are seperate,
the labels will be resultContainer and suggestionContainer.

card naming is based on cardSection, such as cardHeader, cardBody, etc. If cards will apply to multiple segments,
the card will be given a class of subjectCard such as class="imageCard"

all variables will be listed in camelCase

variables for constant elements will be named in the format of subjectDetailEl, using an example of fontInputEl.

functions for creating information onto page will be in the format of createSubject() such as createCard()

functions for saving information will be in savesubjectData. functions for reading will be read subjectData.

functions for form information sent in will be in the format of subjectSubmit.

# Usage
- Click the "instructions" button to display a model containing details on how to use the app.
- To generate a color theme, start by typing the name of a color into the color search bar, or click the provided color block to select from a color picker. User input will generate themes based on selection.
- To generate an image, type into the search bar the type of image you want and click "search". Several images pertaining to that search will display.

# Credits

- Tailwinds CSS is used for our styling and wiremapping
- The following link was used to create modal functions for the "Creators" and "Instructions" buttons.
https://replit.com/@ProgrammingBasi/TailwindCSS-Modal#index.html
- 
