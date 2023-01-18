import { Footer } from "../components/Footer";

export const AlmostThere = () => {
    return (
        <>
        <div className="h-[100vh] flex justify-center items-center bg-white">
            <div className="w-2/4 card bg-slate-50 text-stone-800 shadow-xl border-2 ms:w-3/4 mx:w-11/12">
                <div className="card-body flex items-center">
                    <h2 className="text-5xl font-bold text-secondary-focus">DevChat</h2>
                    <p className='text-lg font-semibold'>Acesse seu E-mail</p>
                    <p>Enviamos um E-mail de confirmação para você, para ativar sua conta acesse seu E-mail e click no link enviado.</p>
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
};