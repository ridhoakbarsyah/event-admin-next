import { string, z } from 'zod'

const eventShcema = z.object({
    name: z.string().min(3, 'Nama harus lebih dari 3 karakter').max(255, 'Nama harus kurang dari 255 karakter'),
    registrationStart: z.string().nonempty({ message: 'Registrasi dimulai harus diisi' }),
    registrationEnd: z.string().nonempty({ message: 'Registrasi berakhir harus diisi' }),
    eventDate: z.string().nonempty({ message: 'Tanggal event harus diisi' }),
    status: z.string()
});

export default eventShcema;
