import { useEffect, useState } from "react";
import { ButtonPopup } from "../components/ButtonPopup/ButtonPopup";
import { PopupModal } from '../components/PopupModal/PopupModal'
export const Dashboard = () => {
    // logic
    const [posts, setPosts] = useState([]);
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3005/api/posts')
            .then((response) => response.json())
            .then((data) => setPosts(data))
    }, [])

    //JSX
    return <div className="relative min-h-screen">
        <div className="container mx-auto flex flex-col gap-[25px]">
            <h1>Dashboard</h1>
            <div className="flex flex-col gap-[5px]">
                {
                    posts.length > 0
                        ? posts.map((post) => <div>{post.post} {post.userId}</div>)
                        : <p>Нет постов</p>
                }
                {/* {posts.map(({post}, i) => <div>{post}</div>)} */}
            </div>
        </div>
        <ButtonPopup onClick={setIsShow} state={isShow} />
        <PopupModal setIsShow={setIsShow} isShow={isShow} />
    </div>
}