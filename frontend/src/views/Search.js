import DetailCard from "../components/card/Card";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Search() {
    const { search } = useParams();
    const [products, setProducts] = useState([])
    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        const getProducts = async () => {
            try {
                await axiosPrivate.get(`/search/${search}`)
                .then(res => setProducts(res.data))
            } catch (error) {
                console.log(error)
            }
        }

        getProducts()
    }, [])

    return (
        <div className={`home_slider search_wrapper`}>
            <h3>Result</h3>
            <div className='card_group'>
                {Array.isArray(products) && products.map((product) => (
                    <DetailCard key={product._id} product={product}/>
                ))}
            </div>
        </div>
    );
}

export default Search;