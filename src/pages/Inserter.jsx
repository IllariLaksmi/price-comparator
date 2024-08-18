import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";

function Inserter({ db, collection_name }) {
  const [product_name, setProduct_name] = useState("");
  const [product_category, setProduct_category] = useState("");

  const handleClick = async () => {
    try {
      const docRef = await addDoc(collection(db, collection_name), {
        id_category: product_category,
        name: product_name,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <>
      <div className="form-container">
        <h1 className="form-title">{collection_name}</h1>
        <input
          className="form-input"
          type="text"
          onChange={(e) => setProduct_name(e.target.value)}
          value={product_name}
          placeholder="nombre del producto"
        />
        <input
          className="form-input"
          type="text"
          onChange={(e) => setProduct_category(e.target.value)}
          value={product_category}
          placeholder="id de la categoria"
        />
        <button className="form-button" onClick={handleClick}>
          Insertar
        </button>
      </div>
    </>
  );
}

export default Inserter;
