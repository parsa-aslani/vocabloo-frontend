// import
import { useEffect } from "react";
import "../../style.css";
import { LeaderBoard, GamePlane, GameDiscription } from "../index";
// react router
import { useNavigate } from "react-router-dom";
// set jsx
const HomePage = ({ setuser }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const getlocaldata = async () => {
      const loggedUser = localStorage.getItem("user");
      if (!loggedUser) {
        navigate("/sighin");
      } else {
        const newValue = await JSON.parse(loggedUser).data;
        setuser(newValue);  
      }
    };
    getlocaldata();
  }, [navigate]);
  return (
    <>
      <div className="w-100 home-page-background position-relative">
        <div className="py-4">
          <div className="row w-100 mx-auto">
            <div className="col-12 col-md-6">
              <GameDiscription />
            </div>
            <div className="col-12 col-md-6">
              <LeaderBoard />
            </div>
            <div className="mt-4 start-play-title shadow"></div>
            <div className="col-12">
              <GamePlane />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HomePage;
