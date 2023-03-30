import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { setLogin } from "../redux/reducers/isLogin";

import { useNavigate, useSearchParams } from "react-router-dom";

import { Api } from "../api/api";

import { Footer } from "../components/Footer";

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export const Recovering = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);
    const [secondShowPassword, setSecondShowPassword] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [samePassword, setSamePassword] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();

    const handleEye = () => {

        if ( showPassword ) {
            setShowPassword(false);
        } else {
            setShowPassword(true);
        }
    };

    const handleSecondEye = () => {

        if ( secondShowPassword ) {
            setSecondShowPassword(false);
        } else {
            setSecondShowPassword(true);
        }
    };

    const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const changeConfirEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        
        if ( password === confirmPassword ) {
            
            setSamePassword(false);
            setDisabled(true);

            const token = searchParams.get('token');

            if ( token ) {

                const response = await Api.updatePassword(token, password);

                if ( response.userUpdate.email ) {

                    dispatch(setLogin(true));
                    navigate('/livechat');

                } else {
                    console.log('Nao passou');
                    setDisabled(false);
                }

            } else {

                console.log('Sem token');
                
            }

        } else {

            setSamePassword(true);
            setDisabled(false);

        }

    };

    return (
        <>
        <div className="h-[100vh] flex justify-center items-center bg-white">
            <div className="card w-96 ms:w-4/5 bg-slate-50 text-stone-800 shadow-xl border-2">
                <div className="card-body flex items-center">
                    <h2 className="text-5xl font-bold text-secondary-focus">DevChat</h2>
                    <p className='text-lg font-semibold'>Renove sua Senha</p>
                    <form method="POST" className="flex flex-col gap-6 w-full" onSubmit={handleSubmit}>
                        <label className="flex flex-col gap-2">
                            <span className="font-semibold">Nova Senha</span>
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
                                    className={`input w-full bg-slate-50 ${samePassword ? 'input-error' : 'input-secondary'}`}
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder={`Nova senha`}
                                    autoComplete="on"
                                    required
                                    disabled={disabled}
                                    value={password}
                                    onChange={changeEmail}
                                />
                            </div>
                        </label>
                        <label className="flex flex-col gap-2">
                            <span className="font-semibold">Confirme a Nova Senha</span>
                            <div className="flex justify-end items-center">
                                {secondShowPassword &&
                                    <div className="absolute cursor-pointer mr-2" onClick={handleSecondEye}>
                                        <EyeIcon className="w-5"/>
                                    </div>
                                }
                                {!secondShowPassword &&
                                    <div className="absolute cursor-pointer mr-2" onClick={handleSecondEye}>
                                        <EyeSlashIcon className="w-5"/>
                                    </div>
                                }
                                <input
                                    className={`input w-full bg-slate-50 ${samePassword ? 'input-error' : 'input-secondary'}`}
                                    type={secondShowPassword ? 'text' : 'password'}
                                    placeholder="Confirme a Nova Senha"
                                    autoComplete="on"
                                    required
                                    disabled={disabled}
                                    value={confirmPassword}
                                    onChange={changeConfirEmail}
                                />
                            </div>
                            {samePassword &&
                                <div className='flex'>
                                    <span className="text-red-600 text-sm">As Senhas devem ser iguais</span>
                                </div>
                            }
                        </label>
                        <button className="btn btn-secondary w-full" disabled={disabled}>Renovar</button>
                    </form>
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
};


