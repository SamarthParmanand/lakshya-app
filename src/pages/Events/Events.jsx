import { useEffect, useState } from "react";
import { lakshya } from "../../utils/supabase_helper";
import useCart from "../../hooks/useCart";
import toast from "react-hot-toast";
import Modal from "../../components/Modal/Modal";
import ModalEventItem from "../../components/Modal/ModalEventItem";
import EventItem from "../../components/EventItem/EventItem";
import Fuse from "fuse.js";
import { IoSearch } from "react-icons/io5";

import classes from "./Events.module.css";

const Events = () => {
  const [eventList, setEventList] = useState([]);
  const { addToCart, cart } = useCart();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [showAllEvents, setShowAllEvents] = useState(true); // state to control whether to show all events or search results

  useEffect(() => {
    try {
      lakshya.getUnregisteredEvents().then((e) => setEventList(e));
    } catch (error) {
      console.error(error);
    }
  }, []);

  // Configure Fuse.js options
  const options = {
    keys: ["name"],
    threshold: 0.4,
  };

  // Create a new Fuse instance with the events and options
  const fuse = new Fuse(eventList, options);

  // Perform the search and update searchResults
  const handleSearchChange = (e) => {
    const term = e.target.value;
    const results = fuse.search(term);
    setSearchResults(results);
    setShowAllEvents(term === ""); // Show all events if the search term is empty || returns false if the search term is not empty/null
  };

  const openModal = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  const handleAddToCart = (event) => {
    if (!cart.some((item) => item.id === event.id)) {
      addToCart(event);
      toast("Added to Cart");
    } else {
      toast("Event already in cart");
    }
  };

  return (
    <>
      <div id={classes.title}>Events</div>
      <div className={classes["search-bar-container"]}>
        <IoSearch/>
        <input
        id={classes.search}
          type="text"
          placeholder="Start typing to search events..."
          onChange={handleSearchChange}
        />
      </div>
      <div className={classes["card-list-container"]}>
        {showAllEvents
          ? eventList.map((event) => (
              <EventItem event={event} openModal={openModal} key={event.id} />
            ))
          : searchResults.map((event) => (
              <EventItem
                event={event.item}
                openModal={openModal}
                key={event.item.id}
              />
            ))}
      </div>

      {selectedEvent && (
        <Modal onClose={closeModal}>
          <ModalEventItem
            event={selectedEvent}
            closeModal={closeModal}
            handleAddToCart={handleAddToCart}
          />
        </Modal>
      )}
    </>
  );
};

export default Events;
