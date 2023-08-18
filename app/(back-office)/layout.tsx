import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import Menu from '@/components/Menu';

export default function Layout({ children }) {
	return (
		<main>
			<div className="drawer">
				<input id="my-drawer" type="checkbox" className="drawer-toggle" />
				{/*"****************"*/}
				<div className="drawer-content relative w-9/12 mx-auto">
					<Menu />
					{children}
				</div>
				{/*"****************"*/}
				<label htmlFor="my-drawer" className="btn drawer-button absolute top-[10px] left-[10px]">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						className="inline-block w-6 h-6 stroke-current"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M4 6h16M4 12h16M4 18h16"
						></path>
					</svg>
				</label>
				<div className="drawer-side">
					<label htmlFor="my-drawer" className="drawer-overlay"></label>

					<div className="menu p-4 w-80 h-full bg-base-200 text-base-content">
						<Image alt="logo" src="/images/snr-logo.png" width={50} height={50} className="mx-auto" />

						<h2 className="menu-title text-xl text-center">BACK OFFICE MGT</h2>
						<h3 className="menu-title text-lg text-center">OFFRS&apos; MESS BAF SNR</h3>
						{/* Sidebar content here */}
						<ul>
							<li>
								<Link href="/mess-bill" className="text-base font-semibold">
									Mess Bill
								</Link>
							</li>
							<li>
								<Link href="/daily-messing" className="text-base font-semibold">
									Daily Messing
								</Link>
							</li>
							<li>
								<Link href="/contribution" className="text-base font-semibold">
									Contribution
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</main>
	);
}
