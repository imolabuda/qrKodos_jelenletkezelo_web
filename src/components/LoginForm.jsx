import {useEffect, useState} from "react";
import {onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase-config";

function LoginForm(){

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] =  useState("");
    const [user, setUser] = useState({});

    useEffect(() => { //ha valami valtozik az oldalon
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        })
    }, [])

    const login = async () => { //async - kulon fut es nem "fagy ki", lehet interaktalni a kinezettel
        try{
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword); //auth - firebase-configbol
            console.log(user);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="LoginForm">
            <h3>
                Belépés
            </h3>
            <input placeholder="E-mail cím.." 
                    onChange={(event) => {
                        setLoginEmail(event.target.value);
                    }}/>
        
            <input placeholder="Jelszó.."
                    onChange={(event) => {
                        setLoginPassword(event.target.value);
                    }}/>
            
            <button onClick={login}>
                Belépés
            </button>

            <h3>
                Bejelentkezett felhasználó: {user?.email}
            </h3>

        </div>
    )
}

export default LoginForm //emiatt lehet egyszeruen importalni