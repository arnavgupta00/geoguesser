"use client";
import { User } from "lucide-react";
import Image from "next/image";
import Navbar from "./components/navbar";
import StatCard from "./components/statCard";
import ImageViewer from "./components/imageViewer";
import MapComponent from "./components/map";
import { useState, useEffect } from "react";
interface ImageObject {
  src: string;
  index: number;
  attachedLocation: {
    latitude: number;
    longitude: number;
  };
  inputLocation: {
    latitude: number;
    longitude: number;
  };
}

export default function Home() {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [imageTracker, setImageTracker] = useState(0);
  const [markerLocation, setMarkerLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  

  const [imageObjects, setImageObjects] = useState<ImageObject[]>();

  const handleScoreCalculation = (imageObject: ImageObject) => {
    const distance = Math.sqrt(
      Math.pow(
        imageObject.attachedLocation.latitude -
          imageObject.inputLocation.latitude,
        2
      ) +
        Math.pow(
          imageObject.attachedLocation.longitude -
            imageObject.inputLocation.longitude,
          2
        )
    );
    const score = Math.floor(1000 - distance * 1000);
    setScore((score) => score + score);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between p-0"
      style={{
        backgroundColor: "#1E1E1E",
      }}
    >
      <Navbar />
      <ImageViewer
        setImageTracker={setImageTracker}
        imageTracker={imageTracker}
      />
      <div className="h-1/2 p-6 w-full">
        <MapComponent
          selectedLocation={""}
          view={""}
          selectedValue={""}
          selectedTime={""}
          latitude={0}
          longitude={0}
          setMarkerLocation={setMarkerLocation}
        />
      </div>

      <StatCard score={score} time={time} />
    </main>
  );
}
