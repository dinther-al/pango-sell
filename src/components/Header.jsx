import Skeleton from "react-loading-skeleton";
import React from "react";
import { useStore } from "zmp-framework/react";

export const Header = () => {
  const loading = useStore("loading");

  return (
    <div className="flex">
      {loading ? (
        <Skeleton
          height={60}
          width={370}
          className="flex items-center justify-center mt-1 ml-[1.2rem] py-1 bg-gray-300 rounded-lg sm:w-96 dark:bg-gray-700"
        />
      ) : (
        <div className="w-full py-2">
          <div className="flex items-center justify-between pr-3 pl-[0.2rem]">
            <div className="flex flex-row justify-center items-center">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/pangosell.appspot.com/o/avatarreal.jpg?alt=media&token=1e85b77c-2034-476e-97ff-0e10f895e8be"
                className="ml-2 mr-3 w-10 h-10 rounded-full"
                alt="..."
              />
              <div className="">
                <p className="flex text-slate-600">
                  pangoCDP.com
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/pangosell.appspot.com/o/check.png?alt=media&token=87452a18-1c8b-4134-b548-34fcb1fa10f0"
                    className="ml-1 w-4 object-contain relative top-[1px]"
                    alt=".."
                  />
                </p>
                <p className="font-medium ">Xin chào bạn</p>
              </div>
            </div>

            <div className="flex">
              <div className="border border-solid border-[#96c3a9] rounded-md p-2 drop-shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 256 256"
                >
                  <path
                    fill="#1f633c"
                    d="M138 128a10 10 0 1 1-10-10a10 10 0 0 1 10 10m-54-10a10 10 0 1 0 10 10a10 10 0 0 0-10-10m88 0a10 10 0 1 0 10 10a10 10 0 0 0-10-10m58 10a102 102 0 0 1-150.69 89.65l-34.87 11.62a14 14 0 0 1-17.71-17.71l11.62-34.87A102 102 0 1 1 230 128m-12 0a90 90 0 1 0-167.92 45.06a6 6 0 0 1 .5 4.91l-12.46 37.38a2 2 0 0 0 2.53 2.53L78 205.42a6.2 6.2 0 0 1 1.9-.31a6.09 6.09 0 0 1 3 .81A90 90 0 0 0 218 128"
                  />
                </svg>
              </div>
              <div className="border border-solid border-[#96c3a9] rounded-md ml-1 p-2 drop-shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#1f633c"
                    d="M11.5 1.85L23.553 12L11.5 22.15v-6.227c-4.194.2-7.073 1.7-9.186 4.658L.52 19.804c.523-2.617 1.58-5.295 3.478-7.462c1.761-2.014 4.209-3.543 7.502-4.187zm2 4.3v3.717l-.858.123c-3.27.467-5.551 1.853-7.14 3.669a11.98 11.98 0 0 0-1.744 2.658C6.096 14.666 8.978 13.9 12.5 13.9h1v3.95L20.448 12z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
