// import
import { useEffect, useState } from "react";
import {
  AdminNavbar,
  AdminUserLIst,
  EditUser,
  GuessWordGame,
  HomePage,
  Navbar,
  SighIn,
  SighUp,
  OfferAddWord,
  OfferRemoveWord,
  VeiwRemoveOffer,
  AdminWords,
} from "./components/index";
import {
  adduser,
  getalluser,
  getuser,
  edituser,
  deleteuser,
  getallfiveletter,
  getallfourletter,
  getallsixletter,
  postsixletter,
  postfiveletter,
  postfourletter,
  deletesixletter,
  deletefiveletter,
  deletefourletter,
} from "./services/usersservices";
// react router
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
// react toastify
import { Bounce, toast, ToastContainer } from "react-toastify";
// context
import { MainContext } from "./context/MainContext";
// words file
import Swal from "sweetalert2";
import VeiwAddOffer from "./components/admin/ViewAddOffer";
// set jsx
const App = () => {
  const navigate = useNavigate();
  // state
  const [loading, setloading] = useState(false);
  const [users, setusers] = useState([]);
  const [user, setuser] = useState(null);
  const [randomword, setrandomword] = useState("");
  const [numberguess, setnumberguess] = useState(0);
  const [filterusers, setfilterusers] = useState([]);
  const [wordsfourletter, setwordsfourletter] = useState([]);
  const [wordsfiveletter, setwordsfiveletter] = useState([]);
  const [wordssixletter, setwordssixletter] = useState([]);
  // get words to server
  useEffect(() => {
    const getserverwords = async () => {
      try {
        const { data: getfourword } = await getallfourletter();
        const { data: getfiveword } = await getallfiveletter();
        const { data: getsixword } = await getallsixletter();
        setwordsfourletter(getfourword);
        setwordsfiveletter(getfiveword);
        setwordssixletter(getsixword);
      } catch (err) {
        console.log(err);
      }
    };
    getserverwords();
  }, []);
  // get all user
  useEffect(() => {
    const alluserdata = async () => {
      const { data: usersdata } = await getalluser();
      setusers(usersdata);
      setfilterusers(usersdata);
    };
    alluserdata();
  }, []);
  // add user
  const postuserdata = async (value) => {
    try {
      setloading(true);
      const { status, data } = await adduser(value);
      if (status === 201) {
        const alluseer = [...users, data];
        setusers(alluseer);
        navigate("/sighin");
        toast.success("ثبت نام با موفقیت انجام شد");
        setloading(false);
      }
    } catch (err) {
      console.log(err.message);
      setloading(false);
    }
  };
  // check user
  const checkuser = async (value) => {
    try {
      setloading(true);
      const user = await getuser(value.username, value.password);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/homepage");
      setloading(false);
    } catch (err) {
      console.log(err.message);
      setloading(false);
    }
  };
  const loggedUser = localStorage.getItem("user");
  // search filter
  let searchtimer;
  const searchusers = (event) => {
    clearTimeout(searchtimer);
    searchtimer = setTimeout(() => {
      setfilterusers(
        users.filter((user) => {
          return user.username.includes(event.target.value);
        })
      );
    }, 400);
  };
  // put user
  const putedit = async (value, userid) => {
    try {
      const { status } = await edituser(userid, value);
      if (status === 200) {
        const alluser = [...users];
        const editindex = users.findIndex((user) => user.id === userid);
        alluser[editindex] = { ...value };
        setusers(alluser);
        setfilterusers(alluser);

        navigate("/VocablooAdmin-42a5eb1wf");
        toast.success("ویراش با موفقیت انجام شد");
      }
    } catch (err) {
      console.log(err);
    }
  };
  // delete alert
  const deletealert = (userid) => {
    Swal.fire({
      title: "ایا از حذف کاربر مطمئن هستید ؟",
      showCancelButton: true,
      confirmButtonText: "تایید",
      cancelButtonText: "انصراف",
    }).then((result) => {
      if (result.isConfirmed) {
        senddeleteuser(userid);
      }
    });
  };
  // deleteuser
  const senddeleteuser = async (userid) => {
    try {
      const { status } = await deleteuser(userid);
      if (status === 200) {
        const alluser = [...users];
        const notdeleteusers = alluser.filter((user) => user.id !== userid);
        setusers(notdeleteusers);
        setfilterusers(notdeleteusers);
      }
    } catch (err) {
      console.log(err);
    }
  };
  // offer submit
  const offersubmit = async (submiturl, toasttitle) => {
    try {
      const { status } = await submiturl;
      if (status === 201) {
        toast.success(toasttitle);
      }
    } catch (err) {
      console.log(err);
    }
  };
  // delete word alert
  const deletewordalert = (wordId, deleteplan, wordfile, setwordfile) => {
    Swal.fire({
      title: "ایا از حذف کلمه مطمئن هستید ؟",
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: "تایید",
      cancelButtonText: "انصراف",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteword(wordId, deleteplan, wordfile, setwordfile);
      }
    });
  };
  // delete word
  const deleteword = async (wordId, deleteplan, wordfile, setwordfile) => {
    try {
      const { status } = await deleteplan(wordId);
      if (status === 200) {
        toast.success("کلمه با موفقیت حذف شد");
        const allword = [...wordfile];
        const notdeletewords = allword.filter((word) => word.id !== wordId);
        setwordfile(notdeletewords);
      }
    } catch (err) {
      console.log(err);
    }
  };
  // no space word
  const nospace = (word) => {
    const notspaceword = word.replace(/ /g, "");
    return notspaceword + "";
  };
  // check offer word
  const checkofferword = (
    word,
    addofferplan,
    successtoast,
    adderrortitle,
    removeofferplan,
    removeerrortitle
  ) => {
    if (/^[\u0600-\u06FF\s]+$/.test(word)) {
      let checkword = true;
      const stringword = nospace(word);
      switch (stringword.length) {
        case 4:
          wordsfourletter.map((fourletter) => {
            if (fourletter.word === word) {
              offersubmit(removeofferplan(), successtoast);
              checkword = false;
              toast.error(adderrortitle);
            }
          });
          if (checkword) {
            toast.error(removeerrortitle);
            offersubmit(addofferplan(), successtoast);
          }
          break;
        case 5:
          wordsfiveletter.map((fiveletter) => {
            if (fiveletter.word === word) {
              toast.error(adderrortitle);
              offersubmit(removeofferplan(), successtoast);
              checkword = false;
            }
          });
          if (checkword) {
            toast.error(removeerrortitle);
            offersubmit(addofferplan(), successtoast);
          }
          break;
        case 6:
          wordssixletter.map((sixletter) => {
            if (sixletter.word === word) {
              toast.error(adderrortitle);
              offersubmit(removeofferplan(), successtoast);
              checkword = false;
            }
          });
          if (checkword) {
            toast.error(removeerrortitle);
            offersubmit(addofferplan(), successtoast);
          }
          break;

        default:
          toast.error("تعداد حروف کلمه زیاد میباشد");
          break;
      }
    } else {
      toast.error("لطفا فارسی وارد کنید");
    }
  };
  // delete offer alert
  const deleteofferalert = (
    offerId,
    deleteofferplan,
    setofferstate,
    offerstate
  ) => {
    Swal.fire({
      title: "از حذف پیشنهاد مطمئن هستید ؟",
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: "تایید",
      cancelButtonText: "انصراف",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteoffer(offerId, deleteofferplan, setofferstate, offerstate);
      }
    });
  };
  // delete offer
  const deleteoffer = async (
    offerId,
    deleteofferplan,
    setofferstate,
    offerstate
  ) => {
    try {
      const { status } = await deleteofferplan(offerId);
      if (status === 200) {
        toast.success("پیشنهاد حذف شد");
        const alloffer = [...offerstate];
        const notdeletedoffer = alloffer.map((offer) => offer.id !== offerId);
        setofferstate(notdeletedoffer);
      }
    } catch (err) {
      console.log(err);
    }
  };
  // confirmation offer alert
  const confirmationalert = (
    status,
    offerId,
    deleteofferplan,
    setofferstate,
    offerstate
  ) => {
    Swal.fire({
      title: "از تایید پیشنهاد مطمئن هستید ؟",
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: "تایید",
      cancelButtonText: "انصراف",
    }).then((result) => {
      if (result.isConfirmed) {
        confirmationoffer(
          status,
          offerId,
          deleteofferplan,
          setofferstate,
          offerstate
        );
      }
    });
  };
  // check confirmation status
  const confirmationstatus = (
    status,
    offerId,
    deleteofferplan,
    setofferstate,
    offerstate
  ) => {
    if (status === 200 || status === 201) {
      toast.success("پیشنهاد تایید شد");
      deleteoffer(offerId, deleteofferplan, setofferstate, offerstate);
    }
  };
  // confirmation offer
  const confirmationoffer = async (
    wordoffer,
    metodtype,
    offerId,
    deleteofferplan,
    setofferstate,
    offerstate
  ) => {
    try {
      const stringword = nospace(wordoffer);
      switch (stringword.length) {
        case 4:
          if (metodtype === "post") {
            const { status } = await postfourletter({ word: wordoffer });
            confirmationstatus(
              status,
              offerId,
              deleteofferplan,
              setofferstate,
              offerstate
            );
          } else if (metodtype === "delete") {
            wordsfourletter.map(async (word) => {
              if (word.word === wordoffer) {
                const { status } = await deletefourletter(word.id);
                confirmationstatus(
                  status,
                  offerId,
                  deleteofferplan,
                  setofferstate,
                  offerstate
                );
              }
            });
          }
          break;
        case 5:
          if (metodtype === "post") {
            const { status } = await postfiveletter({ word: wordoffer });
            confirmationstatus(
              status,
              offerId,
              deleteofferplan,
              setofferstate,
              offerstate
            );
          } else if (metodtype === "delete") {
            wordsfiveletter.map(async (word) => {
              if (word.word === wordoffer) {
                const { status } = await deletefiveletter(word.id);
                confirmationstatus(
                  status,
                  offerId,
                  deleteofferplan,
                  setofferstate,
                  offerstate
                );
              }
            });
          }
          break;
        case 6:
          if (metodtype === "post") {
            const { status } = await postsixletter({ word: wordoffer });
            confirmationstatus(
              status,
              offerId,
              deleteofferplan,
              setofferstate,
              offerstate
            );
          } else if (metodtype === "delete") {
            wordssixletter.map(async (word) => {
              if (word.word === wordoffer) {
                const { status } = await deletesixletter(word.id);
                confirmationstatus(
                  status,
                  offerId,
                  deleteofferplan,
                  setofferstate,
                  offerstate
                );
              }
            });
          }
          break;
        default:
          break;
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <MainContext.Provider
      value={{
        user,
        users,
        setuser,
        setrandomword,
        randomword,
        numberguess,
        setnumberguess,
        checkofferword,
        deletewordalert,
        wordsfourletter,
        wordsfiveletter,
        wordssixletter,
      }}
    >
      <div className="text-center">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          closeOnClick
          rtl
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
        <Routes>
          <Route
            path="/"
            element={
              loggedUser ? (
                <Navigate to={"/homepage"} />
              ) : (
                <Navigate to={"/sighin"} />
              )
            }
          />
          <Route
            path="/sighin"
            element={
              <SighIn loading={loading} checkuser={checkuser} users={users} />
            }
          />
          <Route
            path="/sighup"
            element={
              <SighUp
                loading={loading}
                postuserdata={postuserdata}
                users={users}
              />
            }
          />
          <Route path="/homepage" element={<Navbar user={user} />}>
            <Route index element={<HomePage setuser={setuser} />} />
            <Route
              path="/homepage/vocabloo-four-letter"
              element={
                loggedUser ? (
                  <GuessWordGame
                    wordsfile={wordsfourletter && wordsfourletter}
                    numberinput={4}
                    changeupscore={5}
                    changeunderscore={-5}
                    planename="fourletter"
                  />
                ) : (
                  <Navigate to={"/sighin"} />
                )
              }
            />
            <Route
              path="/homepage/vocabloo-five-letter"
              element={
                loggedUser ? (
                  <GuessWordGame
                    wordsfile={wordsfiveletter && wordsfiveletter}
                    numberinput={5}
                    changeupscore={10}
                    changeunderscore={-10}
                    planename="fiveletter"
                  />
                ) : (
                  <Navigate to={"/sighin"} />
                )
              }
            />
            <Route
              path="/homepage/vocabloo-six-letter"
              element={
                loggedUser ? (
                  <GuessWordGame
                    wordsfile={wordssixletter && wordssixletter}
                    numberinput={6}
                    changeupscore={15}
                    changeunderscore={-15}
                    planename="sixletter"
                  />
                ) : (
                  <Navigate to={"/sighin"} />
                )
              }
            />
            <Route
              path="/homepage/offer-add-word"
              element={
                loggedUser ? <OfferAddWord /> : <Navigate to={"/sighin"} />
              }
            />
            <Route
              path="/homepage/offer-remove-word"
              element={
                loggedUser ? <OfferRemoveWord /> : <Navigate to={"/sighin"} />
              }
            />
          </Route>
          <Route
            path="/VocablooAdmin-42a5eb1wf"
            element={<AdminNavbar searchusers={searchusers} />}
          >
            <Route
              index
              element={
                <AdminUserLIst
                  users={users}
                  filterusers={filterusers}
                  deletealert={deletealert}
                />
              }
            />
            <Route
              path="/VocablooAdmin-42a5eb1wf/edituser/:userId"
              element={<EditUser putedit={putedit} />}
            />
            <Route
              path="/VocablooAdmin-42a5eb1wf/view-add-offer"
              element={
                <VeiwAddOffer
                  deleteofferalert={deleteofferalert}
                  confirmationalert={confirmationalert}
                />
              }
            />
            <Route
              path="/VocablooAdmin-42a5eb1wf/view-remove-offer"
              element={
                <VeiwRemoveOffer
                  deleteofferalert={deleteofferalert}
                  confirmationalert={confirmationalert}
                />
              }
            />
            <Route
              path="/VocablooAdmin-42a5eb1wf/four-letter"
              element={
                <AdminWords
                  deleteplane={deletefourletter}
                  addwordplan={postfourletter}
                  wordfile={wordsfourletter && wordsfourletter}
                  setwordfile={setwordsfourletter}
                  pagetitle="کلمات چهار حرفی"
                  numberletter={4}
                />
              }
            />
            <Route
              path="/VocablooAdmin-42a5eb1wf/five-letter"
              element={
                <AdminWords
                  deleteplane={deletefiveletter}
                  addwordplan={postfiveletter}
                  wordfile={wordsfiveletter && wordsfiveletter}
                  setwordfile={setwordsfiveletter}
                  pagetitle="کلمات پنج حرفی"
                  numberletter={5}
                />
              }
            />
            <Route
              path="/VocablooAdmin-42a5eb1wf/six-letter"
              element={
                <AdminWords
                  deleteplane={deletesixletter}
                  addwordplan={postsixletter}
                  wordfile={wordssixletter && wordssixletter}
                  setwordfile={setwordssixletter}
                  pagetitle="کلمات شش حرفی"
                  numberletter={6}
                />
              }
            />
          </Route>
        </Routes>
      </div>
    </MainContext.Provider>
  );
};

export default App;
