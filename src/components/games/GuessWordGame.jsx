// import
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { edituser } from "../../services/usersservices";
// sweetalert
import Swal from "sweetalert2";
// react router
import { useNavigate } from "react-router-dom";
// context
import { useContext } from "react";
import { MainContext } from "../../context/MainContext";
// set jsx
const GuessWordGame = ({
  wordsfile,
  numberinput,
  changeupscore,
  changeunderscore,
  planename,
}) => {
  // context
  const {
    numberguess,
    randomword,
    setnumberguess,
    setrandomword,
    setuser,
    user,
  } = useContext(MainContext);
  // state
  const [allSubmissions, setAllSubmissions] = useState([]);
  const navigate = useNavigate();
  const inputsRef = useRef([]);
  // get user
  useEffect(() => {
    const loggedUser = localStorage.getItem("user");

    if (!loggedUser) {
      navigate("/signin");
    } else {
      try {
        const parsed = JSON.parse(loggedUser);
        if (parsed.data) {
          const newValue = parsed.data;
          setuser(newValue);
        } else {
          navigate("/signin");
        }
      } catch (err) {
        console.log(err.message);
        navigate("/signin");
      }
    }
  }, []);
  // reset perv game
  // reandom word
  useEffect(() => {
    if (user) {
      const randomworduser = localStorage.getItem(
        `randomword-${planename}-${user.username}`
      );
      const guessnumberuser = localStorage.getItem(
        `guessnumber-${planename}-${user.username}`
      );
      const guessworduser = localStorage.getItem(
        `guessword-${planename}-${user.username}`
      );
      if (randomworduser) {
        setrandomword(randomworduser);
      } else {
        if (wordsfile) {
          const getrandomword = Math.floor(Math.random() * wordsfile.length);
          localStorage.setItem(
            `randomword-${planename}-${user.username}`,
            wordsfile[getrandomword].word
          );
          setrandomword(wordsfile[getrandomword].word);
        }
      }
      if (guessnumberuser) {
        setnumberguess(JSON.parse(guessnumberuser));
      } else {
        setnumberguess(0);
      }
      if (guessworduser) {
        setAllSubmissions(JSON.parse(guessworduser));
      } else {
        setAllSubmissions([]);
      }
    }
  }, [user, wordsfile]);
  useEffect(() => {
    inputsRef.current[0].focus();
  }, []);
  // go next input
  const handleChange = (e, index) => {
    const value = e.target.value;

    if (value.length > 1) {
      e.target.value = value.charAt(0);
    }

    if (
      value.length === 1 &&
      index < inputsRef.current.length - 1 &&
      value !== " " &&
      inputsRef.current[index + 1].value === ""
    ) {
      inputsRef.current[index + 1].focus();
    }
  };
  // go prev input
  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault(); // جلوگیری از Submit خودکار
      getinputword();
    } else if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };
  // update user score
  const updatescore = (scoremultililer, numberscorechange) => {
    if (user) {
      const userdata = {
        id: user.id,
        username: user.username,
        password: user.password,
        score: user.score + numberscorechange + scoremultililer,
      };
      try {
        const { data: usersubmit } = edituser(user.id, userdata);
        setuser(usersubmit);
        localStorage.setItem("user", JSON.stringify({ data: userdata }));
      } catch (err) {
        console.log(err.message);
      }
    }
  };
  // reset data in end game
  const endresetdata = () => {
    localStorage.removeItem(`guessnumber-${planename}-${user.username}`);
    localStorage.removeItem(`guessword-${planename}-${user.username}`);
    localStorage.removeItem(`randomword-${planename}-${user.username}`);
    setAllSubmissions([]);
    setrandomword("");
    setnumberguess(0);
  };
  // lose alert
  const losealert = (numberguesstext, numberscorechange) => {
    Swal.fire({
      title: "کلمه رو نتونستی حدس بزنی !",
      html: `
            <p class="numberguesstext">${numberguesstext}</p>
            <p class="my-1 end-game-discription">تعداد حدس : ${
              numberguess + 1
            } حدس</p>
            <p class="my-1 end-game-discription">مقدار تغییر امتیاز : ${numberscorechange} امتیاز</p>
            <p class="my-1 end-game-discription">کلمه درست: ${randomword}</p>
            `,
      confirmButtonText: "تایید",
      background: "#f8f8f2",
      customClass: {
        title: "error-title",
        confirmButton: "alert-confirm-button",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/homepage");
      } else {
        navigate("/homepage");
      }
    });
    updatescore(0, numberscorechange);
    endresetdata();
  };
  // win alert
  const winalert = (numberguesstext, numberscorechange) => {
    Swal.fire({
      title: "کلمه رو درست حدس زدی !",
      html: `
            <p class="numberguesstext">${numberguesstext}</p>
            <p class="my-1 end-game-discription">تعداد حدس : ${
              numberguess + 1
            } حدس</p>
            <p class="my-1 end-game-discription">مقدار تغییر امتیاز : ${
              numberscorechange + changeupscore
            } امتیاز</p>
            `,
      confirmButtonText: "تایید",
      background: "#f8f8f2",
      customClass: {
        title: "success-title",
        confirmButton: "alert-confirm-button",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/homepage");
      } else {
        navigate("/homepage");
      }
    });
    updatescore(changeupscore, numberscorechange);
    endresetdata();
  };
  // check answer color
  const answercolor = (wordletter) => {
    let updatedLetters = {};
    const createLetterCount = (word) => {
      const countletter = {};
      for (let char of word) {
        countletter[char] = (countletter[char] || 0) + 1;
      }
      return countletter;
    };
    const checkyellow = (letter, randomletter, registredletter) => {
      if (
        randomletter[letter] &&
        registredletter[letter] <= randomletter[letter]
      ) {
        return true;
      } else if (registredletter[letter] > randomletter[letter]) {
        registredletter[letter]--;
        return false;
      }
    };
    let randomlettercount = createLetterCount(randomword);
    let registredlettercount = createLetterCount(wordletter);
    for (var i = 0; i < randomword.length; i++) {
      const yellowletter =
        randomword[i] !== wordletter[i]
          ? checkyellow(wordletter[i], randomlettercount, registredlettercount)
          : null;
      updatedLetters[`letter${i}`] = wordletter[i];
      if (randomword[i] === wordletter[i]) {
        updatedLetters[`letterstyle${i}`] = "rgba(67, 185, 67, 1)";
      } else if (yellowletter === true) {
        updatedLetters[`letterstyle${i}`] = "rgba(175, 184, 39, 1)";
      } else {
        updatedLetters[`letterstyle${i}`] = "#494c5e";
      }
    }
    setAllSubmissions((prev) => [...prev, updatedLetters]);
    if (user) {
      localStorage.setItem(
        `guessword-${planename}-${user.username}`,
        JSON.stringify([...allSubmissions, updatedLetters])
      );
    }
    inputsRef.current.forEach((letter) => {
      letter.value = "";
    });
    inputsRef.current[0].focus();
    setnumberguess(numberguess + 1);
    if (user) {
      localStorage.setItem(
        `guessnumber-${planename}-${user.username}`,
        JSON.stringify(numberguess + 1)
      );
    }
  };
  // check input
  const checkinputletter = (wordletter, numberguesstext, numberscorechange) => {
    if (wordletter.length === numberinput) {
      if (wordletter === randomword) {
        winalert(numberguesstext, numberscorechange);
      } else if (numberguess === 5) {
        losealert(numberguesstext, numberscorechange);
      } else if (wordletter !== randomword) {
        answercolor(wordletter);
      }
    }
  };
  // get word
  const getinputword = async () => {
    let wordletter = "";
    let checkword = false;

    inputsRef.current.forEach((letter) => {
      wordletter += letter.value;
    });
    if (wordsfile) {
      wordsfile.forEach((word) => {
        if (word.word === wordletter) {
          checkword = true;
        }
      });
    }

    if (checkword) {
      let numberguesstext = "";
      let numberscorechange = 0;
      switch (numberguess) {
        case 0:
          numberguesstext = "مشکوک میزنی";
          numberscorechange = 5;
          break;
        case 1:
          numberguesstext = "خیلی عالی حدس زدی";
          numberscorechange = 5;
          break;
        case 2:
          numberguesstext = "خیلی خوب حدس زدی";
          numberscorechange = 5;
          break;
        case 3:
          numberguesstext = "حدس زدنت خوبه";
          numberscorechange = 5;
          break;
        case 4:
          numberguesstext = "چندان خوب حدس نزدی";
          numberscorechange = 5;
          break;
        case 5:
          numberguesstext = "رو حدس زندت باید کار کنی";
          numberscorechange = changeunderscore;
          break;

        default:
          numberguesstext = "واقعا شانس بدی داری";
          numberscorechange = changeunderscore;
          break;
      }
      checkinputletter(wordletter, numberguesstext, numberscorechange);
    } else {
      toast.error("کلمه معنا ندارد");
    }
  };
  // not guess line
  const makenotguessline = (n) => {
    n = Math.floor(Number(n));
    if (n <= 0) return [];
    return Array.from({ length: n }, (_, i) => i + 1);
  };
  return (
    <>
      <div>
        <h2 className="mt-3 start-guess-title">حدس زدن رو شروع کن !</h2>
        <div className="start-guess-underline mx-auto mt-4"></div>
        <div className="registredletter-box d-flex flex-column align-items-center mt-2 pb-3 rounded">
          {makenotguessline(6 - allSubmissions.length).map((index) => (
            <div key={index} className="my-1 my-md-2 d-flex ">
              {[0, 1, 2, 3, 4, 5].map((i, index) => {
                if (i < numberinput) {
                  return (
                    <div
                      key={index}
                      className="notregistredletter d-flex justify-content-center align-items-center"
                    ></div>
                  );
                }
              })}
            </div>
          ))}
          {allSubmissions.map((registredword, index) => (
            <div key={index} className="my-1 my-md-2 d-flex ">
              {[0, 1, 2, 3, 4, 5].map((i, index) => {
                if (registredword[`letter${i}`]) {
                  return (
                    <div
                      key={index}
                      style={{
                        backgroundColor: registredword[`letterstyle${i}`],
                      }}
                      className="registredletter d-flex justify-content-center align-items-center"
                    >
                      {registredword[`letter${i}`]}
                    </div>
                  );
                }
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="fixed-bottom w-100 game-guess-bar d-flex align-items-center justify-content-center shadow-lg">
        <div className="row d-flex justify-content-center justify-content-md-around justify-content-xl-center w-100 ">
          <div className="d-flex col-12 col-md-6 col-lg-auto d-flex justify-content-center inputs-container">
            {[...Array(numberinput)].map((_, index) => (
              <input
                key={index}
                name={`letter${index}`}
                maxLength={1}
                ref={(el) => (inputsRef.current[index] = el)}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                type="text"
                className="guess-input mx-1 mx-md-2 shadow-sm"
              />
            ))}
          </div>
          <button
            type="button"
            className="btn shadow rounded mx-2 col-4 my-1 col-md-2 mt-2 mt-md-0 exit-game-btn"
            onClick={() => {
              Swal.fire({
                icon: "question",
                title: "ایا از خروج از بازی مطمئن هستید ؟",
                text: "درصورت خروج امتیاز شما تغییر نخواهد کرد",
                showCancelButton: true,
                showCloseButton: true,
                confirmButtonText: "خروج از بازی",
                cancelButtonText: "ادامه بازی",
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate("/homepage");
                  setAllSubmissions([]);
                  setrandomword("");
                  setnumberguess(0);
                }
              });
            }}
          >
            خروج از بازی
          </button>
          <button
            type="button"
            className="guessing-btn btn shadow rounded my-1 mx-2 col-4 col-md-2 mt-2 mt-md-0"
            onClick={getinputword}
          >
            حدس بزن !
          </button>
        </div>
      </div>
    </>
  );
};
export default GuessWordGame;
