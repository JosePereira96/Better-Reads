import csvtojson from 'csvtojson';

//script that transforms the csv file into JSON
//removes redundant columns from csv
//adds Language and imageURL fields
//gives it JSON structure with library, tbr, shelves and readingGoal tags


export function processTitle(title){
  //Breaks title into two elements if it has a subtitle,
  //Removes the series information 
  //e.g. removes '(Dune Chronicles, #2)' from 'Dune Messiah (Dune Chronicles, #2)'
  
  //Removes excess spaces 
  //Substitutes spaces with + signs 
  //(necessary for the api call)

  let subtitle;
  let aux = title.split(': ');

  title = aux[0];

  if (aux.length > 1){
    subtitle = aux[1];
  }

  title = title.replace(/ +/g,' ');
  title = title.replace(/ \(.*$/g,'');
  //title = title.toUpperCase();

  let processedTitle = title.replace(/ /g,'+');

  return [title,subtitle,processedTitle];
}

export function processAuthor(author) {
  //Removes excess spaces 
  //Substitutes spaces with '+' signs 
  //(necessary for the api call)

  author = author.replace(/ +/g,' ');
  author = author.replace(/ $/g,'');
  author = author.replace(/\. /g,'.');
  //author = author.toUpperCase();
  
  let processedAuthor = author.replace(/ /g,'+');

  return [author,processedAuthor];
}

export async function trimData(input, isObject){
  let data;

  if(isObject){
    data = input;
  } else{
    data = await csvtojson().fromString(input);
  }

  //removes properties that are not needed of every item;
  data.forEach(item => {
    item.BookID = item['Book Id']
    item.AdditionalAuthors = item['Additional Authors']
    item.MyRating = item['My Rating']
    item.DateRead = item['Date Read']
    item.DateAdded = item['Date Added']

    delete item['Book Id']
    delete item['Authorl-f']
    delete item['Additional Authors']
    delete item['Average Rating']
    delete item.Publisher
    delete item.Binding
    delete item['Number of Pages']
    delete item['Year Published']
    delete item['Original Publication Year']
    delete item['Bookshelves with positions']
    delete item['Exclusive Shelf']
    delete item['My Review']
    delete item.Spoiler
    delete item['Private Notes']
    delete item['Read Count']
    delete item['Owned Copies']

    /*
    KEEPING FOLLOWING COLUMNS:
    BookID
    Title
    Author
    AdditionalAuthors
    ISBN
    ISBN13
    MyRating
    DateAdded
    DateRead
    Bookshelves
    */
  });

  data.forEach(item => {

    item['Language'] = null;
    item['imageURL'] = [];

    // transforms ISBN cell with value ="9780575077881" into 9780575077881
    // or null when cell is empty
    item.ISBN = item.ISBN.replace(/^(=")|("$)/g,'');
    item.ISBN13 = item.ISBN13.replace(/^(=")|("$)/g,'');

    if(item.ISBN === ''){
      item.ISBN = null;
    }

    if(item.ISBN13 === ''){
      item.ISBN13 = null;
    }

    if (item.Bookshelves !== ''){
      //removes 'to-read' from Bookshelves since its redundant information
      item.Bookshelves = item.Bookshelves.split(',');

      for (let i in item.Bookshelves){
        item.Bookshelves[i] = item.Bookshelves[i].trim();
      }

      let index = item.Bookshelves.indexOf('to-read');
      if (index !== -1){
        item.Bookshelves.splice(index,1);
      }
    } else {item.Bookshelves = [];}

    //separates fantasy and scifi
    for (let i in item.Bookshelves){
      item.Bookshelves[i] = item.Bookshelves[i].trim();
      if(item.Bookshelves[i] === 'fantasy-sci-fi'){
        item.Bookshelves[i] = 'fantasy'
        item.Bookshelves.push('scifi');
      }
    }

    let processedTitle;
    //trims the title
    [item.Title,item.Subtitle,processedTitle] = processTitle(item.Title);

    //removes extra white space from author's name
    let result = processAuthor(item.Author);
    item.Author = result[0];

    //same for each additional author
    if (item.AdditionalAuthors != ''){
      let aux = item.AdditionalAuthors.split(/[ ]?,[ ]?/);

      aux.forEach(i => {
        let result = processAuthor(i);
        i = result[0];
      });

      item.AdditionalAuthors = aux;
    } else{
      item.AdditionalAuthors = null; 
    }

    //transforms cells with empty values into the value null
    if(item.MyRating === '0' || item.MyRating === 0){
      item.MyRating = null;
    }

    if(item.DateRead === ''){
      item.DateRead = null;
    }

    if(item.Subtitle === undefined){
      item.Subtitle = null;
    }

  });


  //

  let fileContent = {
    "shelves": [],
    "tbr":[ 
      { "id": 0,
        "name": "Reading Now",
        "books": []
      }, 
      { "id": 1,
        "name": "January",
        "books": []
      }, 
      { "id": 2,
        "name": "February",
        "books": []
      }, 
      { "id": 3,
        "name": "March",
        "books": []
      }, 
      { "id": 4,
        "name": "April",
        "books": []
      },
      { "id": 5, 
        "name": "May",
        "books": []
      },
      { "id": 6,
        "name": "June",
        "books": []
      },
      { "id": 7,
        "name": "July",
        "books": []
      },
      { "id": 8,
        "name": "August",
        "books": []
      },
      { "id": 9, 
        "name": "September",
        "books": []
      },
      { "id": 10,
        "name": "October",
        "books": []
      },
      { "id": 11, 
        "name": "November",
        "books": []
      },
      { "id": 12,
        "name": "December",
        "books": []
      }
    ],
    "readingGoal": [
            {
              "Year":2020,
              "Goal": 1,
              "BooksRead": []
            },
            {
              "Year":2021,
              "Goal": 1,
              "BooksRead": []
            },
            {
              "Year":2022,
              "Goal": 1,
              "BooksRead": []
            },
            {
              "Year":2023,
              "Goal": 1,
              "BooksRead": []
            },
            {
              "Year":2024,
              "Goal": 1,
              "BooksRead": []
            }
  ],
    "library": data
  };






  
  //fs.writeFileSync(target,JSON.stringify(fileContent));
  return fileContent;

}