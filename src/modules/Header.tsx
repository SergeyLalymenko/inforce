import mergeClasses from '@/utils/mergeClasses';
import { useLocation, Link } from 'react-router-dom';
import { routes } from '@/const/routes';
import Container from '@/components/Container';

function Header() {
    const location = useLocation();

    return (
        <header className="w-full border-solid border-b border-zinc-700 bg-zinc-900">
            <Container className="py-5">
                <ul className="flex items-center justify-center flex-wrap gap-5">
                    {Object.entries(routes).map(([_, { title, path }]) => (
                        <Link
                            key={path}
                            to={path}
                            className={mergeClasses(
                                'hover:text-indigo-300 transition-colors duration-200',
                                location.pathname === path && 'text-indigo-300'
                            )}
                        >
                            {title}
                        </Link>
                    ))}
                </ul>
            </Container>
        </header>
    );
}

export default Header;
