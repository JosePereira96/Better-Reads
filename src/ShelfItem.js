import { useEffect, useState } from "react";
import { Rating } from 'react-simple-star-rating';

import blankImage from './assets/blank.jpg';

import RemoveButton from './RemoveButton';
import EditButton from './EditButton';
import ChangeEditionButton from './ChangeEditionButton';
import AddToTBRButton from './AddToTBRButton'

import "./ShelfItem.css"


function ShelfItem({ loadLocalStorage, updateLibrary, updateTBR, index }) {

	let book = loadLocalStorage('library')[index];

	const [isBookVisible, setIsBookVisible] = useState(true);
	
	const [bookInfo, setBookInfo] = useState(book);

	const [inTBR, setInTBR] = useState( () => {
		return(bookInfo.Bookshelves.includes('tbr') || bookInfo.Bookshelves.includes('currently-reading'));
	});
	 
	useEffect( () => {updateLibrary(bookInfo)}, [bookInfo]);
	useEffect( () => {updateTBR(bookInfo, "shelf")}, [inTBR]);

	/*
	const updateVisible = () => {
  		setIsComponentVisible(true);
  	}
  	*/

	return(
		isBookVisible && (
			<tr>
				<td>
					<div className="coverFotoDiv">
						<div className="coverFoto">
							<img
							src={bookInfo.imageURL.length === 0 ? blankImage : bookInfo.imageURL[0]}/>
						</div>
						
						<ChangeEditionButton className="change-edition-btn" bookInfo={bookInfo} setBookInfo={setBookInfo} />

					</div>
				</td>

				<td>{bookInfo.Title}</td>
				<td>{bookInfo.Author}</td>
				<td>
					<Rating initialValue={bookInfo.MyRating} allowFraction readonly/>
				</td>
				<td>{bookInfo.Bookshelves.map( (shelf,i) => {
							return(<div>
										<span>{shelf}</span>
									</div>)
									})}
				</td>
				<td>{bookInfo.DateRead}</td>

				<td>
					<EditButton bookInfo={bookInfo}
								setBookInfo={setBookInfo}
								loadLocalStorage={loadLocalStorage}/>
				</td>

				<td>
					<RemoveButton bookInfo={bookInfo} 
								  setBookInfo={setBookInfo} 
								  setIsBookVisible={setIsBookVisible}
								  context={"shelf"}
								  updateLibrary={updateLibrary}
								  updateTBR={updateTBR}/>
				</td>

				<td>
					<AddToTBRButton bookInfo={bookInfo} 
								  	setBookInfo={setBookInfo}
								  	inTBR={inTBR} 
								  	setInTBR={setInTBR}/>
					
				</td>
			</tr>
		)
	);
	
}

export default ShelfItem;