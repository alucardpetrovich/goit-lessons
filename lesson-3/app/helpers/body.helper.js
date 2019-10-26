
class BodyHelper {
    static async getBody(req) {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        return new Promise((res, rej) => {
            req.on('end', (chunk) => {
                chunk = chunk || '';
                body += chunk;

                res(this.parseBody(req, body));
            });
        });
    }

    static parseBody(req, body) {
        const contentType = req.headers['content-type'];

        if ( contentType === 'application/json' ) {
            return body ? JSON.parse(body) : '';
        }

        throw new Error('Unsupported MIME-type');
    }
}

module.exports = BodyHelper;
