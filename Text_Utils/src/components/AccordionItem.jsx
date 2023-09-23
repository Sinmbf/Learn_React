import PropTypes from "prop-types";

const AccordionItem = ({ title, text, index, theme }) => {
  return (
    <div
      className={`accordion-item ${
        theme.backgroundColor === "black" && "bg-dark text-light"
      }`}>
      <h2 className="accordion-header">
        <button
          className={`fw-bold ${
            index === 0 ? "accordion-button" : "accordion-button collapsed"
          } ${theme.backgroundColor === "black" && "bg-black text-light"}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse${index}`}
          aria-expanded={`${index === 0} ? true:false`}
          aria-controls={`collapse${index}`}>
          {title}
        </button>
      </h2>
      <div
        id={`collapse${index}`}
        className={`accordion-collapse collapse ${index === 0 && "show"}`}
        data-bs-parent="#accordionExample">
        <div className="accordion-body">
          {index === 0 && <strong>Welcome to Text Utils-</strong>}
          {index === 2 && (
            <>
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
            </>
          )}
          {text}
        </div>
      </div>
    </div>
  );
};

AccordionItem.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  index: PropTypes.number,
  theme: PropTypes.object,
};

export default AccordionItem;
