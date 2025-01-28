import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import scrollToTop from '@/components/Widgets/ScrollToTop';

function WithScrollTopOnRouteChange({ children }) {
	const location = useLocation();
	const { pathname } = location;

	useEffect(() => {
		scrollToTop();
	}, [pathname]);

	return children || null;
}

export default WithScrollTopOnRouteChange;
