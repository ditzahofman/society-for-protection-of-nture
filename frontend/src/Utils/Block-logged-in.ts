import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function useVerifyLoggedIn() {

    const navigate = useNavigate()
    useEffect(()=>{

        if(!sessionStorage.getItem("myToken")){
            alert("You are not logged in!")
            navigate("/login")
        }

    },[])

}

export default useVerifyLoggedIn