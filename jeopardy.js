const NUM_CATEGORIES = 6;  // Adjust the number as needed
const NUM_QUESTIONS_PER_CAT = 5;  // Adjust the number as needed



let categories = [];



async function getCategoryIds() {
  try{
    const response = await axios.get("https://rithm-jeopardy.herokuapp.com/api/category?id=3");
    return _.sampleSize(response.data, NUM_CATEGORIES);
    } catch (error) {
      console.error('Error fetching category IDs:', error);
      return [];
    }
  }    

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function getCategory(catId) {
  try {
    const response = await axios.get("https://rithm-jeopardy.herokuapp.com/api/categories?count=100");
    return {
        title: response.data.title,
        clues: response.data.clues_count 
    };
}    catch (error) {
  console.error('Error fetching category:', error);
  return {title: 'Unknown Category', clues: []};
}



async function fillTable(categoryIds) {
  const $thead = $('<thead>');
  const $tbody = $('<tbody>');

  // Fetch categories outside the loop
  const categoriesData = await Promise.all(categoryIds.map(catId => getCategory(catId)));

  // Fill thead with categories
  const $theadRow = $('<tr>');
  categoriesData.forEach(category => {
    $theadRow.append(`<td>${category.title}</td>`);
  });
  $thead.append($theadRow);

  // Fill tbody with questions
  for (let i = 0; i < NUM_QUESTIONS_PER_CAT; i++) {
    const $tbodyRow = $('<tr>');
    categoriesData.forEach((category, index) => {
      const clue = category.clues[i];
      $tbodyRow.append(`<td class="clue" data-cat="${categoryIds[index]}" data-index="${i}">?</td>`);
    });
    $tbody.append($tbodyRow);
  }

  // Add event listener for clicking clues
  $('#jeopardy').on('click', '.clue', handleClick);

  // Append the generated content to the existing table
  $('#jeopardy').append($thead, $tbody);
}



function handleClick(evt) {
    const catId = $(evt.target).data('cat');
    const index = $(evt.target).data('index');
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
  $('#loading-message').html('<i class="fas fa-spinner fa-spin"></i>');
}

}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */



/** On click of start / restart button, set up game. */
async function setupAndStart() {
    showLoadingView();
    const categoryIds = await getCategoryIds();
    await fillTable(categoryIds);
    hideLoadingView();
}
// TODO

/** On page load, add event handler for clicking clues */
$(document).ready(function () {
    setupAndStart();
  });
 

