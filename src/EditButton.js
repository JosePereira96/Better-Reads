import { useState } from "react";  
import { Rating } from 'react-simple-star-rating';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';

import useComponentVisible from "./useComponentVisible";

function EditButton({ bookInfo, setBookInfo, loadLocalStorage }) {

	const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
	let shelves = loadLocalStorage('shelves');
	//removes 'all' 'read' 'currently-reading' and 'want-to-read'
    shelves.splice(0, 4);


	const handleEdit = () => {
  		setIsComponentVisible(true);
  	}

	const handleCancel = () => {
    	setIsComponentVisible(false);
  	}

	const handleConfirm = (editedBookInfo) => {
		//UPDATE BOOK INFO
		setBookInfo(editedBookInfo);

		//CLOSE DIALOG BOX
	    setIsComponentVisible(false);
  	}

  	

	

  	



  	function Box({ bookInfo, handleConfirm, handleCancel }) {
  		const [rating, setRating] = useState(0);
		const [editedBookInfo, setEditedBookInfo] = useState(bookInfo);


		const updateRating = rate => {
	    	setRating(rate);
	    	setEditedBookInfo(prevState => {
	  			return {...prevState, MyRating: rate};
	  		});
	  	}

	  	const updateTitle = editedTitle => {
	  		setEditedBookInfo(prevState => {
	  			return {...prevState, Title: editedTitle};
	  		});
	  	}

	  	const updateAuthor = editedAuthor => {
	  		setEditedBookInfo(prevState => {
	  			return {...prevState, Author: editedAuthor};
	  		});
	  	}

	  	const updateDate = editedDate => {
	  		editedDate = editedDate.replace(/\-/g,'/');
	  		setEditedBookInfo(prevState => {
	  			return {...prevState, DateRead: editedDate};
	  		});
	  	}

	  	const updateTags = shelf => {
	  		let bookshelves = [...editedBookInfo.Bookshelves];

	  		if(bookshelves.includes(shelf)){
	  			bookshelves.splice(bookshelves.indexOf(shelf),1);
	  		} else{
	  			bookshelves.push(shelf);
	  		}
	  		
	  		setEditedBookInfo(prevState => {
	  			return {...prevState, Bookshelves: bookshelves}
	  		});
		}


		const [tagDisplay, setTagDisplay] = useState("none");

		const handleChooseTag = () => {
			setTagDisplay((tagDisplay === "none") ? "flex" : "none");
		}




  		let aux;
  		if(editedBookInfo.DateRead){
  			 aux = editedBookInfo.DateRead.replace(/\//g,'-');
  		}

  		return(
  			<div id="editModal" className="modal">
		        <div className="modal-content" ref={ref}>
		            <span className="close-btn" onClick={handleCancel}>
		            	&times;
		            </span>
		            <h2>Edit Book Information</h2>
		            <form id="editBookForm">
		            	<div className="form-container">
	                		<img src={editedBookInfo.imageURL[0]} className="edit-cover"/>
	                		<div className="form-fields">

	                			<div className="form-group">
					                <label>Author</label>
					                <input type="text" 
										   id="authorInput" 
										   defaultValue={editedBookInfo.Author} 
										   onChange={e => updateAuthor(e.target.value)}
										   required/>
				                </div>

				                <div className="form-group">
					                <label>Title</label>
					                <input type="text" 
										   id="titleInput" 
										   defaultValue={editedBookInfo.Title} 
										   onChange={e => updateTitle(e.target.value)}		
										   required/>
				                </div>

				                <div className="form-group">
					                <label>Date Read</label>
					                <input type="date"
					                	   defaultValue={aux}
					                	   onChange={e => updateDate(e.target.value)}
					                	   id="editDateRead" />
				                </div>

				                <div className="form-group">
					                <label>Rating</label>
					                <Rating initialValue={editedBookInfo.MyRating} 
						        			allowFraction 
						        			onClick={updateRating}/>
					        	</div>

				                <div className="form-group">
				                	<label><FontAwesomeIcon icon={faTag}/> Tags: </label>
				                	<u onClick={handleChooseTag}>Choose</u>
				                	{editedBookInfo.Bookshelves.map( (shelf, index) => {
						        		if(index !== 0){
						        			return(<span>,{shelf}</span>);
						        		}
						        		else{
						        			return(<span>&emsp;{shelf}</span>);
						        		}
					        	})}
				                </div>
				                
				                
					        	
					        	
					        	<div className="form-group">
					        		<label/>
						        	<div className="form-checkbox-group" style={{display: tagDisplay}}>
						        	{shelves.map(shelf => {
						        		return(
						        			<div>
						        				
						        				<input type="checkbox" 
						        					   defaultChecked={editedBookInfo.Bookshelves.includes(shelf)} 
						        					   onChange={() => updateTags(shelf)}/>
						        				<span>{shelf}</span>
												
						        			</div>
						        		);
						        	})}
						        	</div>
					        	</div>

				                
				             </div>
				        </div>
		                
		                <button type="submit"
		                		onClick={() => handleConfirm(editedBookInfo)}
		                		>Save Changes</button>
		            </form>
		        </div>
		    </div>
  		);
  	}

	return(
		<div>
			{isComponentVisible && <Box bookInfo={bookInfo} 
										handleConfirm={handleConfirm} 
										handleCancel={handleCancel}/>
			}
			<button onClick={handleEdit} className="edit-btn">Edit</button>
	    </div>
	);
	
}

export default EditButton;