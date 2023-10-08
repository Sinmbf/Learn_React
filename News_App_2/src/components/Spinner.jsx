export default function Spinner() {
  return (
    <div className="text-center">
      <div
        className="spinner-border text-info my-4"
        role="status"
        style={{ width: "5rem", height: "5rem" }}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
