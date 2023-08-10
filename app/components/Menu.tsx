'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import Image from 'next/image';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Menu = (): React.ReactElement => {
	// TODO: username set is not implemented correctly
	// have to refresh the page after login to get the username which is not correct
	// TODO: implement state management for username && layout for login and sign up + layout for admin + layout for users
	let currentPath = usePathname();
	const router = useRouter();
	const [username, setUsername] = useState('');

	// useEffect(() => {
	//   (async () => {
	//     const res = await axios.get("/api/token-data");
	//     if (res.data.success) {
	//       setUsername(res.data.data.username);
	//     } else {
	//       setUsername("");
	//       router.push("/login");
	//     }
	//   })();
	// }, []);

	const handleLogout = async () => {
		await axios.get('/api/logout');
		setUsername('');
		toast.success('Logout Successful');
		router.push('/login');
	};
	return (
		<div className='navbar bg-gray-100 w-9/12 mx-auto'>
			<div className='flex-1'>
				<Link className={`btn btn-ghost normal-case ${currentPath === '/' ? 'btn-active' : ''}`} href='/'>
					Home
				</Link>
				<Link
					className={`btn btn-ghost normal-case  ${currentPath === '/mess-bill' ? 'btn-active' : ''}`}
					href='/mess-bill'
				>
					Mess Bill
				</Link>
				<Link
					className={`btn btn-ghost normal-case  ${currentPath === '/offrs' ? 'btn-active' : ''}`}
					href='/offrs'
				>
					OFFRS
				</Link>
				<Link
					className={`btn btn-ghost normal-case  ${currentPath === '/login' ? 'btn-active' : ''}`}
					href='/login'
				>
					Login
				</Link>
				<Link
					className={`btn btn-ghost normal-case  ${currentPath === '/signup' ? 'btn-active' : ''}`}
					href='/signup'
				>
					Signup
				</Link>
			</div>
			<div className='flex-none'>
				<div className='dropdown dropdown-end'>
					<label tabIndex={0} className='btn btn-ghost btn-circle'>
						<div className='indicator'>
							<AiOutlineShoppingCart className='h-[24px] w-[24px]' />
							<span className='badge badge-sm indicator-item'>8</span>
						</div>
					</label>
					<div tabIndex={0} className='mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow'>
						<div className='card-body'>
							<span className='font-bold text-lg'>8 Items</span>
							<span className='text-info'>Subtotal: $999</span>
							<div className='card-actions'>
								<button className='btn btn-primary btn-block'>View cart</button>
							</div>
						</div>
					</div>
				</div>
				<span className='mx-5 btn btn-ghost'>{username}</span>
				<div className='dropdown dropdown-end'>
					<label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
						<div className='w-[40px] rounded-full border-primary border-2'>
							<Image
								src='/images/Cat03.jpg'
								className='h-[40px] w-[40px]'
								width={40}
								height={40}
								alt='profile image'
							/>
						</div>
					</label>
					<ul
						tabIndex={0}
						className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
					>
						<li>
							<a className='justify-between'>
								Profile
								<span className='badge'>New</span>
							</a>
						</li>
						<li>
							<a>Settings</a>
						</li>
						<li>
							<button onClick={handleLogout}>Logout</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Menu;
