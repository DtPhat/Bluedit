import { LoadingIcon } from "../assets/LoadingIcon";

const Loading = ({size}) => {
    const widthAndHeight = size ? size : 'h-20 w-20' 
    return (
        <div className = 'flex flex-col items-center justify-center bg-transparent'>
            <LoadingIcon style ={`${widthAndHeight} mr-2 animate-spin fill-white-reddit text-gray-reddit`}/>
        </div>
    )
}
export default Loading
