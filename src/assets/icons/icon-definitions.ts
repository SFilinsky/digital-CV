interface IconDefinition {
    loader: () => Promise<string>,
    params: Partial<HTMLImageElement>
}

type IconDefinitions = Record<string, IconDefinition>;

const definitions: IconDefinitions = {
    // 'github': {
    //     loader: () => import('./assets/icons/github.svg'),
    //     params: {
    //         ariaLabel: 'GitHub'
    //     }
    // },
    // 'email': {
    //     loader: () => import('./assets/icons/email.svg'),
    //     params: {
    //         ariaLabel: 'Email'
    //     }
    // },
    // 'location': {
    //     loader: () => import('./assets/icons/location.svg'),
    //     params: {
    //         ariaLabel: 'Location'
    //     }
    // },
    // 'linkedin': {
    //     loader: () => import('./assets/icons/linkedin.svg'),
    //     params: {
    //         ariaLabel: 'LinkedIn'
    //     }
    // }
}

export default definitions;
