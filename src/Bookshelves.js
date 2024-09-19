import { useState,useEffect } from "react";
import { Link } from "react-router-dom";


import ShelfItem from './ShelfItem';
import CreateShelfButton from './CreateShelfButton'
import CurrentlyReading from './CurrentlyReading'
import ScrollToTop from './ScrollToTop'

import './Bookshelves.css';






function Bookshelves({ loadLocalStorage, updateLibrary, updateTBR, updateShelves, shelfName }) {

    const [fileData,setFileData] = useState(loadLocalStorage('library'));
    const [shelves,setShelves] = useState(loadLocalStorage('shelves'));

    //update local storage
    useEffect( () => {updateShelves(shelves)}, [shelves]);

    const [searchField, setSearchField] = useState(null);

    const handleInput = e => {
        setSearchField(e.toLowerCase());       
    }
    
	return(	
    <>
	<div className="bookShelvesContainer">
        <div className="side-menu">

            <CurrentlyReading loadLocalStorage={loadLocalStorage} 
                              updateLibrary={updateLibrary} 
                              updateTBR={updateTBR}/>

            <hr/>

            <h3>Shelves</h3>
            <ul>
                <li><Link to='/bookshelves/all'>All</Link></li>
                <li><Link to='/bookshelves/read'>Read</Link></li>
                <li><Link to='/bookshelves/currently-reading'>Currently Reading</Link></li>
                <li><Link to="/bookshelves/want-to-read">Want to Read</Link></li>
                <hr/>
                
                {shelves.map( (s,index) => {
                        //ignores 'all' 'read' 'currently-reading' and 'want-to-read'
                        if(index>3){
							return(
								<li><Link to={"/bookshelves/"+s}>{s}</Link></li>
							);
                        }
				})}

                <CreateShelfButton setShelves={setShelves}/>
            </ul>

            <ScrollToTop/>
        </div>

        

        <main className="book-list">
            <div className="controls">
                <input type="text" className="search-bar" placeholder="Search for books..." onChange={e => handleInput(e.target.value)}/>
                
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th>Cover</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Rating</th>
                        <th>Shelves</th>
                        <th>Date Read</th>
                        <th></th>
                        <th></th>
                        <th>TBR</th>
                    </tr>
                </thead>
                <tbody>
                    {fileData.map( (book,index) => {
                        let title = book.Title.toLowerCase();
                        let author = book.Author.toLowerCase();

                        const firstCondition = shelfName === 'read' && (book.DateRead !== null || book.MyRating !== null);
                        const secondCondition = shelfName === 'want-to-read' && (book.DateRead === null && book.MyRating === null);
                        const thirdCondition = shelfName.length !== 0 && book.Bookshelves.includes(shelfName);
                        const fourthCondition = shelfName === 'all'; 

                        let eligible = firstCondition || secondCondition || thirdCondition || fourthCondition;

                        if(searchField){
                            const titleMatch = title.includes(searchField);
                            const authorMatch = author.includes(searchField);

                            if((titleMatch || authorMatch) && eligible)
                                return(<ShelfItem loadLocalStorage={loadLocalStorage}  
                                                  updateLibrary={updateLibrary}
                                                  updateTBR={updateTBR}
                                                  index={index}/>);
                        }else{
                            if(eligible){
                                return(<ShelfItem loadLocalStorage={loadLocalStorage} 
                                                  updateLibrary={updateLibrary}
                                                  updateTBR={updateTBR}
                                                  index={index}/>);
                            }
                        }
                    })}
	          		      
                </tbody>
            </table>
        </main>
    </div>
    </>
    

		
	);

}

export default Bookshelves;



