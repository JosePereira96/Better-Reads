import { useState,useEffect } from "react";
import { Link } from "react-router-dom"; 
import './NavBar.css'



function NavBar({loadLocalStorage}) {
	const currentYear = new Date().getFullYear();

	const [fileData,setFileData] = useState(loadLocalStorage('library'));

	return(
		<header className="navbar">
	        <div className="navbar-left">
		        <Link to='/Better-Reads/home'>
		            <div className="navbar-brand">BetterReads</div>
		        </Link>
	            
	            <nav className="navbar-nav">
	            	<Link reloadDocument to='/Better-Reads/tbr'>
	                	<span>TBR</span>
	                </Link>

	                <Link reloadDocument to='/Better-Reads/bookshelves/all'>
	                	<span>My Books</span>
	                </Link>

	                <Link reloadDocument to={`/Better-Reads/reading-goal/${currentYear}`}>
	                	<span>Reading Goals</span>
	                </Link>

	                <Link to='/Better-Reads/recommendations'>
	                	<span>Recommendations</span>
	                </Link>
	            </nav>
	        </div>
	        <nav className="navbar-right">
	        	<Link to="/Better-Reads/about">
	            	<span>About</span>            
	            </Link>
	        </nav>
    	</header>


		
	);
}

export default NavBar;