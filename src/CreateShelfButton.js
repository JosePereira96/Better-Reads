import { useState } from "react";

import "./CreateShelfButton.css"

function CreateShelfButton({setShelves}) {

  	const [isBoxVisible, setBoxVisible] = useState(false);


  	const createShelf = () => {
  		setBoxVisible(true);
  	}

	const handleCancel = () => {
    	setBoxVisible(false);
  	}

	const handleConfirm = () => {
		//add element to html
		let input = document.getElementById('shelfName').value;

		if (input){
			setShelves(prevState => {
				return[...prevState, input];
			})
		}

	    setBoxVisible(false);
  	}


	return(
		<div>
			{isBoxVisible && (
			<div className={"add-shelf-div"}>
				<span>Add a Shelf</span>
				<input type="text" id="shelfName" required/>
				<button className="confirmation-button" onClick={handleConfirm}>Confirm</button>
	        </div>
	        )}

			<button className={"add-shelf-btn"} onClick={createShelf}>Add Shelf</button>
	    </div>
	);
}


//style={{backgroundColor: inTBR ? '#1f76c3' : '#e0e0e0'}} 







export default CreateShelfButton;