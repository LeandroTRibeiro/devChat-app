import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { Api } from '../api/api';

import { Footer } from '../components/Footer';
import { Loader } from '../components/Loader';

export const Recover = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [disabled, setDisable] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleRecover = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setDisable(true);
        setLoading(true);
        try {

            const response = await Api.recoverPassword(email);

            if ( response.send ) {
                navigate('/acessmail');
            } else {
                setDisable(false);
                setLoading(false);
                setError(response.error);
            }

        } catch(error) {

            setDisable(false);
            setLoading(false);
            setError('E-mail inválido');
            console.log(error);

        }
    };

    return (
        <>
        {loading &&
            <>
            <Loader data={{loading}} />
            <Footer />
            </>
        }
        {!loading &&
            <>
            <div className="h-[100vh] flex justify-center items-center bg-white">
                <div className="card w-96 ms:w-4/5 shadow-xl border-2 bg-slate-50 text-stone-800">
                    <div className="card-body flex items-center">
                        <h2 className="text-5xl font-bold text-secondary-focus">DevChat</h2>
                        <p className='text-lg font-semibold'>Recupere sua Conta</p>
                        <p>Enviaresmo um e-mail com um link para recuperação de sua conta, basta nos informar o E-mail do usuário.</p>
                        <form className="flex flex-col gap-6 w-full" method='POST' onSubmit={handleRecover}>
                            <label className="flex flex-col gap-2">
                                <span className="font-semibold">E-mail</span>
                                <input 
                                    type="email" 
                                    className={`input w-full bg-slate-50 ${error ? 'input-error' : 'input-secondary'}`}
                                    placeholder="E-mail"
                                    value={email}
                                    onChange={changeEmail}
                                    required
                                    disabled={disabled}
                                />
                                {error && 
                                    <div className='flex'>
                                        <span className="text-red-600 text-sm">{error}</span>
                                    </div>
                                }
                            </label>
                            <button className="btn btn-secondary w-full" disabled={disabled}>Enviar</button>
                        </form>
                        <div className='text-lg mt-6'>Não tem conta? <Link to='/register' className='text-primary'>Cadastre-se</Link></div>
                    </div>
                </div>
            </div>
            <Footer />
            </>
        }
        </>
    );
};