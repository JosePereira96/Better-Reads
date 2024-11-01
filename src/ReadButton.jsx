import { useState, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTag } from '@fortawesome/free-solid-svg-icons';

import { ToastContainer, toast } from "react-toastify";
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { Rating } from 'react-simple-star-rating'

import useComponentVisible from "./useComponentVisible";

function ReadButton({ bookInfo, setBookInfo, setIsBookVisible, updateLibrary, updateTBR, buttonText }) {

	const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

	const [rating, setRating] = useState(0);


	const updateInfo = rate => {
		//update myrating
		setRating(rate);

	    //update date read
	    let d = new Date();
	    let dateString = [d.getFullYear(), d.getMonth()+1, d.getDate()];
	    dateString = dateString.map(x => x.toString()).map(i => i.length === 1 ? '0'+i : i);
	    dateString = dateString.join('/');
	    
	    //update shelves
	    //remove tbr and currently-reading from bookshelves
	    let shelves = [...bookInfo.Bookshelves];
	    shelves = shelves.filter(e => e !== 'tbr' && e !== 'currently-reading');
	

	    setBookInfo(prevState => {
	  		return {...prevState, MyRating: rate, DateRead: dateString, Bookshelves: shelves};
	  	});
  	}


	//guarantees the rating gets reset to 0
	//when clicking outside the box
    useEffect(() => {
        setRating(0);
    }, [isComponentVisible]);

	const handleRead = () => {
    	setIsComponentVisible(true);
    	updateInfo(rating);
  	}

	const handleCancel = () => {
    	setIsComponentVisible(false);
  	}


  	



	const handleConfirm = () => {
		//hides book
	    setIsBookVisible(false);
	    
	    //hide box
	    setIsComponentVisible(false);

	    
	    //toast emitter
	    let toastMessage = bookInfo.Title + ' was added to \'Read\'';
	    toast.info(toastMessage, {
	      position: "bottom-center",
	      autoClose: 5000,
	      hideProgressBar: true,
	      closeOnClick: false,
	      pauseOnHover: true,
	      draggable: false,
	      progress: undefined,
	      theme: "dark",
	      transition: Slide,
	    });
	    
	    updateTBR(bookInfo, 'tbr');
	    updateLibrary(bookInfo);
  	}


  	function Box() {

  		let aux;
  		if(bookInfo.DateRead){
  			 aux = bookInfo.DateRead.replace(/\//g,'-');
  		}

  		return(
  			<div id="editModal" className="modal">
		        <div className="modal-content" ref={ref}>
		            <span className="close-btn" onClick={handleCancel}>
		            	&times;
		            </span>


		            <form id="editBookForm">
		            	<div className="form-container">
	                		<img src={bookInfo.imageURL[0]} className="edit-cover"/>
	                		<div className="form-fields">

	                			<div className="form-group">
					                <label>Author</label>
					                <input type="text" 
										   id="authorInput" 
										   defaultValue={bookInfo.Author} 
										   required
										   readOnly/>
				                </div>

				                <div className="form-group">
					                <label>Title</label>
					                <input type="text" 
										   id="titleInput" 
										   defaultValue={bookInfo.Title} 
										   required
										   readOnly/>
				                </div>

				                <div className="form-group">
					                <label>Date Read</label>
					                <input type="date"
					                	   defaultValue={aux}
					                	   id="editDateRead" />
				                </div>

				                <div className="form-group">
					                <label>Rating</label>
					                <Rating initialValue={bookInfo.MyRating} 
						        			allowFraction 
						        			onClick={updateInfo}/>
					        	</div>

				                
				                
				                
					        	
					        	


				                
				             </div>
				        </div>
		                
		                <button type="submit"
		                		onClick={handleConfirm}
		                		>Submit</button>
		            </form>
		            


		            {/*

		            <div className="bookTitle">{bookInfo.Title}</div>
			        <div className="bookAuthor">{bookInfo.Author}</div>
			        

			        <div className="coverFoto">
			          <img src={bookInfo.imageURL[0]}/>
			        </div>
			          
			        <div className="rating">
			          <Rating
			            allowFraction
			            onClick={updateInfo}
			            initialValue={bookInfo.MyRating}
			          />
			        </div>
			          

			        <div className="button-container">
			          <button 
			            className="cancel-button" 
			            onClick={handleCancel}>
			              Cancel
			          </button>
			          <button 
			            className="confirmation-button"
			            onClick={() => {
			            	handleConfirm(rating);
			            }}>
			              Confirm
			          </button>
			        </div>
			        */}
		        </div>
		    </div>
  		);
  	}


		         





	return(
		<div>
			{isComponentVisible && <Box/>}

			<div className="readButton">
	            <button onClick={handleRead}> 
	            	<span>
		            	{buttonText ? buttonText : <FontAwesomeIcon icon={faCheck} />}
					</span>
	            </button>
            </div>
	    </div>
	);
}

export default ReadButton;