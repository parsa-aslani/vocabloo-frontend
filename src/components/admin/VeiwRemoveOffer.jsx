// import
import { useEffect, useState } from "react";
import {
  deleteremoveoffer,
  getallremoveoffer,
} from "../../services/usersservices";
// react icons
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
// react router
import { Link } from "react-router-dom";
// set jsx
const VeiwRemoveOffer = ({ deleteofferalert, confirmationalert }) => {
  // state
  const [removeoffers, setremoveoffers] = useState([]);
  useEffect(() => {
    const getoffer = async () => {
      try {
        const { data: offerdata } = await getallremoveoffer();
        setremoveoffers(offerdata);
      } catch (err) {
        console.log(err.message);
      }
    };
    getoffer();
  });
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center mt-3">
        <h2 className="start-guess-title my-auto">پیشنهاد حذف کلمه</h2>
        <Link to={"/VocablooAdmin-42a5eb1wf"} className="mx-3 btn btn-dark">
          صفحه اصلی
        </Link>
      </div>
      <div className="start-guess-underline mx-auto mt-4"></div>
      <div className="mt-4 d-flex flex-column align-items-center">
        {removeoffers &&
          removeoffers.map((offer, index) => (
            <div
              key={index}
              className="offer-box d-flex justify-content-between p-2 rounded shadow my-2"
            >
              <button
                className="rounded px-2 py-1 btn btn-danger shadow-sm"
                onClick={() => {
                  deleteofferalert(
                    offer.id,
                    deleteremoveoffer,
                    setremoveoffers,
                    removeoffers
                  );
                }}
              >
                <RxCross2 />
              </button>
              <h5 className=" mx-3 my-auto text-white">
                نام کلمه :{" "}
                <span className="text-light">{offer.offerremoveword}</span>
              </h5>
              <button
                className="rounded px-2 py-1 btn btn-success shadow-sm"
                onClick={() => {
                  confirmationalert(
                    offer.offerremoveword,
                    "delete",
                    offer.id,
                    deleteremoveoffer,
                    setremoveoffers,
                    removeoffers
                  );
                }}
              >
                <TiTick />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};
export default VeiwRemoveOffer;
