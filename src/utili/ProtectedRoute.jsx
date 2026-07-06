import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const ProtectedRoute=({children,requiredRole})=>{
   const {isAuthenticated,user}= useSelector((state)=>state.userState)

   if(!isAuthenticated){
    return <Navigate to={'/Login'}/>
   }
if(requiredRole && !requiredRole.includes(user?.role)){
    return <Navigate to={'/403'}/>
}

   return(  //if isAuthenticated if true.  
    children // children is <ListProducts/> . of parent <ProtectedRoute>

   )
}
export default ProtectedRoute