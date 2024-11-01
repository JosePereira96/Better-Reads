import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';


function AboutPage(){
	return(
	    <div className="main-content">
	        <section className="about-section">
	            <h2>About</h2>
	            <p>Welcome to <b>BetterReads</b>, the ultimate companion for tracking your reading journey. This project is designed to help you keep track of the books you’ve read, the ones you want to read, and everything in between. Whether you're a casual reader or a bibliophile, <b>BetterReads</b> is designed to enhance your reading experience.</p>
	            <h3>Features</h3>
	            <ul>
	                <li>Track your reading progress</li>
	                <li>Organize books into shelves</li>
	                <li>Rate your reads</li>
	                <li>Create and manage your TBR list</li>
	                <li>Get personalized book recommendations (Coming soon)</li>
	            </ul>
	            <br/>
	            <h3>Main Goal</h3>
	            <p>My goal in creating this project is to sharpen my technical skills, such as, web development and user experience design, while delivering a valuable tool for book lovers.
	            Ultimately, this app combines my passion for technology and reading and aspires to create a more modern and intuitive tool to manage your reading habits without distractions.</p>
	            <p>This is a work in progress and does not represent my final vision for this project.</p>
	            
	            <h3>Contact</h3>
	            <p>If you have any questions, feedback or suggestions feel free to reach out to me at&nbsp;&nbsp;<FontAwesomeIcon icon={faEnvelope}/> <a href="mailto:jose.eduardo.pereira96@gmail.com">jose.eduardo.pereira96@gmail.com</a></p> 
		       	<p>Check out my <FontAwesomeIcon icon={faGithub}/> <a href="https://github.com/JosePereira96">GitHub</a> page to see my other projects.</p>


	        </section>
	    </div>

	);
}

export default AboutPage;


            
            

            


