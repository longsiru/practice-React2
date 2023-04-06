import { Link } from "react-router-dom";
//用<a>标签的话有一个最大的缺点，每一次点击它时，他就会发送一个新的请求到服务器。这是多余的，react实际是一个服务器，会回复我们的请求，然后路由器（router）还会确定要加载哪个画面。
//既然我们已经在使用react了，就不需要发送额外的请求了。所以在react里面我们用Link这个标签,当我们点击它时，他将阻止浏览器默认发送请求，仅仅解析我们想去的网址，然后在浏览器ulr栏更改url，不发送请求。

import classes from "./MainNavigation.module.css";
//css import的方法。
function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Meetups</div>
      <nav>
        <ul>
          <li>
            <Link to="/">All Meetups</Link>
          </li>
          <li>
            <Link to="/new-meetup">Add New Meetup</Link>
          </li>
          <li>
            <Link to="/favorites">My Favorites</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
