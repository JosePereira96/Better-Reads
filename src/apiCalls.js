import axios from 'axios';

import { processTitle,processAuthor,trimData } from './dataProcessing.js';

//script that retrieves book covers from Google Books API

//PROBLEMS:
//Russian authors with many spellings. Eg: Fyodor Dostoevsky / Fiodor Dostoyevsky ...
//Portuguese authors
//Authors with abbreviations. Eg: George R.R. Martin, J.R.R. Tolkien

//SOLUTION: search engine optimization techniques

async function callAPI(url){

  let attempt = 0;

  //random whole number between 1 and 100 
  //adds some randomness to sleepTime
  //so that all threads dont wake up at the same time
  let jitter = Math.floor((Math.random() * 100) + 1);

  let maxAttempts = 5;
  let sleepTime;

  let response;

  while(attempt < maxAttempts){
    sleepTime = jitter + 1000*(2**attempt++);

    try{
      response = await axios.get(url);
      break;
    } catch(e) {
      await new Promise(r => setTimeout(r, sleepTime));
    }
  }

  return response;
}

export async function getImageURL(title,author){  
  let result = processTitle(title);
  title = result[0];
  title = title.toUpperCase();
  let subtitle = result[1];
  let processedTitle = result[2];

  result = processAuthor(author);
  author = result[0];
  author = author.toUpperCase();
  let processedAuthor = result[1];

  let url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${processedTitle}+inauthor:${processedAuthor}`;

  let response = await callAPI(url);

  let items = response.data.items;

  let imageURL = [];
  
  for(let i in items){
    let bookInfo = items[i].volumeInfo;
    
    let responseTitle, responseAuthor;
    let sameTitle,sameAuthor;

    if(!bookInfo){
      return([]);
    }
          
    if (bookInfo.title != null){
      responseTitle = bookInfo.title.toUpperCase();
      sameTitle = Boolean(responseTitle.match(title));
    }

    if (bookInfo.authors != null){
      responseAuthor = bookInfo.authors;
      responseAuthor = responseAuthor.map(x => x.toUpperCase());
      responseAuthor = responseAuthor.map(x => x.replace(/\. /g,'.'));
      sameAuthor = responseAuthor.includes(author);
    }
          
    if (sameAuthor && sameTitle && bookInfo.imageLinks != null){
      imageURL.push(bookInfo.imageLinks.thumbnail);
    }
  }

  return imageURL;
}





export async function updateImageURL(input){
    
  for (let i in input.library){
    let title = input.library[i].Title;
    let author = input.library[i].Author;

    let array = await getImageURL(title, author);

    //merge arrays
    for (let j in array){
      if (!input.library[i].imageURL.includes(array[j])){
        input.library[i].imageURL.push(array[j]);
      }
    }

    console.log(`${title} by ${author} ..... DONE`);
  }

  return input;
}


export async function updateTBR(input){
  //update reading now in tbr  
  
  for(let i in input.library){
    if(input.library[i].Bookshelves.includes('currently-reading'))
      input.tbr[0].books.push(input.library[i]);
  }
  
  return input;
}

export async function updateReadingGoal(input){
  //update readingGoal field
  //checks dataRead field inside each item in library
  //compares it to Year field inside readingGoal
  //if it matches, push that item inside BooksRead

  for(let j in input.library){
    if(input.library[j].DateRead != null){      
      let readYear = new Date(input.library[j].DateRead).getFullYear();
      
      for(let i in input.readingGoal){
        let goalYear = input.readingGoal[i].Year;
        if(goalYear === readYear){
            input.readingGoal[i].BooksRead.push(input.library[j]);
        }
      }
    }
  }
  
  return input;
} 


export async function updateShelves(input){
  //update shelves field
  let shelvesList = ['all','read','currently-reading','want-to-read'];
  for (let i in input.library){
    for (let j in input.library[i].Bookshelves){
      if(!shelvesList.includes(input.library[i].Bookshelves[j])){
        shelvesList.push(input.library[i].Bookshelves[j]);
      }
    }
  }

  input.shelves = shelvesList;
  
  return input;
}


//logs all books that have no covers
async function logEmpty(input){
  let notFound = 0;

  for (let i in input){
    if(input[i].imageURL.length === 0){
      notFound++
      //console.log(data[i].Title,data[i].Author);
    }
  }

  return notFound;
}

export default { getImageURL, updateImageURL, updateTBR, updateReadingGoal, updateShelves, logEmpty };