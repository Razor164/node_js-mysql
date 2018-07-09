import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import { APILogger } from './services/logger.service';
import { API_CONFIG } from './services/convict.service';
// controllers
import { authController } from './controllers/access-manager/access-manager.controller';
import { publicController } from './controllers/public/public.controller';
import { uploadController } from './controllers/uploader/upload.controller';
import { COMMON_CONTROLLERS } from './controllers/common/common.controller';

const fileUpload = require('express-fileupload');
const ASSETS_FOLDER = path.join(__dirname, '..', `uploads`);

const PORT = API_CONFIG.port;
const logger = APILogger.getLogger('root');
const app = express();

app.use('/api/static', express.static(ASSETS_FOLDER));
app.use(bodyParser.urlencoded({
    extended: false,
}));
app.use(bodyParser.json());

if (!PRODUCTION) {
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Authorization');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        next();
    });
}

const apiPrefix = 'api';
const adminPrefix = 'admin';
app.use(fileUpload({ preserveExtension: true }));

// auth controller
app.use(`/${apiPrefix}/${authController.url}`, authController.controller);

// admin controller
// app.use(`/${apiPrefix}/${adminPrefix}/${adminDictionaryRouter.url}`, adminDictionaryRouter.router);

// public controller
app.use(`/${apiPrefix}/${publicController.url}`, publicController.controller);

// upload controller
app.use(`/${apiPrefix}/${uploadController.url}`, uploadController.controller);

COMMON_CONTROLLERS.forEach((controller) => {
	app.use(`/${apiPrefix}/${controller.url}`, controller.instance);	
});

app.listen(PORT, () => {
    logger.info(`Node Express server listening on http://localhost:${PORT} ` +
        `in ${PRODUCTION ? 'production' : 'development'} mode`);
});