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
      <div className="h-96 flex flex-col items-center sm:justify-center gap-3 text-center">
        <h1 className="font-semibold text-2xl sm:text-4xl">
          Oops! Unexpected Error
        </h1>
        <p className="text-xl sm:text-2xl text-muted-foreground">
          Something went wrong.
        </p>
        <p className="text-xl sm:text2xl text-destructive">
          <i>{error.message}</i>
        </p>
      </div>
    );
  } else {
    return null;
  }
};

export default ProductsErrorPage;
