import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardContext } from "../contexts/CardContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  //контекст с данными пользователя
  const currentUser = useContext(CurrentUserContext);
  return (
    <>
      <section className="profile">
        <div
          className="profile__avatar"
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
        >
          <button
            type="button"
            onClick={onEditAvatar}
            className="profile__edit-avatar"
          ></button>
        </div>
        <div className="profile__text-info">
          <div className="profile__name">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__edit-button"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="photo-grid">
        <ul className="cards">
          {cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </>
  );
}
export default Main;
