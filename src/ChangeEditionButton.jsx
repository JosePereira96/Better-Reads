import { useState } from "react"; 

import useComponentVisible from "./useComponentVisible";

//box to choose a different cover to be displayed. 
//each cover has a delete button so duplicates can be eliminated

function ChangeEditionButton({bookInfo,setBookInfo}) {

	const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
	
	const handleChangeEdition = () => {
		//open box
		setIsComponentVisible(true);
	}

	
	const handleCancel = () => {
		//close box
    	setIsComponentVisible(false);
  	}


  	
  	const handleChosen = index => {
  		//updates the bookInfo.imageURL array
  		//swaps the chosen cover to the first position
  		//the first cover is the displayed one

		if(index !== 0){
			//swap two covers
			let bookCovers = [...bookInfo.imageURL];
			let aux = bookCovers[0];
			bookCovers[0] = bookCovers[index];
			bookCovers[index] = aux;
			
			setBookInfo(prevState => {
				return {...prevState, imageURL:bookCovers};
			});
		}


		//CLOSE DIALOG BOX
	    //setIsComponentVisible(false);
	    
  	}

  	const handleRemoveCover = index => {
  		let bookCovers = [...bookInfo.imageURL];
  		bookCovers.splice(index,1);
  		
  		setBookInfo(prevState => {
				return {...prevState, imageURL:bookCovers};
		});
  	}

  	function Box() {
  		return(
  			<div className="modal" >
	      		<div className="modal-content" ref={ref}>

			      	<span className="close-btn" onClick={handleCancel}>&times;</span>
		    		<h2>Select a New Cover</h2>

					
					<div className="covers-container">
					{/*
			        	{bookInfo.imageURL.map( (cover,index) => {
			        		if(index === 0 ){
			        			return(
					        		<div className="first-cover">
						        		<button className="remove-cover-btn" 
						        				onClick={() => handleRemoveCover(index)}>
						        			<span>&times;</span>
						        		</button>
						        		<img className="cover-image" src={cover} onClick={() => handleChosen(index)}/>
					        		</div>
			        		)} else{
			        				return(
			        					<div className="cover-item">
							        		<button className="remove-cover-btn" 
							        				onClick={() => handleRemoveCover(index)}>
							        			<span>&times;</span>
							        		</button>
							        		<img className="cover-image" src={cover} onClick={() => handleChosen(index)}/>
					        			</div>
					        		)}
			        		})}
					}
					*/}

					{bookInfo.imageURL.map( (cover,index) => 
		        		<div className="cover-item">
			        		<button className="remove-cover-btn" 
			        				onClick={() => handleRemoveCover(index)}>
			        			<span>&times;</span>
			        		</button>
			        		<img className="cover-image" src={cover} onClick={() => handleChosen(index)}/>
		        		</div>
		        	)}
			        </div>
				</div>
			</div>
  		);
  	}

  	
	return(
		<div>
			{isComponentVisible && <Box/>}
			<button className="change-edition-btn" onClick={handleChangeEdition}>Change Edition</button>
		</div>
	);
	

}

export default ChangeEditionButton;