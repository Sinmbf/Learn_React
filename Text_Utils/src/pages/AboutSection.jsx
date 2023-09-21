import PropTypes from "prop-types";
import AccordionItem from "../components/AccordionItem";
import { Link } from "react-router-dom";

// Accordion Items
const accordionItem = [
  {
    title: "Introduction",
    text: "your go-to destination for all your text editing needs! We understand that in todays digital age, effective communication is paramount, and thats where our text editor comes into play.",
  },
  {
    title: "Our Mission",
    text: "At Text Utils, our mission is simple yet profound: to provide you with a powerful and user-friendly text editing experience. We believe that everyone, from students and writers to professionals and creative minds, should have access to a tool that empowers their words and ideas.",
  },
  {
    title: "What Sets Us Apart",
  },
  {
    title: "Join Our Community",
    text: "We believe in the power of community and creativity. Join our vibrant community of users who share their knowledge, tips, and experiences. Together, we can all become better writers and communicators.",
  },
];

// About Section
const AboutSection = ({ setSelectedIndex, theme }) => {
  document.title = "TextUtils - About";
  return (
    <>
      <div className="accordion" id="accordionExample">
        {accordionItem.map((item, index) => (
          <AccordionItem
            key={item.title}
            {...item}
            index={index}
            theme={theme}
          />
        ))}
      </div>
      <button
        onClick={() => setSelectedIndex(0)}
        className={`btn mt-3 ${
          theme.backgroundColor === "black" && "btn-dark"
        }`}
        style={{
          backgroundColor:
            theme.backgroundColor !== "black" && theme.backgroundColor,
          color: "white",
        }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Get Started
        </Link>
      </button>
    </>
  );
};

AboutSection.propTypes = {
  setSelectedIndex: PropTypes.func,
  theme: PropTypes.object,
};

export default AboutSection;
