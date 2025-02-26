import { history } from '@umijs/max';

export default (props: any) => {

    const token = localStorage.getItem('token');
    if (!token) {
        history.push('/login');
        return null;
    }
    return <>{props.children}</>;
};