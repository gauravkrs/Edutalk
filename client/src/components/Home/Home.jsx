import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import ScrollButton from "./ScrollButton";
import IMAGE from "../Navbar/Edutalk.png";
function HomePage() {
  return (
    <>
      <Navbar />
      <h1 align="center">
        Content should be display here I am adding a dummy image{" "}
      </h1>
      <div align="center">
        {" "}
        <img src={IMAGE} width="800px" height="800px" alt="" />
      </div>
      <ScrollButton />
      <Footer />
    </>
  );
}

export default HomePage;
