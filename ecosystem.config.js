module.exports = {
    apps: [{
        name: 'node-server',
        script: 'src/server.ts',
        interpreter: './node_modules/.bin/ts-node',
        watch: '.',
        log_type: 'json',
        env: {
            NODE_ENV: 'development',
        },
        env_production: {
            NODE_ENV: 'production',
        }
    },
    ],
}
