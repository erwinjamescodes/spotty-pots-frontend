import React, { useEffect, useState } from "react";
import axios from "axios";
import Map, { useMap } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import useViewportStore from "../store/viewportStore";
import useUsernameStore from "../store/userNameStore";
import HeaderSearch from "./HeaderSearch";
import DisplayPins from "./DisplayPins";
import AddPin from "./AddPin";

export default function LubakMap() {
  //STATES
  const viewport = useViewportStore();
  const { currentUsername, setCurrentUsername, userType, setUserType } =
    useUsernameStore();
  const [pins, setPins] = useState([]);
  const [newPlace, setNewPlace] = useState(null);
  const [intensity, setIntensity] = useState(1);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [clickedAPin, setClickedAPin] = useState(false);
  const [status, setStatus] = useState(false);
  const { mymap } = useMap();

  //SETTING UP STATES AND LOCAL STORAGE
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUsername(window.localStorage.getItem("lubakUser"));
      setUserType(window.localStorage.getItem("lubakUserType"));
    }
  }, [currentUsername]);

  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get("https://lubak-tracker-backend.onrender.com/api/pins");
        setPins(allPins.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  //FUNCTIONS
  const handleAddClick = (e) => {
    setCurrentPlaceId(null);
    const { lng, lat } = e.lngLat;
    setNewPlace((prev) => ({ ...prev, long: lng, lat: lat }));
    mymap.easeTo({
      center: [lng, lat],
      duration: 800,
      // zoom: 14,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUsername,
      intensity: intensity,
      isFixed: false,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      const res = await axios.post("https://lubak-tracker-backend.onrender.com/api/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
      setIntensity(1);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePinClick = (id, long, lat) => {
    setClickedAPin(true);
    setCurrentPlaceId(id);
    mymap.easeTo({
      center: [long, lat],
      duration: 800,
      zoom: 14,
    });
  };

  const closePopupOnOutsideClick = () => {
    setClickedAPin(false);
    if (currentPlaceId) {
      !clickedAPin ? setCurrentPlaceId(null) : null;
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await axios.put(`https://lubak-tracker-backend.onrender.com/api/pins/${id}`, {
        isFixed: status,
        intensity: intensity,
      });
      setPins((prev) => prev.map((pin) => (pin._id === id ? res.data : pin)));
      setStatus(false);
      setCurrentPlaceId(null);
      setIntensity(1);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`https://lubak-tracker-backend.onrender.com/api/pins/${id}`);
      setPins(pins.filter((pin) => pin._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <main className="bg-[gray] w-[100%]">
        <HeaderSearch mymap={mymap} />
        <div className="map w-[100%] h-[100vh]">
          <Map
            id="mymap"
            initialViewState={{ ...viewport }}
            style={{ width: "100%", height: "100%" }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_URL}
            renderWorldCopies={false}
            doubleClickZoom={false}
            onDblClick={(e) => {
              handleAddClick(e);
            }}
            onClick={() => {
              closePopupOnOutsideClick();
            }}
          >
            <DisplayPins
              pins={pins}
              intensity={intensity}
              setIntensity={setIntensity}
              currentPlaceId={currentPlaceId}
              setCurrentPlaceId={setCurrentPlaceId}
              handlePinClick={handlePinClick}
              handleUpdateStatus={handleUpdateStatus}
              setStatus={setStatus}
              status={status}
              handleDeleteClick={handleDeleteClick}
            />

            {/* CREATE NEW PIN */}
            {newPlace !== null && (
              <AddPin
                newPlace={newPlace}
                setNewPlace={setNewPlace}
                handleSubmit={handleSubmit}
                setIntensity={setIntensity}
                handleDeleteClick={handleDeleteClick}
              />
            )}
          </Map>
        </div>
      </main>
    </>
  );
}
