export const UpvoteIcon = ({ active }) => {
  return (
    <svg
      className={`${active ? "text-orange-600" : "text-gray-reddit"} w-7 p-0.5 hover:bg-gray-200 dark:hover:bg-grayblack-reddit cursor-pointer`}
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      viewBox='0 0 24 24'
    >
      <path
        fill='currentColor'
        d='M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10zM15 12h-1v8h-4v-8H6.081L12 4.601L17.919 12H15z'
      ></path>
    </svg>
  )
}