// import
import { useEffect, useState } from "react";
import { deleteaddoffer, getalladdoffer } from "../../services/usersservices";
// react icons
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
// react router
import { Link } from "react-router-dom";
// set jsx
const VeiwAddOffer = ({ deleteofferalert, confirmationalert }) => {
  // state
  const [addoffers, setaddoffers] = useState([]);
  useEffect(() => {
    const getoffer = async () => {
      try {
        const { data: offerdata } = await getalladdoffer();
        setaddoffers(offerdata);
      } catch (err) {
        console.log(err.message);
      }
    };
    getoffer();
  });
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center mt-3">
        <h2 className="start-guess-title my-auto">پیشنهاد افزودن کلمه</h2>
        <Link to={"/VocablooAdmin-42a5eb1wf"} className="mx-3 btn btn-dark">
          صفحه اصلی
        </Link>
      </div>
      <div className="start-guess-underline mx-auto mt-4"></div>
      <div className="mt-4 d-flex flex-column align-items-center">
        {addoffers &&
          addoffers.map((offer, index) => (
            <div
              key={index}
              className="offer-box d-flex justify-content-between p-2 rounded shadow my-2"
            >
              <button
                className="rounded px-2 py-1 btn btn-danger shadow-sm"
                onClick={() => {
                  deleteofferalert(
                    offer.id,
                    deleteaddoffer,
                    setaddoffers,
                    addoffers
                  );
                }}
              >
                <RxCross2 />
              </button>
              <h5 className=" mx-3 my-auto text-white">
                نام کلمه :{" "}
                <span className="text-light">{offer.offeraddword}</span>
              </h5>
              <button
                className="rounded px-2 py-1 btn btn-success shadow-sm"
                onClick={() => {
                  confirmationalert(
                    offer.offeraddword,
                    "post",
                    offer.id,
                    deleteaddoffer,
                    setaddoffers,
                    addoffers
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
export default VeiwAddOffer;
