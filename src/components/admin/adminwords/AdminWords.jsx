// import
import { useState, useRef } from "react";
// react icons
import { RxCross2 } from "react-icons/rx";
// react router
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// context
import { useContext } from "react";
import { MainContext } from "../../../context/MainContext";
// set jsx
const AdminWords = ({
  wordfile,
  pagetitle,
  numberletter,
  addwordplan,
  deleteplane,
  setwordfile,
}) => {
  const { deletewordalert } = useContext(MainContext);
  // ref
  const inputref = useRef(null);
  const searchTimeout = useRef(null);
  // state
  const [addwords, setaddwords] = useState({
    word: "",
  });
  const [searchvalue, setsearchvalue] = useState("");
  // change input search
  const handlesearchchange = (event) => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    const value = event.target.value;
    searchTimeout.current = setTimeout(() => {
      setsearchvalue(value);
    }, 500);
  };
  const addword = async () => {
    try {
      console.log(addwords);
      const { status, data } = await addwordplan(addwords);
      console.log(status);

      if (status === 201) {
        setaddwords({
          word: "",
        });
        inputref.current.value = "";
        toast.success("کلمه با موفقیت اضافه شد");
        const allword = [...wordfile, data];
        setwordfile(allword);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="mt-3 mb-4">
        <div className="d-flex justify-content-center align-items-center mt-3">
          <h2 className="start-guess-title my-auto">{pagetitle}</h2>
          <Link to={"/VocablooAdmin-42a5eb1wf"} className="mx-3 btn btn-dark">
            صفحه اصلی
          </Link>
        </div>
        <div>
          <input
            type="search"
            className="mt-3 w-50 form-control bg-light mx-auto"
            placeholder="جستجوی کلمه ..."
            onChange={handlesearchchange}
          />
        </div>
        <div className="start-guess-underline mx-auto mt-4"></div>
      </div>
      <form
        className="w-100 d-flex justify-content-center mb-4"
        onSubmit={(event) => {
          event.preventDefault();
          let checkword = true;
          wordfile.map((word) => {
            if (word.word === addwords.word) {
              checkword = false;
              toast.error("این کلمه وجود دارد");
            }
          });
          if (checkword) {
            addword(event);
          }
        }}
      >
        <input
          ref={inputref}
          type="text"
          className="form-control shadoww w-50 bg-light"
          placeholder="نام کلمه ... "
          minLength={numberletter}
          maxLength={numberletter}
          required
          value={addwords.word}
          onChange={(event) => {
            setaddwords({
              word: event.target.value,
            });
          }}
        />
        <button type="submit" className="btn btn-secondary px-3 py-2 me-3">
          افزودن کلمه
        </button>
      </form>
      <div className="row w-100">
        {wordfile.map((word, index) => {
          if (word.word.includes(searchvalue)) {
            return (
              <div
                key={index}
                className="d-flex justify-content-center adminword-box bg-dark mx-auto p-2 my-1 col-12 col-sm-6 col-md-4 col-lg-3"
              >
                <h5 className="mx-2 adminword">{word.word}</h5>
                <button
                  className="rounded px-2 py-1 btn btn-danger shadow-sm"
                  onClick={() => {
                    deletewordalert(
                      word.id,
                      deleteplane,
                      wordfile,
                      setwordfile
                    );
                  }}
                >
                  <RxCross2 />
                </button>
              </div>
            );
          }
        })}
      </div>
    </>
  );
};
export default AdminWords;
