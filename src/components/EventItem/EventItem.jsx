/* eslint-disable react/prop-types */
import classes from './EventItem.module.css';

const EventItem = ({ event, openModal }) => {
  return (
    <>
      <div key={event.id} className={classes.card}>
        <img src={event.picture} alt={event.name} className={classes["card-image"]} />
        <div className={classes["card-content"]}>
          <h2 className={classes["card-title"]}>{event.name}</h2>
          <div id={classes["date-price"]}>
            <p className={classes["card-date"]}>
              {new Date(event.datetime).toLocaleDateString()}
            </p>
            <p className={classes["card-price"]}>₹ {event.amount}</p>
          </div>
          <button className={classes['info-button']} onClick={() => openModal(event)}>
            Show More Info
          </button>
        </div>
      </div>
    </>
  );
};

export default EventItem;
