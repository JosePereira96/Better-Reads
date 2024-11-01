import { Route, Routes, BrowserRouter } from "react-router-dom";

import TBR from './TBR'
import Bookshelves from './Bookshelves'
import NavBar from './NavBar'
import ReadingGoal from './ReadingGoal'
import AboutPage from './AboutPage'
import ComingSoon from './ComingSoon'
import HomePage from './HomePage'

import { ToastContainer } from "react-toastify";
import { Slide } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import './App.css'


function App() {


  //localStorage only supports strings
  //therefore objects must be converted to strings and vice versa
  function setLocalStorage(key, value){
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  function loadLocalStorage(key){
    let value = window.localStorage.getItem(key);
    return(JSON.parse(value));
  } 


  const updateLibrary = (editedData, removeFlag) => {
    
    let updatedData = loadLocalStorage('library');

    if(removeFlag){
      //remove element
      //filter is preferable to splice in an array in a React State
      updatedData = updatedData.filter(e => e.BookID !== editedData.BookID);
    } else{
      //edit element
      //find index of element in array
      let index = -1;

      for(let i in updatedData){
        if(editedData.BookID === updatedData[i].BookID){
          //console.log(i);
          index = i;
          break;
        }
      }

      if(index !== -1){
        updatedData[index] = editedData;  
      }
    }
    
    setLocalStorage('library',updatedData);    
  }



  const updateTBR = (bookInfo, context) => {    
    //understanding if the book needs to be removed or added to tbr
    //if inTBR = true then add and vice versa
    let tbrData = loadLocalStorage('tbr');


    let alreadyInTBR = false;
    let monthID = -1;

    for(let i in tbrData){
      for(let j in tbrData[i].books){
        if(tbrData[i].books[j].BookID === bookInfo.BookID){
          alreadyInTBR = true;
          monthID = i;
          break;    
        }
      }
    }


    if(context === 'shelf'){
      let includesTBR = bookInfo.Bookshelves.includes('tbr') || bookInfo.Bookshelves.includes('currently-reading');

      if(includesTBR && !alreadyInTBR){
        //adds to the first month aka index=1
        tbrData[1].books.push(bookInfo);
      } else if(!includesTBR && alreadyInTBR){
        //remove book
        let targetMonth = tbrData[monthID].books;
        tbrData[monthID].books = targetMonth.filter(e => e.BookID !== bookInfo.BookID);
      }
    } else if(context === "current"){

      for(let i in tbrData[0].books){
        if(tbrData[0].books.BookID === bookInfo.BookID){
          
        }
      }



    } else{
      //remove from tbr
      let targetMonth = tbrData[monthID].books;
      tbrData[monthID].books = targetMonth.filter(e => e.BookID !== bookInfo.BookID);
    }
    

    
    setLocalStorage('tbr',tbrData); 
  }


  const updateGoal = (input) => {
    setLocalStorage('readingGoals', input);
  }
  
  const updateShelves = (input) => {
    setLocalStorage('shelves', input);
  }

  

  return (
    <>
    <BrowserRouter>

      
      <NavBar loadLocalStorage={loadLocalStorage}/>
      
      <Routes>
        <Route path="/Better-Reads">
          <Route path="home" element={<HomePage setLocalStorage={setLocalStorage}/>}/>
          <Route path="tbr" element={<TBR loadLocalStorage={loadLocalStorage}
                                           setLocalStorage={setLocalStorage}
                                           updateLibrary={updateLibrary} 
                                           updateTBR={updateTBR}/>}/>
          
          <Route path="bookshelves/:shelfName" 
                 element={<Bookshelves loadLocalStorage={loadLocalStorage}
                                        updateLibrary={updateLibrary}
                                        updateTBR={updateTBR} 
                                        updateShelves={updateShelves}
                                        />}/>


          <Route path="reading-goal/:year"
                 element={<ReadingGoal loadLocalStorage={loadLocalStorage} 
                                       updateGoal={updateGoal}/>}/>


          <Route path="about" element={<AboutPage/>}/>

          <Route path="recommendations" element={<ComingSoon/>}/>
        </Route>
      </Routes>
      
      

      
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="dark"
        transition={Slide}
      />
       
    
      
      
      </BrowserRouter>
    </>
  );
}


export default App;