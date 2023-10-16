/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */

import Notes from "../Notes";

const Home = ({ toggleAlert, alert }) => {
  return (
    <>
      <div className="container text-center">
        {/* Show Notes */}
        <Notes toggleAlert={toggleAlert} alert={alert} />
      </div>
    </>
  );
};

export default Home;
