import { z } from 'zod'

export default function categorySchema() {
    z.object({
        EventId: z.number().int().positive(),
        name: z.string().min(3, 'Nama harus lebih dari 3 karakter').max(100, 'Nama harus kurang dari 100 karakter'),
        description: z.string().min(3, 'Deskripsi harus lebih dari 3 karakter').max(500, 'Deskripsi harus kurang dari 500 karakter'),
        descriptionEng: z.string().min(3, 'Deskripsi harus lebih dari 3 karakter').max(500, 'Deskripsi harus kurang dari 500 karakter'),
        price: z.number().int().positive(),
        bibCodePutra: z.string().min(3, 'Bib Code Putra harus lebih dari 3 karakter').max(10, 'Bib Code Putra harus kurang dari 10 karakter'),
        bibCodePutri: z.string().min(3, 'Bib Code Putri harus lebih dari 3 karakter').max(10, 'Bib Code Putri harus kurang dari 10 karakter'),
        status: z.boolean(),
        category: z.enum(['Umum', 'Pelajar']),
    })
}
