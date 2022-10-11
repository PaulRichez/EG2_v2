module.exports = ({ env }) => ({
    'users-permissions': {
        config: {
            jwtSecret: env('JWT_SECRET')
        },
    },
    upload: {
        config: {
            provider: 'local',
            providerOptions: {
                sizeLimit: 100000,
            },
            breakpoints: {},
        },
    },
    'transformer': {
        enabled: true,
        config: {
            responseTransforms: {
                removeAttributesKey: true,
                removeDataKey: true,
            }
        }
    },
});