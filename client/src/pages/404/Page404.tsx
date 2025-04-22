const Page404 = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-9xl font-bold text-error">404</h1>
      <h2 className="text-2xl font-semibold">Page Not Found</h2>
      <p className="text-center text-base-content/70">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <button
        className="btn btn-primary mt-4"
        onClick={() => (window.location.href = "/")}
      >
        Go Back Home
      </button>
    </div>
  );
};

export default Page404;
