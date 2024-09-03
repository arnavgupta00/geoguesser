import { User } from "lucide-react";

export default function Navbar() {
  const session = {
    user: {
      image: "https://avatars.githubusercontent.com/u/62557544?v=4",
    },
  };

  return (
    <div className="w-full  h-16 flex justify-between items-center  pl-4 pr-4">
      <h1
        className="text-2xl font-bold poppins-semibold "
        style={{
          color: "#6C63FF",
        }}
      >
        GeoGuesser
      </h1>
      <div
        className="w-10 h-10 rounded-full shadow-lg"
        // onClick={() => setShowDropdown(!showDropdown)}
      >
        {session.user.image ? (
          <img
            src={
              session.user.image ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4n4D5jth4fm4GE7ut7lWW-04lnDO2OkD-sg&s"
            }
            alt="profileImage"
            className="rounded-full w-full h-full object-cover"
          />
        ) : (
          <div
            className=" h-12 w-12 rounded-full  border-inherit reverse-schemed"
            // onClick={() => setShowDropdown(!showDropdown)}
          >
            <User
              className=" w-full h-full   rounded-full p-4  text-white cursor-pointer "
              size={30}
            />
          </div>
        )}
      </div>
    </div>
  );
}
