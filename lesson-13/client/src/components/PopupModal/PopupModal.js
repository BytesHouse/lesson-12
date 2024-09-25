export const PopupModal = ({ isShow = false, setIsShow }) => {
    const style = `${isShow ? 'block' : 'hidden'} border rounded-md p-4 flex flex-col fixed max-h-[420px] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]`
    return <div className={style}>
        <h2>Создать пост</h2>
        <textarea name=""></textarea>
        <div className="flex justify-between">
            <button>Отмена</button>
            <button>Сохранить</button>
        </div>
    </div>
}