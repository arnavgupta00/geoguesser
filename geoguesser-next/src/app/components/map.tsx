"use client";
import React, { useEffect, useRef, useState } from "react";
import mapboxgl, { Map, Marker, PointLike, Popup } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const mapboxToken =
  "pk.eyJ1IjoiYXJuYXZndXB0YTMwMzUiLCJhIjoiY20wbXVldWtpMDdxMjJtcXY4eWRoeDcwYiJ9.riufnOdQxDkn1dU1y2Ik7w"; // Replace with your Mapbox access token

interface LabelData {
  name: string;
  latitude: number;
  longitude: number;
}

interface MapComponentProps {
  selectedLocation: string;
  view: string;
  selectedValue: string;
  selectedTime: string;
  latitude: number;
  longitude: number;
  setMarkerLocation: any;
  imageTracker: any;
}

export default function MapComponent(props: MapComponentProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [selectedCountryState, setSelectedCountryState] = useState<string>();
  const [viewport, setViewport] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 12,
  });

  const [visibleLabels, setVisibleLabels] = useState<LabelData[]>();
  const markersRef = useRef<Marker[]>([]);
  const [visibleLayers, setVisibleLayers] = useState<string[]>([
    "country-label",
    "state-label",
    "settlement-major-label",
  ]);

  function extractBoundingBox(polygon: any) {
    // Initialize variables to track minimum and maximum values
    let minLat = Infinity;
    let maxLat = -Infinity;
    let minLon = Infinity;
    let maxLon = -Infinity;

    // Iterate through each point in the polygon
    for (const ring of polygon) {
      for (const subRing of ring) {
        for (const [lon, lat] of subRing) {
          minLat = Math.min(minLat, lat); // Update minLat with the smaller value
          maxLat = Math.max(maxLat, lat); // Update maxLat with the larger value
          minLon = Math.min(minLon, lon); // Update minLon with the smaller value
          maxLon = Math.max(maxLon, lon); // Update maxLon with the larger value
        }
      }
    }

    console.log("Bounding box:", {
      minLat,
      maxLat,
      minLon,
      maxLon,
    });
    // Return the bounding box as an object
    return {
      minLat,
      maxLat,
      minLon,
      maxLon,
    };
  }

  const initializeMap = async (latitude: any, longitude: any) => {
    mapboxgl.accessToken = mapboxToken;
    // const polygons = countryBoundingBoxes[props.selectedLocation.toLowerCase()];
    // const bbox = extractBoundingBox(polygons);

    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: "mapbox://styles/arnavgupta3035/clybw4tif00kh01qpaj6v1tmc",
      center: [76.3694134736134, 30.354930565106628],
      zoom: 17,

      // maxBounds: [
      //   [bbox.minLon, bbox.minLat],
      //   [bbox.maxLon, bbox.maxLat],
      // ],
    });
    map.on("load", () => {
      setMap(map);
      map.resize();
    });

    const createMarkerElement = () => {
      // Create the main container for the marker
      const markerContainer = document.createElement("div");
      markerContainer.style.display = "flex";
      markerContainer.style.flexDirection = "column";
      markerContainer.style.alignItems = "center";

      // Create the circular red part of the marker
      const circle = document.createElement("div");
      circle.style.width = "12px";
      circle.style.height = "12px";
      circle.style.backgroundColor = "#6C63FF";
      circle.style.borderRadius = "50%";
      circle.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.3)";
      circle.style.position = "relative";
      circle.style.top = "0px"; // Adjust as needed

      // Create the stem part of the marker
      const stem = document.createElement("div");
      stem.style.width = "2px";
      stem.style.height = "15px";
      stem.style.backgroundColor = "black";
      stem.style.marginTop = "-2px"; // Slight overlap with the circle

      // Append the circle and stem to the container
      markerContainer.appendChild(circle);
      markerContainer.appendChild(stem);

      return markerContainer;
    };

    const addMarker = async (lng: number, lat: number) => {
      try {
        // Create a red marker element
        const markerElement = createMarkerElement();

        // Create a Mapbox popup if needed (example, but you might not need this)
        const popup = new mapboxgl.Popup({ offset: 25 })
          .setLngLat([lng, lat])
          .setDOMContent(markerElement)
          .addTo(map);

        // Create the marker using Mapbox
        const marker = new mapboxgl.Marker({
          element: markerElement,
        })
          .setLngLat([lng, lat])
          .setPopup(popup)
          .addTo(map);

        markersRef.current.push(marker);

        popup.on("close", ()=>{

        });

        // function handleClose() {
        //   const index = markersRef.current.indexOf(marker);
        //   if (index !== -1) {
        //     markersRef.current.splice(index, 1);
        //   }
        //   marker.remove();
        //   popup.remove();

        //   // Remove the event listener after handling the close event
        //   popup.off("close", handleClose);
        // }

        popup.on("open", () => {
          const index = markersRef.current.indexOf(marker);
          if (index === -1) {
            markersRef.current.push(marker);
          }
        });
      } catch (error) {
        console.log("Maximum call stack exceeded");
      }
    };

    const removeMarkers = () => {
      for (const marker of markersRef.current) {
        marker.remove();
      }
      markersRef.current = [];
    };

    map.on(
      "click",

      async (e) => {
        console.log("Click event:", e);

        try {
          removeMarkers();
        } catch (error) {}
        const { lng, lat } = e.lngLat;
        props.setMarkerLocation({ latitude: lat, longitude: lng });
        addMarker(lng, lat);
      }
    );
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Geolocation success:", latitude, longitude);

        try {
          if (props.latitude !== 0 && props.longitude !== 0) {
            setViewport({
              latitude,
              longitude,
              zoom: 12,
            });

            await initializeMap(props.latitude, props.longitude);
          } else {
            setViewport({
              latitude,
              longitude,
              zoom: 12,
            });

            await initializeMap(latitude, longitude);
          }
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      },
      (error) => {
        console.error("Error fetching geolocation:", error);
      }
    );
  }, [props.imageTracker]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        ref={mapContainerRef}
        style={{ width: "100%", height: "300px", borderRadius: "15px" }}
      />
      {/* <ul>
        {visibleLabels.map((label, index) => (
          <li key={index}>{label.name} ({label.latitude}, {label.longitude})</li>
        ))}
      </ul> */}
    </div>
  );
}
