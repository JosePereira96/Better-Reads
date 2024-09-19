import { useState } from "react"; 
import { Link } from "react-router-dom";

import "./ReadingGoal.css";
import bookIcon from './assets/bookIcon.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook,faBookOpen } from '@fortawesome/free-solid-svg-icons';


import useComponentVisible from "./useComponentVisible";



function ReadingGoal({ loadLocalStorage, currentYear }) {
	let currentYearGoal;

	let fileData = loadLocalStorage('readingGoals');

	for(let i in fileData){
		if(fileData[i].Year === currentYear){
			currentYearGoal = fileData[i];
			break;
		}
	}

	const [editedGoal, setEditedGoal] = useState(currentYearGoal);

	let progress = Math.floor(editedGoal.BooksRead.length / editedGoal.Goal * 100);
	progress = Math.min(100,progress);

	
	const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);


	const handleEdit = () => {
		setIsComponentVisible(true);
	}

	const handleCancel = () => {
    	setIsComponentVisible(false);
  	}

  	const handleConfirm = (newGoal) => {

  		setEditedGoal(prevState => {
  			return {...prevState, Goal: newGoal};
  		});
  		
  		setIsComponentVisible(false);
  	}


	function Box({year, goal, handleConfirm, handleCancel}) {
		
		const [auxGoal, setAuxGoal] = useState(goal);

		const updateGoal = newGoal => {	
			if(Number(newGoal)){
				setAuxGoal(Number(newGoal));
			} else{
				setAuxGoal(0);
			}
	  	}

  		return(
  			<div className="modal" >
	      		<div className="remove-box-content" ref={ref}>

			      	<span className="close-btn" onClick={handleCancel}>&times;</span>
			      	
			      	<div className="editGoalBox">
			    		<h1>
			    			<img className="bookIcon" 
			    				 src={bookIcon}/>
			    			&ensp;{year} Reading Goal
			    		</h1>
			    
			      	</div>
			      	<div>
			      		{"I want to read "}
			      		<input className="goalInput" 
			      			   size="2" 
			      			   type="text" 
			      			   value={auxGoal} 
			      			   onChange={e => updateGoal(e.target.value)}
			      			   autoFocus/>
			      		{" books in " + year}
			      	</div>
			      	
		    		
		    		<div className="btn-container">
			          <button 
			            className="cancel-btn" 
			            onClick={handleCancel}>
			              Cancel
			          </button>
			          <button 
			            className="confirm-btn"
			            onClick={() => handleConfirm(auxGoal)}>
			              Confirm
			          </button>
			        </div>
				</div>
			</div>
  		);
  	}




	return(
		<>	
		{isComponentVisible && <Box year={editedGoal.Year}
									goal={editedGoal.Goal}
									handleConfirm={handleConfirm}
									handleCancel={handleCancel}/>}

		<div className="ReadingGoalContainer">
			    <header className="banner">
			    	<img className="bookIcon" src={bookIcon}/>
			    	<h1>&ensp;{editedGoal.Year} Reading Goal</h1>
			    </header>
			   	
			   	<div className="content-container">
			        <div className="main-content">
			        	<div className="progress-section">
				            <h2>Reading Progress</h2>
				            <div className="progress-bar-container">
				                <div className="progress-bar" style={{width: progress + "%"}}/>
				            </div>
				            <span>{progress}% Completed</span>
				            
			        	</div>

			        	<div className="subtitle-section">
			            	<h2 className="subtitle">
			            	You've read {editedGoal.BooksRead.length} of {editedGoal.Goal} books
			            	</h2>
			            	<p className="editGoal" onClick={handleEdit}>Edit</p>
			            </div>
			        
			        
			            <div className="images-container">
			                {editedGoal.BooksRead.map( book => {
	          					return(<img src={book.imageURL[0]} alt={`${book.Title} by ${book.Author}`}/>);	
			      			})}
			            </div>

			            
		            </div>
		            <div className="side-menu">
		                <ul>
		                	{fileData.map( goal => {
		                		if(goal.Year != currentYear){
			                		return(
			                			<li>
					                    	<img className="bookIcon" src={bookIcon}/>
					                    	<Link reloadDocument to={'/reading-goal/' + goal.Year}>
					                    		<span>{goal.Year} Reading Challenge</span>
					                    	</Link>
					                    </li>
			                		);
			                	}
		                	})}
		                </ul>
			        </div>
			    </div>
		    </div>
	    </>

		
	);
}

export default ReadingGoal;


