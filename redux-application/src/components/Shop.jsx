import { useDispatch } from "react-redux";
import { actionCreators } from "../state/index";
import { bindActionCreators } from "redux";

const Shop = () => {
  const dispatch = useDispatch();
  const { addItem, removeItem } = bindActionCreators(actionCreators, dispatch);
  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="card text-bg-dark" style={{ width: "18rem" }}>
            <img
              src="http://hotelinternationalprishtina.com/adidas/wp-content/uploads/2017/12/10-best-adidas-2017-9.jpg"
              className="card-img-top rounded mt-3"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title text-danger text-center">
                David Beckham x adidas Accelerator Ultra Boost -{" "}
                <span className="text-success">1000$</span>{" "}
              </h5>
              <p className="card-text text-center text-info">
                David Beckham and adidas teamed up in 2017 to celebrate the
                20-year partnership between the two globally recognizable icons.
                The meeting of their minds resulted in a new-look Ultra Boost
                silhouette that emulates...
              </p>
              <div className="text-center">
                <button
                  className="btn btn-light mx-2"
                  onClick={() => {
                    removeItem(1);
                  }}>
                  -
                </button>
                Add to cart
                <button
                  className="btn btn-light mx-2"
                  onClick={() => {
                    addItem(1);
                  }}>
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
