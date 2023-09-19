import PropTypes from "prop-types";

const AboutSection = ({ setSelectedIndex }) => {
  return (
    <>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button fw-bold"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne">
              Introduction
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <strong>Welcome to Text Utils-</strong> your go-to destination for
              all your text editing needs! We understand that in todays digital
              age, effective communication is paramount, and thats where our
              text editor comes into play.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed fw-bold"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo">
              Our Mission
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample">
            <div className="accordion-body">
              At Text Utils, our mission is simple yet profound: to provide you
              with a powerful and user-friendly text editing experience. We
              believe that everyone, from students and writers to professionals
              and creative minds, should have access to a tool that empowers
              their words and ideas.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed fw-bold"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree">
              What Sets Us
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample">
            <div className="accordion-body">
              What makes Text Utils stand out in the crowded world of text
              editors? It is a combination of our commitment to excellence,
              innovation, and user-centric design. Here is what sets us apart:
              <br></br>
              <br></br>
              <p>
                1. <strong>User-Friendly Interface:</strong> We have designed
                our text editor with you in mind. It is intuitive and easy to
                use, so you can focus on your content without getting bogged
                down by complicated features.
              </p>
              <p>
                2. <strong>Powerful Editing Tools: </strong> We have designed
                our text editor with you in mind. It is intuitive and easy to
                use, so you can focus on your content without getting bogged
                down by complicated features.
              </p>
              <p>
                3. <strong>User-Friendly Interface:</strong> Whether you are
                writing a novel, creating a report, or drafting an email, our
                text editor offers a wide range of formatting and editing tools
                to make your work shine.
              </p>
              <p>
                4. <strong>Security and Privacy: </strong> Your data is
                important to us. We prioritize security and privacy, ensuring
                that your documents are safe and protected.
              </p>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed fw-bold"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour">
              Join Our Community
            </button>
          </h2>
          <div
            id="collapseFour"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample">
            <div className="accordion-body">
              We believe in the power of community and creativity. Join our
              vibrant community of users who share their knowledge, tips, and
              experiences. Together, we can all become better writers and
              communicators.
            </div>
          </div>
        </div>
      </div>
      <button onClick={() => setSelectedIndex(0)} className="btn btn-dark mt-3">
        Get Started
      </button>
    </>
  );
};

AboutSection.propTypes = {
  setSelectedIndex: PropTypes.func,
};

export default AboutSection;
