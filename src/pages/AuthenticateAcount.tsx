import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Api } from "../api/api";
import { Footer } from "../components/Footer";
import { Loader } from "../components/Loader";
import { setCookie } from "../helpers/Cookie";
import { setLogin } from "../redux/reducers/isLogin";

export const AuthenticateAcount = () => {

    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const AuthenticateAcount = async () => {
            setLoading(true);
            const token = searchParams.get('token');
            if(token) {
                const response = await Api.authenticateUser(token);
                if(response.token) {
                    dispatch(setLogin(true));
                    setLoading(false);
                    setCookie(response.token);
                } else {
                    setLoading(false);
                    setError(response.error);
                }
            } else {
                setLoading(false);
                setError('Token inválido');
            }
        };
        AuthenticateAcount();
    },[])

    return (
        <div>
            <>
            {loading &&
                <Loader data={{loading}}/>
            }
            {!loading &&
                <>
                {error &&
                    <div className="h-[100vh] flex justify-center items-center bg-white">
                        <div className="w-2/4 card bg-slate-50 text-stone-800 shadow-xl border-2 ms:w-3/4 mx:w-11/12">
                            <div className="card-body flex items-center gap-5">
                                <h2 className="text-5xl font-bold text-secondary-focus">DevChat</h2>
                                <p className='text-lg font-semibold'>Error!</p>
                                <p>{error}, Você deverá refazer o processo de autenticação da conta!</p>
                                <Link to='/' className="btn btn-secondary">Voltar</Link>
                            </div>
                        </div>
                    </div>
                }
                {!error &&
                
                    <div className="h-[100vh] flex justify-center items-center bg-white">
                        <div className="w-2/4 card bg-slate-50 text-stone-800 shadow-xl border-2 ms:w-3/4 mx:w-11/12
                        ">
                            <div className="card-body flex items-center gap-5">
                                <h2 className="text-5xl font-bold text-secondary-focus">DevChat</h2>
                                <p className='text-lg font-semibold'>E-mail Confirmado!</p>
                                <p>Parabéns agora você faz parte da família DevChat.</p>
                                <Link to='/livechat' className="btn btn-secondary">Ir para o Chat</Link>
                            </div>
                        </div>
                    </div>
                }
                </>
            }
            </>
            <Footer />
        </div>
    );
};


