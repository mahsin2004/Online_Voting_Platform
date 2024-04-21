import { auth } from "@/app/firebase/config";
import { signOut } from "firebase/auth";
// import { useAuthState } from "react-firebase-hooks/auth;";


const LogOut = () => {
  // const [user] = useAuthState(auth);
  // console.log({user});

  return (
    <div>
      <button className="btn bg-white text-black btn-sm" onClick={() => signOut(auth)}>LogOut</button>
    </div>
  );
};

export default LogOut;
