import { LoadingIcon } from "../assets/LoadingIcon";

const Loading = () => {
    return (
        <div className = 'flex flex-col items-center justify-center p-6 gap-6 bg-black/80'>
            <LoadingIcon style ='mr-2 h-20 w-20 animate-spin fill-white text-gray-600'/>
            <h2 className="text-center text-2xl font-semibold text-white">
                Loading...
            </h2>
        </div>
    )
}
export default Loading

//style for full-screen loading: fixed h-screen inset-0 flex flex-col items-center justify-center gap-6 bg-black/80'