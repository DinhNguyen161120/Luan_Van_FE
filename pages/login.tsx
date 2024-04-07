
import { Login } from "../component/LoginPage/Login";
import Header from "../component/header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import headerActions from "../redux/action/headerActions";
const LoginPage = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: headerActions.SET_TITLE_HEADER,
            title: 'Đăng nhập'
        })
    }, [])


    return <div>
        <Header />
        <Login />
    </div>
}


export default LoginPage;