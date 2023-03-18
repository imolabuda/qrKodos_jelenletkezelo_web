import {useEffect, useState} from "react";
import {onAuthStateChanged, createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase-config";

function RegisterForm(){

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [user, setUser] = useState({});

    useEffect(() => { //ha valami valtozik az oldalon
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        })
    }, []) //ha a szogletesben levo erteke valtozik, akkor meghivodik a felso par sor
        //ha ures, akkor akarmi is valtozik, meghivodik

    const register = async () => { //async - kulon fut es nem "fagy ki", lehet interaktalni a kinezettel
        try{
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword); //auth - firebase-configbol
            console.log(user);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="RegisterForm">
        <h3>
            Regisztráció
        </h3>
        <input placeholder="E-mail cím.."
                onChange={(event) => {
                    setRegisterEmail(event.target.value);
                }}/>
    
        <input placeholder="Jelszó.."
                onChange={(event) => {
                    setRegisterPassword(event.target.value);
                }}/>
        
        <button onClick={register}>
            Regisztráció
        </button>

        {/* <h3>
            Regisztrált felhasználó: {user?.email}
        </h3> */}

    </div>
    )
}

export default RegisterForm