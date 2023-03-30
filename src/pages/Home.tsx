import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { setLogin } from '../redux/reducers/isLogin';

import { Link, useNavigate } from 'react-router-dom';

import { Api } from '../api/api';
import { setCookie } from '../helpers/Cookie';

import { Footer } from '../components/Footer';
import { Loader } from '../components/Loader';

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export const Home = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disable, setDisable] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const handleEye = () => {

        if ( showPassword ) {
            setShowPassword(false);
        } else {
            setShowPassword(true);
        }
    };

    const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setDisable(true);
        setLoading(true);
        try {

            const response = await Api.doLogin(email, password);

            if(response.token) {

                setCookie(response.token);
                dispatch(setLogin(true));
                navigate('/livechat');

            } else {
                
                setLoading(true);
                const emailConfirm = await Api.sendConfirmEmail(email);

                
                if(emailConfirm.send) {
                    setLoading(false);
                    navigate('/almostthere');
                } else {
                    setLoading(false);
                    console.log(response, emailConfirm);
                }
            }

           
        } catch(error: any) {

            setLoading(false);
            setDisable(false);
            setError(error.response.data.error);
        }

    };

    return (
        <>
            {loading &&
                <Loader data={{loading}}/>
            }
            {!loading &&
                <div className="h-[100vh] flex justify-center items-center bg-white">
                    <div className="card w-96 bg-slate-50 shadow-xl border-2 text-stone-800 ms:w-4/5">
                        <div className="card-body flex items-center">
                            <h2 className="text-5xl font-bold text-secondary-focus">DevChat</h2>
                            <p className='text-lg font-semibold'>Acesse sua conta</p>
        
                            <form className="flex flex-col gap-6 w-full" method='POST' onSubmit={handleLogin}>
                                <label className="flex flex-col gap-2">
                                    <span className="font-semibold">E-mail</span>
                                    <input 
                                        type="email" 
                                        className={`input w-full bg-slate-50 ${error ? "input-error" : "input-secondary"}`}
                                        placeholder="E-mail"
                                        value={email}
                                        onChange={changeEmail}
                                        required
                                        disabled={disable}
                                    />
                                    {error === 'Usuário inexistente' && 
                                        <div className='flex'>
                                            <span className="text-red-600 text-sm">{error}</span>
                                        </div>
                                    }
                                </label>
                                <label className="flex flex-col gap-1">
                                    <div className="flex justify-between">
                                        <span className='font-semibold'>Senha</span>
                                        <Link to='/recover' className='text-primary'>Esqueceu a senha?</Link>
                                    </div>
                                    <div className="flex justify-end items-center">
                                        {showPassword &&
                                            <div className="absolute cursor-pointer mr-2" onClick={handleEye}>
                                                <EyeIcon className="w-5"/>
                                            </div>
                                        }
                                        {!showPassword &&
                                            <div className="absolute cursor-pointer mr-2" onClick={handleEye}>
                                                <EyeSlashIcon className="w-5"/>
                                            </div>
                                        }
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            className={`input w-full bg-slate-50 ${error ? "input-error" : "input-secondary"}`}
                                            placeholder="Senha"
                                            value={password}
                                            onChange={changePassword}
                                            required
                                            disabled={disable}
                                            autoComplete="on"
                                        />
                                    </div>
                                    {error === 'Senha inválida' && 
                                        <div className='flex'>
                                            <span className="text-red-600 text-sm">{error}</span>
                                        </div>
                                    }
                                </label>
                                <button className="btn btn-secondary w-full mt-6" disabled={disable}>Entrar</button>
                            </form>
                            
                            <div className='text-lg mt-6'>Não tem conta? <Link to='/register' className='text-primary'>Cadastre-se</Link></div>
                        </div>
                    </div>
                </div>
            }
            <Footer />
        </>
    );
};