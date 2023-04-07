import { useRef } from "react";
import Card from "../ui/Card";
import classes from "./NewMeetupForm.module.css";

function NewMeetupForm(props) {
  const titleInputRef = useRef(); //因为第一个ref是title,现在要将创建的这个对象连接到input，我们要为这个html元素提供了一个特殊的道具。现在除了key道具之外亨特别的道具，ref内置于react之中并支持所有开箱即用的元素:ref={titleInputRef}
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault(); //调用此方法来防止浏览器默认，实际上没有具体反映。允许我们完全处理提交，只用javascript做出反应。
    //下一步我们需要找到一种读取这些输入值的方法。有两种方法。
    //1.使用usestate，并将onchange事件监听器添加到所有这些输入中，最终触发一个功能，对于每次点击，提取值。
    //2.useRef,ref={titleInputRef}

    //对于读取输入，读取值，ref是哟个非常有用的工具。
    //提交处理程序中，我们得到输入的标题，读取所有用户输入的具体值
    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value; //current属性存放拿到的dom对象,保存实际的链接值，所有输入的值都有一个vulue属性。

    const meetupData = {
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
    };

    // console.log(meetupData);//在console输出数据
    //但是我们不仅仅是要在console输出数据，我们还要发送数据到服务器，然后将其存储在数据库中。
    props.onAddMeetup(meetupData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Meetup Title</label>
          <input type="text" required id="title" ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Meetup Image</label>
          <input type="url" required id="image" ref={imageInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Address</label>
          <input type="text" required id="address" ref={addressInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            required
            id="description"
            rows="5"
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Add Meetup</button>
        </div>
      </form>
    </Card>
  );
}

export default NewMeetupForm;
