import classes from "./Card.module.css";
//当被card组件包装起来时，内容会消失。这是我们需要在card组件添加道具 props。 然后用{props.children}来告诉card，card,储存在children里的JSX是要被显示出来的。

function Card(props) {
  return <div className={classes.card}>{props.children}</div>;
}

export default Card;
