"use client";

import Navbar from "@/components/navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <section
        className="heroPage z-[-1] w-screen h-screen bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: "url('/hero.jpg')",
        }}
      >
        <div
          className="layer z-[1] absolute w-screen h-screen "
          style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
        ></div>

        <div className="homeSection  flex flex-col justify-center h-[80%] w-[50%] items-start ml-24">
          <h1 className="text-8xl font-bold z-[2]">
            Selamat Datang Di
            <span className="" style={{ color: "#DCCFC0" }}>
              {" "}
              G-Ware
            </span>
          </h1>
          <button
            className="p-3 z-[2] bg-amber-50 rounded-4xl text-2xl mt-10 px-5"
            style={{ backgroundColor: "#A2AF9B" }}
          >
            Pinjam Sekarang
          </button>
        </div>

        <svg
          className="absolute bottom-0 z-[2] "
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 250"
        >
          <path
            fill="#FAF9EE"
            fill-opacity="1"
            d="M0,32L80,69.3C160,107,320,181,480,192C640,203,800,149,960,133.3C1120,117,1280,139,1360,149.3L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </section>

      <section
        className="w-screen h-screen "
        style={{ backgroundColor: "#FAF9EE" }}
      >
        <p className="font-bold" style={{ color: "#A2AF9B" }}>
          Syarat & Ketentuan
        </p>
      </section>
    </>
  );
}
