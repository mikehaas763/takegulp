import del from 'del';

export default function cleanFactory(config) {
    return () => {
        return del(config.buildOutputLocation);
    };
}
