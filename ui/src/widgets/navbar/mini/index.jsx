// MUI
import {AppBar, Toolbar} from '@mui/material';
// Icons
import NavMiniComponent from '@/components/Widgets/NavMini';

const NavbarMini = ({ position = 'sticky' }) => {
	return (
		<AppBar 
			position={position} 
			elevation={27} 
			color="transparent" 
			sx={{ borderLeft: 0, borderRight: 0 }}>
			<Toolbar>
				<NavMiniComponent />
			</Toolbar>
		</AppBar>
	);
}

export default NavbarMini;
