import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, Circle } from "react-leaflet";
import ReactLeafletGoogleLayer from "react-leaflet-google-layer";
import L from "leaflet";
import moment from "moment";
import WorkspacePage, { MonthNavigation } from "../../components/WorkspacePage";
import {
  appendUrlToDate,
  formattedDate,
  addDateToUrl,
} from "../../utils/utils";
import "leaflet/dist/leaflet.css";
import { useExpenses } from "../Expenses/hooks/useExpenses";

function MapViewContainer() {
  const googleMapsKey = import.meta.env.VITE_GOOGLE_MAPS_KEY;
  const [selectedMonth, setSelectedMonth] = useState();
  const { actions, expenses } = useExpenses([]);
  const expensesWithLocation = expenses.filter(
    (expense) => expense.latitude && expense.longitude,
  );
  const defaultPosition = [35.682839, 139.759455];
  const defaultRadius = 200;

  const circles = expensesWithLocation.map((expense) => ({
    center: [expense.latitude, expense.longitude],
    radius: defaultRadius,
  }));

  const markers = expensesWithLocation.map((expense) => ({
    position: [expense.latitude, expense.longitude],
    content: `${expense.category_names}: ${expense.amount_spent}`,
  }));

  const customIcon = L.divIcon({
    className: "workspace-map-pin",
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });
  const changeMonth = (direction) => {
    const next = formattedDate(
      moment(selectedMonth).add(direction === "next" ? 1 : -1, "months"),
    );
    appendUrlToDate(next);
    setSelectedMonth(next);
  };

  useEffect(() => {
    const month = addDateToUrl();
    setSelectedMonth(month);
  }, []);

  useEffect(() => {
    if (selectedMonth) {
      actions.getGroupedExpenses(selectedMonth);
    }
  }, [selectedMonth]);

  return (
    <WorkspacePage
      title="Spending map"
      description="See the places behind your everyday spending."
      actions={<MonthNavigation month={selectedMonth} onChange={changeMonth} />}
    >
      <div className="workspace-card workspace-map-card">
        <div className="workspace-card-header">
          <h2>{expensesWithLocation.length} places this month</h2>
        </div>
        {expensesWithLocation.length === 0 && (
          <p className="workspace-note" style={{ padding: "0 20px" }}>
            Expenses with a saved location will appear here.
          </p>
        )}
        <div
          style={{ height: "clamp(350px, 65vh, 700px)", isolation: "isolate" }}
        >
          <MapContainer
            key={selectedMonth}
            center={circles.length === 0 ? defaultPosition : circles[0].center}
            zoom={13}
            scrollWheelZoom={false}
            style={{ width: "100%", height: "100%" }}
          >
            <ReactLeafletGoogleLayer apiKey={googleMapsKey} type="roadmap" />
            {circles.map((circle) => (
              <Circle
                key={circle.center.join(",")}
                center={circle.center}
                radius={circle.radius}
                pathOptions={{ color: "var(--primary)", fillColor: "var(--chart-budget)" }}
              />
            ))}

            {markers.map((marker) => (
              <Marker
                key={marker.position.join(",")}
                position={marker.position}
                icon={customIcon}
              >
                <Popup>{marker.content}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </WorkspacePage>
  );
}

export default MapViewContainer;
