import { createContext, useState } from "react";

//为什么要用大写的f，因为这个对象实际上是有上下文创建的，它将包含一个react component。当创建一个自己的组件时，应该遵循的条件是组件名字的第一个字母是大写。
const FavoritesContext = createContext({
  favorites: [],
  totalFavorites: 0,
  addFavorite: (favoriteMeetup) => {},
  removeFavorite: (meetupId) => {},
  itemIsFavorite: (meetupId) => {},
}); //createContext()需要有个参数。参数是createContext的初始值，可以是一个对象，

function FavoritesContextPoovider(props) {
  const [userFavorites, setUserFaorites] = useState([]);
  function addFavoriteHandler(favoriteMeetup) {
    //setUserFaorites(userFavorites.concat(favoriteMeetup));  //concat()类似于push但是返回一个新的数组，这里是添加了meetup的新数组，我们将其设置为新的状态。但是这个是有问题的。
    setUserFaorites((prevUserFavorites) => {
      return prevUserFavorites.concat(favoriteMeetup);
    }); //我么应该将一个函数传递给状态更新函数。 这个函数将接收之前的状态.返回更新的状态。这将保证我们总是在这里获得最新的状态。
  }
  function removeFavoriteHandler(meetupId) {
    setUserFaorites((prevUserFavorites) => {
      //filter过滤器，它返回一个新数组。我们过滤掉一些item，与meetupId匹配的位置，我么得到一个参数。filter过滤器是一种内置方法，将函数作为参数。
      return prevUserFavorites.filter((meetup) => meetup.id !== meetupId); //如果这里是相等的，放回false。这意味着我么删除了id相等的item，这意味着返回的数组将丢失。我们将达到删除的效果。
    });
  }
  function itemIsFavoriteHandler(meetupId) {
    //检查给定id的项目是不是我们收藏夹的一部分。所以不需要更新任何状态。他只是一个辅助功能。
    return userFavorites.some((meetup) => meetup.id === meetupId); //some()是内置方法，它存在于vanilla javascript，并且some（）的参数是一个函数。如果收藏夹的的Id中有这个ID，就确定了这个是我们收藏夹的一部分。
  }

  const context = {
    favorites: userFavorites,
    totalFavorites: userFavorites.length,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    itemIsFavorite: itemIsFavoriteHandler,
  };
  //这个组件时context内置的一个组件。这个组件需要被包装，围绕所有感兴趣的组件。
  return (
    <FavoritesContext.Provider value={context}>
      {props.children}
    </FavoritesContext.Provider>
  );
} //在监视值的时候，同时也需要一个值，这个组件将负责更新context的值。

export default FavoritesContext;
