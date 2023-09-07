import styles from './ManageAccount.module.css'
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import CustomizeProduct from './CustomizeProduct';

function ManageProduct() {
    const [products, setProducts] = useState([])
    const [search, setSearch] = useState('')
    const [id, setId] = useState('')
    const [show, setShow] = useState(false);
    const axiosPrivate = useAxiosPrivate()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const SearchCard = ({product}) => {
        const sizes = product.sizes.map(item => item).join(', ')
        const colors = product.colors.map(item => item).join(' ')
        setId(product._id)
        return (
            <div className={styles.searchCard} onClick={handleShow}>
                <div>
                    <img />
                </div>
                <div>
                    <h4>{product.name}</h4>
                    <p>Sizes: {sizes}</p>
                    <p>Colors: {colors}</p>
                </div>
                <h4 className={styles.price}>
                    {product.price}$
                </h4>
            </div>
        )
    }


    const handleEnter = (event) => {
        if (event.keyCode === 13) {
          event.preventDefault();
        }
    }

    const handleSearch = async () => {
        try {
            await axiosPrivate.get(`/search/${search}`)
            .then(res => setProducts(res.data))

            setSearch('')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                <Modal.Title>Manage Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CustomizeProduct id={id}/>
                </Modal.Body>
            </Modal>

            <div className={styles.searchBox}>
                <input value={search} 
                    onChange={e => setSearch(e.target.value)} 
                    type='text' 
                    onKeyDown={handleEnter} 
                />
                <Button onClick={handleSearch} className={`${styles.btn_size}`} 
                variant="outline-dark">Search</Button>
            </div>

            <div className={styles.searchResult}>
                {products.length > 0 ? <h4>Result</h4> : <h4>No result found</h4>}
                {Array.isArray(products) && products.map((product) => (
                    <SearchCard key={product._id} product={product}/>
                ))}
            </div>
        </div>
    );
}

export default ManageProduct;