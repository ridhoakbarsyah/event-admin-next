import { prisma } from '@/lib/prisma'

export function getSetting() {
    try {
        return prisma.setting.findFirst()
    } catch (e) {
        console.log(e)
        throw new Error("Failed to fetch data")
    }
}