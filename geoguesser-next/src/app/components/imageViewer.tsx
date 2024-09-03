import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import image1 from "../../../public/images/image1.jpg";

export default function ImageViewer({
  setImageTracker,
  imageTracker,
  handleImageChangeProp,
}: {
  setImageTracker: any;
  imageTracker: number;
  handleImageChangeProp: any;
}) {
  const handleImageChange = (selectedIndex: number) => {
    setImageTracker(selectedIndex);
    console.log("Image Changed" , selectedIndex);
    handleImageChangeProp(selectedIndex);
  };

  return (
    <Carousel className="w-full p-4 rounded-3xl" showThumbs={false}  onChange={handleImageChange} selectedItem={imageTracker}>
      <div className="ml-2">
        <Image
          src={image1}
          alt="Image 1"
          width={500}
          height={300}
          className="rounded-3xl mr-2"
        />
      </div>
      <div>
        <Image
          src={image1}
          alt="Image 2"
          width={500}
          height={300}
          className="rounded-3xl"
        />
      </div>
      <div>
        <Image
          src={image1}
          alt="Image 3"
          width={500}
          height={300}
          className="rounded-3xl"
        />
      </div>
    </Carousel>
  );
}
