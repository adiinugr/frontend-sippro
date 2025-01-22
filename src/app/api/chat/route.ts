import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

const linearSubjectString =
  'Seni: Seni Budaya, Sejarah: Sejarah, Linguistik: Bahasa Indonesia dan/atau Bahasa Inggris, Susastra atau Sastra: Bahasa Indonesia dan/atau bahasa asing yang relevan, Filsafat: Sosiologi, Sosial: Sosiologi, Ekonomi: Ekonomi dan/atau matematika, Pertahanan: Pendidikan Pancasila, Psikologi: Sosiologi dan/atau Matematika, Kimia: Kimia, Ilmu atau Sains Kebumian: Fisika dan/atau Matematika tingkat lanjut, Ilmu atau Sains Kelautan: Biologi, Biologi: Biologi, Biofisika: Fisika, Fisika: Fisika, Astronomi: Fisika dan/atau Matematika tingkat lanjut, Komputer: Matematika tingkat lanjut, Logika: Matematika tingkat lanjut, Matematika: Matematika tingkat lanjut, Ilmu dan Sains Pertanian: Biologi, Peternakan: Biologi, Ilmu atau Sains Perikanan: Biologi, Arsitektur: Matematika dan/atau Fisika, Perencanaan Wilayah: Ekonomi dan/atau Matematika, Desain: Seni Budaya dan/atau Matematika, Ilmu atau Sains Akuntansi: Ekonomi, Ilmu atau Sains Manajemen: Ekonomi, Logistik: Ekonomi, Administrasi Bisnis: Ekonomi, Bisnis: Ekonomi, Ilmu atau Sains Komunikasi: Sosiologi, Pendidikan: Paling banyak 1 mata pelajaran pendukung yang relevan dengan program studi kependidikannya, Teknik atau rekayasa: Fisika/Kimia dan/atau Matematika tingkat lanjut/Matematika dari kelompok peminatan MIPA, Ilmu atau Sains Lingkungan: Biologi, Kehutanan: Biologi, Ilmu atau Sains Kedokteran: Biologi dan/atau Kimia, Ilmu atau Sains Kedokteran Gigi: Biologi dan/atau Kimia, Ilmu atau Sains Veteriner: Biologi dan/atau Kimia, Ilmu Farmasi: Biologi dan/atau Kimia, Ilmu atau Sains Gizi: Biologi dan/atau Kimia, Kesehatan Masyarakat: Biologi, Kebidanan: Biologi, Keperawatan: Biologi, Kesehatan: Biologi, Ilmu atau Sains Informasi: Matematika tingkat lanjut, Hukum: Sosiologi dan/atau Pendidikan Pancasila, Ilmu atau Sains Militer: Sosiologi, Urusan Publik: Sosiologi, Ilmu atau Sains Keolahragaan: Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK) dan/atau Biologi, Pariwisata: Ekonomi, Transportasi: Matematika tingkat lanjut, Bioteknologi, Biokewirausaha an, Bioinformatika: Biologi dan/atau Matematika, Geografi, Geografi Lingkungan, Sains Informasi Geografi: Geografi dan/atau Matematika, Informatika Medis atau Informatika Kesehatan: Biologi dan/atau Matematika Tingkat Lanjut, Konservasi Biologi, Konservasi Hewan Liar, Konservasi Hewan Liar dan Hutan, Konservasi Hutan, Konservasi Sumber Daya Alam: Biologi, Teknologi Pangan, Teknologi Hasil Pertanian/ Peternakan/ Perikanan: Kimia dan/atau Biologi, Sains Data: Matematika Tingkat Lanjut, Sains Perkopian: Biologi, Studi Humanitas: Sosiologi'

export async function POST(request: Request) {
  const { messages, mark, achievements, studentName } = await request.json()

  const stream = await streamText({
    model: openai('gpt-4o-mini'),
    system:
      'Kamu adalah asisten yang akan membimbing siswa untuk menentukan jurusan dan universitas yang cocok dengannya setelah lulus SMA. Siswa bernama' +
      studentName +
      'punya nilai raport berikut ini' +
      '/n' +
      mark +
      '. Dan ini adalah mapel pendukung dalam memilih jurusan atau prodi pada universitas: ' +
      linearSubjectString +
      '. Dia juga mempunyai prestasi:' +
      '/n' +
      achievements,
    messages
  })

  return stream.toAIStreamResponse()
}
