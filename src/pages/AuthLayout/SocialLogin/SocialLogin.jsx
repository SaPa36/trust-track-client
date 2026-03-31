import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";


const SocialLogin = () => {
    const {signInWithGoogle} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleGoogleSignIn = () => {
        signInWithGoogle()
        .then(result => {
            const user = result.user;
                Swal.fire({
                    title: 'Success!',
                    text: 'You have successfully logged in.',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                  });
            navigate(from, { replace: true });
        })
        .catch(error => console.log(error));
    };
    return (
        <div>
            <button 
                className="w-full flex items-center justify-center gap-2 border bg-slate-200 border-slate-200 py-3 rounded-xl hover:bg-slate-50 transition-all"
                onClick={handleGoogleSignIn}
            >
                <FcGoogle className="text-xl" />
                <span className="text-sm font-medium text-slate-600">Login with google</span>
            </button>
        </div>
    );
};

export default SocialLogin;