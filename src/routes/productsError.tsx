import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ProductsErrorPage = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex flex-col items-center justify-center gap-3">
        <h1 className="font-semibold text-4xl">Oops! {error.status}</h1>
        <p className="text-2xl">{error.statusText}</p>
        {error.data?.message && (
          <p className="text-2xl text-destructive">
            <i>{error.data.message}</i>
          </p>
        )}
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div className="flex flex-col items-center justify-center gap-3">
        <h1 className="font-semibold text-4xl">Oops! Unexpected Error</h1>
        <p className="text-2xl">Something went wrong.</p>
        <p className="text-2xl text-destructive">
          <i>{error.message}</i>
        </p>
      </div>
    );
  } else {
    return null;
  }
};

export default ProductsErrorPage;
