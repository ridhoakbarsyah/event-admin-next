import { getSetting } from '@/lib/actions/setting'
import Authlayout from '../Layouts/Authlayout'
import SignInForm from './form'

export default async function SignIn() {
    const setting = await getSetting()

    return (
        <Authlayout>
            <span className="mb-1.5 block font-medium">Start for free</span>
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign In to {setting?.webName}
            </h2>

            <SignInForm />
        </Authlayout>
    )
}
