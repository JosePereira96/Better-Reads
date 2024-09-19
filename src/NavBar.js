import { useState,useEffect } from "react";
import { Link } from "react-router-dom"; 
import './NavBar.css'



function NavBar({loadLocalStorage}) {
	const currentYear = new Date().getFullYear();

	const [fileData,setFileData] = useState(loadLocalStorage('library'));

	return(
		<header className="navbar">
	        <div className="navbar-left">
		        <Link to='/'>
		            <div className="navbar-brand">BetterReads</div>
		        </Link>
	            
	            <nav className="navbar-nav">
	            	<Link reloadDocument to={fileData ? '/tbr' : '/'}>
	                	<span>TBR</span>
	                </Link>

	                <Link reloadDocument to={fileData ? '/bookshelves/all' : '/'}>
	                	<span>My Books</span>
	                </Link>

	                <Link to={fileData ? '/reading-goal/' + currentYear : '/'}>
	                	<span>Reading Goals</span>
	                </Link>

	                <Link to='/recommendations'>
	                	<span>Recommendations</span>
	                </Link>
	            </nav>
	        </div>
	        <nav className="navbar-right">
	        	<Link to="/about">
	            	<span>About</span>            
	            </Link>
	        </nav>
    	</header>


		
	);
}

export default NavBar;