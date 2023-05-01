
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return(
        <div>
            <div className="container">
                <nav className="nav-holder">
                    <h2>Azil za životinje</h2>

                    <ul className="nav-stranice">
                        <button onClick={() => {navigate('/aboutus')}}><li>O nama</li></button>
                        <button onClick={() => {navigate('/donations')}}><li>Donacije</li></button>
                        <button onClick={() => {navigate('/notifications')}}><li>Obavijesti</li></button>
                        <button onClick={() => {navigate('/dashboard')}}><li>Admin opcije</li></button>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Home