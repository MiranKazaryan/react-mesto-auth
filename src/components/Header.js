import logoPath from "../images/Vector.svg";
import { Link, Route, Switch } from 'react-router-dom';

//компонент шапки сайта
function Header({loggedIn,path, email}) {
  /*console.log(email);
  console.log(path);
  const newPath = path === '/' || path === "/signup" ? "/signin" : "/signup";
  console.log(newPath);
  const linkName = { '/':'Выйти','/signup':'Войти','/signin':'Регистрация'}*/
  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="Логотип сайта" />
      {<Switch>
        <Route path="/signin">
          <Link className="header__link" to="/signup">
            Регистрация
          </Link>
        </Route>
        <Route path="/signup">
        <Link className="header__link" to="/signin">
          Войти
        </Link>
        </Route>
        <Route path="/">
        <div className="header__container">
        <p className="header__email">{email}</p>
        <Link className="header__link" to="/signin">
          Выйти
        </Link>
        </div>
        
        </Route>

      </Switch>

      }
    </header>
  );
}
export default Header;

