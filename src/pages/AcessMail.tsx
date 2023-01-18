import { Footer } from "../components/Footer";

export const AcessMail = () => {
    return (
        <>
        <div className="h-[100vh] flex justify-center items-center bg-white">
            <div className="card w-2/4 bg-slate-50 text-stone-800 shadow-xl border-2 ms:w-3/4">
                <div className="card-body flex items-center">
                    <h2 className="text-5xl font-bold text-secondary-focus">DevChat</h2>
                    <p className='text-lg font-semibold'>Acesse seu E-mail</p>
                    <p>Enviamos um E-mail para você, acesse ele para ter acesso ao link de recuperação de conta.</p>
                </div>
            </div>
            
        </div>
        <Footer />
        </>
    );
};