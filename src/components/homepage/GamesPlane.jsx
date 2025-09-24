import { Link } from "react-router-dom";
// context
import { useContext } from "react";
import { MainContext } from "../../context/MainContext";
const GamePlane = () => {
  const { wordsfiveletter, wordsfourletter, wordssixletter } =
    useContext(MainContext);
  return (
    <div className="row mt-3">
      <div className="mx-auto col-11 col-md-6 col-lg-4">
        <div className="plane-box py-3 shadow px-3 mx-5 mx-md-4 my-3">
          <h4 className="pb-1 plane-title">بازی 4 حرفی</h4>
          <div className="py-1 plane-discription-box">
            <p className="plane-discription my-1 w-100 text-end py-1 rounded px-2">
              تعداد کلمه : <span>{wordsfourletter.length} کلمه</span>
            </p>
            <p className="plane-discription my-1 w-100 text-end py-1 rounded px-2">
              تعداد حدس : <span>6 حدس</span>
            </p>
            <p className="plane-discription my-1 w-100 text-end py-1 rounded px-2">
              در صورت برد : <span>+10 امتیاز</span>
            </p>
            <p className="plane-discription my-1 w-100 text-end py-1 rounded px-2">
              در صورت باخت : <span>-5 امتیاز</span>
            </p>
          </div>
          <div className="pt-2">
            <Link
              to={"/homepage/vocabloo-four-letter"}
              className="py-1 rounded btn w-100 start-game-btn shadow-sm"
            >
              شروع بازی !
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto col-11 col-md-6 col-lg-4">
        <div className="plane-box py-3 shadow px-3 mx-5 mx-md-4 my-3">
          <h4 className="pb-1 plane-title">بازی 5 حرفی</h4>
          <div className="py-1 plane-discription-box">
            <p className="plane-discription my-1 w-100 text-end py-1 rounded px-2">
              تعداد کلمه : <span>{wordsfiveletter.length} کلمه</span>
            </p>
            <p className="plane-discription my-1 w-100 text-end py-1 rounded px-2">
              تعداد حدس : <span>6 حدس</span>
            </p>
            <p className="plane-discription my-1 w-100 text-end py-1 rounded px-2">
              در صورت برد : <span>+15 امتیاز</span>
            </p>
            <p className="plane-discription my-1 w-100 text-end py-1 rounded px-2">
              در صورت باخت : <span>-10 امتیاز</span>
            </p>
          </div>
          <div className="pt-2">
            <Link
              to={"/homepage/vocabloo-five-letter"}
              className="py-1 rounded btn w-100 start-game-btn shadow-sm"
            >
              شروع بازی !
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto col-11 col-md-6 col-lg-4">
        <div className="plane-box py-3 shadow px-3 mx-5 mx-md-4 my-3">
          <h4 className="pb-1 plane-title">بازی 6 حرفی</h4>
          <div className="py-1 plane-discription-box">
            <p className="plane-discription my-1 w-100 text-end py-1 rounded px-2">
              تعداد کلمه : <span>{wordssixletter.length} کلمه</span>
            </p>
            <p className="plane-discription my-1 w-100 text-end py-1 rounded px-2">
              تعداد حدس : <span>5 حدس</span>
            </p>
            <p className="plane-discription my-1 w-100 text-end py-1 rounded px-2">
              در صورت برد : <span>+20 امتیاز</span>
            </p>
            <p className="plane-discription my-1 w-100 text-end py-1 rounded px-2">
              در صورت باخت : <span>-15 امتیاز</span>
            </p>
          </div>
          <div className="pt-2">
            <Link
              to={"/homepage/vocabloo-six-letter"}
              className="py-1 rounded btn w-100 start-game-btn shadow-sm"
            >
              شروع بازی !
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GamePlane;
