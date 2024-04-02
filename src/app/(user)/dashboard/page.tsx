import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

export default async function Dashboard() {
    const session = await getServerSession(authOptions)

    return (
        <>
            <div>Name: {session?.user.name}</div>
            <div>Role: {session?.user.role}</div>
        </>
    )
}
