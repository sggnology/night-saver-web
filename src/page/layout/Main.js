import {Link} from "react-router-dom";
import "../../firebase-messaging-sw"

function Main(props) {
  return (
    <>
      <h3>안녕하세요. sggnology 장난감들 둘러보고 가셔유</h3>
      <ul>
        <Link to="/product/1">
          <div style={{
            border: '2px solid black',
            padding: 10
          }}>
            <li>1번 night-saver</li>
          </div>
        </Link>
        <Link to="/product/2">
          <li>2번상품</li>
        </Link>
      </ul>
    </>
  )
}

export default Main;