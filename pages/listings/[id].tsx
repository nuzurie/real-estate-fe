import { useRouter } from 'next/router';

function DetailView() {
    const router = useRouter();

    return (
        <div>
            <p>Hello from {router.query.id}</p>
        </div>
    )
}

export default DetailView;