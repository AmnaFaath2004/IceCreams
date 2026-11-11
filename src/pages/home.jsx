import Caroo from "../components/caroo"
import Products from "./products"

function Home({search}){
    return(
        <>
        <Caroo/>
        <Products  search={search} />
       
        </>
    )
}
export default Home