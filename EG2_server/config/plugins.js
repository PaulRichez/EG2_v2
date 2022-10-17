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
    email: {
        config: {
            provider: 'nodemailer',
            providerOptions: {
                host: env('SMTP_HOST', 'smtp.example.com'),
                port: env('SMTP_PORT', 587),
                auth: {
                    user: env('SMTP_USERNAME'),
                    pass: env('SMTP_PASSWORD'),
                },
                // ... any custom nodemailer options
            },
            settings: {
                defaultFrom: env('SMTP_DEFAULTFROM', 'hello@example.com'),
                defaultReplyTo: env('SMTP_DEFAULTREPLYTO', 'hello@example.com'),
            },
        },
    },
    'first-install': {
        enabled: true,
        resolve: './src/plugins/first-install'
    },
    'user-extended': {
        enabled: true,
        resolve: './src/plugins/user-extended'
    },
});