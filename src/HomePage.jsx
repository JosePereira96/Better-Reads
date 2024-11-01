//home page for web app
//before importing a file -> show import button. 
//add instructions to exporting library from goodreads and import to the app
 
//after -> show your activity, tradestories new entries, recommended, currently reading, etc. 

import { useState,useEffect } from "react";
import { Link } from "react-router-dom";

import LinearProgress from '@mui/material/LinearProgress';

import useComponentVisible from "./useComponentVisible";

import './HomePage.css'

import { trimData } from './dataProcessing.js';
import { getImageURL, updateImageURL, updateTBR, updateReadingGoal, updateShelves } from './apiCalls.js';

function HomePage({setLocalStorage}) {

	const [file, setFile] = useState(null);
	const reader = new FileReader();

	const [message, setMessage] = useState('');
	const [done, setDone] = useState(false);

	const [librarySize, setlibrarySize] = useState(0);
	const [progress, setProgress] = useState(0);
	const [percentage, setPercentage] = useState(0);

	const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

	const handleInstructions = () => {
		setIsComponentVisible(true);
	}

	const handleCancel = () => {
    	setIsComponentVisible(false);
  	}


	useEffect( () => {
		setPercentage(Number(100*progress/librarySize));
	}, [progress,librarySize]);

	async function handleUpload() {

		if(!file){
			setMessage('No File');
			return;
		}

		reader.readAsText(file);


		reader.addEventListener('loadend', async e => {
			let rawData = e.target.result;
			buildLibrary(rawData,false);
		});	    
	}

	async function buildLibrary(input) {
		setMessage('Processing Data...');
		let trimmedData = await trimData(input);

		//fetch book covers
		setMessage('Fetching book covers. This operation may take a few minutes');

		setlibrarySize(trimmedData.library.length);

		for (let i in trimmedData.library){
			let title = trimmedData.library[i].Title;
			let author = trimmedData.library[i].Author;

			let array = await getImageURL(title, author);

			//merge arrays
			for (let j in array){
				if (!trimmedData.library[i].imageURL.includes(array[j])){
					trimmedData.library[i].imageURL.push(array[j]);
				}
			}

			setProgress(prevState => {
				return prevState+1;
			});
		}


    	setMessage("Updating TBR");
    	trimmedData = await updateTBR(trimmedData);

    	setMessage("Updating Reading Goals");
    	trimmedData = await updateReadingGoal(trimmedData);

    	setMessage("Updating Shelves");
    	trimmedData = await updateShelves(trimmedData);

    	setMessage("Upload successful.");
    	setDone(true);
    	
    	setLocalStorage('tbr',trimmedData.tbr);
    	setLocalStorage('library',trimmedData.library);
    	setLocalStorage('readingGoals',trimmedData.readingGoal);
    	setLocalStorage('shelves',trimmedData.shelves);
	}

	async function dummyButton() {
		const response = await fetch('./dummyFile.csv');
		console.log(response);
		const dummyData = await response.text();
		console.log(dummyData);
		buildLibrary(dummyData);
	}


	function Box() {
		return(
			<div className="modal">
		        <div className="modal-content" ref={ref}>
		            <span className="close-btn" onClick={handleCancel}>
		            	&times;
		            </span>

					<h2>Exporting Your Goodreads Library</h2>
					<div className="instruction">
						<ol>
							<li>Log in to your Goodreads account</li>

							<li>Navigate to <b>My Books</b></li>

							<li>Click on <b>Import and export</b> under <b>Tools</b></li>

							<li>Click on the <b>Export Library</b> button</li>

							<span>Wait a few seconds while Goodreads generates the export file.</span>


							<li>Download the export file</li>

							<span>After clicking <b>Your export from (...)</b> a file will be saved in 
							your computer's Downloads folder named <i>goodreads_library_export.csv</i></span>
						</ol>
					</div>
				</div>
			</div>
		);
	}



	return(
		<>
		<section className="about-section">
			{isComponentVisible && <Box/>}
			<div className="container">
				<div>
		        	<h1>Reading Tracker <img src="./books.jpg"/></h1>
		        	<p>Keep track of all the books you read and want to read. To begin, import your library from Goodreads. </p>
		        	<p>If you want to know how to export your Goodreads library, see <u onClick={handleInstructions}>instructions</u>.</p>
		        	<p>Alternatively, <u onClick={dummyButton}>use a dummy library.</u></p>
		        </div>

		        <div className="import-div">
		        	<label htmlFor="file-input" className="import-button" onClick={handleUpload}>Import File</label>
		        	<input className="input-field" 
		        		   onChange={ e => {console.log(e.target.files[0]);
		        										setFile(e.target.files[0]);}} 
		        		   type="file"/>

		        </div>
		        
		        {message !== '' && 
		        <div className='status-div'>
		        	<div>
		        		<LinearProgress color="success" variant="determinate" value={percentage} />
					</div>
					<div className='status-text'>
			        	<span>{message}</span>
		        	</div>
		        	<div className='done-text'>
			        	{done && <span> Go to <Link reloadDocument to='../bookshelves/all' relative="path">
				        								<u>BookShelves</u>
				        							</Link></span>}
			        </div>
		        </div>
		        } 


	    	</div>
	    </section>
    	</>
	);
	
}

export default HomePage;


