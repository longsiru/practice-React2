//import { useHistory } from "react-router-dom"; //리액트 라우터 v6에서는 기존의 useHistory 대신 useNavigate를 사용해야합니다.
import { useNavigate } from "react-router-dom";
import NewMeetupForm from "../components/meetups/NewMeetupForm";

function NewMeetupPage() {
  const navigate = useNavigate();
  function addMeetuphHandler(meetupData) {
    //发送http请求，我们可以用fetch函数，它是内置在javascript中的默认javascript函数，与react无关，是支持标准的javascript函数。我们也可以用第三方package，比如axios！！！
    fetch(
      "https://practice-react-474b8-default-rtdb.firebaseio.com/meetups.json",
      {
        method: "POST",
        body: JSON.stringify(meetupData),
        headers: {
          "Content-Type": "application/json",
        }, //e可以加一些额外的标题。//此时提交之后还是在当前页面。一旦完成了http的请求，去其他页面用router
      } //firebase的特别之处在于需要在最后面加上.json
    ).then(() => {
      navigate("/");
    });
  }
  return (
    <section>
      <h1>Add New Meetup</h1>
      <NewMeetupForm onAddMeetup={addMeetuphHandler} />
    </section>
  );
}

export default NewMeetupPage;
