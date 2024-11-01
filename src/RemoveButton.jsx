import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useComponentVisible from "./useComponentVisible";


function RemoveButton({bookInfo,setBookInfo,setIsBookVisible, context, updateLibrary, updateTBR }){

	const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

	const handleRemove = () => {
    	setIsComponentVisible(true);

    	//remove from tbr bookshelf
	    if(context === 'tbr'){
	    	//update shelves
	    	//remove tbr from bookshelves
		    let shelves = [...bookInfo.Bookshelves];
		    shelves = shelves.filter(e => e !== 'tbr');


	    	setBookInfo(prevState => {
  				return {...prevState, Bookshelves: shelves};
  			});
	    }
 	}

	const handleCancel = () => {
    	setIsComponentVisible(false);
  	}


	const handleConfirm = () => {

		if(context === 'tbr'){
			//update info in library
			updateLibrary(bookInfo);			
		} else if(context === 'shelf'){
			//remove book from library
	    	//call updateLibrary with removeFlag = true
	    	updateLibrary(bookInfo,true);	
		}

		//remove from tbr
		updateTBR(bookInfo,context);
	    
	    

	    //hide book 
	    setIsBookVisible(false);

	    //hide box
	    setIsComponentVisible(false);


	    //toast emitter
	    let toastMessage = bookInfo.Title + ' was removed';
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

  	}

  	function Box() {
  		return(
  			<div className="modal" >
	      		<div className="remove-box-content" ref={ref}>

			      	<span className="close-btn" onClick={handleCancel}>&times;</span>
			      	<h2>{"Remove"}<br/>{bookInfo.Title + '?'}</h2>
			      	<img className="cover-image" src={bookInfo.imageURL[0]}/>
		    		
		    		<div className="btn-container">
			          <button 
			            className="cancel-btn" 
			            onClick={handleCancel}>
			              Cancel
			          </button>
			          <button 
			            className="confirm-btn"
			            onClick={handleConfirm}>
			              Confirm
			          </button>
			        </div>

					
					
				</div>
			</div>
  		);
  	}



	return(
		<div>
			{isComponentVisible && <Box/>}

			<div className="removeButton">
		        <button onClick={handleRemove} className="trash-btn">
		          <FontAwesomeIcon icon={faTrash} />                        
		        </button>
		    </div>
	    </div>
	);
}

export default RemoveButton;