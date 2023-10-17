import "./App.css";
import NavBar from "./components/NavBar";
import Shop from "./components/Shop";

function App() {
  return (
    <>
      {/* Navigation Bar */}
      <NavBar />
      <div className="text-center" style={{ marginTop: "5rem" }}>
        <h2>Redux application using Redux@toolkit</h2>
      </div>
      {/* Shop */}
      <Shop />
    </>
  );
}

export default App;
