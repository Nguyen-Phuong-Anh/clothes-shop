import DetailCard from "../components/card/Card";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Search() {
    const [search, setSearch] = useState('')
    const [products, setProducts] = useState([])
    const axiosPrivate = useAxiosPrivate()

    const handleSearch = async () => {
        try {
            await axiosPrivate.get(`/search/${search}`)
            .then(res => setProducts(res.data))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={`search_wrapper`}>
            <div className={`search_bar`}>
                <input 
                    title="search_bar"
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder=""
                    autoComplete=""
                />
                <button title="handleSearch" onClick={handleSearch}><FontAwesomeIcon className="search_icon" icon={faMagnifyingGlass} /></button>
            </div>
            <div className="search_result">
                <h3>Result</h3>
                <div className='card_group'>
                    {
                        products.length > 0 ? Array.isArray(products) && products.map((product) => (
                            <DetailCard key={`${product._id}PD`} product={product}/>
                        )) : <p className="no_result">0 result</p>
                    }
                </div>
            </div>
        </div>
    );
}

export default Search;