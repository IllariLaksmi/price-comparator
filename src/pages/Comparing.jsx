import reactLogo from '../assets/react.svg';
import viteLogo from '../assets/vite.svg';
import { useState, useEffect } from 'react';
import { collection, getDocs } from "@firebase/firestore";
import Table from '../components/Table/Index';

export const ComparingPage =  ({dbUrl}) => {

    const [count, setCount] = useState(0);
    const [products, setProducts] = useState([]);
    const [stores, setStores] = useState([]);
    const [categories, setCategories] = useState([]);
    const [prices, setPrices] = useState([]);
    const [data, setData] = useState([]);

    const getData = async () => {
        const getStores = getDocs(collection(dbUrl, "stores"));
        const getProducts = getDocs(collection(dbUrl, "products"));
        const getPrices = getDocs(collection(dbUrl, "prices"));
        const getCategories = getDocs(collection(dbUrl, "categories"));

        const [storesSnapshot, productsSnapshot, pricesSnapshot, categoriesSnapshot] = await Promise.all([
            getStores, 
            getProducts, 
            getPrices, 
            getCategories
        ]);

        const storesData = storesSnapshot.docs.map(doc => ({ id: doc.id.replaceAll(" ", ""), ...doc.data() }));
        const productsData = productsSnapshot.docs.map(doc => ({ id: doc.id.replaceAll(" ", ""), ...doc.data() }));
        const pricesData = pricesSnapshot.docs.map(doc => ({ id: doc.id.replaceAll(" ", ""), ...doc.data() }));
        const categoriesData = categoriesSnapshot.docs.map(doc => ({ id: doc.id.replaceAll(" ", ""), ...doc.data() }));

        setStores(storesData);
        setProducts(productsData);
        setPrices(pricesData);
        setCategories(categoriesData);

        const comparisonTable = pricesData.map(price => {
            // Find the corresponding product, category, and store by their IDs
            const product = productsData.find(product => product.id === price.id_product.replaceAll(" ", ""));
            const category = categoriesData.find(category => category.id === product.id_category.replaceAll(" ", ""));
            const store = storesData.find(store => store.id === price.id_store.replaceAll(" ", ""));
       
            return {
                product_name: product ? product.name : 'Unknown Product',
                category_name: category ? category.name : 'Unknown Category',
                store_name: store ? store.name : 'Unknown Store',
                price: price.price,
                product_id: price.product_id
            };
        });

        setData(comparisonTable);
    }

    useEffect(() => {
        getData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return <>
        <Table data={data}/>
    </>
}
