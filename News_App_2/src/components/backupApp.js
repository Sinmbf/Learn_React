import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { useState } from "react";

function App() {
    const [active, setActive] = useState("Home");
    const [progress, setProgress] = useState(0);
    const newsCategories = [
        "business",
        "entertainment",
        "health",
        "science",
        "sports",
        "technology",
    ];
    // Helper function to update active status
    const changeActive = (item) => {
        setActive(item);
    };
    // Helper function to update progress
    const updateProgress = (progress) => {
        setProgress(progress);
    };

    return (
        <>
            {/* NavBar */}
            <NavBar newsCategories={newsCategories} />
            {/* Top Loading Bar */}
            <LoadingBar
                color="#0DCAF0"
                height={3}
                progress={progress}
                updateProgress={updateProgress}
            />
            {/* Routes */}
            <Routes>
                <Route
                    path={"/"}
                    element={
                        <News
                            updateProgress={updateProgress}
                            active={active}
                            changeActive={changeActive}
                        />
                    }
                />
            </Routes>
        </>
    );
}

export default App;
