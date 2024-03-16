const NUM_CATEGORIES = 6; // Adjust the number as needed
const NUM_QUESTIONS_PER_CAT = 5; // Adjust the number as needed
  // Fetch categories outside the loop

$("body").attr("id", "jeopardy");

let categories = [];


// Function to get the clues for a category
async function getCategoryIds(categoryId) {
  try {
      const response = await axios.get(
        "https://rithm-jeopardy.herokuapp.com/api/category",
        {
          params: {
          id: categoryId
        }
      }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching category IDs:", error);
      return [];
    }
}

function buildHtmlForClues(clueData){
  // TODO: build out the HTML for clues here
  if (clueData && Array.isArray(clueData.clues)) {
    for (const clues of clueData.clues) { // Accessing the 'clues' property
      console.log(clues);
      const $tbodyRow = $("<tr>");
      $tbodyRow.append(`<td>${clues.question}</td>`);
      $tbody.append($tbodyRow);
    }
  } else {
    console.error("Invalid clueData structure:", clueData);
  }

{
  console.error("Error:", error);
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

// Function to get the categories for a game
async function getCategories(numOfCategories){
	
    try {
    let results = await axios.get("https://rithm-jeopardy.herokuapp.com/api/categories", {
      params: {
        count: (numOfCategories)
      }
    })
      
    return _.sampleSize(results.data, 6);
  } catch (error) {
    console.error("Error fetching category:", error);
    return { title: "Unknown Category", clues: [] };
  }
}

function buildHtmlForCategories(categoriesData){
  //TODO: build out HTML for categories here
  const $theadRow = $("<tr>");
  for (let category of categoriesData) {
    let clues =  getCategoryIds(category.id) // This will get your clues for the categories you have
    console.log(category);
    console.log(clues);
    $theadRow.append(`<td>${category.title}</td>`);

    // TODO: we have the clues for a category, but we need to do something with them
    // TODO: maybe consider a function for adding clues? Who knows
  }
  $thead.append($theadRow);
}

async function fillTable() {
  const categoriesData = await getCategories(20);}
  buildHtmlForCategories();
  buildHtmlForClues();
  // lets getCategories here

  // Fill thead with categories
  // The logic below here is after the category data, build out the HTML to display it
  // Maybe move to function buildHtmlForCategories(categories)
  // const $theadRow = $("<tr>");
  // for (let category of categoriesData) {
  //   let clues = await getCategoryIds(category.id) // This will get your clues for the categories you have
  //   console.log(category);
  //   console.log(clues);
  //   $theadRow.append(`<td>${category.title}</td>`);

  //   // TODO: we have the clues for a category, but we need to do something with them
  //   // TODO: maybe consider a function for adding clues? Who knows
  // }
  // $thead.append($theadRow);
 // Since we are getting clues for the categories above, we might not need this here
    console.log("clueData:", clueData); // Log the clueData to inspect its structure
    
    
    // Check if clueData contains the 'clues' property
    // The logic below is after you have the clues data, build out the HTML to display it
    // Maybe move to function buildHtmlForClues(clueData)
  //   if (clueData && Array.isArray(clueData.clues)) {
  //     for (const clues of clueData.clues) { // Accessing the 'clues' property
  //       console.log(clues);
  //       const $tbodyRow = $("<tr>");
  //       $tbodyRow.append(`<td>${clues.question}</td>`);
  //       $tbody.append($tbodyRow);
  //     }
  //   } else {
  //     console.error("Invalid clueData structure:", clueData);
  //   }
  // } catch (error) {
  //   console.error("Error:", error);
  // }



  // Append thead and tbody to the table
  $("table").append($thead).append($tbody);

  // Add event listener for clicking clues
  $("#jeopardy").on("click", ".clue", handleClick);

  // Append the generated content to the existing table
  $("#jeopardy").append($thead, $tbody);


function handleClick(evt) {
  const catId = $(evt.target).data("cat");
  const index = $(evt.target).data("index");
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
  $("#loading-message").html('<i class="fas fa-spinner fa-spin"></i>');
}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */


/** On click of start / restart button, set up game. */
async function setupAndStart() {
  showLoadingView();
  await fillTable(); 
  hideLoadingView();
}
// TODO

/** On page load, add event handler for clicking clues */
$(document).ready(function () {
  setupAndStart();
});


/**
 * Returns from categories endpoint
 * [
    {
        "id": 2,
        "title": "baseball",
        "clues_count": 5
    },
    {
        "id": 3,
        "title": "odd jobs",
        "clues_count": 5
    },
    {
        "id": 4,
        "title": "movies",
        "clues_count": 5
    }
]
 * 
 * use id 3 in category endpoint
 * 
 * array of clues objects
 * 
 * clues.data.id
 * clues.data.question
 * clues.data.answer
 * 
 * {
    "id": 3,
    "clues": [
        {
            "id": 3,
            "answer": "sold flowers (flower girl accepted)",
            "question": "Eliza Doolittle did it for a living",
        },
        {
            "id": 9,
            "answer": "wranglers",
            "question": "In the Old West they were in charge of horses, on a movie set in charge of chickens",
        },
        {
            "id": 15,
            "answer": "a bailiff",
            "question": "He solemnly swears you in, in court",
        },
        {
            "id": 21,
            "answer": "cartoonists (or animators)",
            "question": "Ub Iwerks, Friz Freleng & Tex Avery drew the line at this job",
        },
        {
            "id": 5435,
            "answer": "(air traffic) controller",
            "question": "Position in airport operations which relies on an echo location receiver",
        }
    ]
}
 * 
*/}