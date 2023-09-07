import {useParams} from "react-router-dom";

function Product(props) {

  const {productName} = useParams()

  return (
    <>
      <h3>{productName.toUpperCase()}</h3>
    </>
  )
}

export default Product;