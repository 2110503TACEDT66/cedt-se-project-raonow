import Link from 'next/link'

export default function TopMenuItem({ title, pageRef }: { title: string, pageRef: string }) {
    return (
        <Link className="px-10 max-w-100 text-center my-auto font-sans text-sm text-gray-500 hover:text-sky-400" href={pageRef}>
            {title}
        </Link>
    );
}