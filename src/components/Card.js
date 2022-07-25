import {useContext} from "react";
import { CardContext } from "../contexts/CardContext";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
//компонент карточки
function Card({ card,onCardClick, onCardLike, onCardDelete }) {
  //использование контекста текущего пользователя
  const currentUser = useContext(CurrentUserContext);
  //проверка карточки на принадлежность пользователю
  const isOwn = card.owner._id === currentUser._id;
  //класс удаления карточки
  const cardDeleteButtonClassName = `card__delete-button ${
    isOwn ? "" : "card__delete-button_hidden"
  }`;
  //проверка лайка карточки пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;
  //функция клика по карточке
  function handleClick() {
    onCardClick(card);
  }
  //функция клика на лайк
  function handleLikeClick() {
    onCardLike(card);
  }
  //функция клика на удаление
  function handleDeleteClick() {
    onCardDelete(card);
  }
  return (
    <li className="card">
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
      <div className="card__info">
        <h2 className="card__title">{card.name} </h2>
        <div className="card__like-area">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className="card__like-count">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
