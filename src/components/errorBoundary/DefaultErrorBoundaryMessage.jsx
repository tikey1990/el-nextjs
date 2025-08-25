export const DefaultErrorBoundaryMessage = (error) => (
    <div>
        <p>Something went wrong!</p>
        <p>{error.message}</p>
    </div>
);
