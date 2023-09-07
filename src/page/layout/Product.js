import {useParams, useSearchParams} from "react-router-dom";

function Product(props) {

  const {productId} = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  const a = searchParams.get("a")
  const b = searchParams.get("b")

  return (
    <>
      <h3>{productId}번 상품입니다.</h3>
      <ul>
        <li>a의 값 : {a}</li>
        <li>b의 값 : {b}</li>
      </ul>
    </>
  )
}

export default Product;