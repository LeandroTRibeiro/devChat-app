import React, { useRef, useState } from "react";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import { useDebounceEffect } from '../canvashelpers/useDebounceEffect';
import { canvasPreview } from "../canvashelpers/canvasPreview";
import 'react-image-crop/dist/ReactCrop.css';
import * as imageServices from '../canvashelpers/imagesFunctions';
import { Api } from "../api/api";
import { useNavigate } from "react-router-dom";
import { HandleEye } from "../helpers/HandleEye";
import { Loader } from "../components/Loader";
import { Footer } from "../components/Footer";

export const Register = () => {

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [showPassword, setShowPassword] = useState(false);
    const [secondShowPassword, setSecondShowPassword] = useState(false);

    const [disabled, setDisabled] = useState(false);
    const [confirmErrorEmail, setConfirmErrorEmail] = useState('');
    const [confirmErrorPassword, setConfirmErrorPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const [imgSrc, setImgSrc] = useState('');
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const imgInputRef = useRef<any>(null);
    const [aspect, setAspect] = useState<number | undefined>(1);

    const changeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setCrop(undefined)
            const reader = new FileReader()
            reader.addEventListener('load', () =>
              setImgSrc(reader.result?.toString() || ''),
            )
            reader.readAsDataURL(e.target.files[0])
          }
    };

    const centerAspectCrop = (mediaWidth: number, mediaHeight: number, aspect: number) => {
        return centerCrop(makeAspectCrop({
              unit: '%',
              width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight,
          ),
          mediaWidth,
          mediaHeight,
        )
    };

    const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        if (aspect) {
            const { width, height } = e.currentTarget
            setCrop(centerAspectCrop(width, height, aspect))
          }
    };

    useDebounceEffect(
        async () => {
          if (
            completedCrop?.width &&
            completedCrop?.height &&
            imgRef.current &&
            previewCanvasRef.current
          ) {
            
            canvasPreview(
              imgRef.current,
              previewCanvasRef.current,
              completedCrop,
            )

            
          }
        },
        100,
        [completedCrop],
      )

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(email === confirmEmail) {
            setConfirmErrorEmail('');
            if (password === confirmPassword) {
                setConfirmErrorPassword('');
                setDisabled(true);
            } else {
                setConfirmErrorPassword('As Senhas devem ser iguais');
            }
        } else {
            setConfirmErrorEmail('Os E-mails devem ser iguais');
        }
        
    };

    const handletest = async () => {

        const base64String = previewCanvasRef.current?.toDataURL('image/png');
        const imageFile = imageServices.base64StringtoFile(base64String, 'avatar');

        const fData = new FormData();
        fData.append('firstName', firstName);
        fData.append('lastName', lastName);
        fData.append('email', email);
        fData.append('password', password);
        fData.append('avatar', imageFile);

        try {
            setLoading(true);
            const response = await Api.createUser(fData);
            
            try {
                const emailConfirm = await Api.sendConfirmEmail(email);

                
                if(emailConfirm.send) {
                    setLoading(false);
                    navigate('/almostthere');
                } else {
                    setLoading(false);
                    console.log(response, emailConfirm);
                }
            } catch(error) {
                
                setLoading(false);
                console.log(error);
                
            }

        } catch(error) {

            setLoading(false);
            console.log(error);
        }

    };

    return(
        <>
        {loading &&
            <>
            <Loader data={{loading}} />
            <Footer />
            </>
        }

        {!loading &&
            <>
            <div className={`h-[100vh] flex-col justify-center items-center bg-white ${disabled ? 'flex' : 'hidden'}`}>
                <div className="card w-[90vw] p-5 bg-slate-50 text-stone-800 shadow-2xl border-2 grid grid-cols-2 gap-5 ms:flex ms:flex-col">
                    <div className="card-body flex items-center p-0 grow-0">
                        <h2 className="text-5xl font-bold text-secondary-focus">DevChat</h2>
                        <p className='grow-0 text-lg font-semibold'>Redimencione sua foto de perfil</p>
                        <div className="flex flex-col items-center">
                            <ReactCrop
                                className=""
                                aspect={aspect}
                                circularCrop={true}
                                crop={crop}
                                onChange={(_, percentCrop) => setCrop(percentCrop)}
                                onComplete={(c) => setCompletedCrop(c)}
                            >
                                <img className="w-[40vh] h-auto" ref={imgRef} src={imgSrc} onLoad={onImageLoad}/>
                            </ReactCrop>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-10">
                        <p className='text-lg font-semibold text-center mt-12'>Veja como ficara sua foto de perfil</p>
                        {!!completedCrop && (
                            <canvas
                                ref={previewCanvasRef}
                                className='w-auto h-auto max-h-[40vh] max-w-[40vw] rounded-full border-8 border-secondary'
                            />
                        )}
                    </div>
                    <button className="btn btn-warning" onClick={() => disabled ? setDisabled(false) : setDisabled(true)}>Voltar</button>
                    <button onClick={handletest} className="btn btn-secondary ">Concluir</button>
                </div>
            </div>
    
            <div className={`h-[100vh] ms:h-max justify-center items-center bg-white ${disabled ? 'hidden' : 'flex'}`}>
                <div className="card w-1/2 tb:w-4/5 mg:w-11/12 bg-slate-50 text-stone-800 shadow-2xl border-2">
                    <div className="card-body flex items-center">
                        <h2 className="text-5xl font-bold text-secondary-focus">DevChat</h2>
                        <p className='text-lg ms:text-sm font-semibold'>Faça um cadastro é grátis</p>
    
                        <form className="grid grid-cols-2 gap-7 ms:flex ms:flex-col w-full" method="POST" onSubmit={handleSubmit}>
                            <label className="flex flex-col gap-1">
                                <span className="font-semibold ms:text-sm">Nome</span>
                                <input 
                                    type="text"
                                    className='input input-secondary w-full bg-slate-50 ms:text-sm'
                                    placeholder='Nome'
                                    value={firstName}
                                    required
                                    onChange={(e) => setFirstName(e.target.value)}
                                    disabled={disabled}
                                />
                            </label>
                            <label className="flex flex-col gap-1">
                                <span className="font-semibold ms:text-sm">Sobrenome</span>
                                <input 
                                    type="text"
                                    className='input input-secondary w-full bg-slate-50 ms:text-sm'
                                    placeholder='Sobrenome'
                                    value={lastName}
                                    required
                                    onChange={(e) => setLastName(e.target.value)}
                                    disabled={disabled}
                                />
                            </label>
                            <label className="flex flex-col gap-1">
                                <span className="font-semibold ms:text-sm">E-mail</span>
                                <input 
                                    type="email" 
                                    className={`input w-full bg-slate-50 ms:text-sm ${confirmErrorEmail ? 'input-error' : 'input-secondary'}`}
                                    placeholder="E-mail"
                                    value={email}
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={disabled}
                                />
                                {confirmErrorEmail && 
                                    <div className='flex'>
                                        <span className="text-red-600 text-sm">{confirmErrorEmail}</span>
                                    </div>
                                }
                            </label>
                            <label className="flex flex-col gap-1">
                                <span className="font-semibold ms:text-sm">Confirme o E-mail</span>
                                <input 
                                    type="email" 
                                    className={`input w-full bg-slate-50 ms:text-sm ${confirmErrorEmail ? 'input-error' : 'input-secondary'}`}
                                    placeholder="Confirme o E-mail"
                                    value={confirmEmail}
                                    required
                                    onChange={(e) => setConfirmEmail(e.target.value)}
                                    disabled={disabled}
                                />
                                {confirmErrorEmail && 
                                    <div className='flex'>
                                        <span className="text-red-600 text-sm">{confirmErrorEmail}</span>
                                    </div>
                                }
                            </label>
                            <label className="flex flex-col gap-1">
                                <div className="flex justify-between">
                                    <span className='font-semibold ms:text-sm'>Senha</span>
                                </div>
                                <div className="flex justify-end items-center">
                                    {showPassword &&
                                        <div className="absolute cursor-pointer mr-2" onClick={() => setShowPassword(HandleEye(showPassword))}>
                                            <EyeIcon className="w-5"/>
                                        </div>
                                    }
                                    {!showPassword &&
                                        <div className="absolute cursor-pointer mr-2" onClick={() => setShowPassword(HandleEye(showPassword))}>
                                            <EyeSlashIcon className="w-5"/>
                                        </div>
                                    }
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className={`input w-full bg-slate-50 ms:text-sm ${confirmErrorPassword ? 'input-error' : 'input-secondary'}`}
                                        placeholder="Senha"
                                        value={password}
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
                                        autoComplete='on'
                                        disabled={disabled}
                                    />
                                </div>
                                {confirmErrorPassword && 
                                    <div className='flex'>
                                        <span className="text-red-600 text-sm">{confirmErrorPassword}</span>
                                    </div>
                                }
                            </label>
                            <label className="flex flex-col gap-1">
                                <div className="flex justify-between">
                                    <span className='font-semibold ms:text-sm'>Confirme a Senha</span>
                                </div>
                                <div className="flex justify-end items-center">
                                    {secondShowPassword &&
                                        <div className="absolute cursor-pointer mr-2" onClick={() => setSecondShowPassword(HandleEye(secondShowPassword))}>
                                            <EyeIcon className="w-5"/>
                                        </div>
                                    }
                                    {!secondShowPassword &&
                                        <div className="absolute cursor-pointer mr-2" onClick={() => setSecondShowPassword(HandleEye(secondShowPassword))}>
                                            <EyeSlashIcon className="w-5"/>
                                        </div>
                                    }
                                    <input
                                        type={secondShowPassword ? 'text' : 'password'}
                                        className={`input w-full bg-slate-50 ms:text-sm ${confirmErrorPassword ? 'input-error' : 'input-secondary'}`}
                                        placeholder="Confirme a Senha"
                                        value={confirmPassword}
                                        required
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        autoComplete='on'
                                        disabled={disabled}
                                    />
                                </div>
                                {confirmErrorPassword && 
                                    <div className='flex'>
                                        <span className="text-red-600 text-sm">{confirmErrorPassword}</span>
                                    </div>
                                }
                            </label>
                            <label className="flex flex-col gap-1 col-start-1 col-end-3">
                                <div className="flex justify-between">
                                    <span className='font-semibold ms:text-sm'>Imagem de Perfil</span>
                                </div>
                                <input 
                                    type="file" 
                                    className="file-input file-input-secondary w-full bg-slate-50 ms:text-sm"
                                    placeholder="Escolha uma imagem"
                                    required
                                    disabled={disabled}
                                    onChange={changeAvatar}
                                    ref={imgInputRef}
                                />
                            </label>
    
                            <button className="btn btn-secondary mt-6 col-start-1 col-end-3" disabled={disabled}>Continuar</button>
                            
                        </form>
                        
                    </div>
                </div>
            </div>
            <Footer />
            </>
        }
        </>
    );
};