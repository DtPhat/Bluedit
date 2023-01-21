import { LoadingIcon } from "../assets/LoadingIcon";

const Loading = () => {
    return (
        <div className = 'flex flex-col items-center justify-center p-6 gap-6 bg-transparent'>
            <LoadingIcon style ='mr-2 h-20 w-20 animate-spin fill-white-reddit text-gray-reddit'/>
            <h2 className="text-center text-2xl font-semibold text-black-reddit dark:text-white-reddit">
                Loading...
            </h2>
        </div>
    )
}
export default Loading
