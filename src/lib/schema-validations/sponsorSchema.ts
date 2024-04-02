import { z } from 'zod'

export default function sponsorShcema() {
    z.object({
        name: z.string().min(3, 'Nama harus lebih dari 3 karakter').max(100, 'Nama harus kurang dari 100 karakter'),
        logo: z
            .instanceof(Buffer)
            .refine(data => {
                const supportedFormats = ["image/jpeg", "image/png"];
                const header = data.slice(0, 4).toString('hex');
                const sizeInMB = data.length / (1024 * 1024); // Calculate size in MB
                if (sizeInMB > 2) {
                    throw new Error("Ukuran file tidak boleh lebih dari 2MB");
                }
                return supportedFormats.some(format => header.startsWith(format.replace('image/', '')));
            }, { message: "Format tidak didukung, pilih format jpg, png" })
    })
}
