import { Link, useRouteError } from "react-router-dom";

const ProductDetailsErrorPage = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/">All Products</Link>
    </div>
  );
};

export default ProductDetailsErrorPage;
