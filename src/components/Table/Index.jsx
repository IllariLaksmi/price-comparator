import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';



export default function Table({data}) {
    const [products, setProducts] = useState([]);


    const formatCurrency = (value) => {
        return value.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
    };

    const imageBodyTemplate = (product) => {
        return <img src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.image} className="w-6rem shadow-2 border-round" />;
    };

    const priceBodyTemplate = (product) => {
        return formatCurrency(product.price);
    };

    const ratingBodyTemplate = (product) => {
        return <Tag value={product.store_name} severity={getSeverity(product)}></Tag>;
    };

    const statusBodyTemplate = (product) => {
        return <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>;
    };

    const getSeverity = (product) => {
        switch (product.store_name) {
            case 'Alcampo':
                return 'danger';

            case 'Mercadona':
                return 'success';

            case 'Bonarea':
                return 'info';

            default:
                return null;
        }
    };

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Comparador de precios</span>
        </div>
    );
    const footer = `Total: ${data ? data.length : 0} precios.`;
console.log(data)

const subHeaderTemplate = (price) => {
    return (
        <div className="flex align-items-center">
            <span className="font-bolder">{price.product_name}</span>
        </div>
    );
}
    return (
        <div className="card">
            <DataTable value={data} header={header} footer={footer} rowGroupMode="rowspan" groupRowsBy="product_id" sortMode="single" sortField="product_id" tableStyle={{ minWidth: '60rem' }}
             sortOrder={1} 
            >
                <Column field="product_id" header="Producto" body={subHeaderTemplate} style={{ minWidth: '200px' }}></Column>
                <Column field="price" header="Precio" sortable body={priceBodyTemplate}></Column>
                <Column field="store_name" header="Tienda" body={ratingBodyTemplate}></Column>
                <Column field="amount" header="Cantidad"></Column>
                <Column field="category_name" header="Categoría"></Column>
            </DataTable>
        </div>
    );
}