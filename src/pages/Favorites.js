import { useContext } from "react";
//useContext(): 用于在组件之间共享状态，而不必显式地通过组件树的逐层传递 props。
//实现步骤：
//使用createContext创建Context对象
//在顶层组件通过provider提供数据
//在底层组件通过useContext函数获取数据
import FavoritesContext from "../store/favorites-context";
import MeetupList from "../components/meetups/MeetupList";

function FavoritesPage() {
  const favoritesCtx = useContext(FavoritesContext);
  let content;
  if (favoritesCtx.totalFavorites === 0) {
    content = <p>You got no favorites yet. Starting adding some favorites?</p>;
  } else {
    content = <MeetupList meetups={favoritesCtx.favorites} />;
  }

  return (
    <section>
      <h1>My Favorites</h1>
      {content}
    </section>
  );
}

export default FavoritesPage;
