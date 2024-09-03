"use client";
import { User } from "lucide-react";
import Image from "next/image";
import Navbar from "./components/navbar";
import StatCard from "./components/statCard";
import ImageViewer from "./components/imageViewer";
import MapComponent from "./components/map";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
  score: number;
}

export default function Home() {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(600);
  const [imageTracker, setImageTracker] = useState(0);
  const [markerLocation, setMarkerLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [imageObjects, setImageObjects] = useState<ImageObject[]>([
    {
      src: "https://source.unsplash.com/random/800x600",
      index: 0,
      attachedLocation: {
        latitude: 30.356822708934217,
        longitude: 76.36370500954598,
      },
      inputLocation: {
        latitude: 0,
        longitude: 0,
      },
      score: 0,
    },
    {
      src: "https://source.unsplash.com/random/800x600",
      index: 1,
      attachedLocation: {
        latitude: 30.356822708934217,
        longitude: 76.36370500954598,
      },
      inputLocation: {
        latitude: 0,
        longitude: 0,
      },
      score: 0,
    },
    {
      src: "https://source.unsplash.com/random/800x600",
      index: 2,
      attachedLocation: {
        latitude: 30.356822708934217,
        longitude: 76.36370500954598,
      },
      inputLocation: {
        latitude: 0,
        longitude: 0,
      },
      score: 0,
    },
  ]);

  const router = useRouter();
  const handleScoreUpdate = (imageObjectsTemp: ImageObject[]) => {
    var score = 0;
    imageObjectsTemp.forEach((imageObject) => {
      score = score + imageObject.score;
    });

    setScore(score);
    setMarkerLocation({
      latitude: 0,
      longitude: 0,
    });
  };

  const handleScoreCalculation = (imageObject: ImageObject) => {
    console.log("Image Object", imageObject);

    // Calculate distance using a larger scaling factor
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

    // Adjust sensitivity by scaling up the distance multiplier
    const scaledDistance = distance * 100000;

    // Calculate score with the adjusted distance
    var score = Math.max(0, Math.floor(1000 - scaledDistance)) - 900;

    score = score < 0 ? 0 : score;

    imageObject.score = score;

    setScore((prevScore) => prevScore + score);

    var imageObjectsTemp;

    setImageObjects((prevImageObjects) => {
      const newImageObjects = prevImageObjects.map((prevImageObject) => {
        if (prevImageObject.index === imageObject.index) {
          return imageObject;
        } else {
          return prevImageObject;
        }
      });

      imageObjectsTemp = newImageObjects;
      handleScoreUpdate(newImageObjects);
      return newImageObjects;
    });

    console.log("Score", score, "Distance", distance);
    return score;
  };

  const handleImageChange = (selectedIndex: number) => {
    console.log("Image Changed handleImageChangepp", selectedIndex , imageTracker);
    if (!imageObjects) {
    }

    const imageObject = imageObjects[selectedIndex];

    if (!imageObject) {
      console.log("No Image Found");
      return;
    }

    if (markerLocation.latitude === 0 && markerLocation.longitude === 0) {
      console.log("No Marker Location Found");
      return;
    }

    imageObject.inputLocation = markerLocation
      ? markerLocation
      : imageObject.inputLocation;

    console.log("Image Changed", selectedIndex);

    handleScoreCalculation(imageObject);

    console.log("Image Changed", selectedIndex);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "");
    if (user == "") {
      console.log("User", user);
      router.push("/credentials");
    }
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
        handleImageChangeProp={handleImageChange}
      />
      {imageObjects.length === imageTracker+1 && (
        <div className="w-full h-fit flex justify-end p-4">
          <button
            className=""
            style={{
              backgroundColor: "#6C63FF",
              color: "#ffffff",
              padding: "10px",
              borderRadius: "10px",
              border: "none",
              margin: "10px",
            }}
            onClick={() => {
              
              

            }}
          >
            Finish
          </button>
        </div>
      )}

      <div className="h-1/2 p-6 w-full">
        <MapComponent
          selectedLocation={""}
          view={""}
          selectedValue={""}
          selectedTime={""}
          latitude={0}
          longitude={0}
          imageTracker={imageTracker}
          setMarkerLocation={setMarkerLocation}
        />
      </div>

      <StatCard score={score} time={time} />
    </main>
  );
}
