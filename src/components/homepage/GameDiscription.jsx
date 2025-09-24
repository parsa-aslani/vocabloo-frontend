import { ImBook } from "react-icons/im";
import { Link } from "react-router-dom";
const GameDiscription = () => {
  return (
    <div className="discription-box mx-auto shadow d-flex flex-column align-items-center px-3 justify-content-center">
      <h3 className="fa-bold w-100 text-white pb-3 pt-1 leader-board-title">
        توضیحات بازی <ImBook />
      </h3>
      <div className="discription-text-box mb-3 mt-md-2 p-2 shadow-sm">
        <p className="discription-text">
          به بازی حدس کلمه vocabloo خوش امدید. بعد از ثبت نام با کلیک روی یکی از
          پلن های بازی میتونی بازی رو شروع کنی بعد از شروع یه کلمه به صورت
          تصادفی انتخاب میشه و تو باید با 6 حدس اون کلمه رو به دست بیاری وگرنه
          میبازی. بعد از هر حدس کلمه ای که حدس زدی روی صفحه چاپ میشه و هر حرف از
          کلمه به یه رنگ در میاد که هر رنگ یه معنی میده (
          <span className="discription-black">سیاه</span> یعنی اون حرف تو کلمه
          ای که باید حدس بزنی وجود نداره{" "}
          <span className="discription-yellow">زرد</span> یعنی اون حرف تو کلمه
          وجود داره ولی تو یه خونه دیگه{" "}
          <span className="discription-grren">سبز</span> یعنی اون حرف داخل کلمه
          وجود داره دقیقا داخل همین خونه) حالا تو باید کلمات مختلف رو امتحان کنی
          تا در نهایت به کلمه مورد نظر در 6 حدس برسی وگرنه میبازی و امتیازت کم
          میشه ولی اگه ببری به امتیازت اضافه میشه در صورتی که دقیقا با 6 حدس
          کلمه رو پیدا کنی امتیازت تغییری نمیکنه. حالا بازی رو بلدی و میتونی
          شروع کنی
        </p>
      </div>
      <div>
        <Link
          to={"/homepage/offer-add-word"}
          className="btn px-2 px-lg-4 py-2 rounded add-word-btn shadow ms-1"
        >
          پیشنهاد افزودن کلمه
        </Link>
        <Link
          to={"/homepage/offer-remove-word"}
          className="btn px-2 px-lg-4 py-2 rounded remove-word-btn shadow me-1"
        >
          پیشنهاد حذف کلمه
        </Link>
      </div>
    </div>
  );
};
export default GameDiscription;
