import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

import "./AddToTBRButton.css"

function AddToTBRButton({ bookInfo, setBookInfo, inTBR, setInTBR }) {
	
	

	const handleToggle = () => {

		//update inTBR hook
		setInTBR(prevState => !prevState);

		let shelves = [...bookInfo.Bookshelves];

		if(inTBR){
			//if book is in tbr, remove it
			shelves = shelves.filter(e => e !== 'tbr');
		} else{
			//add tbr
			shelves.push('tbr');
		}

		//update bookInfo
		setBookInfo(prevState => {
			return {...prevState, Bookshelves:shelves};
		})
	}


	return(
		<button className={"tbr-button"} onClick={handleToggle} style={{backgroundColor: inTBR ? '#1f76c3' : '#e0e0e0'}}>
			<FontAwesomeIcon icon={faBook} />
		</button>

	);
}

export default AddToTBRButton;


