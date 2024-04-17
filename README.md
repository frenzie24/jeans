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

- Users need to be able to select a color palette<br>
- Selected color palette needs to be displayed with all swatches<br>
- Users need to be able to type search for an image and be displayed a selection of images to chose from.
- Users will be presented a link to pixabay for results containing more than 10 images (maybe).

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

# Credits

- Tailwinds CSS is used for our styling and wiremapping
