import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Footer() {
  return (
    <>
      <footer className="w-screen  p-10 bg-[#A2AF9B]">
        <div className="flex justify-between gap-32 text-[#EEEEEE]">
          <div className="perkenalan justify-center w-[40%] gap-5 flex flex-col">
            <h2 className="text-5xl font-bold">G-Ware</h2>
            <p className=" mb-3">
              G-Ware merupakan sistem peminjaman barang terpercaya yang membantu
              pengelolaan inventaris secara efektif, aman, dan terorganisir.
            </p>
            <div className="sosialMedia flex gap-3">
              <div className="youtube">
                <Icon
                  icon="line-md:youtube"
                  width="35"
                  height="35"
                  style={{ color: "#EEEEEE" }}
                />
              </div>
              <div className="instagram">
                <Icon
                  icon="line-md:instagram"
                  width="35"
                  height="35"
                  style={{ color: "#EEEEEE" }}
                />
              </div>
              <div className="x">
                <Icon
                  icon="line-md:twitter-x"
                  width="35"
                  height="35"
                  style={{ color: "#EEEEEE" }}
                />
              </div>
              <div className="facebook">
                <Icon
                  icon="line-md:facebook"
                  width="35"
                  height="35"
                  style={{ color: "#EEEEEE" }}
                />
              </div>
            </div>
          </div>
          <div className="websiteKontak flex flex-col gap-10 w-[20%]">
            <div className="website flex flex-col gap-5">
              <h2 className="text-3xl font-bold">Website</h2>
              <div className="linkWebSekolah">
                <p>
                  <a href="">Websekolah</a>
                </p>
                <p>
                  <a href="">Learn Management System</a>
                </p>
                <p>
                  <a href="">SiswaWebsite</a>
                </p>
              </div>
            </div>
            <div className="kontak flex flex-col gap-5">
              <h2 className="text-3xl font-bold">Kontak</h2>
              <div className="dataKontak">
                <p>
                  <a href="tel:+02273189600">No HP : 0227318960</a>
                </p>
                <p>
                  <a href="mailto:smk13bdg@gmail.com">
                    Email : smk13bdg@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="pembuatAlamat flex flex-col gap-10  w-[20%]">
            <div className="pembuat flex flex-col gap-5">
              <h2 className="text-3xl font-bold">Pembuat</h2>
              <div className="email">
                <p>
                  <a href="mailto:aditcareer12370@gmail.com">
                    Email : aditcareer12370
                  </a>
                </p>
                <p>
                  <a href="mailto:nasywan22@gmail.com">
                    Email : nasywan22@gmail.com
                  </a>
                </p>
                <p>
                  <a href="mailto:destiadwiaagraeni@gmail.com">
                    Email : destiadwiaagraeni@gmail.com
                  </a>
                </p>
              </div>
            </div>
            <div className="Alamat flex flex-col gap-5">
              <h2 className="text-3xl font-bold">Alamat</h2>
              <p>
                Jl. Soekarno‑Hatta Km. 10, Jatisari, Kec. Buahbatu, Kota
                Bandung, Jawa Barat 40286 – Indonesia
              </p>
            </div>
          </div>
        </div>
        <h2 className="text-[#EEEEEE]">
          &copy; 2025 Team Of Three - SMKN 13 Bandung
        </h2>
      </footer>
    </>
  );
}
