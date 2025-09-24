// import
import { useEffect, useState } from "react";
// react icons
import { FaMedal } from "react-icons/fa6";
// context
import { useContext } from "react";
import { MainContext } from "../../context/MainContext";
const LeaderBoard = () => {
  const { users } = useContext(MainContext);
  const [topusers, settopuser] = useState([]);
  useEffect(() => {
    users.sort((a, b) => b.score - a.score);
    const topFiveUsers = users.slice(0, 5);
    settopuser(topFiveUsers);
  }, [users]);
  return (
    <div className="leader-board mx-auto shadow d-flex flex-column align-items-center px-3 justify-content-center mt-4 mt-md-0">
      <h3 className="fa-bold w-100 text-white pb-3 pt-1 leader-board-title">
        جدول امتیازات <FaMedal />
      </h3>
      <div className="w-100">
        {topusers &&
          topusers.map((topuser, index) => (
            <p
              className="leader-board-item text-end px-1 py-1 rounded my-2"
              key={index}
            >
              {users.indexOf(topuser) + 1}- {topuser.username}
              <span className="leader-board-score">
                {" "}
                ( امتیاز: {topuser.score} )
              </span>
            </p>
          ))}
      </div>
    </div>
  );
};
export default LeaderBoard;
