import { z } from 'zod'

export default function settingShcema() {
    z.object({
        webName: z.string().min(3, 'Nama Web harus lebih dari 3 karakter').max(100, 'Nama Web harus kurang dari 100 karakter'),
        webSlogan: z.string().min(3, 'Web Slogan harus lebih dari 3 karakter').max(100, 'Web Slogan harus kurang dari 100 karakter'),
        webDescription: z.string().min(3, 'Deskripsi Web harus lebih dari 3 karakter').max(500, 'Deskripsi Web harus kurang dari 500 karakter'),
        webDescriptionEng: z.string().min(3, 'Deskripsi Web harus lebih dari 3 karakter').max(500, 'Deskripsi Web harus kurang dari 500 karakter'),
        webKeywords: z.string().min(3, 'Keywords Web harus lebih dari 3 karakter').max(500, 'Keywords Web harus kurang dari 500 karakter'),
        webLogo: z
            .instanceof(Buffer)
            .refine(data => {
                const supportedFormats = ["image/jpeg", "image/png"];
                const header = data.slice(0, 4).toString('hex');
                const sizeInMB = data.length / (1024 * 1024); // Calculate size in MB
                if (sizeInMB > 2) {
                    throw new Error("Ukuran file tidak boleh lebih dari 2MB");
                }
                return supportedFormats.some(format => header.startsWith(format.replace('image/', '')));
            }, { message: "Format tidak didukung, pilih format jpg, png" }),
        canRegister: z.boolean(),
        canLogin: z.boolean(),
        adminContact: z.string().min(3, 'Kontak Admin harus lebih dari 3 karakter').max(15, 'Kontak Admin harus kurang dari 15 karakter'),
    })
}
