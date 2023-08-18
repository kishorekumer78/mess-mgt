import Menu from '@/components/Menu';

export default function GeneralLayout({ children }) {
	return (
		<main>
			<div className="w-9/12 mx-auto">
				<Menu />
				{children}
			</div>
		</main>
	);
}
