import Single from "../../components/single/Single";
import "./product.scss";
import { singleProduct } from "../../data";
export default function Product() {
  return (
    <div className="product">
      <Single {...singleProduct} />
    </div>
  );
}
