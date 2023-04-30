
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from 'react-router-dom';

function AboutUs() {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }

    return(
        <div className="container">
        <nav className="nav-holder">
            <h2>Azil za životinje</h2>

            <ul className="nav-stranice">
                <button><li>Home</li></button>
                <button><li>Donacije</li></button>
                <button><li>Obavijesti</li></button>
                <button><li>Admin opcije</li></button>
            </ul>
        </nav>

        <div className="main-container">
        <h2>Kontaktiraj naš tim!</h2>
        
        <br /><br />
            <div className="info-container">
                <p>Email: </p><a href="mailto:azilzivotinjesplit001@gmail.com">azilzivotinjesplit001@gmail.com</a>
                <p>Telefonski broj: </p><a href="tel:+385996379852">+385 99 6379 852</a> <br /><br />
                <a href="twitter.com">Twitter</a> <br />
                <a href="instagram.com">Instagram</a> <br />
                <a href="facebook.com">Facebook</a> <br />
            </div>
            
            <br />
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2751424.973836109!2d10.706122026392375!3d47.66619207163909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476d079b259d2a7f%3A0x1012d47bdde4c1af!2sAustrija!5e0!3m2!1shr!2shr!4v1682890478856!5m2!1shr!2shr" width="400" height="300" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            <br /><br />

            <div className="kontakt-holder">
                <h3>Kontaktiraj nas!</h3> <br />
                
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
                        <div className="form-column">
                        <label for="first-name">Vaše ime:</label>
                        <input type="text" id="first-name" name="first-name" placeholder="Upišite vaše ime..." {...register("userFirstName")} required />
                        </div>
                        <div className="form-column" style={{marginBottom: "10px"}}>
                        <label for="last-name">Vaše prezime:</label>
                        <input type="text" id="last-name" name="last-name" placeholder="Upišite vaše prezime..." {...register("userLastName")} required/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-column">
                        <label for="contact-email">Vaš kontakt email:</label>
                        <input type="email" id="contact-email" name="contact-email" placeholder="Upišite vašu kontaktu email-adresu...." {...register("userEmail")} required/>
                        </div>
                        <div className="form-column" style={{marginBottom: "6px"}}>
                        <label for="contact-number">Vaš kontakt broj</label>
                        <input type="tel" id="contact-number" name="contact-number" placeholder="Upišite vaš kontakt broj..." {...register("userNumber")} required/>
                        </div>
                        </div>
                    <div className="form-row">
                        <label for="contact-message">Vaša poruka:</label>
                        <textarea id="contact-message" name="contact-message" placeholder="Upišite vašu poruku..." {...register("userMessage")}required></textarea>
                    </div>
                    <div className="form-row">
                        <br />
                        <button type="submit">Pošalji upit!</button>
                    </div>
                </form>
            </div>
        </div>

        </div>
    )
}

export default AboutUs