import { BeatLoader } from "react-spinners";

type PropsType = {
    data: {
        loading: boolean
    }
}

export const Loader = (Props: PropsType) => {

    return(
        <div className="h-[100vh] flex justify-center items-center">
            <BeatLoader
                color={`#F000B8`}
                loading={Props.data.loading}
                size={25}
            />
        </div>
    );

};