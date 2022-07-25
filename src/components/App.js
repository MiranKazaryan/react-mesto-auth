import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import { useEffect, useState } from "react";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Route, Switch, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import * as auth from "../utils/auth";
import InfoTooltip from "./InfoTooltip";

function App() {
  //булевые стейты попапов
  const [isEditPopupOpened, setEditPopupOpened] = useState(false);
  const [isAddPopupOpened, setAddPopupOpened] = useState(false);
  const [isEditAvatarPopupOpened, setEditAvatarPopupOpened] = useState(false);
  const [isConfirmPopupOpened, setConfirmPopupOpened] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  //стейт выбранной карточки
  const [selectedCard, setSelectedCard] = useState({});
  //стейт пользователя
  const [currentUser, setCurrentUser] = useState({});
  //стейт карточек
  const [cards, setCards] = useState([]);
  //стейт карточки выбранной для удаления
  const [deletedCard, setDeletedCard] = useState({});
  // логин да/нет
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");

  //tooltip
  const [isToolOpened, setToolOpened] = useState(false);
  const [registeredIn, setRegisteredIn] = useState(false);
  //const navigate =  useNavigate();
  const history = useHistory();

  function handlePath(newPath) {
    setCurrentPath(newPath);
  }
  //Постановка лайка
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (isLiked) {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .addLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  // удаление карточки при подтверждении попапа
  function handleCardDelete() {
    setIsLoad(true);
    api
      .deleteCard(deletedCard._id)
      .then((newCard) => {
        setCards((state) => state.filter((c) => c._id !== deletedCard._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoad(false);
      });
  }
  //хук обновляющий информацию о пользователе и карточках
  useEffect(() => {
    handleCheckToken();
    Promise.all([api.getInitialCards(), api.getProfile()])
      .then(([cardList, res]) => {
        setCurrentUser(res);
        setCards(cardList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //открытие попапа подтверждения удаления
  function handleDeleteConfirm(card) {
    setDeletedCard(card);
    setConfirmPopupOpened(true);
  }
  //открытие попапа аватара
  function handleEditAvatarClick() {
    setEditAvatarPopupOpened(true);
  }

  //открытие попапа редактирования
  function handleEditProfileClick() {
    setEditPopupOpened(true);
  }
  //открытие попапа добавления карточки
  function handleAddPlaceClick() {
    setAddPopupOpened(true);
  }
  //открытие картинки по клику
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  //закрытие попапов
  function closeAllPopups() {
    setAddPopupOpened(false);
    setEditAvatarPopupOpened(false);
    setEditPopupOpened(false);
    setConfirmPopupOpened(false);
    setToolOpened(false);
    setSelectedCard({});
  }
  //Api сабмит редактирования профиля
  function handleUpdateUser(userInfo) {
    setIsLoad(true);
    api
      .editProfile({ name: userInfo.name, about: userInfo.about })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoad(false);
      });
  }
  //Api сабмит обновления аватара
  function handleUpdateAvatar(avatar) {
    setIsLoad(true);
    api
      .editAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoad(false);
      });
  }
  //Api сабмит добавления карточки
  function handleUpdatePlace({ name, link }) {
    setIsLoad(true);
    api
      .addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoad(false);
      });
  }
  //отслеживание клика вне попапа
  useEffect(() => {
    function handleEscapeKey(e) {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    }

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, []);
  //функция клика по оверлею
  function handleOverlayClose(e) {
    if (e.target.classList.contains("popup")) {
      closeAllPopups();
    }
  }

  function handleSignupSubmit(password, email) {
    auth
      .register(password, email)
      .then((response) => {
        console.log(response);
        setRegisteredIn(true);
        handlePath("/signin");
        history.push("/signin");
      })
      .catch((err) => {
        console.log(err);
        setRegisteredIn(false);
      })
      .finally(() => {
        setToolOpened(true);
      });
  }

  function handleSigninSubmit(password, email) {
    auth
      .authorization(password, email)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          handleCheckToken();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCheckToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt !== null && jwt !== "undefined") {
      auth
        .checkToken(jwt)
        .then((res) => {
          console.log("check", res.data.email);
          setLoggedIn(true);
          handleEmail(res.data.email);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (loggedIn) {
      handlePath("/");
      history.push("/");
    }
  }, [loggedIn]);

  function handleOnLogout() {
    localStorage.removeItem("jwt");
    setEmail("");
    setLoggedIn(false);
  }

  function handleEmail(email) {
    setEmail(email);
  }
  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          loggedIn={loggedIn}
          email={email}
          path={currentPath}
          onLogout={handleOnLogout}
        />

        <Switch>
          <Route path="/signup">
            <Register
              onSubmit={handleSignupSubmit}
              onPathChange={handlePath}
              email={email}
            />
          </Route>
          <Route path="/signin">
            <Login onSubmit={handleSigninSubmit} email={email} />
          </Route>
          <ProtectedRoute
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteConfirm}
            cards={cards}
          />
        </Switch>

        <Footer />

        <EditProfilePopup
          isOpen={isEditPopupOpened}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoad={isLoad}
          handleOverlayClose={handleOverlayClose}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpened}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoad={isLoad}
          handleOverlayClose={handleOverlayClose}
        />

        <AddPlacePopup
          isOpen={isAddPopupOpened}
          onClose={closeAllPopups}
          onUpdatePlace={handleUpdatePlace}
          isLoad={isLoad}
          handleOverlayClose={handleOverlayClose}
        />

        <ConfirmDeletePopup
          isOpen={isConfirmPopupOpened}
          onClose={closeAllPopups}
          onConfirm={handleCardDelete}
          isLoad={isLoad}
        />
        <InfoTooltip
          isSuccess={registeredIn}
          isOpen={isToolOpened}
          onClose={closeAllPopups}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          handleOverlayClose={handleOverlayClose}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
