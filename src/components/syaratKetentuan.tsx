"use client";

import { Icon } from "@iconify/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Syaratketentuan() {
	return (
		<>
			<section
				className='w-screen h-auto items-center gap-5 py-15 flex flex-col'
				style={{ backgroundColor: "#FAF9EE" }}>
				<div className='w-full max-w-7xl flex flex-col gap-5 justify-center items-center'>
					<h1
						className='font-bold justify-baseline w-screen px-5 text-7xl text-center mb-10'
						style={{ color: "#A2AF9B" }}>
						Syarat & Ketentuan
					</h1>

					<div className='w-full px-10 grid grid-cols-1 lg:grid-cols-2 gap-8'>
						{/* Syarat Peminjaman Card */}
						<Card className='h-full border-[#A2AF9B]'>
							<CardHeader>
								<CardTitle className='text-2xl font-bold flex gap-5 flex-row items-center'>
									<div className='flex items-center justify-center bg-[#A2AF9B] rounded-full w-12 h-12'>
										<Icon
											icon='basil:document-solid'
											width='24'
											height='24'
											style={{ color: "#FFFFFF" }}
										/>
									</div>
									Syarat Peminjaman
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className='text-justify font-normal'>
									Peminjaman barang hanya dapat dilakukan oleh siswa atau
									pegawai yang terdaftar secara resmi di lingkungan institusi.
									Setiap peminjam wajib menunjukkan kartu identitas yang sah,
									seperti kartu pelajar atau kartu pegawai, sebagai bukti
									keanggotaan. Sebelum meminjam, peminjam harus mengisi formulir
									peminjaman dengan lengkap dan benar, serta mencantumkan jenis
									barang, jumlah, dan keperluan peminjaman. Selain itu, peminjam
									juga diminta untuk menandatangani surat pernyataan peminjaman
									sebagai bentuk persetujuan terhadap semua ketentuan yang
									berlaku, serta bersedia mengembalikan barang tepat waktu
									sesuai dengan tanggal yang telah disepakati bersama.{" "}
								</p>
							</CardContent>
						</Card>

						{/* Ketentuan Peminjaman Card */}
						<Card className='h-full border-[#A2AF9B]'>
							<CardHeader>
								<CardTitle className='text-2xl font-bold flex gap-5 flex-row items-center'>
									<div className='flex items-center justify-center bg-[#A2AF9B] rounded-full w-12 h-12'>
										<Icon
											icon='codicon:law'
											width='24'
											height='24'
											style={{ color: "#FFFFFF" }}
										/>
									</div>
									Ketentuan Peminjaman
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className='text-justify font-normal'>
									Barang yang dipinjam hanya boleh digunakan untuk keperluan
									yang telah disetujui dan tidak diperkenankan digunakan untuk
									kepentingan pribadi atau pihak ketiga tanpa izin. Selama masa
									peminjaman, peminjam bertanggung jawab penuh atas kondisi
									barang yang dipinjam. Jika terjadi kerusakan atau kehilangan
									barang, maka peminjam wajib mengganti barang tersebut sesuai
									dengan nilai barang yang bersangkutan. Apabila peminjaman
									melebihi batas waktu tanpa pemberitahuan atau izin, maka akan
									dikenakan sanksi sesuai dengan peraturan yang berlaku. Pihak
									pengelola memiliki hak penuh untuk menolak permohonan
									peminjaman apabila dianggap tidak memenuhi syarat atau ada
									indikasi penyalahgunaan. Barang yang dipinjam harus
									dikembalikan dalam kondisi baik dan lengkap sebagaimana saat
									diterima.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>
		</>
	);
}
