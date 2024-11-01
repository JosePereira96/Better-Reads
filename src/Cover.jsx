import blankImage from './assets/blank.jpg';


function Cover({ bookInfo }) {
	return <img alt={`${bookInfo.Title} by ${bookInfo.Author}`}
				src={bookInfo.imageURL.length === 0 ? blankImage : bookInfo.imageURL[0]}/>
}

export default Cover;