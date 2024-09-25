export const ButtonPopup = ({ onClick, state }) => {
    const style = "absolute right-1 bottom-1 border rounded-[35px] px-4 py-2"
    const handleClick = () => onClick(!state)
    return <button onClick={handleClick} className={style}>Create post</button>
}