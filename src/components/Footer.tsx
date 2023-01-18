import logo from '../assets/githublogo.png';

export const Footer = () => {

    return(
        <footer className={`footer footer-center p-10 bg-secondary-focus text-primary-content pt-10 `}>
            <div>
                <h1 className="text-4xl font-bold">DevChat</h1>
                <p className="text-base">
                    powered by <br/> <a target="_blank" href="https://github.com/LeandroTRibeiro">Leandro Thiago Ribeiro</a>
                </p> 
            </div> 
            <div>
                <div className="grid grid-flow-col">
                    <a target="_blank" href='https://github.com/LeandroTRibeiro'>
                        <img src={logo} alt="logo github" className='w-[70px]'/>
                    </a> 
                </div>
            </div>
        </footer>
    );
};