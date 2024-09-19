import { useState } from "react"; 
import useComponentVisible from "./useComponentVisible";
import blankImage from './assets/blank.jpg';

import ReadButton from './ReadButton'; 

function CurrentlyReading({ loadLocalStorage, updateLibrary, updateTBR}) {
	
	let buttonText = "I'm Finished!";
	let currentReads = loadLocalStorage('tbr')[0].books;

	function CurrentlyReadingItem({ book }) { 
		const [isBookVisible, setIsBookVisible] = useState(true);
		const [bookInfo, setBookInfo] = useState(book);

		
		return(
			isBookVisible && 

			(<div className="currentlyReadingItem">
				<span className="bookTitle">{bookInfo.Title}</span>
				<p className="bookAuthor">{bookInfo.Author}</p>
				<img className="bookCover" src={bookInfo.imageURL.length === 0 ? blankImage : bookInfo.imageURL[0]}/>
				<ReadButton bookInfo={bookInfo} 
                            setBookInfo={setBookInfo}
	                        setIsBookVisible={setIsBookVisible}
	                        updateLibrary={updateLibrary}
	                        updateTBR={updateTBR}
	                        buttonText={buttonText}/>
			</div>)
		);
		

	}

	return(
			<div>
				<h3>Currently Reading</h3>
				<br/>
				{currentReads.map(book => {
					return(<CurrentlyReadingItem book={book}/>);
				})}
				 
			</div>
	);
}

export default CurrentlyReading;