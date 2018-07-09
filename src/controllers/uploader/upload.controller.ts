import { RestController } from '../../services/router.service';
import { API_ERROR } from '../../models/constants/errors';
import * as path from 'path';
import * as fs from 'file-system';
import * as uuid from 'uuid';

const ASSETS_FOLDER = path.join(__dirname, '..', `uploads`);
const controller = new RestController('upload', []);

controller.post<{ file: string }>('/:type/:folder', async function (req, res) {
    const folder = req.params.folder ? req.params.folder : '';
    const type = req.params.type;
    if (!fs.existsSync(`${ASSETS_FOLDER}/${type}/${folder}`)) {
        fs.mkdirSync(`${ASSETS_FOLDER}/${type}/${folder}`);
    }
    if (!req.files) {
        return Promise.reject(API_ERROR.BAD_REQUEST);
    }
    const files = req.files.file;

    const id = uuid.v1();
    files.mv(`${ASSETS_FOLDER}/${type}/${folder}/${id}-${files.name}`, function (err) {
        if (err) {
            return this.error(API_ERROR.SERVER_ERROR, res);
        }
        res.send({
            filePath: `${type}/${folder}/${id}-${files.name}`,
        });
    });
}, false);

export const uploadController = { controller: controller.instance, url: controller.baseUrl };
