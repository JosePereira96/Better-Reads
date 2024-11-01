import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

function ComingSoon(){
    return(
    <div className="main-content">
        <section className="coming-soon-section">
            <h2>Coming Soon</h2>
            <p>For inquiries, please contact me at&nbsp;&nbsp;<FontAwesomeIcon icon={faEnvelope}/> <a href="mailto:jose.eduardo.pereira96@gmail.com">jose.eduardo.pereira96@gmail.com</a>.</p>
        </section>
    </div>);
}

    
export default ComingSoon;