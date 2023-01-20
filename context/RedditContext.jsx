import { createContext, useState, useEffect } from 'react'
import { supabase } from '../client'
export const RedditContext = createContext()
export const RedditProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    async function fetchSesssion() {
        try {
            const { data } = await supabase.auth.getSession()
            setCurrentUser(data.session.user)
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        fetchSesssion()
        supabase.auth.onAuthStateChange((event, session) => {
            session&&setCurrentUser(session.user)
        })

    }, []);
    return (
        <RedditContext.Provider
            value={{
                currentUser
            }}
        >{children}
        </RedditContext.Provider>
    )
}

