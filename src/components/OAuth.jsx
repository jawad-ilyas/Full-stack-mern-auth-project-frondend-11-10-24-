import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { fireBaseapp } from "../firebase";
import { useDispatch } from "react-redux";
import { google } from "../features/Auth.Slice";



const OAuth = () => {
    const dispatch = useDispatch();
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(fireBaseapp);
            const result = await signInWithPopup(auth, provider)
            console.log("result ", result?.user?.displayName);
            console.log("result ", result?.user?.photoURL);
            console.log("uid ", result?.user?.uid);
            console.log("email ", result?.user?.email);
            const data = {
                name: result?.user?.displayName,
                email: result?.user?.email,
                photoURL: result?.user?.photoURL,
                uid: result?.user?.uid,
            }
            dispatch(google(data));

        } catch (error) {
            console.log("could not login with google ", error)
        }
    }
    return (
        <button type="button" className="w-full bg-red-400  rounded-lg p-3" onClick={handleGoogleClick}>
            Continue With Google
        </button>
    )
}

export default OAuth