import { Footer } from "../components/Footer";

export const NotFound = () => {
    return (
        <>
        <div className="h-[100vh] flex justify-center items-center flex-col gap-10 bg-white text-stone-800">
            <div className="w-1/2 flex flex-col justify-center items-center">
                <h2 className="text-secondary text-8xl text-center mg:text-5xl">Not found page</h2>
                <h1 className="text-secondary text-9xl mg:text-6xl">404</h1>
                <h2>error</h2>
            </div>
        </div>
        <Footer />
        </>
    );
};