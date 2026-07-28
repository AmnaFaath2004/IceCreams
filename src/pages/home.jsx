import Caroo from "../components/caroo"
import Products from "./products"

function Home({search}){
    return(
        <>
        <Caroo/>
        <Products  search={search} />
        <h1>hii</h1>
        <h2>hiii</h2>
        </>
    )
}
export default Home