import { useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import withScrollTopFabButton from '@/utils/hocs/withScrollTopFabButton';
import WidthPageTransition from '@/utils/hocs/widthPageTransition';

import { selectThemeConfig } from '@/redux/features/_theme/selectors.theme';

// MUI
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
// Icons
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import navItems from '@/components/Widgets/Nav/NavItem';

// Components
import Footer from '@/widgets/footer';
import NavMini from '@/widgets/navbar/mini';

function FabButton() {
	/* <Fab
		size="small"
		aria-label="scroll back to top"
		sx={{ bgcolor: 'primary.light' }}
	>
		<KeyboardArrowUpIcon color="primary" />
	</Fab> */
	return (
		<Fab size="small" aria-label="scroll back to top" color="primary">
			<KeyboardArrowUpIcon />
		</Fab>
	);
}

function MinimalLayout({ container = 'lg', pb = true }) {
	const location = useLocation();
	const { pageTransitions } = useSelector(selectThemeConfig);

	return (
		<Box
			component="main"
			minHeight="100vh"
			minWidth="100vw"
			display="flex"
			flexDirection="column"
			justifyContent="center"
			// alignItems="center"
			// sx={{
			// 	backgroundImage: (theme) =>
			// 		theme.palette.mode === 'dark'
			// 			? `linear-gradient(45deg, ${theme.palette.primary.dark}  0%, ${theme.palette.secondary[300]}  33%, ${theme.palette.tertiary.dark}  66%, ${theme.palette.cuaternary.dark} 100%)`
			// 			: `linear-gradient(45deg, ${theme.palette.primary[400]}  0%, ${theme.palette.secondary[300]}  33%, ${theme.palette.tertiary[100]}  66%, ${theme.palette.cuaternary.main} 100%)`,

			// 	/* backgroundImage: (theme) =>
			// 		`linear-gradient(45deg, ${theme.palette.primary[400]}  0%, ${theme.palette.secondary[300]}  33%, ${theme.palette.tertiary[100]}  66%, ${theme.palette.cuaternary.main} 100%)`,
			//  */
			// }}
		>
			<Header />
			<Container
				maxWidth={container}
				component="main"
				sx={{
					flex: '1 0 auto',
					...(pb && {
						pb: 5,
					}),
				}}
			>
				{pageTransitions ? (
					<WidthPageTransition location={location.key}>
						<Outlet />
					</WidthPageTransition>
				) : (
					<Outlet />
				)}
			</Container>
			{withScrollTopFabButton(FabButton)}
			<Footer />
		</Box>
	);
}

function Header() {
	const { stickyHeader } = useSelector(selectThemeConfig);

	return (
		<>
			<NavMini navItems={navItems} position='static' />
			{/* <NavMini navItems={navItems} position={stickyHeader ? 'sticky' : 'static'} /> */}
		</>
	);
}

export default MinimalLayout;
