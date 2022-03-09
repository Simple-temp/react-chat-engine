import React, { useContext, useEffect, useState } from 'react';
import { ChatEngine } from 'react-chat-engine';
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../ContextApi/ContextApi';
import axios from 'axios';


const Chats = () => {

    const { user } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    console.log(user)

    const auth = getAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await auth.signOut()
        navigate("/", { replace: true });
    }

    const getFile = async (url) => {

        const response = await fetch(url)
        const data = await response.blob()
        return new File([data], "userPhoto.jpg", { type: "image/jpeg" })

    }

    useEffect(() => {
        if (!user) {
            navigate("/", { replace: true });
            return
        }

        axios.get("https://api.chatengine.io/users", {
            "Project-ID": "b4dcaac6-9229-472e-a873-2183ec6f3713",
            "User-Name": user.email,
            "User-Secret": user.uid,
        })
            .then(() => {
                setLoading(false)
            })
            .catch(() => {
                let formData = new FormData()
                formData.append("email", user.email)
                formData.append("username", user.email)
                formData.append("secret", user.uid)

                getFile(user.photoURL)
                .then((avatar)=>{
                    formData.append("avatar", avatar, avatar.name) 

                    axios.post("https://api.chatengine.io/users", formData ,{
                        headers : { "PRIVATE-KEY" : "6151dda3-9f2d-4ee7-a972-1f5097df943a" }
                    })
                    .then(()=> setLoading(false))
                    .catch((err)=> console.log(err))

                })

            })

    }, [])


    // if(!user || loading) return "Loading..."


    return (
        <div className='chats-page'>
            <div className="nav-bar">
                <div className="logo-tab">
                    React chat app
                </div>
                <div className="logout-tab" onClick={handleLogout}>
                    Logout
                </div>
            </div>

            <ChatEngine
                height="calc(100vh - 66px)"
                projectID='b4dcaac6-9229-472e-a873-2183ec6f3713'
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    );
};

export default Chats;