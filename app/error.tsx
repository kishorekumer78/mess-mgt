'use client';
import Link from 'next/link';

export default function Error() {
	return (
		<div className="h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex justify-center items-center">
			<div className="bg-white p-6 rounded-md shadow-lg">
				<h1 className="text-4xl font-bold mb-4">Oops, something went wrong!</h1>

				<p className="text-gray-600 mb-5">
					We&apos;re sorry, but it seems there was an error processing your request.
				</p>
				<Link
					href={'/'}
					className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
				>
					Go Back Home
				</Link>
			</div>
		</div>
	);
}
