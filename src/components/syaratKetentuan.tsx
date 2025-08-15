import Image from "next/image";

export default function Syaratketentuan() {
	return (
		<>
			<section
				className='w-screen h-screen items-center gap-5 justify-center flex flex-col'
				style={{ backgroundColor: "#FAF9EE" }}>
				<h1
					className='font-bold justify-baseline w-screen px-5 py-2 text-7xl text-center'
					style={{ color: "#A2AF9B" }}>
					Syarat & Ketentuan
				</h1>
				<div className='line w-[95vw] border-[1px] border-black'></div>
				<div className='syarat flex gap-5 px-10'>
					<h2 className='w-[30%] text-4xl font-bold'>Syarat Peminjaman </h2>
					<p className='w-[70%] text-justify px-10'>
						Peminjaman barang hanya dapat dilakukan oleh siswa atau pegawai yang
						terdaftar secara resmi di lingkungan institusi. Setiap peminjam
						wajib menunjukkan kartu identitas yang sah, seperti kartu pelajar
						atau kartu pegawai, sebagai bukti keanggotaan. Sebelum meminjam,
						peminjam harus mengisi formulir peminjaman dengan lengkap dan benar,
						serta mencantumkan jenis barang, jumlah, dan keperluan peminjaman.
						Selain itu, peminjam juga diminta untuk menandatangani surat
						pernyataan peminjaman sebagai bentuk persetujuan terhadap semua
						ketentuan yang berlaku, serta bersedia mengembalikan barang tepat
						waktu sesuai dengan tanggal yang telah disepakati bersama.{" "}
					</p>
				</div>

				<div className='line w-[95vw] border-[1px] border-black'></div>

				<div className='img flex w-screen justify-center gap-10 px-10'>
					<Image
						className='w-[400px] h-[250px]'
						src='https://picsum.photos/200/300'
						width={0}
						height={0}
						alt=''
					/>
					<Image
						className='w-[400px] h-[250px]'
						src='https://picsum.photos/200/300'
						width={250}
						height={100}
						alt=''
					/>
					<Image
						className='w-[400px] h-[250px]'
						src='https://picsum.photos/200/300'
						width={250}
						height={100}
						alt=''
					/>
					<Image
						className='w-[400px] h-[250px]'
						src='https://picsum.photos/200/300'
						width={250}
						height={100}
						alt=''
					/>
					<Image
						className='w-[400px] h-[250px]'
						src='https://picsum.photos/200/300'
						width={250}
						height={100}
						alt=''
					/>
				</div>

				<div className='line w-[95vw] border-[1px] border-black'></div>

				<div className='syarat flex gap-5 px-10'>
					<h2 className='w-[30%] text-4xl font-bold'>Ketentuan Peminjaman </h2>
					<p className='w-[70%] text-justify px-10'>
						Barang yang dipinjam hanya boleh digunakan untuk keperluan yang
						telah disetujui dan tidak diperkenankan digunakan untuk kepentingan
						pribadi atau pihak ketiga tanpa izin. Selama masa peminjaman,
						peminjam bertanggung jawab penuh atas kondisi barang yang dipinjam.
						Jika terjadi kerusakan atau kehilangan barang, maka peminjam wajib
						mengganti barang tersebut sesuai dengan nilai barang yang
						bersangkutan. Apabila peminjaman melebihi batas waktu tanpa
						pemberitahuan atau izin, maka akan dikenakan sanksi sesuai dengan
						peraturan yang berlaku. Pihak pengelola memiliki hak penuh untuk
						menolak permohonan peminjaman apabila dianggap tidak memenuhi syarat
						atau ada indikasi penyalahgunaan. Barang yang dipinjam harus
						dikembalikan dalam kondisi baik dan lengkap sebagaimana saat
						diterima.
					</p>
				</div>
				<div className='line w-[95vw] border-[1px] border-black'></div>
			</section>
		</>
	);
}
