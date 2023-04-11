

const defineUrl = (isDev) => {

    const mode = {
        dev: {
            url: 'http://localhost:8000/'
        },
        pro: {
            url: '/'
        }
    }

    return mode[isDev].url;

}

export {
    defineUrl
}