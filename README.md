# HW - {giphy-api-buttons}

## Live Link
 - https://mikes74.github.io/giphy-api-buttons/

## Click the buttons to see GIF's from 80's movie stars. Then add your own favorite movie star buttons with the provided input field.

## Requirements
- Use the GIPHY API to make a dynamic web page that populates with pre-selected gif buttons and allows the user to create their own buttons as well.
- Call the GIPHY API and use JavaScript and jQuery to change the HTML of the site.
- Parse through JSON object results to locate the proper key/values for use in dot notation 

## Technologies Used
- JavaScript for arrays and functions
- Jquery for DOM Manipulation
- AJAX for API GET requests
- CSS for layout and style of HTML elements

## Code Explanation
JavaScript that uses pre-selected movie star variables combined with user form input to render buttons that, when clicked, sends an AJAX call to the Giphy API and return 10 image results for each existing/new button clicked. Once the gifs are created in the DOM, the user can click on the image itself to create a play/pause effect by dynamically switching the 'img' 'src's between a still and animated version of that gif.