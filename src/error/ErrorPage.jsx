const ErrorPage = ({ error }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center errorpage-box">
      <div className="d-flex align-items-center justify-content-center">
        <h1 className="errorpage-title">اوه!یه مشکلی به وجود اومد</h1>
        <img
          src={require("../assets/image/settings.gif")}
          alt="fix-icon"
          className="errorpage-icon"
        />
      </div>
      <h5 className="error-text px-4 py-2 rounded">
        متن خطا : <span className="error-text-span">{error.message}</span>
      </h5>
      <button
        className="px-5 py-2 rounded btn try-again-btn mt-3"
        onClick={() => {
          window.location.reload();
        }}
      >
        تلاش مجدد
      </button>
    </div>
  );
};
export default ErrorPage;
