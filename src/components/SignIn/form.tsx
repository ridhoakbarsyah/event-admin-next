'use client'

import { TsignInSchema, signInSchema } from '@/lib/schema-validations/signinSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { IoLockClosedOutline, IoMailOutline } from 'react-icons/io5';

export default function SignInForm() {
    const router = useRouter()

    const form = useForm<TsignInSchema>({
        resolver: zodResolver(signInSchema),
    })

    const onSubmit = async (data: TsignInSchema) => {
        const signInData = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false
        })

        if (signInData?.error) {
            alert("Oops, something went wrong!")
        } else {
            router.refresh()
            router.push('/dashboard')
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                </label>
                <div className="relative">
                    <input
                        type="email"
                        {...form.register('email')}
                        placeholder="Enter your email"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                        <IoMailOutline size={22} />
                    </span>
                </div>
            </div>

            <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Re-type Password
                </label>
                <div className="relative">
                    <input
                        type="password"
                        {...form.register('password')}
                        placeholder="6+ Characters, 1 Capital letter"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                        <IoLockClosedOutline size={22} />
                    </span>
                </div>
            </div>

            <div className="mb-5">
                <input
                    type="submit"
                    value="Sign In"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                />
            </div>
        </form>
    )
}
